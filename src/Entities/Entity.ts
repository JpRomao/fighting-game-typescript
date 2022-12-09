import { Game } from "../Game.js";
import { Sprite } from "./Sprite.js";

export type Position = {
  x: number;
  y: number;
};

export interface EntityProps {
  position: Position;
  size: {
    width: number;
    height: number;
  };
  src?: string;
  sprite?: Sprite;
  isGravityAffected?: boolean;
  color: string;
}

export class Entity {
  position: Position;
  height: number;
  width: number;
  sprite?: Sprite;
  isGravityAffected: boolean;
  color?: string;

  constructor({ position, size, src, color }: EntityProps) {
    this.position = position;
    this.height = size.height;
    this.width = size.width;
    // this.sprite = new Sprite({
    //   position: this.position,
    //   imageSrc: src,
    // });
    this.isGravityAffected = true;
    this.color = color;
  }

  draw() {
    Game.context2d.fillStyle = this.color;
    Game.context2d.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
