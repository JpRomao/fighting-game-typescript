import { Player } from "../../Entities/Player.js";
import { Game } from "../../Game.js";
import { GameConfig } from "../GameConfig.js";
import { Keyboard } from "./Keyboard.js";

export class KeyboardAndMouse extends Keyboard {
  constructor(player: Player) {
    super(player);

    addEventListener("mousedown", (event) => {
      if (Game.isPaused) {
        return;
      }

      event.preventDefault();

      const mouseButton = `mouse${event.button + 1}`;

      if (GameConfig.KEYBOARD_GAME_MOVES[mouseButton]) {
        player[GameConfig.KEYBOARD_GAME_MOVES[mouseButton]]();

        this.addKey(mouseButton);
      }
    });

    addEventListener("mouseup", (event) => {
      if (Game.isPaused) {
        return;
      }

      event.preventDefault();

      const mouseButton = `mouse${event.button + 1}`;

      if (GameConfig.KEYBOARD_GAME_MOVES[mouseButton]) {
        player[GameConfig.KEYBOARD_GAME_MOVES[mouseButton]]();

        this.deleteKey(mouseButton);
      }
    });
  }
}
