import Phaser from "phaser";

export class AudioManager {
  private static music:
    | Phaser.Sound.WebAudioSound
    | Phaser.Sound.HTML5AudioSound
    | null = null;

  static playMenuMusic(scene: Phaser.Scene) {
    if (this.music && this.music.isPlaying) {
      return;
    }

    this.music = scene.sound.add("gataz-menu", {
      loop: true,
      volume: 0.1,
    }) as Phaser.Sound.WebAudioSound;

    this.music.play();
  }

  static stopMusic() {
    if (!this.music) {
      return;
    }

    this.music.stop();
    this.music.destroy();
    this.music = null;
  }

  static setVolume(volume: number) {
    if (!this.music) {
      return;
    }

    this.music.volume = volume;
  }
}
