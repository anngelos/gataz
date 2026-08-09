import Phaser from 'phaser';

type PlayerState =
  | 'idle'
  | 'walk'
  | 'jump'
  | 'fall';

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private playerState: PlayerState = 'idle';

  // =========================
  // VIDA DA MADELINE
  // =========================

  private maxHearts = 3;
  private hearts = 3;

  private heartSprites: Phaser.GameObjects.Sprite[] = [];

  private isInvulnerable = false;

  constructor() {
    super('GameScene');
  }

  preload() {
    // =========================
    // MADELINE - IDLE
    // =========================

    this.load.spritesheet(
      'madeline-idle-sheet',
      '/assets/characters/madeline/madeline-idle.png',
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );

    // =========================
    // MADELINE - CORRIDA
    // =========================

    this.load.spritesheet(
      'madeline-run-sheet',
      '/assets/characters/madeline/madeline-run.png',
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );

    // =========================
    // MADELINE - PULO
    // =========================

    this.load.spritesheet(
      'madeline-jump-sheet',
      '/assets/characters/madeline/madeline-jump.png',
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );

    // =========================
    // ESPOROTRICOSE - IDLE
    // =========================

    this.load.spritesheet(
      'esporotricose-idle-sheet',
      '/assets/characters/enemies/esporotricose/esporotricose-idle.png',
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );

    // =========================
    // CORAÇÕES
    // =========================

    this.load.spritesheet(
      'hearts-sheet',
      '/assets/ui/hearts.png',
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );
  }

  create() {
    // =========================
    // RESET DA VIDA
    // =========================

    this.hearts = this.maxHearts;
    this.isInvulnerable = false;

    // =========================
    // ANIMAÇÃO MADELINE - IDLE
    // =========================

    this.anims.create({
      key: 'madeline-idle',

      frames: this.anims.generateFrameNumbers(
        'madeline-idle-sheet',
        {
          start: 0,
          end: 3,
        }
      ),

      frameRate: 4,
      repeat: -1,
    });

    // =========================
    // ANIMAÇÃO MADELINE - CORRIDA
    // =========================

    this.anims.create({
      key: 'madeline-run',

      frames: this.anims.generateFrameNumbers(
        'madeline-run-sheet',
        {
          start: 0,
          end: 3,
        }
      ),

      frameRate: 10,
      repeat: -1,
    });

    // =========================
    // ANIMAÇÃO MADELINE - PULO
    // =========================

    this.anims.create({
      key: 'madeline-jump',

      frames: this.anims.generateFrameNumbers(
        'madeline-jump-sheet',
        {
          start: 0,
          end: 3,
        }
      ),

      frameRate: 8,
      repeat: 0,
    });

    // =========================
    // ANIMAÇÃO ESPOROTRICOSE
    // =========================

    this.anims.create({
      key: 'esporotricose-idle',

      frames: this.anims.generateFrameNumbers(
        'esporotricose-idle-sheet',
        {
          start: 0,
          end: 3,
        }
      ),

      frameRate: 4,
      repeat: -1,
    });

    // =========================
    // TEXTURAS TEMPORÁRIAS
    // =========================

    const graphics = this.add.graphics();

    // =========================
    // CHÃO
    // =========================

    graphics.fillStyle(0x4a4a4a);

    graphics.fillRect(
      0,
      0,
      1280,
      80
    );

    graphics.generateTexture(
      'ground',
      1280,
      80
    );

    graphics.clear();

    // =========================
    // PLATAFORMA
    // =========================

    graphics.fillStyle(0x6a6a6a);

    graphics.fillRect(
      0,
      0,
      250,
      40
    );

    graphics.generateTexture(
      'platform',
      250,
      40
    );

    graphics.destroy();

    // =========================
    // MUNDO
    // =========================

    this.physics.world.setBounds(
      0,
      0,
      2000,
      720
    );

    this.cameras.main.setBounds(
      0,
      0,
      2000,
      720
    );

    // =========================
    // PLATAFORMAS
    // =========================

    const platforms =
      this.physics.add.staticGroup();

    platforms.create(
      640,
      680,
      'ground'
    );

    platforms.create(
      400,
      550,
      'platform'
    );

    platforms.create(
      750,
      450,
      'platform'
    );

    platforms.create(
      1100,
      550,
      'platform'
    );

    platforms.create(
      1450,
      400,
      'platform'
    );

    // =========================
    // INIMIGOS
    // =========================

    const enemies =
      this.physics.add.staticGroup();

    const enemy =
      enemies.create(
        650,
        620,
        'esporotricose-idle-sheet',
        0
      ) as Phaser.Physics.Arcade.Sprite;

    enemy.play(
      'esporotricose-idle'
    );

    // =========================
    // MADELINE
    // =========================

    this.player =
      this.physics.add.sprite(
        300,
        500,
        'madeline-idle-sheet',
        0
      );

    this.player.play(
      'madeline-idle'
    );

    // =========================
    // FÍSICA
    // =========================

    this.player.setCollideWorldBounds(
      true
    );

    // =========================
    // COLISÃO COM PLATAFORMAS
    // =========================

    this.physics.add.collider(
      this.player,
      platforms
    );

    // =========================
    // CONTROLES
    // =========================

    this.cursors =
      this.input.keyboard!.createCursorKeys();

    // =========================
    // HUD - CORAÇÕES
    // =========================

    this.createHearts();

    // =========================
    // COLISÃO COM INIMIGO
    // =========================

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

    // =========================
    // CÂMERA
    // =========================

    this.cameras.main.startFollow(
      this.player,
      true,
      0.08,
      0.08
    );
  }

  update() {
    const speed = 250;

    // =========================
    // MOVIMENTO
    // =========================

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

    // =========================
    // PULO
    // =========================

    if (
      this.cursors.up.isDown &&
      this.player.body!.blocked.down
    ) {
      this.player.setVelocityY(
        -550
      );
    }

    // =========================
    // ESTADO
    // =========================

    this.updatePlayerState();

    // =========================
    // ANIMAÇÃO
    // =========================

    this.updatePlayerAnimation();
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
          'hearts-sheet',
          0
        );

      // O HUD fica parado enquanto a câmera se movimenta.
      heart.setScrollFactor(0);

      // Fica sempre acima do cenário.
      heart.setDepth(1000);

      this.heartSprites.push(
        heart
      );
    }

    this.updateHeartsDisplay();
  }

  // ==================================================
  // ATUALIZA OS CORAÇÕES
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
        // Frame 0 = coração cheio
        this.heartSprites[i].setFrame(
          0
        );
      }

      else {
        // Frame 1 = coração vazio
        this.heartSprites[i].setFrame(
          1
        );
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
        '💥 Esporotricose derrotada!'
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

    // ==================================================
    // PERDE 1 CORAÇÃO
    // ==================================================

    this.hearts--;

    this.updateHeartsDisplay();

    console.log(
      `💔 Madeline perdeu um coração! Restam ${this.hearts}.`
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
    // EMPURRÃO PARA LONGE DO INIMIGO
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
    // EFEITO DE PISCAR
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
  // MORTE DA MADELINE
  // ==================================================

  private playerDeath() {
    console.log(
      '💀 Madeline morreu!'
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
        this.scene.restart();
      }
    );
  }

  // ==================================================
  // ESTADO DA MADELINE
  // ==================================================

  private updatePlayerState() {
    const body =
      this.player.body as Phaser.Physics.Arcade.Body;

    // =========================
    // ESTÁ NO AR
    // =========================

    if (
      !body.blocked.down
    ) {
      if (
        body.velocity.y < 0
      ) {
        this.playerState =
          'jump';
      }

      else {
        this.playerState =
          'fall';
      }

      return;
    }

    // =========================
    // ESTÁ CORRENDO
    // =========================

    if (
      body.velocity.x !== 0
    ) {
      this.playerState =
        'walk';

      return;
    }

    // =========================
    // ESTÁ PARADA
    // =========================

    this.playerState =
      'idle';
  }

  // ==================================================
  // ANIMAÇÃO DA MADELINE
  // ==================================================

  private updatePlayerAnimation() {
    switch (
      this.playerState
    ) {
      case 'walk':
        this.playAnimation(
          'madeline-run'
        );
        break;

      case 'idle':
        this.playAnimation(
          'madeline-idle'
        );
        break;

      case 'jump':
        this.playAnimation(
          'madeline-jump'
        );
        break;

      case 'fall':
        this.playAnimation(
          'madeline-jump'
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
      this.player.anims.currentAnim?.key !==
      animationKey
    ) {
      this.player.play(
        animationKey
      );
    }
  }
}