import { Sprite } from "@jaymar921/2dgraphic-utils";
import player_img from "../assets/player.png";

export class MultiPlayerHandler {
  constructor(
    canvasScreen,
    randomId = `r-${Math.random() * 9999}`,
    server = "localhost:3000",
  ) {
    this.client = new WebSocket(`ws://${server}`);
    this.randomId = randomId;

    this.client.addEventListener("message", (e) => {
      const { type, player, randomId: RID } = JSON.parse(e.data);

      if (!player) return;
      if (RID === this.randomId) return; // ignore own updates

      let otherPlayer = canvasScreen.getRegisteredObject(RID); // use randomId as key

      if (!otherPlayer) {
        otherPlayer = new Sprite({
          objID: RID,
          name: player.name,
          posX: player.posX,
          posY: player.posY,
          imageSource: player_img,
          scale: 1,
        });
        otherPlayer.targetX = player.posX;
        otherPlayer.targetY = player.posY;

        // Smooth movement loop
        setInterval(() => {
          const speed = 1;
          if (otherPlayer.posX < otherPlayer.targetX) otherPlayer.posX += speed;
          if (otherPlayer.posX > otherPlayer.targetX) otherPlayer.posX -= speed;
          if (otherPlayer.posY < otherPlayer.targetY) otherPlayer.posY += speed;
          if (otherPlayer.posY > otherPlayer.targetY) otherPlayer.posY -= speed;
        }, 20);

        canvasScreen.registerObject(otherPlayer);
      } else {
        // update target position instead of teleporting
        otherPlayer.targetX = player.posX;
        otherPlayer.targetY = player.posY;
      }
    });
  }
}
