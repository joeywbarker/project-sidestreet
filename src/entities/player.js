import { AnimationController } from '../engine/animation.js';

export class PlayerController {
  constructor(scene, config, input) {
    this.scene = scene;
    this.config = config;
    this.input = input;
    this.sprite = null;
    this.animation = null;
    this.createSprite();
  }

  createSprite() {
    this.sprite = this.scene.add.sprite(320, 540, 'player');
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setScale(2);
    this.sprite.setPipeline('TextureTintPipeline');
    this.animation = new AnimationController(this.scene, this.sprite);
    this.sprite.anims.play('idle', true);
  }

  update(delta) {
    const vector = this.input.getMovementVector();
    const speed = this.input.isRunning() ? this.config.playerRunSpeed : this.config.playerSpeed;
    const velocityX = vector.x * speed * (delta / 1000);
    const velocityY = vector.y * speed * (delta / 1000);

    this.sprite.x += velocityX;
    this.sprite.y += velocityY;

    this.sprite.x = Phaser.Math.Clamp(this.sprite.x, 32, this.config.worldWidth - 32);
    this.sprite.y = Phaser.Math.Clamp(this.sprite.y, 32, this.config.worldHeight - 32);

    let state = 'idle';
    if (Math.abs(vector.x) > 0.1 || Math.abs(vector.y) > 0.1) {
      if (Math.abs(vector.x) > Math.abs(vector.y)) {
        state = vector.x > 0 ? 'walk-right' : 'walk-left';
      } else {
        state = vector.y > 0 ? 'walk-down' : 'walk-up';
      }
    }

    this.animation.play(state);
  }
}
