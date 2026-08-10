import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { GameScene } from './game/GameScene';
import { MenuScene } from './game/MenuScene';
import { CharacterSelectScene } from './game/CharacterSelectScene';
import { AboutScene } from './game/AboutScene';

function App() {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
    
      width: 1280,
      height: 720,
    
      parent: gameRef.current,
    
      backgroundColor: '#1b1630',
    
      physics: {
        default: 'arcade',
    
        arcade: {
          gravity: {
            x: 0,
            y: 1200,
          },
    
          debug: true,
        },
      },
    
      scene: [
        MenuScene,
        AboutScene,
        CharacterSelectScene,
        GameScene,
      ],
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameRef} />;
}

export default App;