import Phaser from 'phaser';
import { AudioManager } from './AudioManager';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {

    this.load.text(
      'pixelify-font',
      '/fonts/Pixelify.ttf'
    );

    this.load.audio(
      "gataz-menu",
      "/assets/audio/gataz-menu.mp3"
    );

    this.load.image(
      'gataz-menu-background',
      '/assets/menu/gataz-menu-background.png'
    );

    this.load.image(
      'gataz-logo',
      '/assets/menu/gataz-logo.png'
    );
  }

  async create() {

    AudioManager.playMenuMusic(this);

    await document.fonts.load(
      '400 25px "Pixelify"'
    );

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

    const logo = this.add.image(
      330,
      150,
      'gataz-logo'
    );

    logo.setDisplaySize(
      430,
      185
    );

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

    const aboutVisual =
      this.add.container(
        330,
        485
      );

    const aboutBackground =
      this.add.graphics();

    aboutBackground.fillStyle(
      0x7b4ab5,
      1
    );

    aboutBackground.fillRoundedRect(
      -100,
      -35,
      200,
      70,
      8
    );

    aboutBackground.lineStyle(
      3,
      0xffffff,
      1
    );

    aboutBackground.strokeRoundedRect(
      -100,
      -35,
      200,
      70,
      8
    );

    const aboutText =
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

    aboutVisual.add([
      aboutBackground,
      aboutText,
    ]);

    const aboutZone =
      this.add.zone(
        330,
        485,
        200,
        70
      );

    aboutZone.setInteractive({
      useHandCursor: true,
    });

    aboutZone.on(
      'pointerover',
      () => {
        aboutVisual.setScale(1.08);
      }
    );

    aboutZone.on(
      'pointerout',
      () => {
        aboutVisual.setScale(1);
      }
    );

    aboutZone.on(
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