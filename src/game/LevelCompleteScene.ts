import Phaser from "phaser";

type Character = "madeline" | "makena";

export class LevelCompleteScene extends Phaser.Scene {
  private level = 1;
  private score = 0;
  private character: Character = "madeline";
  private isLeaving = false;
  private hearts = 3;

  constructor() {
    super("LevelCompleteScene");
  }

  init(data: {
    character?: Character;
    level?: number;
    score?: number;
    hearts?: number;
  }) {
    this.character = data.character ?? "madeline";
    this.level = data.level ?? 1;
    this.score = data.score ?? 0;
    this.hearts = data.hearts ?? 3;
    this.isLeaving = false;
  }

  preload() {
    this.load.text("determination-font", "/fonts/Determination.ttf");
  }

  create() {
    document.fonts.load('400 25px "Determination"');

    this.cameras.main.setBackgroundColor("#241936");

    this.add
      .text(640, 80, "FASE CONCLUÍDA!", {
        fontFamily: "Determination",
        fontSize: "56px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(640, 160, `FASE ${this.level}`, {
        fontFamily: "Determination",
        fontSize: "38px",
        fontStyle: "bold",
        color: "#ffd86b",
      })
      .setOrigin(0.5);

    this.add
      .text(640, 230, `PONTUAÇÃO: ${this.score}`, {
        fontFamily: "Determination",
        fontSize: "30px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    const panel = this.add.graphics();

    panel.fillStyle(0x302247, 1);
    panel.fillRoundedRect(290, 285, 700, 230, 12);

    panel.lineStyle(3, 0xffffff, 1);
    panel.strokeRoundedRect(290, 285, 700, 230, 12);

    this.add
      .text(640, 350, "Parabéns!", {
        fontFamily: "Determination",
        fontSize: "42px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(640, 420, "Você completou esta fase!", {
        fontFamily: "Determination",
        fontSize: "28px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.createButton(455, 625, 260, 70, "CONTINUAR", () => {
      this.continueGame();
    });

    this.createButton(825, 625, 300, 70, "MENU PRINCIPAL", () => {
      this.goToMainMenu();
    });

    this.input.keyboard?.on("keydown-ENTER", () => {
      this.continueGame();
    });

    this.input.keyboard?.on("keydown-SPACE", () => {
      this.continueGame();
    });

    this.input.keyboard?.on("keydown-ESC", () => {
      this.goToMainMenu();
    });
  }

  private createButton(
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    callback: () => void,
  ) {
    const background = this.add
      .rectangle(x, y, width, height, 0x7b4ab5)
      .setStrokeStyle(3, 0xffffff, 1);

    background.setInteractive({
      useHandCursor: true,
    });

    const buttonText = this.add
      .text(x, y, text, {
        fontFamily: "Determination",
        fontSize: text === "MENU PRINCIPAL" ? "25px" : "30px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    buttonText.setInteractive({
      useHandCursor: true,
    });

    background.on("pointerover", () => {
      background.setScale(1.08);
      buttonText.setScale(1.08);
    });

    background.on("pointerout", () => {
      background.setScale(1);
      buttonText.setScale(1);
    });

    background.on("pointerdown", () => {
      callback();
    });

    buttonText.on("pointerdown", () => {
      callback();
    });

    return background;
  }

  private continueGame() {
    if (this.isLeaving) {
      return;
    }

    const nextLevel = this.level + 1;

    this.isLeaving = true;

    this.scene.start("GameScene", {
      character: this.character,
      level: nextLevel,
      score: this.score,
      hearts: this.hearts,
    });
  }

  private goToMainMenu() {
    if (this.isLeaving) {
      return;
    }

    this.isLeaving = true;
    this.scene.start("MenuScene");
  }
}
