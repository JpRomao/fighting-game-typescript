import { Player } from "../../Entities/Player.js";
import { Game } from "../../Game.js";
import { GameConfig } from "../GameConfig.js";

export class Keyboard {
  keys: string[];

  constructor(player: Player) {
    this.keys = [];

    const notKeys = ["f12", "f11", "escape"];

    addEventListener("keydown", (event) => {
      if (Game.isPaused) {
        return;
      }

      const key = event.key.toLowerCase();

      if (notKeys.includes(key)) {
        return;
      }

      event.preventDefault();

      if (GameConfig.KEYBOARD_GAME_MOVES[key]) {
        player[GameConfig.KEYBOARD_GAME_MOVES[key]]();

        this.addKey(key);
      }
    });

    addEventListener("keyup", (event) => {
      if (Game.isPaused) {
        return;
      }

      const key = event.key.toLowerCase();

      if (notKeys.includes(key)) {
        return;
      }

      event.preventDefault();

      player[GameConfig.KEYBOARD_GAME_MOVES[key]]();

      this.deleteKey(key);
    });
  }

  getKeys() {
    return this.keys;
  }

  addKey(key: string) {
    if (this.keys.length >= 3) {
      return;
    }

    if (!this.keys.includes(key)) {
      this.keys.push(key);
    }
  }

  deleteKey(key: string) {
    const keyIndex = this.keys.indexOf(key);

    if (keyIndex !== -1) {
      this.keys.splice(keyIndex, 1);
    }
  }

  isPressedKey(key: string) {
    return this.keys.includes(key);
  }
}
