import Phaser from 'phaser';

export class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super('CharacterSelectScene');
  }

  preload() {
    // =========================
    // MADELINE - ROSTO
    // =========================

    this.load.image(
      'madeline-face',
      '/assets/characters/madeline/madeline-face.png'
    );
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
      100,
      'ESCOLHA SUA GATA',
      {
        fontFamily: 'Arial',
        fontSize: '56px',
        fontStyle: 'bold',
        color: '#ffffff',
        stroke: '#333333',
        strokeThickness: 6,
      }
    ).setOrigin(0.5);

    // =========================
    // MADELINE
    // =========================

    const madelineCard =
      this.add.rectangle(
        420,
        390,
        300,
        390,
        0xe58b35
      );

    madelineCard.setInteractive({
      useHandCursor: true,
    });

    // =========================
    // ROSTO DA MADELINE
    // =========================

    const madelineFace =
      this.add.image(
        420,
        350,
        'madeline-face'
      );

    madelineFace.setDisplaySize(
      220,
      220
    );

    // =========================
    // NOME
    // =========================

    const madelineName =
      this.add.text(
        420,
        535,
        'MADELINE',
        {
          fontFamily: 'Arial',
          fontSize: '36px',
          fontStyle: 'bold',
          color: '#ffffff',
          stroke: '#333333',
          strokeThickness: 5,
        }
      ).setOrigin(0.5);

    // =========================
    // HOVER
    // =========================

    madelineCard.on(
      'pointerover',
      () => {
        madelineCard.setScale(1.05);
        madelineFace.setScale(1.05);
        madelineName.setScale(1.05);
      }
    );

    madelineCard.on(
      'pointerout',
      () => {
        madelineCard.setScale(1);
        madelineFace.setScale(1);
        madelineName.setScale(1);
      }
    );

    // =========================
    // ESCOLHE MADELINE
    // =========================

    madelineCard.on(
      'pointerdown',
      () => {
        console.log(
          '🐈 Madeline escolhida!'
        );

        this.scene.start(
          'GameScene',
          {
            character: 'madeline',
          }
        );
      }
    );

    // =========================
    // MAKENA - TEMPORÁRIO
    // =========================

    this.add.text(
      860,
      390,
      'MAKENA\n\nEM BREVE',
      {
        fontFamily: 'Arial',
        fontSize: '38px',
        fontStyle: 'bold',
        color: '#ffffff',
        backgroundColor: '#8a6bbd',
        align: 'center',
        padding: {
          left: 50,
          right: 50,
          top: 50,
          bottom: 50,
        },
      }
    ).setOrigin(0.5);
  }
}