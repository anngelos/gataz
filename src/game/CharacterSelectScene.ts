import Phaser from "phaser";

export class CharacterSelectScene extends Phaser.Scene {
  private mouseClickSound!: Phaser.Sound.BaseSound;

  constructor() {
    super("CharacterSelectScene");
  }

  preload() {
    this.load.audio("mouse-click", "/assets/audio/mouse-click.mp3");

    this.load.image(
      "character-select-background",
      "/assets/menu/character-select-background.png",
    );

    this.load.image(
      "madeline-face",
      "/assets/characters/madeline/madeline-face.png",
    );

    this.load.image("makena-face", "/assets/characters/makena/makena-face.png");
  }

  create() {
    this.mouseClickSound = this.sound.add("mouse-click", {
      volume: 0.7,
    });

    const background = this.add.image(640, 360, "character-select-background");

    background.setDisplaySize(1280, 720);

    background.setDepth(-1);

    this.add
      .text(640, 80, "ESCOLHA SUA GATA", {
        fontFamily: "Determination",
        fontSize: "56px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#333333",
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    const cardWidth = 300;
    const cardHeight = 430;
    const madelineX = 420;
    const makenaX = 860;
    const cardY = 390;

    const madelineCard = this.add.rectangle(
      madelineX,
      cardY,
      cardWidth,
      cardHeight,
      0xe58b35,
    );

    madelineCard.setStrokeStyle(5, 0xffffff);

    madelineCard.setInteractive({
      useHandCursor: true,
    });

    const makenaCard = this.add.rectangle(
      makenaX,
      cardY,
      cardWidth,
      cardHeight,
      0x8a6bbd,
    );

    makenaCard.setStrokeStyle(5, 0xffffff);

    makenaCard.setInteractive({
      useHandCursor: true,
    });

    const madelineFace = this.add.image(madelineX, 335, "madeline-face");

    madelineFace.setDisplaySize(200, 200);

    const makenaFace = this.add.image(makenaX, 335, "makena-face");

    makenaFace.setDisplaySize(200, 200);

    const madelineName = this.add
      .text(madelineX, 485, "MADELINE", {
        fontFamily: "Determination",
        fontSize: "36px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#333333",
        strokeThickness: 5,
      })
      .setOrigin(0.5);

    const makenaName = this.add
      .text(makenaX, 485, "MAKENA", {
        fontFamily: "Determination",
        fontSize: "36px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#333333",
        strokeThickness: 5,
      })
      .setOrigin(0.5);

    const madelineHint = this.add
      .text(madelineX, 545, "CLIQUE PARA JOGAR", {
        fontFamily: "Determination",
        fontSize: "18px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    const makenaHint = this.add
      .text(makenaX, 545, "CLIQUE PARA JOGAR", {
        fontFamily: "Determination",
        fontSize: "18px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    const madelineElements = [
      madelineCard,
      madelineFace,
      madelineName,
      madelineHint,
    ];

    const makenaElements = [makenaCard, makenaFace, makenaName, makenaHint];

    madelineCard.on("pointerover", () => {
      madelineElements.forEach((element) => {
        element.setScale(1.05);
      });
    });

    madelineCard.on("pointerout", () => {
      madelineElements.forEach((element) => {
        element.setScale(1);
      });
    });

    makenaCard.on("pointerover", () => {
      makenaElements.forEach((element) => {
        element.setScale(1.05);
      });
    });

    makenaCard.on("pointerout", () => {
      makenaElements.forEach((element) => {
        element.setScale(1);
      });
    });

    madelineCard.on("pointerdown", () => {
      this.scene.start("GameScene", {
        character: "madeline",
        level: 1,
      });
    });

    makenaCard.on("pointerdown", () => {
      this.scene.start("GameScene", {
        character: "makena",
        level: 1,
      });
    });

    const voltarVisual = this.add.container(110, 665);

    const voltarBackground = this.add.graphics();

    voltarBackground.fillStyle(0x7b4ab5, 1);

    voltarBackground.fillRoundedRect(-75, -28, 150, 56, 8);

    voltarBackground.lineStyle(3, 0xffffff, 1);

    voltarBackground.strokeRoundedRect(-75, -28, 150, 56, 8);

    const voltarText = this.add
      .text(0, 0, "VOLTAR", {
        fontFamily: "Determination",
        fontSize: "28px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    voltarVisual.add([voltarBackground, voltarText]);

    const voltarZone = this.add.zone(110, 665, 150, 56);

    voltarZone.setInteractive({
      useHandCursor: true,
    });

    voltarZone.on("pointerover", () => {
      voltarVisual.setScale(1.08);
    });

    voltarZone.on("pointerout", () => {
      voltarVisual.setScale(1);
    });

    voltarZone.on("pointerdown", () => {
      this.mouseClickSound.play();
      this.scene.start("MenuScene");
    });
  }
}
