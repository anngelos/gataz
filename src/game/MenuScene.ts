import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {

    this.load.text(
      'pixelify-font',
      '/fonts/Pixelify.ttf'
    );

    // =========================
    // FUNDO DO MENU
    // =========================

    this.load.image(
      'gataz-menu-background',
      '/assets/menu/gataz-menu-background.png'
    );

    // =========================
    // LOGO GATAZ
    // =========================

    this.load.image(
      'gataz-logo',
      '/assets/menu/gataz-logo.png'
    );
  }

  async create() {

    await document.fonts.load(
      '400 25px "Pixelify"'
    );

    // =========================
    // FUNDO
    // =========================

    const background = this.add.image(
      640,
      360,
      'gataz-menu-background'
    );

    background.setDisplaySize(
      1280,
      720
    );

    background.setDepth(-1);

    // =========================
    // LOGO GATAZ
    // =========================

    const logo = this.add.image(
      330,
      150,
      'gataz-logo'
    );

    logo.setDisplaySize(
      430,
      185
    );

    // =========================
    // SUBTÍTULO
    // =========================

    this.add.text(
      330,
      245,
      'Uma aventura de duas gatitas',
      {
        fontFamily: 'Pixelify',
        fontSize: 25,
        color: '#ffffff',
        stroke: '#333333',
        strokeThickness: 4,
      }
    ).setOrigin(0.5);

    // ==================================================
    // BOTÃO JOGAR
    // ==================================================

    const jogarVisual =
      this.add.container(
        330,
        380
      );

    const jogarBackground =
      this.add.graphics();

    jogarBackground.fillStyle(
      0x7b4ab5,
      1
    );

    jogarBackground.fillRoundedRect(
      -100,
      -40,
      200,
      80,
      8
    );

    jogarBackground.lineStyle(
      3,
      0xffffff,
      1
    );

    jogarBackground.strokeRoundedRect(
      -100,
      -40,
      200,
      80,
      8
    );

    const jogarText =
      this.add.text(
        0,
        0,
        'JOGAR',
        {
          fontFamily: 'Pixelify',
          fontSize: 44,
          fontStyle: 'bold',
          color: '#ffffff',
        }
      ).setOrigin(0.5);

    jogarVisual.add([
      jogarBackground,
      jogarText,
    ]);

    // =========================
    // ÁREA REAL DO MOUSE
    // =========================

    const jogarZone =
      this.add.zone(
        330,
        380,
        200,
        80
      );

    jogarZone.setInteractive({
      useHandCursor: true,
    });

    // =========================
    // HOVER - JOGAR
    // =========================

    jogarZone.on(
      'pointerover',
      () => {
        jogarVisual.setScale(1.08);
      }
    );

    jogarZone.on(
      'pointerout',
      () => {
        jogarVisual.setScale(1);
      }
    );

    // =========================
    // CLICOU EM JOGAR
    // =========================

    jogarZone.on(
      'pointerdown',
      () => {
        console.log(
          '🎮 Jogar!'
        );

        this.scene.start(
          'CharacterSelectScene'
        );
      }
    );

    // ==================================================
    // BOTÃO SOBRE
    // ==================================================

    const sobreVisual =
      this.add.container(
        330,
        485
      );

    const sobreBackground =
      this.add.graphics();

    sobreBackground.fillStyle(
      0x7b4ab5,
      1
    );

    sobreBackground.fillRoundedRect(
      -100,
      -35,
      200,
      70,
      8
    );

    sobreBackground.lineStyle(
      3,
      0xffffff,
      1
    );

    sobreBackground.strokeRoundedRect(
      -100,
      -35,
      200,
      70,
      8
    );

    const sobreText =
      this.add.text(
        0,
        0,
        'SOBRE',
        {
          fontFamily: 'Pixelify',
          fontSize: 34,
          fontStyle: 'bold',
          color: '#ffffff',
        }
      ).setOrigin(0.5);

    sobreVisual.add([
      sobreBackground,
      sobreText,
    ]);

    // =========================
    // ÁREA REAL DO MOUSE
    // =========================

    const sobreZone =
      this.add.zone(
        330,
        485,
        200,
        70
      );

    sobreZone.setInteractive({
      useHandCursor: true,
    });

    // =========================
    // HOVER - SOBRE
    // =========================

    sobreZone.on(
      'pointerover',
      () => {
        sobreVisual.setScale(1.08);
      }
    );

    sobreZone.on(
      'pointerout',
      () => {
        sobreVisual.setScale(1);
      }
    );

    // =========================
    // CLICOU EM SOBRE
    // =========================

    sobreZone.on(
      'pointerdown',
      () => {
        console.log(
          'ℹ️ Sobre'
        );

        this.scene.start(
          'AboutScene'
        );
      }
    );
  }
}