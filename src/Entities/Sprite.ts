import { Game } from "../Game.js";
import { Position } from "./Entity.js";

interface SpriteProps {
  position: Position;
  imageSrc?: string;
  scale?: number;
  framesToRender?: number;
  framesHold?: number;
}

export class Sprite {
  position: Position;
  height: number;
  width: number;
  img: HTMLImageElement;
  scale: number;
  framesToRender: number;
  framesHold: number;
  framesElapsed: number;
  currentFrame: number;

  constructor({
    position,
    imageSrc,
    scale = 1,
    framesToRender = 1,
    framesHold = 1,
  }: SpriteProps) {
    this.position = position;
    this.img = new Image();
    this.img.src = imageSrc;
    this.scale = scale;
    this.framesToRender = framesToRender;
    this.framesHold = framesHold;
    this.currentFrame = 0;
    this.framesElapsed = 0;
  }

  draw() {
    Game.context2d.drawImage(
      this.img,
      this.currentFrame * (this.img.width / this.framesToRender),
      0,
      this.img.width / this.framesToRender,
      this.img.height,
      this.position.x,
      this.position.y,
      (this.img.width / this.framesToRender) * this.scale,
      this.img.height * this.scale
    );
  }

  update() {
    this.draw();

    this.framesElapsed++;

    // if (this.framesElapsed % this.framesHold === 0) {
    if (this.currentFrame < this.framesToRender - 1) {
      this.currentFrame++;
    } else {
      this.currentFrame = 0;
    }
    // }
  }
}
