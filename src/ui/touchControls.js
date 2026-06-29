export class TouchControls {
  constructor(scene, input) {
    this.scene = scene;
    this.input = input;
    this.joystickBase = null;
    this.joystickStick = null;
    this.actionButton = null;
    this.createControls();
  }

  createControls() {
    if (!this.scene.sys.game.device.input.touch) {
      return;
    }

    this.joystickBase = this.scene.add.circle(120, this.scene.scale.height - 120, 60, 0x000000, 0.4).setStrokeStyle(2, 0xffffff, 0.6);
    this.joystickStick = this.scene.add.circle(120, this.scene.scale.height - 120, 24, 0xffffff, 0.9);
    this.actionButton = this.scene.add.circle(this.scene.scale.width - 120, this.scene.scale.height - 120, 46, 0x000000, 0.4).setStrokeStyle(2, 0xffffff, 0.6);

    this.scene.input.on('pointerdown', (pointer) => {
      if (pointer.x < this.scene.scale.width / 2) {
        this.input.touch.joystick.active = true;
        this.moveJoystick(pointer.x, pointer.y);
      } else {
        this.input.touch.action = true;
      }
    });

    this.scene.input.on('pointermove', (pointer) => {
      if (this.input.touch.joystick.active) {
        this.moveJoystick(pointer.x, pointer.y);
      }
    });

    this.scene.input.on('pointerup', () => {
      this.input.touch.joystick.active = false;
      this.input.touch.action = false;
      this.resetJoystick();
    });
  }

  moveJoystick(x, y) {
    const baseX = 120;
    const baseY = this.scene.scale.height - 120;
    const dx = x - baseX;
    const dy = y - baseY;
    const length = Math.min(60, Math.hypot(dx, dy));
    const angle = Math.atan2(dy, dx);
    this.joystickStick.setPosition(baseX + Math.cos(angle) * length, baseY + Math.sin(angle) * length);
    const normalized = length / 60;
    this.input.touch.joystick.x = normalized > 0 ? Math.cos(angle) * normalized : 0;
    this.input.touch.joystick.y = normalized > 0 ? Math.sin(angle) * normalized : 0;
  }

  resetJoystick() {
    this.joystickStick.setPosition(120, this.scene.scale.height - 120);
    this.input.touch.joystick.x = 0;
    this.input.touch.joystick.y = 0;
  }
}
