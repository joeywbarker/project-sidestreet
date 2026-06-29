export class CameraController {
  constructor(scene, config) {
    this.scene = scene;
    this.config = config;
    this.camera = scene.cameras.main;
    this.camera.setBounds(0, 0, config.worldWidth, config.worldHeight);
    this.camera.setZoom(1);
    this.camera.setRoundPosition(false);
  }

  follow(target, delta) {
    const width = this.scene.scale.width;
    const height = this.scene.scale.height;
    const deadzone = width * this.config.camera.deadzonePercent;

    const targetX = target.x - width / 2;
    const targetY = target.y - height / 2;
    const camX = this.camera.scrollX;
    const camY = this.camera.scrollY;

    let nextX = camX;
    let nextY = camY;

    if (targetX < camX + deadzone / 2) {
      nextX = targetX + deadzone / 2;
    } else if (targetX + width - deadzone / 2 > camX + width) {
      nextX = targetX + width - deadzone / 2 - width;
    }

    if (targetY < camY + height * 0.2) {
      nextY = targetY + height * 0.2;
    } else if (targetY + height - height * 0.2 > camY + height) {
      nextY = targetY + height - height * 0.2 - height;
    }

    this.camera.scrollX += (nextX - camX) * this.config.camera.horizontalLerp;
    this.camera.scrollY += (nextY - camY) * this.config.camera.verticalLerp;

    this.camera.scrollX = Phaser.Math.Clamp(this.camera.scrollX, 0, this.config.worldWidth - width);
    this.camera.scrollY = Phaser.Math.Clamp(this.camera.scrollY, 0, this.config.worldHeight - height);
  }
}
