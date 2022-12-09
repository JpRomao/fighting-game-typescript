import { GameConfig } from "./Config/GameConfig.js";
import { Player } from "./Entities/Player.js";
import { Sprite } from "./Entities/Sprite.js";
import {
  milisecondsToNanoSeconds,
  secondsToMiliseconds,
  secondsToNanoSeconds,
} from "./utils/time.js";

export class Game {
  public static canvas: HTMLCanvasElement;
  public static context2d: CanvasRenderingContext2D;
  public static gamepads: Gamepad[] = [];
  public player: Player;
  public enemy: Player;
  private lastFps: number;
  private playTime: number;
  public static isPaused: boolean;
  public static isRunning: boolean;
  private fps: number;
  private background: Sprite;
  private shop: Sprite;

  constructor() {
    this.fps = GameConfig.FPS_LIMIT;
    this.lastFps = 0;
    this.playTime = 100;

    Game.isRunning = true;
    Game.isPaused = false;

    Game.canvas = document.querySelector("#gameScreen");

    Game.canvas.width = GameConfig.GAME_SCREEN_WIDTH;
    Game.canvas.height = GameConfig.GAME_SCREEN_HEIGHT;
    Game.canvas.style.aspectRatio = GameConfig.ASPECT_RATIO;

    Game.context2d = Game.canvas.getContext("2d");

    Game.gamepads = navigator.getGamepads();

    this.player = new Player({
      position: { x: 100, y: GameConfig.GAME_SCREEN_HEIGHT - 150 - 90 },
      velocity: { x: 1, y: 0 },
      size: { width: 100, height: 150 },
      color: "#0ff0ff",
      number: 1,
      controllType: "keyboardAndMouse",
    });

    this.enemy = new Player({
      position: {
        x: GameConfig.GAME_SCREEN_WIDTH - 100 - 100,
        y: GameConfig.GAME_SCREEN_HEIGHT - 150 - 90,
      },
      velocity: { x: 1, y: 0 },
      size: { width: 100, height: 150 },
      color: "#aaff00",
      number: 2,
      controllType: "gamepad",
    });

    this.background = new Sprite({
      position: { x: 0, y: 0 },
      imageSrc: "./assets/background.svg",
    });

    this.shop = new Sprite({
      position: {
        x: GameConfig.GAME_SCREEN_WIDTH - 400,
        y: GameConfig.GAME_SCREEN_HEIGHT - 205 - 90,
      },
      imageSrc: "./assets/shop.png",
      scale: 1.3,
      framesHold: 1,
      framesToRender: 6,
    });
  }

  update() {
    if (this.playTime <= 0 || Game.isPaused || !Game.isRunning) {
      return;
    }

    this.player.update();
    this.enemy.update();

    // this.decreaseTimeEvery1Second();
  }

  // decreaseTimeEvery1Second() {
  //   if (this.lastFps % 60 === 0) {
  //     this.playTime--;
  //   }
  // }

  gameHUD() {
    Game.context2d.font = "12px Roboto";
    Game.context2d.fillStyle = "#ffffff";
    Game.context2d.fillText(`FPS: ${this.lastFps}`, 10, 20);

    // Game.context2d.fillText(
    //   `Player 1 HP: ${this.player.health}`,
    //   10,
    //   GameConfig.GAME_SCREEN_HEIGHT - 20
    // );

    // Game.context2d.fillText(
    //   `Player 2 HP: ${this.enemy.health}`,
    //   GameConfig.GAME_SCREEN_WIDTH - 100,
    //   GameConfig.GAME_SCREEN_HEIGHT - 20
    // );

    //Health bar
    Game.context2d.fillStyle = "#ff0000";
    Game.context2d.fillRect(
      10,
      40,
      (GameConfig.GAME_SCREEN_WIDTH * (this.player.health / 100)) / 2 - 50,
      20
    );

    Game.context2d.fillStyle = "#00ff00";

    Game.context2d.fillRect(
      GameConfig.GAME_SCREEN_WIDTH / 2 + 40,
      40,
      (GameConfig.GAME_SCREEN_WIDTH * (this.enemy.health / 100)) / 2 - 50,
      20
    );

    //timer
    Game.context2d.fillStyle = "#ffffff";
    Game.context2d.font = "40px Roboto";
    Game.context2d.fillText(
      `${this.playTime < 10 ? "0" + this.playTime : this.playTime}`,
      GameConfig.GAME_SCREEN_WIDTH / 2 - 20,
      60
    );

    // Game.context2d.fillRect(
    //   GameConfig.GAME_SCREEN_WIDTH - 10 - this.enemy.health,
    //   GameConfig.GAME_SCREEN_HEIGHT - 40,
    //   this.enemy.health,
    //   20
    // );
  }

  draw() {
    Game.context2d.clearRect(
      0,
      0,
      GameConfig.GAME_SCREEN_WIDTH,
      GameConfig.GAME_SCREEN_HEIGHT
    );

    this.background.draw();

    this.shop.draw();

    // Game.context2d.fillStyle = "#000000";
    // Game.context2d.fillRect(
    //   0,
    //   0,
    //   GameConfig.GAME_SCREEN_WIDTH,
    //   GameConfig.GAME_SCREEN_HEIGHT
    // );

    if (!Game.isRunning) {
      return;
    }

    this.gameHUD();

    this.player.draw();
    this.enemy.draw();
  }

  gameLoop() {
    //time in nano seconds
    let lastTime = milisecondsToNanoSeconds(performance.now());

    const ns =
      GameConfig.FPS_LIMIT > 0
        ? secondsToNanoSeconds(1) / GameConfig.FPS_LIMIT
        : 1;
    let delta = 0;
    let timer = performance.now();

    const loop = () => {
      const now = milisecondsToNanoSeconds(performance.now());

      delta += (now - lastTime) / ns;

      lastTime = now;

      if (delta >= 1) {
        this.update();

        this.draw();

        delta--;

        this.fps++;
      }

      if (performance.now() - timer >= secondsToMiliseconds(1)) {
        this.lastFps = this.fps;

        this.fps = 0;

        timer += secondsToMiliseconds(1);
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  public isAttackColliding(a: Player, b: Player) {
    return (
      a.attackBox.position.x + a.attackBox.width > b.hitBox.position.x &&
      a.attackBox.position.x < b.hitBox.position.x + b.hitBox.width &&
      a.attackBox.position.y + a.attackBox.height > b.hitBox.position.y &&
      a.attackBox.position.y < b.hitBox.position.y + b.hitBox.height
    );
  }

  public dealDamage(a: Player, b: Player) {
    if (this.isAttackColliding(a, b)) {
      b.takeDamage(a.damage);
    }
  }

  public static isOutScreen(a: any) {
    return (
      a.position.x + a.width + a.velocity.x < 0 ||
      a.position.x + a.width + a.velocity.x > GameConfig.GAME_SCREEN_WIDTH
    );
  }
}
