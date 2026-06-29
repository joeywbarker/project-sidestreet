# 8thstreettest

A Phaser 3.90 prototype for a horizontal 2D game world with touch, keyboard, and gamepad input.

## Structure

- index.html
- styles.css
- manifest.json
- sw.js
- assets/sprites/player.png
- assets/backgrounds/
- src/main.js
- src/config.js
- src/engine/game.js
- src/engine/camera.js
- src/engine/animation.js
- src/engine/input.js
- src/entities/player.js
- src/scenes/testScene.js
- src/ui/touchControls.js

## Run locally

Serve the repository with any static server, such as:

- python3 -m http.server 8000

Then open http://localhost:8000/ in a browser.

## Notes

- World size: 4096 x 1080
- Camera follows horizontally with a heavy lerp feel
- Player is constrained to the world bounds
- Touch controls use a virtual joystick and action button
