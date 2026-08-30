import Phaser from "phaser";

export class AudioManager {
  private static music:
  | Phaser.Sound.WebAudioSound
  | Phaser.Sound.HTML5AudioSound
  | null = null;

  // ==================================================
  // MÚSICA DO MENU
  // ==================================================

  static playMenuMusic(scene: Phaser.Scene) {
    // Se a música já estiver tocando,
    // não cria outra por cima.
    if (
      this.music &&
      this.music.isPlaying
    ) {
      return;
    }

    this.music = scene.sound.add("gataz-menu", {
      loop: true,
      volume: 0.5,
    }) as Phaser.Sound.WebAudioSound;

    this.music.play();
  }

  // ==================================================
  // PARAR MÚSICA
  // ==================================================

  static stopMusic() {
    if (!this.music) {
      return;
    }

    this.music.stop();

    this.music.destroy();

    this.music = null;
  }

  // ==================================================
  // VOLUME
  // ==================================================

  static setVolume(
    volume: number
  ) {
    if (!this.music) {
      return;
    }

    this.music.volume = volume;
  }
}