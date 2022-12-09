interface KeyboardMovesProps {
  w: string;
  ArrowUp: string;
  a: string;
  ArrowLeft: string;
  d: string;
  ArrowRight: string;
  " ": string;
}
interface KeyboardAndMouseMovesProps extends KeyboardMovesProps {
  mouse1: string;
}

type AspectRatioOptions = "16/9" | "4/3" | "3/2" | "5/4" | "1/1";

export class GameConfig {
  public static readonly GAME_SCREEN_WIDTH: number = 1024;
  public static readonly GAME_SCREEN_HEIGHT: number = 768;
  public static readonly GAME_GRAVITY: number = 0.5;
  public static KEYBOARD_GAME_MOVES: KeyboardMovesProps = {
    w: "jump",
    ArrowUp: "jump",
    a: "moveBackward",
    ArrowLeft: "moveBackward",
    d: "moveForward",
    ArrowRight: "moveForward",
    " ": "attack",
  };
  public static KEYBOARD_AND_MOUSE_GAME_MOVES: KeyboardAndMouseMovesProps = {
    ...GameConfig.KEYBOARD_GAME_MOVES,
    mouse1: "attack",
  };
  public static GAME_CONTROLLER_GAMEPAD_INDEX: number = 0;
  public static GAME_CONTROLLER_GAMEPAD_MOVES: any = {};
  public static GAME_CONTROLLER: "keyboard" | "mouse-and-keyboard" | "gamepad" =
    "keyboard";
  public static SHOW_FPS: boolean = true;
  public static FPS_LIMIT: number = 30;
  public static ASPECT_RATIO: AspectRatioOptions = "16/9";

  public setFPSLimit(fps: number) {
    GameConfig.FPS_LIMIT = fps;
  }
  public setGameController(
    controller: "keyboard" | "mouse-and-keyboard" | "gamepad"
  ) {
    GameConfig.GAME_CONTROLLER = controller;
  }
}
