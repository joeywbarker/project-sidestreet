export class InputManager {
  constructor(scene) {
    this.scene = scene;
    this.keys = {};
    this.gamepad = null;
    this.touch = {
      joystick: { x: 0, y: 0, active: false },
      action: false,
    };
    this.bindKeyboard();
    this.bindGamepad();
  }

  bindKeyboard() {
    const keyMap = {
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowUp: 'up',
      ArrowDown: 'down',
      a: 'left',
      d: 'right',
      w: 'up',
      s: 'down',
    };

    Object.entries(keyMap).forEach(([key, action]) => {
      this.scene.input.keyboard.on(`keydown-${key}`, () => {
        this.keys[action] = true;
      });
      this.scene.input.keyboard.on(`keyup-${key}`, () => {
        this.keys[action] = false;
      });
    });
  }

  bindGamepad() {
    this.scene.input.gamepad.on('connected', (pad) => {
      this.gamepad = pad;
    });

    this.scene.input.gamepad.on('disconnected', () => {
      this.gamepad = null;
    });
  }

  getMovementVector() {
    let x = 0;
    let y = 0;

    if (this.keys.left) x -= 1;
    if (this.keys.right) x += 1;
    if (this.keys.up) y -= 1;
    if (this.keys.down) y += 1;

    if (this.gamepad) {
      const axisX = this.gamepad.leftStick.x;
      const axisY = this.gamepad.leftStick.y;
      if (Math.abs(axisX) > 0.2) x += axisX;
      if (Math.abs(axisY) > 0.2) y += axisY;
      if (this.gamepad.left || this.gamepad.DPad.left) x -= 1;
      if (this.gamepad.right || this.gamepad.DPad.right) x += 1;
      if (this.gamepad.up || this.gamepad.DPad.up) y -= 1;
      if (this.gamepad.down || this.gamepad.DPad.down) y += 1;
    }

    if (this.touch.joystick.active) {
      x += this.touch.joystick.x;
      y += this.touch.joystick.y;
    }

    const length = Math.hypot(x, y);
    if (length > 1) {
      return { x: x / length, y: y / length };
    }

    return { x, y };
  }

  isRunning() {
    return this.touch.action || (this.gamepad && this.gamepad.A);
  }
}
