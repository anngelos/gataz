import Phaser from 'phaser';

export class AboutScene extends Phaser.Scene {
  constructor() {
    super('AboutScene');
  }

  preload() {
    // =========================
    // FUNDO DO SOBRE
    // =========================

    this.load.image(
      'about-background',
      '/assets/menu/about-background.png'
    );
  }

  create() {
    // =========================
    // FUNDO
    // =========================

    const background = this.add.image(
      640,
      360,
      'about-background'
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
      640,
      100,
      'SOBRE',
      {
        fontFamily: 'Pixelify',
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
        fontFamily: 'Pixelify',
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
        fontFamily: 'Pixelify',
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
        fontFamily: 'Pixelify',
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
        fontFamily: 'Pixelify',
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
        fontFamily: 'Pixelify',
        fontSize: '20px',
        color: '#cccccc',
      }
    ).setOrigin(0.5);

    // ==================================================
    // BOTÃO VOLTAR
    // ==================================================

    const voltarVisual =
      this.add.container(
        640,
        650
      );

    // =========================
    // FUNDO DO BOTÃO
    // =========================

    const voltarBackground =
      this.add.graphics();

    voltarBackground.fillStyle(
      0x7b4ab5,
      1
    );

    voltarBackground.fillRoundedRect(
      -100,
      -28,
      200,
      56,
      8
    );

    // =========================
    // BORDA BRANCA
    // =========================

    voltarBackground.lineStyle(
      3,
      0xffffff,
      1
    );

    voltarBackground.strokeRoundedRect(
      -100,
      -28,
      200,
      56,
      8
    );

    // =========================
    // TEXTO
    // =========================

    const voltarText =
      this.add.text(
        0,
        0,
        'VOLTAR',
        {
          fontFamily: 'Pixelify',
          fontSize: 28,
          fontStyle: 'bold',
          color: '#ffffff',
        }
      ).setOrigin(0.5);

    voltarVisual.add([
      voltarBackground,
      voltarText,
    ]);

    // =========================
    // ÁREA REAL DO MOUSE
    // =========================

    const voltarZone =
      this.add.zone(
        640,
        650,
        200,
        56
      );

    voltarZone.setInteractive({
      useHandCursor: true,
    });

    // =========================
    // HOVER
    // =========================

    voltarZone.on(
      'pointerover',
      () => {
        voltarVisual.setScale(1.08);
      }
    );

    voltarZone.on(
      'pointerout',
      () => {
        voltarVisual.setScale(1);
      }
    );

    // =========================
    // CLICOU EM VOLTAR
    // =========================

    voltarZone.on(
      'pointerdown',
      () => {
        this.scene.start(
          'MenuScene'
        );
      }
    );
  }
}