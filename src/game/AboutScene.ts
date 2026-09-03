import Phaser from "phaser";

export class AboutScene extends Phaser.Scene {
  private mouseClickSound!: Phaser.Sound.BaseSound;

  constructor() {
    super("AboutScene");
  }

  preload() {
    this.load.audio("mouse-click", "/assets/audio/mouse-click.mp3");

    this.load.image("about-background", "/assets/menu/about-background.png");
  }

  create() {
    this.mouseClickSound = this.sound.add("mouse-click", { volume: 0.7 });

    const background = this.add.image(640, 360, "about-background");

    background.setDisplaySize(1280, 720);

    background.setDepth(-1);

    this.add
      .text(640, 100, "SOBRE", {
        fontFamily: "Determination",
        fontSize: "56px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#333333",
        strokeThickness: 5,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: "#000000",
          blur: 0,
          stroke: true,
          fill: true,
        },
      })
      .setOrigin(0.5);

    this.add
      .text(640, 190, "GATAZ", {
        fontFamily: "Determination",
        fontSize: "42px",
        fontStyle: "bold",
        color: "#ffb347",
        stroke: "#000000",
        strokeThickness: 4,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: "#000000",
          blur: 0,
          stroke: true,
          fill: true,
        },
      })
      .setOrigin(0.5);

    this.add
      .text(
        640,
        290,
        "Explore as fases, pule obstáculos,\n" +
          "enfrente os inimigos (principalmente a Esporotricose) e ajude\n" +
          "nossas heroínas a chegar até o final!",
        {
          fontFamily: "Determination",
          fontSize: "26px",
          color: "#ffffff",
          align: "center",
          lineSpacing: 10,
          stroke: "#000000",
          strokeThickness: 4,
          shadow: {
            offsetX: 2,
            offsetY: 2,
            color: "#000000",
            blur: 0,
            stroke: true,
            fill: true,
          },
        },
      )
      .setOrigin(0.5);

    this.add
      .text(
        640,
        425,
        "Gataz é um jogo simples, divertido\n" +
          "e feito para brincar, descobrir\n" +
          "e se aventurar.",
        {
          fontFamily: "Determination",
          fontSize: "24px",
          color: "#ffffff",
          align: "center",
          lineSpacing: 8,
          stroke: "#000000",
          strokeThickness: 4,
          shadow: {
            offsetX: 2,
            offsetY: 2,
            color: "#000000",
            blur: 0,
            stroke: true,
            fill: true,
          },
        },
      )
      .setOrigin(0.5);

    this.add
      .text(640, 520, "Boa aventura! ❤️", {
        fontFamily: "Determination",
        fontSize: "30px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: "#000000",
          blur: 0,
          stroke: true,
          fill: true,
        },
      })
      .setOrigin(0.5);

    this.add
      .text(640, 570, "@malasart3", {
        fontFamily: "Determination",
        fontSize: "20px",
        color: "#cccccc",
        stroke: "#000000",
        strokeThickness: 3,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: "#000000",
          blur: 0,
          stroke: true,
          fill: true,
        },
      })
      .setOrigin(0.5);

    const backVisual = this.add.container(640, 650);

    const backBackground = this.add.graphics();

    backBackground.fillStyle(0x7b4ab5, 1);

    backBackground.fillRoundedRect(-100, -28, 200, 56, 8);

    backBackground.lineStyle(3, 0xffffff, 1);

    backBackground.strokeRoundedRect(-100, -28, 200, 56, 8);

    const voltarText = this.add
      .text(0, 0, "VOLTAR", {
        fontFamily: "Determination",
        fontSize: 28,
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    backVisual.add([backBackground, voltarText]);

    const backZone = this.add.zone(640, 650, 200, 56);

    backZone.setInteractive({
      useHandCursor: true,
    });

    backZone.on("pointerover", () => {
      backVisual.setScale(1.08);
    });

    backZone.on("pointerout", () => {
      backVisual.setScale(1);
    });

    backZone.on("pointerdown", () => {
      this.mouseClickSound.play();
      this.scene.start("MenuScene");
    });
  }
}
