import { Game } from "../../Game.js";

export class GamepadControll {
  constructor() {
    addEventListener("gamepadconnected", (event) => {
      this.handleGamepadConnected(event);
    });
  }

  handleGamepadConnected(event: GamepadEvent) {
    const gamepad = event.gamepad;

    if (gamepad) {
      Game.gamepads.push(gamepad);
    }
  }
}
