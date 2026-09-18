import Phaser from "phaser";

const TOUCH_CONTROLS_STORAGE_KEY = "gataz_show_touch_controls";

export class SettingsScene extends Phaser.Scene {
  private showTouchControls = true;

  constructor() {
    super("SettingsScene");
  }

  init() {
    this.showTouchControls = sessionStorage.getItem(TOUCH_CONTROLS_STORAGE_KEY) !== "false";
  }

  create() {
    this.createBackground();
    this.createTitle();
    this.createTouchControlsOption();
    this.createBackButton();
  }

  private createBackground() {
    this.add.rectangle(640, 360, 1280, 720, 0x1b1630, 1);
  }

  private createTitle() {
    this.add
      .text(640, 150, "CONFIGURAÇÕES", {
        fontFamily: "Determination",
        fontSize: "48px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 5,
      })
      .setOrigin(0.5);
  }

  private createTouchControlsOption() {
    const switchX = 820;
    const switchY = 300;

    const switchWidth = 86;
    const switchHeight = 34;
    const switchRadius = switchHeight / 2;

    const knobRadius = 12;

    const onColor = 0x8066c7;
    const offColor = 0x302942;

    const label = this.add
      .text(400, switchY, "MOSTRAR CONTROLES TOUCH", {
        fontFamily: "Determination",
        fontSize: "26px",
        color: "#ffffff",
      })
      .setOrigin(0, 0.5)
      .setInteractive({
        useHandCursor: true,
      });

    const background = this.add.graphics();

    const switchKnob = this.add.circle(
      this.showTouchControls ? switchX + 25 : switchX - 25,
      switchY,
      knobRadius,
      0xffffff,
    );

    const animationState = {
      progress: this.showTouchControls ? 1 : 0,
    };

    const interpolateColor = (from: number, to: number, progress: number) => {
      const fromR = (from >> 16) & 0xff;
      const fromG = (from >> 8) & 0xff;
      const fromB = from & 0xff;
      const toR = (to >> 16) & 0xff;
      const toG = (to >> 8) & 0xff;
      const toB = to & 0xff;
      const r = Math.round(fromR + (toR - fromR) * progress);
      const g = Math.round(fromG + (toG - fromG) * progress);
      const b = Math.round(fromB + (toB - fromB) * progress);
      return (r << 16) | (g << 8) | b;
    };

    const drawSwitch = (progress: number) => {
      background.clear();

      const color = interpolateColor(offColor, onColor, progress);

      background.fillStyle(color, 1);

      background.fillRect(
        switchX - switchWidth / 2 + switchRadius,
        switchY - switchHeight / 2,
        switchWidth - switchHeight,
        switchHeight,
      );

      background.fillCircle(
        switchX - switchWidth / 2 + switchRadius,
        switchY,
        switchRadius,
      );

      background.fillCircle(
        switchX + switchWidth / 2 - switchRadius,
        switchY,
        switchRadius,
      );
    };

    drawSwitch(animationState.progress);

    const hitArea = this.add
      .rectangle(
        switchX,
        switchY,
        switchWidth + 20,
        switchHeight + 20,
        0xffffff,
        0,
      )
      .setInteractive({
        useHandCursor: true,
      });

    let isAnimating = false;

    const toggle = () => {
      if (isAnimating) {
        return;
      }

      isAnimating = true;

      this.showTouchControls = !this.showTouchControls;

      const targetProgress = this.showTouchControls ? 1 : 0;

      this.tweens.add({
        targets: animationState,
        progress: targetProgress,
        duration: 180,
        ease: Phaser.Math.Easing.Sine.InOut,

        onUpdate: () => {
          const progress = animationState.progress;

          drawSwitch(progress);

          const knobX = switchX - 25 + progress * 50;

          switchKnob.setX(knobX);
        },

        onComplete: () => {
          isAnimating = false;

          sessionStorage.setItem(
            TOUCH_CONTROLS_STORAGE_KEY,
            String(this.showTouchControls),
          );
        },
      });
    };

    hitArea.on("pointerdown", toggle);

    label.on("pointerdown", toggle);
  }

  private createBackButton() {
    const button = this.add
      .rectangle(640, 500, 330, 58, 0x3a315c, 1)
      .setInteractive({
        useHandCursor: true,
      });

    const text = this.add
      .text(640, 500, "VOLTAR", {
        fontFamily: "Determination",
        fontSize: "26px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    button.on("pointerover", () => {
      button.setFillStyle(0x514477, 1);
    });

    button.on("pointerout", () => {
      button.setFillStyle(0x3a315c, 1);
    });

    button.on("pointerdown", () => {
      this.goBack();
    });

    text.setInteractive({
      useHandCursor: true,
    });

    text.on("pointerdown", () => {
      this.goBack();
    });
  }

  private goBack() {
    this.scene.stop("SettingsScene");

    this.scene.resume("PauseScene");
  }
}
