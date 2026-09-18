import Phaser from "phaser";
import { wordSearchWords } from "./WordSearchWords";
import type { GameScene } from "./GameScene";

type Character = "madeline" | "makena";

export class WordSearchScene extends Phaser.Scene {
  private character: Character = "madeline";
  private targetWord = "";
  private readonly gridSize = 5;
  private readonly cellSize = 72;
  private grid: string[][] = [];
  private selectedCells: { row: number; col: number }[] = [];
  private gridCells: Phaser.GameObjects.Rectangle[][] = [];
  private gridStartX = 0;
  private gridStartY = 245;
  private isSelecting = false;
  private timer = 60;
  private timerEvent!: Phaser.Time.TimerEvent;
  private timerText!: Phaser.GameObjects.Text;

  constructor() {
    super("WordSearchScene");
  }

  init(data: {
    character?: Character;
    level?: number;
    score?: number;
    hearts?: number;
    wordSearchTime?: number;
  }) {
    this.character = data.character ?? "madeline";
    this.timer = data.wordSearchTime ?? 60;
  }

  create() {
    this.isSelecting = false;
    this.selectedCells = [];
    this.targetWord = this.getRandomWord();
    this.createBackground();
    this.createTitle();
    this.createWordTarget();
    this.generateGrid();
    this.createGrid();
    this.createTimer();
  }

  private createBackground() {
    this.add.rectangle(640, 360, 1280, 720, 0x1b1630, 1);
  }

  private createTitle() {
    this.add
      .text(640, 55, "GAME OVER", {
        fontFamily: "Determination",
        fontSize: "48px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 5,
      })
      .setOrigin(0.5);
  }

  private createWordTarget() {
    this.add
      .text(640, 125, "ENCONTRE A PALAVRA:", {
        fontFamily: "Determination",
        fontSize: "24px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(640, 170, this.targetWord, {
        fontFamily: "Determination",
        fontSize: "38px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);
  }

  private getRandomWord() {
    const index = Phaser.Math.Between(0, wordSearchWords.length - 1);
    return wordSearchWords[index];
  }

  private generateGrid() {
    this.grid = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => this.getRandomLetter()),
    );

    const horizontal = Phaser.Math.Between(0, 1) === 0;

    if (horizontal) {
      this.placeWordHorizontal();
    } else {
      this.placeWordVertical();
    }
  }

  private placeWordHorizontal() {
    const row = Phaser.Math.Between(0, this.gridSize - 1);
    const maxStart = this.gridSize - this.targetWord.length;
    const col = Phaser.Math.Between(0, maxStart);

    for (let i = 0; i < this.targetWord.length; i++) {
      this.grid[row][col + i] = this.targetWord[i];
    }
  }

  private placeWordVertical() {
    const col = Phaser.Math.Between(0, this.gridSize - 1);
    const maxStart = this.gridSize - this.targetWord.length;
    const row = Phaser.Math.Between(0, maxStart);

    for (let i = 0; i < this.targetWord.length; i++) {
      this.grid[row + i][col] = this.targetWord[i];
    }
  }

  private getRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Phaser.Math.Between(0, letters.length - 1)];
  }

  private createGrid() {
    const gridWidth = this.gridSize * this.cellSize;
    const startX = 640 - gridWidth / 2 + this.cellSize / 2;
    const startY = 245;

    this.gridStartX = startX;
    this.gridStartY = startY;
    this.gridCells = [];

    for (let row = 0; row < this.gridSize; row++) {
      this.gridCells[row] = [];

      for (let col = 0; col < this.gridSize; col++) {
        const x = startX + col * this.cellSize;
        const y = startY + row * this.cellSize;

        const cell = this.add
          .rectangle(x, y, this.cellSize - 2, this.cellSize - 2, 0x3a315c, 1)
          .setInteractive();

        this.gridCells[row][col] = cell;

        const letter = this.add
          .text(x, y, this.grid[row][col], {
            fontFamily: "Determination",
            fontSize: "32px",
            color: "#ffffff",
          })
          .setOrigin(0.5);

        cell.on("pointerdown", () => {
          this.startSelection(row, col);
        });

        letter.setInteractive();

        letter.on("pointerdown", () => {
          this.startSelection(row, col);
        });
      }
    }

    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (!this.isSelecting || !pointer.isDown) {
        return;
      }

      const col = Math.floor(
        (pointer.worldX - this.gridStartX + this.cellSize / 2) / this.cellSize,
      );

      const row = Math.floor(
        (pointer.worldY - this.gridStartY + this.cellSize / 2) / this.cellSize,
      );

      if (row < 0 || row >= this.gridSize || col < 0 || col >= this.gridSize) {
        return;
      }

      this.addSelectedCell(row, col);
    });

    this.input.on("pointerup", () => {
      if (this.isSelecting) {
        this.finishSelection();
      }
    });
  }

  private startSelection(row: number, col: number) {
    this.clearSelectionVisuals();
    this.isSelecting = true;
    this.selectedCells = [];
    this.addSelectedCell(row, col);
  }

  private addSelectedCell(row: number, col: number) {
    const alreadySelected = this.selectedCells.some(
      (cell) => cell.row === row && cell.col === col,
    );

    if (alreadySelected) {
      return;
    }

    this.selectedCells.push({
      row,
      col,
    });

    const cell = this.gridCells[row][col];
    cell.setFillStyle(0x8f7ac4, 1);
  }

  private clearSelectionVisuals() {
    for (const selectedCell of this.selectedCells) {
      const cell = this.gridCells[selectedCell.row][selectedCell.col];
      cell.setFillStyle(0x3a315c, 1);
    }
  }

  private finishSelection() {
    if (!this.isSelecting) {
      return;
    }

    this.isSelecting = false;

    const selectedWord = this.selectedCells
      .map((cell) => this.grid[cell.row][cell.col])
      .join("");

    if (selectedWord === this.targetWord) {
      this.wordFound();
      return;
    }

    this.clearSelectionVisuals();
    this.selectedCells = [];
  }

  private wordFound() {
    this.timerEvent.remove(false);
    const gameScene = this.scene.get("GameScene") as GameScene;
    gameScene.setWordSearchTime(this.timer);
    gameScene.resetAfterWordSearch();
    this.scene.stop("WordSearchScene");
    this.scene.resume("GameScene");
  }

  private createTimer() {
    if (this.timerEvent) {
      this.timerEvent.remove(false);
    }

    this.timerText = this.add
      .text(640, 690, `TEMPO: ${this.timer}`, {
        fontFamily: "Determination",
        fontSize: "26px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timer--;
        this.timerText.setText(`TEMPO: ${this.timer}`);

        if (this.timer <= 0) {
          this.timeOut();
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  private timeOut() {
    this.timerEvent.remove(false);
    this.scene.stop("WordSearchScene");
    this.scene.stop("GameScene");

    this.scene.start("GameScene", {
      character: this.character,
      level: 1,
      score: 0,
      hearts: 3,
    });
  }
}
