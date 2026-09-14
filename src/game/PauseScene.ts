import Phaser from "phaser";

type Character = "madeline" | "makena";

export class PauseScene extends Phaser.Scene {
  private character: Character = "madeline";
  private level = 1;
  private score = 0;
  private hearts = 3;

  constructor() {
    super("PauseScene");
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
  }

  create() {
    this.add
      .rectangle(640, 360, 1280, 720, 0x000000, 0.7)
      .setDepth(0);
  
    this.add
      .rectangle(640, 360, 440, 560, 0x1b1630, 1)
      .setDepth(1);
  
    this.add
      .text(640, 145, "JOGO PAUSADO", {
        fontFamily: "Determination",
        fontSize: "44px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 5,
      })
      .setOrigin(0.5)
      .setDepth(2);
  
    this.createButton(640, 280, "CONTINUAR", () => {
      this.continueGame();
    });
  
    this.createButton(640, 370, "REINICIAR", () => {
      this.restartGame();
    });
  
    this.createButton(640, 460, "CONFIGURAÇÕES", () => {
      this.openSettings();
    });
  
    this.createButton(640, 550, "MENU PRINCIPAL", () => {
      this.goToMainMenu();
    });
  }

  private createButton(
    x: number,
    y: number,
    label: string,
    callback: () => void,
  ) {
    const button = this.add
      .rectangle(x, y, 330, 58, 0x3a315c, 1)
      .setInteractive({ useHandCursor: true })
      .setDepth(2);

    const text = this.add
      .text(x, y, label, {
        fontFamily: "Determination",
        fontSize: "24px",
        color: "#ffffff",
      })
      .setOrigin(0.5)
      .setDepth(3);

    button.on("pointerover", () => {
      button.setFillStyle(0x514477, 1);
    });

    button.on("pointerout", () => {
      button.setFillStyle(0x3a315c, 1);
    });

    button.on("pointerdown", callback);
  }

  private continueGame() {
    this.scene.stop("PauseScene");
    this.scene.resume("GameScene");
  }

  private restartGame() {
    this.scene.stop("PauseScene");
    this.scene.stop("GameScene");
    this.scene.start("GameScene", {
      character: this.character,
      level: 1,
      score: 0,
      hearts: 3,
    });
  }

  private openSettings() {
    console.log("Configurações ainda não implementadas.");
  }

  private goToMainMenu() {
    this.scene.stop("PauseScene");
    this.scene.stop("GameScene");
    this.scene.start("MenuScene");
  }
}