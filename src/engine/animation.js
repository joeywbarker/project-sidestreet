export class AnimationController {
  constructor(scene, sprite) {
    this.scene = scene;
    this.sprite = sprite;
    this.createAnimations();
  }

  createAnimations() {
    const frame = [{ key: 'player', frame: 0 }];

    this.scene.anims.create({
      key: 'walk-left',
      frames: frame,
      frameRate: 1,
      repeat: 0,
    });

    this.scene.anims.create({
      key: 'walk-right',
      frames: frame,
      frameRate: 1,
      repeat: 0,
    });

    this.scene.anims.create({
      key: 'walk-up',
      frames: frame,
      frameRate: 1,
      repeat: 0,
    });

    this.scene.anims.create({
      key: 'walk-down',
      frames: frame,
      frameRate: 1,
      repeat: 0,
    });

    this.scene.anims.create({
      key: 'idle',
      frames: frame,
      frameRate: 1,
      repeat: 0,
    });
  }

  play(state) {
    if (state === 'idle') {
      this.sprite.anims.play('idle', true);
      return;
    }

    this.sprite.anims.play(state, true);
  }
}
