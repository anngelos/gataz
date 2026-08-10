import Phaser from 'phaser';

export class AboutScene extends Phaser.Scene {
  constructor() {
    super('AboutScene');
  }

  create() {
    // =========================
    // FUNDO
    // =========================

    this.cameras.main.setBackgroundColor(
      '#1b1630'
    );

    // =========================
    // TÍTULO
    // =========================

    this.add.text(
      640,
      100,
      'SOBRE',
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
    // NOME DO JOGO
    // =========================

    this.add.text(
      640,
      190,
      'GATAZ',
      {
        fontFamily: 'Arial',
        fontSize: '42px',
        fontStyle: 'bold',
        color: '#ffb347',
      }
    ).setOrigin(0.5);

    // =========================
    // DESCRIÇÃO
    // =========================

    this.add.text(
      640,
      290,
      'Explore as fases, pule obstáculos,\n' +
      'enfrente os inimigos (principalmente a Esporotricose) e ajude\n' +
      'nossas heroínas a chegar até o final!',
      {
        fontFamily: 'Arial',
        fontSize: '26px',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 10,
      }
    ).setOrigin(0.5);

    // =========================
    // FRASE
    // =========================

    this.add.text(
      640,
      425,
      'Gataz é um jogo simples, divertido\n' +
      'e feito para brincar, descobrir\n' +
      'e se aventurar.',
      {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 8,
      }
    ).setOrigin(0.5);

    // =========================
    // BOA AVENTURA
    // =========================

    this.add.text(
      640,
      520,
      'Boa aventura! ❤️',
      {
        fontFamily: 'Arial',
        fontSize: '30px',
        fontStyle: 'bold',
        color: '#ffffff',
      }
    ).setOrigin(0.5);

    // =========================
    // CRÉDITO
    // =========================

    this.add.text(
      640,
      570,
      '@malasart3',
      {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#cccccc',
      }
    ).setOrigin(0.5);

    // =========================
    // BOTÃO VOLTAR
    // =========================

    const voltarButton =
      this.add.text(
        640,
        650,
        'VOLTAR',
        {
          fontFamily: 'Arial',
          fontSize: '30px',
          fontStyle: 'bold',
          color: '#ffffff',
          backgroundColor: '#7b4ab5',
          padding: {
            left: 40,
            right: 40,
            top: 12,
            bottom: 12,
          },
        }
      ).setOrigin(0.5);

    voltarButton.setInteractive({
      useHandCursor: true,
    });

    // =========================
    // HOVER
    // =========================

    voltarButton.on(
      'pointerover',
      () => {
        voltarButton.setScale(1.08);
      }
    );

    voltarButton.on(
      'pointerout',
      () => {
        voltarButton.setScale(1);
      }
    );

    // =========================
    // VOLTAR AO MENU
    // =========================

    voltarButton.on(
      'pointerdown',
      () => {
        this.scene.start('MenuScene');
      }
    );
  }
}