import { Controll } from "../Config/Controlls/Controll.js";
import { Game } from "../Game.js";
import { game } from "../index.js";
import { Entity, EntityProps, Position } from "./Entity.js";

type Box = {
  position: Position;
  width: number;
  height: number;
};

interface PlayerProps extends EntityProps {
  hitBox?: Box;
  attackBox?: Box;
  number: 1 | 2;
  velocity: Position;
  controllType?: "keyboard" | "keyboardAndMouse" | "gamepad";
}

export class Player extends Entity {
  public hitBox: Box;
  public attackBox: Box;
  private direction: 1 | -1;
  private number: 1 | 2;
  private velocityScale: number;
  public velocity: Position;
  private controllType: "keyboard" | "keyboardAndMouse" | "gamepad";
  private controll: Controll;
  public health: number;
  public damage: number;
  private isMoving: boolean;
  private isAttacking: boolean;
  private isJumping: boolean;

  constructor({
    position,
    size,
    velocity,
    color,
    number,
    controllType,
  }: PlayerProps) {
    const isGravityAffected = true;

    super({ position, size, color, isGravityAffected });

    this.number = number;
    this.direction = this.number === 1 ? 1 : -1;
    this.hitBox = {
      position: {
        x: this.position.x + 4 * this.direction,
        y: this.position.y + 6,
      },
      width: this.width,
      height: this.height,
    };
    this.attackBox = {
      position: {
        x: this.position.x + (this.height / 2) * this.direction,
        y: this.position.y + this.width / 2,
      },
      width: this.height / 2,
      height: this.width / 2,
    };
    this.velocity = velocity;
    this.velocityScale = 5;
    this.controllType = controllType;
    this.controll = new Controll(this, this.controllType);
    this.health = 100;
    this.damage = 10;
    this.isAttacking = false;
    this.isMoving = false;
    this.isJumping = false;
  }

  update() {
    this.draw();
  }

  draw() {
    Game.context2d.fillStyle = this.color;
    Game.context2d.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    //hitbox
    Game.context2d.fillStyle = "#ff0000";
    Game.context2d.fillRect(
      this.hitBox.position.x,
      this.hitBox.position.y,
      this.hitBox.width,
      this.hitBox.height
    );

    if (this.isAttacking) {
      //attackbox
      Game.context2d.fillStyle = "#00ff00";
      Game.context2d.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  attack() {
    if (!this.isAttacking) {
      this.isAttacking = true;

      setTimeout(() => {
        this.isAttacking = false;
      }, 250);
    }
  }

  jump() {
    if (!this.isJumping) {
      this.velocity.y = -10;
      this.isJumping = true;
    } else {
      this.isJumping = false;
    }
  }

  moveBackward() {
    if (!this.isMoving) {
      this.velocity.x = -this.velocityScale;

      if (this.position.x + this.velocity.x < 0) {
        return;
      }

      if (this.direction === -1 && this.number !== 1) {
        this.changeDirection();
      }

      this.position.x += this.velocity.x;
      this.hitBox.position.x = this.position.x + 4 * this.direction;
      this.attackBox.position.x =
        this.position.x + (this.height / 2) * -this.direction;
    } else {
      this.isMoving = false;
    }
  }

  moveForward() {
    if (!this.isMoving) {
      this.velocity.x = this.velocityScale;

      if (this.direction === -1 && this.number !== 1) {
        this.changeDirection();
      }

      this.position.x = !Game.isOutScreen(this)
        ? this.velocity.x + this.position.x
        : Game.canvas.width - this.width;
      this.hitBox.position.x = this.position.x + 4 * this.direction;
      this.attackBox.position.x =
        this.position.x + (this.height / 2) * this.direction;
    } else {
      this.isMoving = false;
    }
  }

  takeDamage(damage: number) {
    this.health -= damage;
  }

  setDirection() {
    if (this.number === 1) {
      this.direction = 1;
    } else {
      this.direction = -1;
    }
  }

  changeDirection() {
    this.direction = this.direction === 1 ? -1 : 1;
  }
}
