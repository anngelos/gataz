import Phaser from "phaser";

type Character = "madeline" | "makena";

export class LevelCompleteScene extends Phaser.Scene {
  private level = 1;
  private score = 0;
  private character: Character = "madeline";
  private canContinue = true;

  constructor() {
    super("LevelCompleteScene");
  }

  init(data: {
    level?: number;
    score?: number;
    character?: Character;
  }) {
    this.level = data.level ?? 1;
    this.score = data.score ?? 0;
    this.character = data.character ?? "madeline";
  }

  preload() {
    this.load.text(
      "pixelify-font",
      "/fonts/Pixelify.ttf"
    );
  }

  async create() {

    await document.fonts.load(
      '400 25px "Pixelify"'
    );

    this.cameras.main.setBackgroundColor(
      "#241936"
    );

    this.add.text(
      640,
      130,
      "FASE CONCLUÍDA!",
      {
        fontFamily: "Pixelify",
        fontSize: "56px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
      }
    ).setOrigin(0.5);

    this.add.text(
      640,
      210,
      `FASE ${this.level}`,
      {
        fontFamily: "Pixelify",
        fontSize: "32px",
        fontStyle: "bold",
        color: "#d8b8ff",
      }
    ).setOrigin(0.5);

    const panel = this.add.graphics();

    panel.fillStyle(
      0x392653,
      1
    );

    panel.fillRoundedRect(
      390,
      270,
      500,
      210,
      12
    );

    panel.lineStyle(
      4,
      0x7b4ab5,
      1
    );

    panel.strokeRoundedRect(
      390,
      270,
      500,
      210,
      12
    );

    this.add.text(
      640,
      375,
      `PONTOS: ${this.score}`,
      {
        fontFamily: "Pixelify",
        fontSize: "32px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      }
    ).setOrigin(0.5);

    this.add.text(
      640,
      525,
      "Parabéns!",
      {
        fontFamily: "Pixelify",
        fontSize: "28px",
        color: "#ffffff",
      }
    ).setOrigin(0.5);

    this.createButton(
      455,
      625,
      260,
      70,
      "CONTINUAR",
      () => {
        this.continueGame();
      }
    );

    this.createButton(
      825,
      625,
      300,
      70,
      "MENU PRINCIPAL",
      () => {
        this.goToMainMenu();
      }
    );

    this.input.keyboard!.on(
      "keydown-ENTER",
      () => {
        this.continueGame();
      }
    );

    this.input.keyboard!.on(
      "keydown-SPACE",
      () => {
        this.continueGame();
      }
    );

    this.input.keyboard!.on(
      "keydown-ESC",
      () => {
        this.goToMainMenu();
      }
    );
  }

  private createButton(
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    callback: () => void
  ) {
    const button =
      this.add.container(
        x,
        y
      );

    const background =
      this.add.graphics();

    background.fillStyle(
      0x7b4ab5,
      1
    );

    background.fillRoundedRect(
      -width / 2,
      -height / 2,
      width,
      height,
      8
    );

    background.lineStyle(
      3,
      0xffffff,
      1
    );

    background.strokeRoundedRect(
      -width / 2,
      -height / 2,
      width,
      height,
      8
    );

    const buttonText =
      this.add.text(
        0,
        0,
        text,
        {
          fontFamily: "Pixelify",
          fontSize: text === "MENU PRINCIPAL"
            ? "25px"
            : "30px",
          fontStyle: "bold",
          color: "#ffffff",
        }
      ).setOrigin(0.5);

    button.add([
      background,
      buttonText,
    ]);

    const zone =
      this.add.zone(
        x,
        y,
        width,
        height
      );

    zone.setInteractive({
      useHandCursor: true,
    });

    zone.on(
      "pointerover",
      () => {
        button.setScale(1.08);
      }
    );

    zone.on(
      "pointerout",
      () => {
        button.setScale(1);
      }
    );

    zone.on(
      "pointerdown",
      () => {
        callback();
      }
    );

    return button;
  }

  private continueGame() {
    if (!this.canContinue) {
      return;
    }
  
    this.canContinue = false;
    const nextLevel = this.level + 1;
  
    console.log(`▶️ Indo para a fase ${nextLevel}`);
    console.log(`Personagem: ${this.character}`);
    console.log(`Fase: ${nextLevel}`);
  
    this.scene.start(
      "GameScene",
      {
        character: this.character,
        level: nextLevel,
      }
    );
  }

  private goToMainMenu() {
    if (!this.canContinue) {
      return;
    }

    this.canContinue = false;

    console.log(
      "🏠 Voltando para o menu principal."
    );

    this.scene.start(
      "MenuScene"
    );
  }
}