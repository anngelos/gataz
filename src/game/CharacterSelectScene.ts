import Phaser from "phaser";

export class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super("CharacterSelectScene");
  }

  preload() {
    // =========================
    // FUNDO DA SELEÇÃO
    // =========================

    this.load.image(
      "character-select-background",
      "/assets/menu/character-select-background.png",
    );

    // =========================
    // MADELINE
    // =========================

    this.load.image(
      "madeline-face",
      "/assets/characters/madeline/madeline-face.png",
    );

    // =========================
    // MAKENA
    // =========================

    this.load.image(
      "makena-face",
      "/assets/characters/makena/makena-face.png",
    );
  }

  create() {
    // =========================
    // FUNDO
    // =========================

    const background = this.add.image(
      640,
      360,
      "character-select-background",
    );

    background.setDisplaySize(
      1280,
      720,
    );

    background.setDepth(-1);

    // =========================
    // TÍTULO
    // =========================

    this.add
      .text(
        640,
        80,
        "ESCOLHA SUA GATA",
        {
          fontFamily: "Pixelify",
          fontSize: "56px",
          fontStyle: "bold",
          color: "#ffffff",
          stroke: "#333333",
          strokeThickness: 6,
        },
      )
      .setOrigin(0.5);

    // =========================
    // CARDS
    // =========================

    const cardWidth = 300;
    const cardHeight = 430;

    const madelineX = 420;
    const makenaX = 860;
    const cardY = 390;

    // =========================
    // CARD MADELINE
    // =========================

    const madelineCard =
      this.add.rectangle(
        madelineX,
        cardY,
        cardWidth,
        cardHeight,
        0xe58b35,
      );

    madelineCard.setStrokeStyle(
      5,
      0xffffff,
    );

    madelineCard.setInteractive({
      useHandCursor: true,
    });

    // =========================
    // CARD MAKENA
    // =========================

    const makenaCard =
      this.add.rectangle(
        makenaX,
        cardY,
        cardWidth,
        cardHeight,
        0x8a6bbd,
      );

    makenaCard.setStrokeStyle(
      5,
      0xffffff,
    );

    makenaCard.setInteractive({
      useHandCursor: true,
    });

    // ==================================================
    // MADELINE - ROSTO
    // ==================================================

    const madelineFace =
      this.add.image(
        madelineX,
        335,
        "madeline-face",
      );

    madelineFace.setDisplaySize(
      200,
      200,
    );

    // ==================================================
    // MAKENA - ROSTO
    // ==================================================

    const makenaFace =
      this.add.image(
        makenaX,
        335,
        "makena-face",
      );

    makenaFace.setDisplaySize(
      200,
      200,
    );

    // ==================================================
    // NOMES
    // ==================================================

    const madelineName =
      this.add
        .text(
          madelineX,
          485,
          "MADELINE",
          {
            fontFamily: "Pixelify",
            fontSize: "36px",
            fontStyle: "bold",
            color: "#ffffff",
            stroke: "#333333",
            strokeThickness: 5,
          },
        )
        .setOrigin(0.5);

    const makenaName =
      this.add
        .text(
          makenaX,
          485,
          "MAKENA",
          {
            fontFamily: "Pixelify",
            fontSize: "36px",
            fontStyle: "bold",
            color: "#ffffff",
            stroke: "#333333",
            strokeThickness: 5,
          },
        )
        .setOrigin(0.5);

    // ==================================================
    // TEXTO DOS BOTÕES
    // ==================================================

    const madelineHint =
      this.add
        .text(
          madelineX,
          545,
          "CLIQUE PARA JOGAR",
          {
            fontFamily: "Pixelify",
            fontSize: "18px",
            fontStyle: "bold",
            color: "#ffffff",
          },
        )
        .setOrigin(0.5);

    const makenaHint =
      this.add
        .text(
          makenaX,
          545,
          "CLIQUE PARA JOGAR",
          {
            fontFamily: "Pixelify",
            fontSize: "18px",
            fontStyle: "bold",
            color: "#ffffff",
          },
        )
        .setOrigin(0.5);

    // ==================================================
    // ELEMENTOS DA MADELINE
    // ==================================================

    const madelineElements = [
      madelineCard,
      madelineFace,
      madelineName,
      madelineHint,
    ];

    // ==================================================
    // ELEMENTOS DA MAKENA
    // ==================================================

    const makenaElements = [
      makenaCard,
      makenaFace,
      makenaName,
      makenaHint,
    ];

    // ==================================================
    // HOVER MADELINE
    // ==================================================

    madelineCard.on(
      "pointerover",
      () => {
        madelineElements.forEach(
          (element) => {
            element.setScale(1.05);
          },
        );
      },
    );

    madelineCard.on(
      "pointerout",
      () => {
        madelineElements.forEach(
          (element) => {
            element.setScale(1);
          },
        );
      },
    );

    // ==================================================
    // HOVER MAKENA
    // ==================================================

    makenaCard.on(
      "pointerover",
      () => {
        makenaElements.forEach(
          (element) => {
            element.setScale(1.05);
          },
        );
      },
    );

    makenaCard.on(
      "pointerout",
      () => {
        makenaElements.forEach(
          (element) => {
            element.setScale(1);
          },
        );
      },
    );

    // ==================================================
    // ESCOLHER MADELINE
    // ==================================================

    madelineCard.on(
      "pointerdown",
      () => {
        console.log(
          "🐈 Madeline escolhida!",
        );

        this.scene.start(
          "GameScene",
          {
            character: "madeline",
          },
        );
      },
    );

    // ==================================================
    // ESCOLHER MAKENA
    // ==================================================

    makenaCard.on(
      "pointerdown",
      () => {
        console.log(
          "🐈 Makena escolhida!",
        );

        this.scene.start(
          "GameScene",
          {
            character: "makena",
          },
        );
      },
    );

    // ==================================================
    // BOTÃO VOLTAR
    // ==================================================

    const voltarVisual =
      this.add.container(
        110,
        665,
      );

    // =========================
    // FUNDO DO BOTÃO
    // =========================

    const voltarBackground =
      this.add.graphics();

    voltarBackground.fillStyle(
      0x7b4ab5,
      1,
    );

    voltarBackground.fillRoundedRect(
      -75,
      -28,
      150,
      56,
      8,
    );

    // =========================
    // BORDA BRANCA
    // =========================

    voltarBackground.lineStyle(
      3,
      0xffffff,
      1,
    );

    voltarBackground.strokeRoundedRect(
      -75,
      -28,
      150,
      56,
      8,
    );

    // =========================
    // TEXTO
    // =========================

    const voltarText =
      this.add
        .text(
          0,
          0,
          "VOLTAR",
          {
            fontFamily: "Pixelify",
            fontSize: "28px",
            fontStyle: "bold",
            color: "#ffffff",
          },
        )
        .setOrigin(0.5);

    voltarVisual.add([
      voltarBackground,
      voltarText,
    ]);

    // =========================
    // ÁREA REAL DO MOUSE
    // =========================

    const voltarZone =
      this.add.zone(
        110,
        665,
        150,
        56,
      );

    voltarZone.setInteractive({
      useHandCursor: true,
    });

    // =========================
    // HOVER - VOLTAR
    // =========================

    voltarZone.on(
      "pointerover",
      () => {
        voltarVisual.setScale(1.08);
      },
    );

    voltarZone.on(
      "pointerout",
      () => {
        voltarVisual.setScale(1);
      },
    );

    // =========================
    // CLICOU EM VOLTAR
    // =========================

    voltarZone.on(
      "pointerdown",
      () => {
        console.log(
          "↩️ Voltando ao menu...",
        );

        this.scene.start(
          "MenuScene",
        );
      },
    );
  }
}