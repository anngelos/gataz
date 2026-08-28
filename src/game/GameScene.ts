import Phaser from "phaser";
import { levels } from "./levels";

type Character =
  | "madeline"
  | "makena";

type PlayerState =
  | "idle"
  | "walk"
  | "jump"
  | "fall";

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private playerState: PlayerState = "idle";

  private character: Character = "madeline";

  private level = 1;

  // ==================================================
  // VIDA
  // ==================================================

  private maxHearts = 3;

  private hearts = 3;

  private heartSprites: Phaser.GameObjects.Sprite[] = [];

  private isInvulnerable = false;

  constructor() {
    super("GameScene");
  }

  // ==================================================
  // DADOS RECEBIDOS
  // ==================================================

  init(data: {
    character?: Character;
    level?: number;
  }) {
    this.character =
      data.character ?? "madeline";

    this.level =
      data.level ?? 1;

    console.log(
      `🐈 Personagem escolhido: ${this.character}`
    );

    console.log(
      `🗺️ Fase atual: ${this.level}`
    );
  }

  // ==================================================
  // CARREGAMENTO
  // ==================================================

  preload() {
    // ==================================================
    // CONFIGURAÇÃO DA FASE
    // ==================================================

    const levelConfig =
      levels[this.level];

    if (!levelConfig) {
      console.error(
        `❌ Fase ${this.level} não encontrada.`
      );

      return;
    }

    // ==================================================
    // BACKGROUND
    // ==================================================

    this.load.image(
      "level-background",
      levelConfig.background
    );

    // ==================================================
    // PLATAFORMA
    // ==================================================

    this.load.image(
      "level-platform",
      levelConfig.platformTexture
    );

    // ==================================================
    // CHÃO
    // ==================================================

    this.load.image(
      "level-ground",
      "/assets/levels/level-1/level-1-ground.png"
    );

    // ==================================================
    // MADELINE
    // ==================================================

    if (
      this.character === "madeline"
    ) {
      this.load.spritesheet(
        "madeline-idle-sheet",
        "/assets/characters/madeline/madeline-idle.png",
        {
          frameWidth: 48,
          frameHeight: 48,
        }
      );

      this.load.spritesheet(
        "madeline-run-sheet",
        "/assets/characters/madeline/madeline-run.png",
        {
          frameWidth: 48,
          frameHeight: 48,
        }
      );

      this.load.spritesheet(
        "madeline-jump-sheet",
        "/assets/characters/madeline/madeline-jump.png",
        {
          frameWidth: 48,
          frameHeight: 48,
        }
      );
    }

    // ==================================================
    // MAKENA
    // ==================================================

    if (
      this.character === "makena"
    ) {
      this.load.spritesheet(
        "makena-idle-sheet",
        "/assets/characters/makena/makena-idle.png",
        {
          frameWidth: 48,
          frameHeight: 48,
        }
      );
    }

    // ==================================================
    // ESPOROTRICOSE
    // ==================================================

    this.load.spritesheet(
      "esporotricose-idle-sheet",
      "/assets/characters/enemies/esporotricose/esporotricose-idle.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );

    // ==================================================
    // CORAÇÕES
    // ==================================================

    this.load.spritesheet(
      "hearts-sheet",
      "/assets/ui/hearts.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );
  }

  // ==================================================
  // CREATE
  // ==================================================

  create() {
    // ==================================================
    // CONFIGURAÇÃO DA FASE
    // ==================================================

    const levelConfig =
      levels[this.level];

    if (!levelConfig) {
      console.error(
        `❌ Fase ${this.level} não encontrada.`
      );

      return;
    }

    // ==================================================
    // RESET DA VIDA
    // ==================================================

    this.hearts =
      this.maxHearts;

    this.isInvulnerable =
      false;

    // ==================================================
    // ANIMAÇÕES DO PERSONAGEM
    // ==================================================

    this.createPlayerAnimations();

    // ==================================================
    // ANIMAÇÃO ESPOROTRICOSE
    // ==================================================

    this.anims.create({
      key: "esporotricose-idle",

      frames:
        this.anims.generateFrameNumbers(
          "esporotricose-idle-sheet",
          {
            start: 0,
            end: 3,
          }
        ),

      frameRate: 4,

      repeat: -1,
    });

    // ==================================================
    // BACKGROUND
    // ==================================================

    const background =
      this.add.image(
        levelConfig.width / 2,
        360,
        "level-background"
      );

    background.setDisplaySize(
      levelConfig.width,
      720
    );

    background.setDepth(-100);

    // ==================================================
    // MUNDO FÍSICO
    // ==================================================

    this.physics.world.setBounds(
      0,
      0,
      levelConfig.width,
      900
    );

    // ==================================================
    // CÂMERA
    // ==================================================

    this.cameras.main.setBounds(
      0,
      0,
      levelConfig.width,
      720
    );

    // ==================================================
    // CHÃO
    // ==================================================

    const ground =
      this.physics.add.staticGroup();

    levelConfig.ground.forEach(
      (groundConfig) => {
        this.createGround(
          groundConfig.x,
          groundConfig.y,
          groundConfig.width,
          groundConfig.height,
          ground
        );
      }
    );

    // ==================================================
    // PLATAFORMAS
    // ==================================================

    const platforms =
      this.physics.add.staticGroup();

    levelConfig.platforms.forEach(
      (platform) => {
        this.createPlatform(
          platform.x,
          platform.y,
          platform.width,
          platform.height,
          platforms
        );
      }
    );

    // ==================================================
    // INIMIGOS
    // ==================================================

    const enemies =
      this.physics.add.staticGroup();

    levelConfig.enemies.forEach(
      (enemyConfig) => {
        this.createEnemy(
          enemyConfig.type,
          enemyConfig.x,
          enemyConfig.y,
          enemies
        );
      }
    );

    // ==================================================
    // TEXTURA DO PERSONAGEM
    // ==================================================

    const playerTexture =
      this.character === "madeline"
        ? "madeline-idle-sheet"
        : "makena-idle-sheet";

    // ==================================================
    // PERSONAGEM
    // ==================================================

    this.player =
      this.physics.add.sprite(
        levelConfig.playerStart.x,
        levelConfig.playerStart.y,
        playerTexture,
        0
      );

    // ==================================================
    // CORPO FÍSICO DO PERSONAGEM
    // ==================================================

    const playerBody =
      this.player.body as Phaser.Physics.Arcade.Body;

    playerBody.setSize(
      32,
      30
    );

    playerBody.setOffset(
      8,
      8
    );

    // ==================================================
    // ANIMAÇÃO INICIAL
    // ==================================================

    this.player.play(
      this.getIdleAnimation()
    );

    // ==================================================
    // FÍSICA DO PERSONAGEM
    // ==================================================

    this.player.setCollideWorldBounds(
      true
    );

    // ==================================================
    // COLISÃO COM CHÃO
    // ==================================================

    this.physics.add.collider(
      this.player,
      ground
    );

    // ==================================================
    // COLISÃO COM PLATAFORMAS
    // ==================================================

    this.physics.add.collider(
      this.player,
      platforms
    );

    // ==================================================
    // CONTROLES
    // ==================================================

    this.cursors =
      this.input.keyboard!.createCursorKeys();

    // ==================================================
    // HUD
    // ==================================================

    this.createHearts();

    // ==================================================
    // COLISÃO COM INIMIGO
    // ==================================================

    this.physics.add.overlap(
      this.player,
      enemies,

      (
        _playerObject: any,
        enemyObject: any
      ) => {
        const enemy =
          enemyObject.gameObject ??
          enemyObject;

        this.handleEnemyCollision(
          enemy
        );
      },

      undefined,

      this
    );

    // ==================================================
    // CÂMERA SEGUINDO PLAYER
    // ==================================================

    this.cameras.main.startFollow(
      this.player,
      true,
      0.08,
      0.08
    );
  }

  // ==================================================
  // CRIA CHÃO
  // ==================================================

  private createGround(
    x: number,
    y: number,
    width: number,
    height: number,
    ground: Phaser.Physics.Arcade.StaticGroup
  ) {
    // ==================================================
    // CORPO FÍSICO
    // ==================================================

    const physicsGround =
      ground.create(
        x,
        y,
        "level-ground"
      ) as Phaser.Physics.Arcade.Sprite;

    physicsGround.setVisible(
      false
    );

    // ==================================================
    // CORPO ESTÁTICO
    // ==================================================

    const body =
      physicsGround.body as Phaser.Physics.Arcade.StaticBody;

    body.setSize(
      width,
      height,
      true
    );

    // ==================================================
    // VISUAL
    // ==================================================

    const groundVisual =
      this.add.tileSprite(
        x,
        y,
        width,
        height,
        "level-ground"
      );

    // ==================================================
    // ESCALA
    // ==================================================

    groundVisual.setTileScale(
      1,
      height / 80
    );

    // ==================================================
    // PROFUNDIDADE
    // ==================================================

    groundVisual.setDepth(0);
  }

  // ==================================================
  // CRIA PLATAFORMA
  // ==================================================

  private createPlatform(
    x: number,
    y: number,
    width: number,
    height: number,
    platforms: Phaser.Physics.Arcade.StaticGroup
  ) {
    // ==================================================
    // CORPO FÍSICO
    // ==================================================

    const physicsPlatform =
      platforms.create(
        x,
        y,
        "level-platform"
      ) as Phaser.Physics.Arcade.Sprite;

    // ==================================================
    // ESCONDE OBJETO FÍSICO
    // ==================================================

    physicsPlatform.setVisible(
      false
    );

    // ==================================================
    // CORPO ESTÁTICO
    // ==================================================

    const body =
      physicsPlatform.body as Phaser.Physics.Arcade.StaticBody;

    body.setSize(
      width,
      height,
      true
    );

    // ==================================================
    // VISUAL
    // ==================================================

    const platformVisual =
      this.add.tileSprite(
        x,
        y,
        width,
        height,
        "level-platform"
      );

    // ==================================================
    // ESCALA
    // ==================================================

    platformVisual.setTileScale(
      1,
      height / 48
    );

    // ==================================================
    // PROFUNDIDADE
    // ==================================================

    platformVisual.setDepth(0);
  }

  // ==================================================
  // CRIA INIMIGO
  // ==================================================

  private createEnemy(
    type: string,
    x: number,
    y: number,
    enemies: Phaser.Physics.Arcade.StaticGroup
  ) {
    switch (type) {
      // ==================================================
      // ESPOROTRICOSE
      // ==================================================

      case "esporotricose": {
        const enemy =
          enemies.create(
            x,
            y,
            "esporotricose-idle-sheet",
            0
          ) as Phaser.Physics.Arcade.Sprite;

        enemy.play(
          "esporotricose-idle"
        );

        return enemy;
      }

      // ==================================================
      // DESCONHECIDO
      // ==================================================

      default:
        console.warn(
          `⚠️ Tipo de inimigo desconhecido: ${type}`
        );

        return null;
    }
  }

  // ==================================================
  // UPDATE
  // ==================================================

  update() {
    // ==================================================
    // QUEDA NO BURACO
    // ==================================================

    if (
      this.player.y > 780
    ) {
      console.log(
        "🕳️ A gata caiu no buraco!"
      );

      this.playerDeath();

      return;
    }

    const speed = 250;

    // ==================================================
    // MOVIMENTO
    // ==================================================

    if (
      this.cursors.left.isDown
    ) {
      this.player.setVelocityX(
        -speed
      );

      this.player.setFlipX(
        true
      );
    }

    else if (
      this.cursors.right.isDown
    ) {
      this.player.setVelocityX(
        speed
      );

      this.player.setFlipX(
        false
      );
    }

    else {
      this.player.setVelocityX(
        0
      );
    }

    // ==================================================
    // PULO
    // ==================================================

    if (
      this.cursors.up.isDown &&
      this.player.body!.blocked.down
    ) {
      this.player.setVelocityY(
        -550
      );
    }

    // ==================================================
    // ESTADO
    // ==================================================

    this.updatePlayerState();

    // ==================================================
    // ANIMAÇÃO
    // ==================================================

    this.updatePlayerAnimation();
  }

  // ==================================================
  // CRIA ANIMAÇÕES DO PERSONAGEM
  // ==================================================

  private createPlayerAnimations() {
    // ==================================================
    // MADELINE
    // ==================================================

    if (
      this.character === "madeline"
    ) {
      this.anims.create({
        key: "madeline-idle",

        frames:
          this.anims.generateFrameNumbers(
            "madeline-idle-sheet",
            {
              start: 0,
              end: 3,
            }
          ),

        frameRate: 4,

        repeat: -1,
      });

      this.anims.create({
        key: "madeline-run",

        frames:
          this.anims.generateFrameNumbers(
            "madeline-run-sheet",
            {
              start: 0,
              end: 3,
            }
          ),

        frameRate: 10,

        repeat: -1,
      });

      this.anims.create({
        key: "madeline-jump",

        frames:
          this.anims.generateFrameNumbers(
            "madeline-jump-sheet",
            {
              start: 0,
              end: 3,
            }
          ),

        frameRate: 8,

        repeat: 0,
      });

      return;
    }

    // ==================================================
    // MAKENA
    // ==================================================

    this.anims.create({
      key: "makena-idle",

      frames:
        this.anims.generateFrameNumbers(
          "makena-idle-sheet",
          {
            start: 0,
            end: 3,
          }
        ),

      frameRate: 4,

      repeat: -1,
    });
  }

  // ==================================================
  // IDLE ATUAL
  // ==================================================

  private getIdleAnimation() {
    return this.character === "madeline"
      ? "madeline-idle"
      : "makena-idle";
  }

  // ==================================================
  // RUN ATUAL
  // ==================================================

  private getRunAnimation() {
    return this.character === "madeline"
      ? "madeline-run"
      : "makena-idle";
  }

  // ==================================================
  // JUMP ATUAL
  // ==================================================

  private getJumpAnimation() {
    return this.character === "madeline"
      ? "madeline-jump"
      : "makena-idle";
  }

  // ==================================================
  // CRIA OS 3 CORAÇÕES
  // ==================================================

  private createHearts() {
    this.heartSprites = [];

    for (
      let i = 0;
      i < this.maxHearts;
      i++
    ) {
      const heart =
        this.add.sprite(
          28 + i * 48,
          28,
          "hearts-sheet",
          0
        );

      heart.setScrollFactor(
        0
      );

      heart.setDepth(
        1000
      );

      this.heartSprites.push(
        heart
      );
    }

    this.updateHeartsDisplay();
  }

  // ==================================================
  // ATUALIZA CORAÇÕES
  // ==================================================

  private updateHeartsDisplay() {
    for (
      let i = 0;
      i < this.heartSprites.length;
      i++
    ) {
      if (
        i < this.hearts
      ) {
        this.heartSprites[
          i
        ].setFrame(0);
      }

      else {
        this.heartSprites[
          i
        ].setFrame(1);
      }
    }
  }

  // ==================================================
  // COLISÃO COM INIMIGO
  // ==================================================

  private handleEnemyCollision(
    enemy: Phaser.Physics.Arcade.Sprite
  ) {
    if (
      !enemy.active
    ) {
      return;
    }

    if (
      this.isInvulnerable
    ) {
      return;
    }

    const body =
      this.player.body as Phaser.Physics.Arcade.Body;

    // ==================================================
    // PISOU EM CIMA
    // ==================================================

    if (
      body.velocity.y > 0 &&
      this.player.y < enemy.y
    ) {
      enemy.destroy();

      this.player.setVelocityY(
        -350
      );

      console.log(
        "💥 Esporotricose derrotada!"
      );

      return;
    }

    // ==================================================
    // BATEU DE LADO
    // ==================================================

    this.takeDamage(
      enemy
    );
  }

  // ==================================================
  // DANO
  // ==================================================

  private takeDamage(
    enemy: Phaser.Physics.Arcade.Sprite
  ) {
    if (
      this.isInvulnerable
    ) {
      return;
    }

    this.hearts--;

    this.updateHeartsDisplay();

    console.log(
      `💔 ${this.character} perdeu um coração! Restam ${this.hearts}.`
    );

    // ==================================================
    // MORTE
    // ==================================================

    if (
      this.hearts <= 0
    ) {
      this.playerDeath();

      return;
    }

    // ==================================================
    // INVULNERABILIDADE
    // ==================================================

    this.isInvulnerable =
      true;

    // ==================================================
    // EMPURRÃO
    // ==================================================

    if (
      this.player.x < enemy.x
    ) {
      this.player.setVelocityX(
        -300
      );
    }

    else {
      this.player.setVelocityX(
        300
      );
    }

    this.player.setVelocityY(
      -200
    );

    // ==================================================
    // PISCAR
    // ==================================================

    this.tweens.add({
      targets: this.player,

      alpha: 0.25,

      duration: 100,

      yoyo: true,

      repeat: 5,
    });

    // ==================================================
    // FIM DA INVULNERABILIDADE
    // ==================================================

    this.time.delayedCall(
      1000,
      () => {
        this.isInvulnerable =
          false;

        this.player.setAlpha(
          1
        );
      }
    );
  }

  // ==================================================
  // MORTE
  // ==================================================

  private playerDeath() {
    console.log(
      `💀 ${this.character} morreu!`
    );

    this.player.setVelocity(
      0,
      0
    );

    this.player.setTint(
      0xff0000
    );

    this.time.delayedCall(
      500,
      () => {
        this.scene.restart({
          character:
            this.character,

          level:
            this.level,
        });
      }
    );
  }

  // ==================================================
  // ESTADO
  // ==================================================

  private updatePlayerState() {
    const body =
      this.player.body as Phaser.Physics.Arcade.Body;

    // ==================================================
    // NO AR
    // ==================================================

    if (
      !body.blocked.down
    ) {
      if (
        body.velocity.y < 0
      ) {
        this.playerState =
          "jump";
      }

      else {
        this.playerState =
          "fall";
      }

      return;
    }

    // ==================================================
    // CORRENDO
    // ==================================================

    if (
      body.velocity.x !== 0
    ) {
      this.playerState =
        "walk";

      return;
    }

    // ==================================================
    // PARADO
    // ==================================================

    this.playerState =
      "idle";
  }

  // ==================================================
  // ANIMAÇÃO
  // ==================================================

  private updatePlayerAnimation() {
    switch (
      this.playerState
    ) {
      case "walk":
        this.playAnimation(
          this.getRunAnimation()
        );

        break;

      case "idle":
        this.playAnimation(
          this.getIdleAnimation()
        );

        break;

      case "jump":
        this.playAnimation(
          this.getJumpAnimation()
        );

        break;

      case "fall":
        this.playAnimation(
          this.getJumpAnimation()
        );

        break;
    }
  }

  // ==================================================
  // TROCA ANIMAÇÃO
  // ==================================================

  private playAnimation(
    animationKey: string
  ) {
    if (
      this.player.anims.currentAnim
        ?.key !== animationKey
    ) {
      this.player.play(
        animationKey
      );
    }
  }
}