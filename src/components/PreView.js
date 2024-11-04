import React from "react";
import CatSprite from "../components/SpriteDisplay";
import BallSprite from "../components/BallSprite";


export default function Preview({ sprites }) {
  return (
    <div className="bg-white w-full h-3/4 relative p-4 border border-gray-300 rounded-md overflow-hidden">
      <h2 className="font-bold mb-4">Preview Area</h2>
      <div>
        {sprites.map((sprite, index) => {
          const spriteStyle = {
            position: 'absolute',
            left: sprite.position.x  + index * 100,
            top: sprite.position.y,
            transform: `rotate(${sprite.rotation}deg)`,
          };

          return (
            <div key={sprite.id} style={spriteStyle}>
              {sprite.type === "cat" && <CatSprite />}
              {sprite.type === "earth" && <BallSprite />}
              
            </div>
          );
        })}
      </div>
    </div>
  );
}
