import { GAME_CONFIG } from '../config.js';
import { CameraController } from '../engine/camera.js';
import { InputManager } from '../engine/input.js';
import { PlayerController } from '../entities/player.js';
import { TouchControls } from '../ui/touchControls.js';

export class TestScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TestScene' });
  }

  preload() {
    this.load.image('background', 'assets/backgrounds/placeholder.png');
    this.load.spritesheet('player', 'assets/sprites/player.png', { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    this.cameras.main.setBackgroundColor('#111722');
    this.physics.world.setBounds(0, 0, GAME_CONFIG.worldWidth, GAME_CONFIG.worldHeight);
    this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(2);
    this.input.setTopOnly(true);

    this.inputManager = new InputManager(this);
    this.player = new PlayerController(this, GAME_CONFIG, this.inputManager);
    this.cameraController = new CameraController(this, GAME_CONFIG);
    this.touchControls = new TouchControls(this, this.inputManager);

    this.fpsText = this.add.text(12, 12, 'FPS: 0', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setScrollFactor(0);

    this.debugText = this.add.text(12, 36, '', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setScrollFactor(0);

    this.lastFps = 0;
    this.fpsCounter = 0;
    this.fpsTimer = 0;
  }

  update(time, delta) {
    this.player.update(delta);
    this.cameraController.follow(this.player.sprite, delta);

    this.fpsCounter += 1;
    this.fpsTimer += delta;
    if (this.fpsTimer >= 1000) {
      this.lastFps = Math.round(this.fpsCounter * 1000 / this.fpsTimer);
      this.fpsCounter = 0;
      this.fpsTimer = 0;
      this.fpsText.setText(`FPS: ${this.lastFps}`);
    }

    this.debugText.setText([
      `FPS: ${this.lastFps}`,
      `Player X: ${Math.round(this.player.sprite.x)}`,
      `Player Y: ${Math.round(this.player.sprite.y)}`,
      `Camera X: ${Math.round(this.cameras.main.scrollX)}`,
      `Camera Y: ${Math.round(this.cameras.main.scrollY)}`,
      `Gamepad Connected: ${this.input.gamepad.pad1 ? 'Yes' : 'No'}`,
    ].join('\n'));
  }
}
