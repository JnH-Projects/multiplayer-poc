import { useEffect } from "react";
import "./App.css";
import { CanvasScreen, Sprite, SpriteType } from "@jaymar921/2dgraphic-utils";
import player_img from "./assets/player.png";
import { MultiPlayerHandler } from "./handlers/multiplayerHandler";
import { useState } from "react";

const randomId = `r-${Math.random() * 999}`;
function App() {
  const [canvasScreen, setCanvasScreen] = useState(null);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (canvasScreen) return;
    const screen = new CanvasScreen("game-canvas", 500, 300, "rgba(0,0,0,0.2)");
    const multiplayerHandler = new MultiPlayerHandler(screen, randomId);

    const w = 500;
    const h = 500;
    screen.enableScreenDrag(true);

    const direction = {
      x: w / 2 - (300 / 2) * 0.5,
      y: h / 2 - (300 / 2) * 0.5,
    };

    const mainPlayer = new Sprite({
      objID: randomId, // <-- use randomId here
      name: randomId,
      posX: direction.x - (156 / 2) * 0.5,
      posY: direction.y - (116 / 2) * 0.5,
      imageSource: player_img,
      scale: 1,
    });
    screen.registerObject(mainPlayer);

    screen.registerObject(mainPlayer);

    screen.handleScreenClickedEvent((e) => {
      direction.x =
        e.mousePosition.x - (mainPlayer.width / 2) * mainPlayer.scale;
      direction.y =
        e.mousePosition.y - (mainPlayer.height / 2) * mainPlayer.scale;

      multiplayerHandler.client.send(
        JSON.stringify({
          player: {
            name: randomId,
            posX: direction.x,
            posY: direction.y,
          },
          randomId,
        }),
      );
    });

    async function alterMovement() {
      while (true) {
        await sleep(20);

        let velocityX = 1;
        let velocityY = 1;

        if (mainPlayer.posX < direction.x) mainPlayer.posX += velocityX;
        if (mainPlayer.posX > direction.x) mainPlayer.posX -= velocityX;
        if (mainPlayer.posY > direction.y) mainPlayer.posY -= velocityY;
        if (mainPlayer.posY < direction.y) mainPlayer.posY += velocityY;
      }
    }

    setTimeout(alterMovement, 100);
    setCanvasScreen(screen);
  }, [canvasScreen]); // run once on mount

  return (
    <>
      <div>
        <canvas id="game-canvas"></canvas>
      </div>
    </>
  );
}

export default App;
