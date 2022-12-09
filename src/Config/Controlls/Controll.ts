import { Keyboard } from "./Keyboard.js";
import { GamepadControll } from "./Gamepad.js";
import { KeyboardAndMouse } from "./KeyboardAndMouse.js";
import { Player } from "../../Entities/Player.js";

export type ControllProps = "keyboard" | "keyboardAndMouse" | "gamepad";

interface IControll {
  controll: GamepadControll | Keyboard | KeyboardAndMouse;

  setType(type: "keyboard" | "keyboardAndMouse" | "gamepad"): void;
}

export class Controll implements IControll {
  key: string;
  type: "keyboard" | "keyboardAndMouse" | "gamepad";
  controll: GamepadControll | Keyboard | KeyboardAndMouse;
  player: Player;

  constructor(player: Player, type?: ControllProps) {
    this.key = "";
    this.type = type || "keyboardAndMouse";
    this.player = player;
    this.controll =
      this.type === "gamepad"
        ? new GamepadControll()
        : this.type === "keyboard"
        ? new Keyboard(this.player)
        : new KeyboardAndMouse(this.player);
  }

  setType(type: "keyboard" | "keyboardAndMouse" | "gamepad") {
    this.type = type;

    this.controll =
      this.type === "gamepad"
        ? new GamepadControll()
        : this.type === "keyboard"
        ? new Keyboard(this.player)
        : new KeyboardAndMouse(this.player);
  }
}
