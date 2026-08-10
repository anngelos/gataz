import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    // =========================
    // FUNDO
    // =========================

    this.cameras.main.setBackgroundColor(
      '#87CEEB'
    );

    // =========================
    // TÍTULO
    // =========================

    this.add.text(
      640,
      180,
      'GATAZ',
      {
        fontFamily: 'Arial',
        fontSize: '96px',
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
      640,
      290,
      'Uma aventura de duas gatitas',
      {
        fontFamily: 'Arial',
        fontSize: '28px',
        color: '#ffffff',
        stroke: '#333333',
        strokeThickness: 4,
      }
    ).setOrigin(0.5);

    // =========================
    // BOTÃO JOGAR
    // =========================

    const button = this.add.text(
      640,
      430,
      'JOGAR',
      {
        fontFamily: 'Arial',
        fontSize: '48px',
        fontStyle: 'bold',
        color: '#ffffff',
        backgroundColor: '#7b4ab5',
        padding: {
          left: 50,
          right: 50,
          top: 20,
          bottom: 20,
        },
      }
    ).setOrigin(0.5);

    // Torna clicável
    button.setInteractive({
      useHandCursor: true,
    });

    // =========================
    // MOUSE SOBRE O BOTÃO
    // =========================

    button.on(
      'pointerover',
      () => {
        button.setScale(1.08);
      }
    );

    button.on(
      'pointerout',
      () => {
        button.setScale(1);
      }
    );

    // =========================
    // CLICOU EM JOGAR
    // =========================

    button.on(
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
  }
}