import Phaser from "phaser";
import { levels } from "./levels";
import { AudioManager } from "./AudioManager";

type Character = "madeline" | "makena";
type PlayerState = "idle" | "walk" | "jump" | "fall";

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private jumpKey!: Phaser.Input.Keyboard.Key;
  private playerState: PlayerState = "idle";
  private character: Character = "madeline";
  private level = 1;
  private maxHearts = 3;
  private hearts = 3;
  private heartSprites: Phaser.GameObjects.Sprite[] = [];
  private isInvulnerable = false;
  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private collectibles!: Phaser.Physics.Arcade.StaticGroup;
  private collectibleScore = 100;
  private levelCompleted = false;

  constructor() {
    super("GameScene");
  }

  init(data: { character?: Character; level?: number, score?: number }) {
    this.character = data.character ?? "madeline";
    this.level = data.level ?? 1;
    this.score = data.score ?? 0;
    console.log(`🐈 Personagem escolhido: ${this.character}`);
    console.log(`🗺️ Fase atual: ${this.level}`);
  }

  preload() {
    const levelConfig = levels[this.level];

    if (!levelConfig) {
      console.error(`❌ Fase ${this.level} não encontrada.`);

      return;
    }

    this.load.image(`level-background-${this.level}`, levelConfig.background);
    this.load.image(`level-platform-${this.level}`, levelConfig.platformTexture);
    this.load.image(`level-ground-${this.level}`, levelConfig.groundTexture);

    this.load.spritesheet("coin", "/assets/collectible/coin.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.spritesheet(
      "morciga-idle-sheet",
      "/assets/characters/morciga/morciga-idle.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      },
    );

    if (this.character === "madeline") {
      this.load.spritesheet(
        "madeline-idle-sheet",
        "/assets/characters/madeline/madeline-idle.png",
        {
          frameWidth: 48,
          frameHeight: 48,
        },
      );

      this.load.spritesheet(
        "madeline-run-sheet",
        "/assets/characters/madeline/madeline-run.png",
        {
          frameWidth: 48,
          frameHeight: 48,
        },
      );

      this.load.spritesheet(
        "madeline-jump-sheet",
        "/assets/characters/madeline/madeline-jump.png",
        {
          frameWidth: 48,
          frameHeight: 48,
        },
      );
    }

    if (this.character === "makena") {
      this.load.spritesheet(
        "makena-idle-sheet",
        "/assets/characters/makena/makena-idle.png",
        {
          frameWidth: 48,
          frameHeight: 48,
        },
      );

      this.load.spritesheet(
        "makena-run-sheet",
        "/assets/characters/makena/makena-run.png",
        {
          frameWidth: 48,
          frameHeight: 48,
        },
      );

      this.load.spritesheet(
        "makena-jump-sheet",
        "/assets/characters/makena/makena-jump.png",
        {
          frameWidth: 48,
          frameHeight: 48,
        },
      );
    }

    const enemyTypes = [
      ...new Set(levelConfig.enemies.map((enemy) => enemy.type)),
    ];
    
    enemyTypes.forEach((type) => {
      switch (type) {
        case "esporotricose":
          this.load.spritesheet(
            "enemy-esporotricose-idle-sheet",
            "/assets/characters/enemies/esporotricose/esporotricose-idle.png",
            {
              frameWidth: 48,
              frameHeight: 48,
            },
          );
          break;
    
        case "rato":
          this.load.spritesheet(
            "enemy-rato-idle-sheet",
            "/assets/characters/enemies/rat/rat-idle.png",
            {
              frameWidth: 48,
              frameHeight: 48,
            },
          );
          break;
    
        default:
          console.warn(
            `⚠️ Tipo de inimigo desconhecido: ${type}`,
          );
      }
    });

    this.load.spritesheet("hearts-sheet", "/assets/ui/hearts.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  create() {
    AudioManager.stopMusic();

    const levelConfig = levels[this.level];

    if (!levelConfig) {
      console.error(`❌ Fase ${this.level} não encontrada.`);

      return;
    }

    this.hearts = this.maxHearts;
    this.isInvulnerable = false;
    this.levelCompleted = false;
    this.createPlayerAnimations();

    const enemyTypes = [
      ...new Set(levelConfig.enemies.map((enemy) => enemy.type)),
    ];
    
    enemyTypes.forEach((type) => {
      switch (type) {
        case "esporotricose":
          this.anims.create({
            key: "enemy-esporotricose-idle",
            frames: this.anims.generateFrameNumbers(
              "enemy-esporotricose-idle-sheet",
              {
                start: 0,
                end: 3,
              },
            ),
            frameRate: 4,
            repeat: -1,
          });
          break;
    
        case "rato":
          this.anims.create({
            key: "enemy-rato-idle",
            frames: this.anims.generateFrameNumbers(
              "enemy-rato-idle-sheet",
              {
                start: 0,
                end: 3,
              },
            ),
            frameRate: 2,
            repeat: -1,
          });
          break;
      }
    });

    this.anims.create({
      key: "coin-idle",

      frames: this.anims.generateFrameNumbers("coin", {
        start: 0,
        end: 5,
      }),

      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "morciga-idle",

      frames: this.anims.generateFrameNumbers("morciga-idle-sheet", {
        start: 0,
        end: 3,
      }),

      frameRate: 8,
      repeat: -1,
    });

    const background = this.add.image(
      levelConfig.width / 2,
      360,
      `level-background-${this.level}`,
    );

    background.setDisplaySize(levelConfig.width, 720);
    background.setDepth(-100);

    this.physics.world.setBounds(0, 0, levelConfig.width, 900);
    this.cameras.main.setBounds(0, 0, levelConfig.width, 720);

    const ground = this.physics.add.staticGroup();

    levelConfig.ground.forEach((groundConfig) => {
      this.createGround(
        groundConfig.x,
        groundConfig.y,
        groundConfig.width,
        groundConfig.height,
        ground,
      );
    });

    const platforms = this.physics.add.staticGroup();

    levelConfig.platforms.forEach((platform) => {
      this.createPlatform(
        platform.x,
        platform.y,
        platform.width,
        platform.height,
        platforms,
      );
    });

    const enemies = this.physics.add.staticGroup();

    levelConfig.enemies.forEach((enemyConfig) => {
      this.createEnemy(enemyConfig.type, enemyConfig.x, enemyConfig.y, enemies);
    });

    this.collectibles = this.physics.add.staticGroup();

    const collectibles =
      (
        levelConfig as typeof levelConfig & {
          collectibles?: {
            type: string;
            x: number;
            y: number;
          }[];
        }
      ).collectibles ?? [];

    collectibles.forEach((collectible) => {
      this.createCollectible(collectible.type, collectible.x, collectible.y);
    });

    let finish: Phaser.Physics.Arcade.Sprite | null = null;

    if (levelConfig.finish.type === "morciga") {
      finish = this.physics.add.sprite(
        levelConfig.finish.x,
        levelConfig.finish.y,
        "morciga-idle-sheet",
        0,
      );

      finish.play("morciga-idle");

      const finishBody = finish.body as Phaser.Physics.Arcade.Body;

      finishBody.setAllowGravity(false);
      finish.setFlipX(true);
      finish.setDepth(1);
    }

    const playerTexture =
      this.character === "madeline"
        ? "madeline-idle-sheet"
        : "makena-idle-sheet";

    this.player = this.physics.add.sprite(
      levelConfig.playerStart.x,
      levelConfig.playerStart.y,
      playerTexture,
      0,
    );

    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;

    playerBody.setSize(32, 30);
    playerBody.setOffset(8, 8);
    this.player.play(this.getIdleAnimation());
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, ground);
    this.physics.add.collider(this.player, platforms);
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.jumpKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
    this.createHearts();
    this.createScore();

    this.physics.add.overlap(
      this.player,
      enemies,
      (_playerObject: any, enemyObject: any) => {
        const enemy = enemyObject.gameObject ?? enemyObject;

        this.handleEnemyCollision(enemy);
      },
      undefined,
      this,
    );

    this.physics.add.overlap(
      this.player,
      this.collectibles,
      (_playerObject: any, collectibleObject: any) => {
        const collectible = collectibleObject.gameObject ?? collectibleObject;
        this.collectCollectible(collectible);
      },
      undefined,
      this,
    );

    if (finish) {
      this.physics.add.overlap(
        this.player,
        finish,
        () => {
          this.levelComplete();
        },
        undefined,
        this,
      );
    }

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
  }

  private createGround(
    x: number,
    y: number,
    width: number,
    height: number,
    ground: Phaser.Physics.Arcade.StaticGroup,
  ) {
    const physicsGround = ground.create(
      x,
      y,
      `level-ground-${this.level}`,
    ) as Phaser.Physics.Arcade.Sprite;

    physicsGround.setVisible(false);
    const body = physicsGround.body as Phaser.Physics.Arcade.StaticBody;
    body.setSize(width, height, true);

    const groundVisual = this.add.tileSprite(
      x,
      y,
      width,
      height,
      `level-ground-${this.level}`,
    );

    groundVisual.setTileScale(1, height / 80);
    groundVisual.setDepth(0);
  }

  private createPlatform(
    x: number,
    y: number,
    width: number,
    height: number,
    platforms: Phaser.Physics.Arcade.StaticGroup,
  ) {
    const physicsPlatform = platforms.create(
      x,
      y,
      `level-platform-${this.level}`,
    ) as Phaser.Physics.Arcade.Sprite;

    physicsPlatform.setVisible(false);
    
    const body = physicsPlatform.body as Phaser.Physics.Arcade.StaticBody;
    
    body.setSize(width, height, true);
    
    const platformVisual = this.add.tileSprite(
      x,
      y,
      width,
      height,
      `level-platform-${this.level}`,
    );

    platformVisual.setTileScale(1, height / 48);
    platformVisual.setDepth(0);
  }

  private getConnectedGamepad(): globalThis.Gamepad | undefined {
    if (!navigator.getGamepads) {
      return undefined;
    }

    return Array.from(navigator.getGamepads()).find(
      (gamepad): gamepad is globalThis.Gamepad => gamepad !== null,
    );
  }

  private createEnemy(
    type: string,
    x: number,
    y: number,
    enemies: Phaser.Physics.Arcade.StaticGroup,
  ) {
    switch (type) {
      case "esporotricose": {
        const enemy = enemies.create(
          x,
          y,
          "enemy-esporotricose-idle-sheet",
          0,
        ) as Phaser.Physics.Arcade.Sprite;
  
        enemy.play("enemy-esporotricose-idle");
  
        return enemy;
      }
  
      case "rato": {
        const enemy = enemies.create(
          x,
          y,
          "enemy-rato-idle-sheet",
          0,
        ) as Phaser.Physics.Arcade.Sprite;
  
        enemy.play("enemy-rato-idle");
        enemy.setFlipX(true);
  
        return enemy;
      }
  
      default:
        console.warn(
          `⚠️ Tipo de inimigo desconhecido: ${type}`,
        );
  
        return null;
    }
  }

  private createCollectible(
    type: string,
    x: number,
    y: number,
  ) {
    switch (type) {
      case "coin": {
        const coin = this.collectibles.create(
          x,
          y,
          "coin",
          0,
        ) as Phaser.Physics.Arcade.Sprite;

        coin.play("coin-idle");
        coin.setDepth(1);
        return coin;
      }

      default:
        console.warn(`⚠️ Tipo de coletável desconhecido: ${type}`);
        return null;
    }
  }

  private collectCollectible(collectible: Phaser.Physics.Arcade.Sprite) {
    if (!collectible.active) {
      return;
    }

    collectible.destroy();
    this.addScore(this.collectibleScore);
    console.log(`🪙 Moeda coletada! +${this.collectibleScore} pontos.`);
  }

  private createScore() {
    this.scoreText = this.add.text(1080, 10, `PONTOS: ${this.score}`, {
      fontSize: "24px",
      fontFamily: "Determination",
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
      letterSpacing: 1,

      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: "#000000",
        blur: 0,
        stroke: true,
        fill: true,
      },
    });

    this.scoreText.setScrollFactor(0);
    this.scoreText.setDepth(1000);
  }

  private addScore(points: number) {
    this.score += points;
    this.scoreText.setText(`PONTOS: ${this.score}`);
  }

  private levelComplete() {
    if (this.levelCompleted) {
      return;
    }

    this.levelCompleted = true;
    console.log(`🎉 Fase ${this.level} concluída!`);
    this.player.setVelocity(0, 0);
    this.player.setActive(false);

    this.scene.start("LevelCompleteScene", {
      level: this.level,
      score: this.score,
      character: this.character,
    });
  }

  update() {
    if (this.levelCompleted) {
      return;
    }

    if (this.player.y > 780) {
      console.log("🕳️ A gata caiu no buraco!");
      this.playerDeath();
      return;
    }

    const speed = 250;
    const phaserGamepad = this.input.gamepad?.getAll()[0];
    const nativeGamepad = this.getConnectedGamepad();
    const leftButton = Phaser.Input.Gamepad.Configs.XBOX_360.LEFT;
    const rightButton = Phaser.Input.Gamepad.Configs.XBOX_360.RIGHT;
    const actionButton = Phaser.Input.Gamepad.Configs.XBOX_360.A;
    const isGamepadButtonDown = (buttonIndex: number) =>
      Boolean(
        phaserGamepad?.buttons[buttonIndex]?.pressed ||
          nativeGamepad?.buttons[buttonIndex]?.pressed ||
          (nativeGamepad?.buttons[buttonIndex]?.value ?? 0) > 0.5,
      );

    if (this.cursors.left.isDown || isGamepadButtonDown(leftButton)) {
      this.player.setVelocityX(-speed);

      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown || isGamepadButtonDown(rightButton)) {
      this.player.setVelocityX(speed);

      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }

    if (
      (this.jumpKey.isDown || isGamepadButtonDown(actionButton)) &&
      this.player.body!.blocked.down
    ) {
      this.player.setVelocityY(-550);
    }

    this.updatePlayerState();
    this.updatePlayerAnimation();
  }

  private createPlayerAnimations() {

    if (this.character === "madeline") {
      this.anims.create({
        key: "madeline-idle",

        frames: this.anims.generateFrameNumbers("madeline-idle-sheet", {
          start: 0,
          end: 3,
        }),

        frameRate: 4,
        repeat: -1,
      });

      this.anims.create({
        key: "madeline-run",

        frames: this.anims.generateFrameNumbers("madeline-run-sheet", {
          start: 0,
          end: 3,
        }),

        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "madeline-jump",

        frames: this.anims.generateFrameNumbers("madeline-jump-sheet", {
          start: 0,
          end: 3,
        }),

        frameRate: 8,
        repeat: 0,
      });

      return;
    }

    this.anims.create({
      key: "makena-idle",

      frames: this.anims.generateFrameNumbers("makena-idle-sheet", {
        start: 0,
        end: 3,
      }),

      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "makena-run",

      frames: this.anims.generateFrameNumbers("makena-run-sheet", {
        start: 0,
        end: 3,
      }),

      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "makena-jump",

      frames: this.anims.generateFrameNumbers("makena-jump-sheet", {
        start: 0,
        end: 3,
      }),

      frameRate: 8,
      repeat: 0,
    });
  }

  private getIdleAnimation() {
    return this.character === "madeline" ? "madeline-idle" : "makena-idle";
  }

  private getRunAnimation() {
    return this.character === "madeline" ? "madeline-run" : "makena-run";
  }

  private getJumpAnimation() {
    return this.character === "madeline" ? "madeline-jump" : "makena-jump";
  }

  private createHearts() {
    this.heartSprites = [];

    for (let i = 0; i < this.maxHearts; i++) {
      const heart = this.add.sprite(28 + i * 48, 28, "hearts-sheet", 0);
      heart.setScrollFactor(0);
      heart.setDepth(1000);
      this.heartSprites.push(heart);
    }

    this.updateHeartsDisplay();
  }

  private updateHeartsDisplay() {
    for (let i = 0; i < this.heartSprites.length; i++) {
      if (i < this.hearts) {
        this.heartSprites[i].setFrame(0);
      } else {
        this.heartSprites[i].setFrame(1);
      }
    }
  }

  private handleEnemyCollision(enemy: Phaser.Physics.Arcade.Sprite) {
    if (!enemy.active) {
      return;
    }

    if (this.isInvulnerable) {
      return;
    }

    const body = this.player.body as Phaser.Physics.Arcade.Body;

    if (body.velocity.y > 0 && this.player.y < enemy.y) {
      enemy.destroy();
      this.addScore(10);
      this.player.setVelocityY(-350);
      console.log("💥 Esporotricose derrotada! +10 pontos.");
      return;
    }

    this.takeDamage(enemy);
  }

  private takeDamage(enemy: Phaser.Physics.Arcade.Sprite) {
    if (this.isInvulnerable) {
      return;
    }

    this.hearts--;
    this.updateHeartsDisplay();

    console.log(
      `💔 ${this.character} perdeu um coração! Restam ${this.hearts}.`,
    );

    if (this.hearts <= 0) {
      this.playerDeath();

      return;
    }

    this.isInvulnerable = true;

    if (this.player.x < enemy.x) {
      this.player.setVelocityX(-300);
    } else {
      this.player.setVelocityX(300);
    }

    this.player.setVelocityY(-200);

    this.tweens.add({
      targets: this.player,
      alpha: 0.25,
      duration: 100,
      yoyo: true,
      repeat: 5,
    });

    this.time.delayedCall(1000, () => {
      this.isInvulnerable = false;

      this.player.setAlpha(1);
    });
  }

  private playerDeath() {
    console.log(`💀 ${this.character} morreu!`);

    this.player.setVelocity(0, 0);
    this.player.setTint(0xff0000);

    this.time.delayedCall(500, () => {
      this.scene.restart({
        character: this.character,

        level: this.level,
      });
    });
  }

  private updatePlayerState() {
    const body = this.player.body as Phaser.Physics.Arcade.Body;

    if (!body.blocked.down) {
      if (body.velocity.y < 0) {
        this.playerState = "jump";
      } else {
        this.playerState = "fall";
      }

      return;
    }

    if (body.velocity.x !== 0) {
      this.playerState = "walk";

      return;
    }

    this.playerState = "idle";
  }

  private updatePlayerAnimation() {
    switch (this.playerState) {
      case "walk":
        this.playAnimation(this.getRunAnimation());

        break;

      case "idle":
        this.playAnimation(this.getIdleAnimation());

        break;

      case "jump":
        this.playAnimation(this.getJumpAnimation());

        break;

      case "fall":
        this.playAnimation(this.getJumpAnimation());

        break;
    }
  }

  private playAnimation(animationKey: string) {
    if (this.player.anims.currentAnim?.key !== animationKey) {
      this.player.play(animationKey);
    }
  }
}
