import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { GameScene } from "./game/GameScene";
import { MenuScene } from "./game/MenuScene";
import { CharacterSelectScene } from "./game/CharacterSelectScene";
import { AboutScene } from "./game/AboutScene";
import { LevelCompleteScene } from "./game/LevelCompleteScene";
import { PauseScene } from "./game/PauseScene";
import { WordSearchScene } from "./game/WordSearchScene";

function App() {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 1280,
      height: 720,
      pixelArt: true,
      parent: gameRef.current,
      backgroundColor: "#1b1630",

      input: {
        gamepad: true,
      },

      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
      },

      physics: {
        default: "arcade",
        arcade: {
          gravity: {
            x: 0,
            y: 1200,
          },
          debug: false,
        },
      },

      scene: [
        MenuScene,
        AboutScene,
        CharacterSelectScene,
        GameScene,
        LevelCompleteScene,
        PauseScene,
        WordSearchScene,
      ],
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameRef} />;
}

export default App;
