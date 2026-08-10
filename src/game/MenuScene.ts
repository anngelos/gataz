import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    // =========================
    // FUNDO DO MENU
    // =========================

    this.load.image(
      'gataz-menu-background',
      '/assets/menu/gataz-menu-background.png'
    );
  }

  create() {
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
    // TÍTULO
    // =========================

    this.add.text(
      330,
      150,
      'GATAZ',
      {
        fontFamily: 'Arial',
        fontSize: '86px',
        fontStyle: 'bold',
        color: '#ffffff',
        stroke: '#333333',
        strokeThickness: 8,
      }
    ).setOrigin(0.5);

    // =========================
    // SUBTÍTULO
    // =========================

    this.add.text(
      330,
      245,
      'Uma aventura de duas gatitas',
      {
        fontFamily: 'Arial',
        fontSize: '25px',
        color: '#ffffff',
        stroke: '#333333',
        strokeThickness: 4,
      }
    ).setOrigin(0.5);

    // =========================
    // BOTÃO JOGAR
    // =========================

    const jogarButton = this.add.text(
      330,
      380,
      'JOGAR',
      {
        fontFamily: 'Arial',
        fontSize: '44px',
        fontStyle: 'bold',
        color: '#ffffff',
        backgroundColor: '#7b4ab5',
        padding: {
          left: 50,
          right: 50,
          top: 18,
          bottom: 18,
        },
      }
    ).setOrigin(0.5);

    jogarButton.setInteractive({
      useHandCursor: true,
    });

    // =========================
    // HOVER - JOGAR
    // =========================

    jogarButton.on(
      'pointerover',
      () => {
        jogarButton.setScale(1.08);
      }
    );

    jogarButton.on(
      'pointerout',
      () => {
        jogarButton.setScale(1);
      }
    );

    // =========================
    // CLICOU EM JOGAR
    // =========================

    jogarButton.on(
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

    // =========================
    // BOTÃO SOBRE
    // =========================

    const sobreButton = this.add.text(
      330,
      490,
      'SOBRE',
      {
        fontFamily: 'Arial',
        fontSize: '34px',
        fontStyle: 'bold',
        color: '#ffffff',
        backgroundColor: '#7b4ab5',
        padding: {
          left: 45,
          right: 45,
          top: 14,
          bottom: 14,
        },
      }
    ).setOrigin(0.5);

    sobreButton.setInteractive({
      useHandCursor: true,
    });

    // =========================
    // HOVER - SOBRE
    // =========================

    sobreButton.on(
      'pointerover',
      () => {
        sobreButton.setScale(1.08);
      }
    );

    sobreButton.on(
      'pointerout',
      () => {
        sobreButton.setScale(1);
      }
    );

    // =========================
    // CLICOU EM SOBRE
    // =========================

    sobreButton.on(
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