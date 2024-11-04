 import React, { useState } from "react";
 import Sidebar from "./components/Sidebar";
 import MiddleArea from "./components/MiddleArea";
 import Preview from "./components/PreView";
 import catImage from '../src/images/Sprite1.png';
 import earthImage from '../src/images/sprite2.png';

 export default function App() {
  const [sprites, setSprites] = useState([
    { id: 1, type: "cat", position: { x: 100, y: 100 }, rotation: 0, image: catImage },
  ]);
  const [motions, setMotions] = useState({});
  const [currentSprite, setCurrentSprite] = useState(sprites[0]);
  const [actionTabs, setActionTabs] = useState({}); // Track action tabs for each sprite

  const handleAddMotion = (motion, spriteId) => {
    setMotions((prevMotions) => ({
      ...prevMotions,
      [spriteId]: [...(prevMotions[spriteId] || []), motion],
    }));
  };

  const handleDeleteMotion = (spriteId, index) => {
    setMotions((prevMotions) => ({
      ...prevMotions,
      [spriteId]: prevMotions[spriteId].filter((_, i) => i !== index),
    }));
  };

  const handleAddSprite = (type) => {
    const newSprite = {
      id: sprites.length + 1,
      type: type,
      position: { x: 100, y: 100 },
      rotation: 0,
      image: type === "earth" ? earthImage : catImage, 
    };
    setSprites((prevSprites) => [...prevSprites, newSprite]);
    setCurrentSprite(newSprite);
  };

  const handleAddAction = (spriteId) => {
    setActionTabs((prevTabs) => ({
      ...prevTabs,
      [spriteId]: [...(prevTabs[spriteId] || []), `Action ${prevTabs[spriteId]?.length + 1 || 1}`],
    }));
  };

  const applyMotion = (spriteId, motion) => {
    const regexMove = /Move Right (\d+)/;
    const regexTurn = /Turn (\d+) degrees/;
    const regexGoTo = /Go to X: (-?\d+), Y: (-?\d+)/;

    setSprites((prevSprites) =>
      prevSprites.map((sprite) => {
        if (sprite.id === spriteId) {
          let newPosition = { ...sprite.position };
          let newRotation = sprite.rotation;

          if (regexMove.test(motion)) {
            const steps = parseInt(motion.match(regexMove)[1], 10);
            newPosition.x += steps;
          } else if (motion === "Move Forward") {
            newPosition.y -= 20;
          } else if (motion === "Move Backward") {
            newPosition.y += 20;
          } else if (motion === "Turn Right") {
            newRotation += 90;
          } else if (motion === "Turn Left") {
            newRotation -= 90;
          } else if (regexTurn.test(motion)) {
            const degrees = parseInt(motion.match(regexTurn)[1], 10);
            newRotation += degrees;
          } else if (regexGoTo.test(motion)) {
            const [_, x, y] = motion.match(regexGoTo);
            newPosition = { x: parseInt(x, 10), y: parseInt(y, 10) };
          }

          return { ...sprite, position: newPosition, rotation: newRotation };
        }
        return sprite;
      })
    );
  };

  const handlePlay = async () => {
    const promises = Object.entries(motions).map(([spriteId, spriteMotions]) => {
      return new Promise(async (resolve) => {
        for (const motion of spriteMotions) {
          applyMotion(parseInt(spriteId), motion);
          await new Promise((res) => setTimeout(res, 500));
        }
        resolve();
      });
    });
    await Promise.all(promises);
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans h-screen flex">
      <div className="flex-1 h-full flex flex-row">
        <Sidebar onAddMotion={(motion) => handleAddMotion(motion, currentSprite.id)} />
        <MiddleArea
          actionTabs={actionTabs}
          motions={motions}
          onPlay={handlePlay}
          onDropMotion={handleAddMotion}
          onDeleteMotion={handleDeleteMotion}
          currentSprite={currentSprite}
        />
      </div>
      <div className="w-1/3 h-full flex flex-col">
        <Preview sprites={sprites} />
        <div className="bg-white p-4 h-1/2 mt-4 rounded-lg shadow-lg flex flex-wrap justify-center">
          {sprites.map((sprite) => (
            <div key={sprite.id} className="bg-white-100 m-2 p-4 h-42 rounded  flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-2">{sprite.type} Sprite</h2>
              <img src={sprite.image} alt={sprite.type} className="w-20 h-20" />
              <button
                onClick={() => {
                  setCurrentSprite(sprite);
                  handleAddAction(sprite.id);
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Action
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddSprite("earth")}
            className="mt-4 px-4 py-2 h-12 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add New Sprite
          </button>
        </div>
      </div>
    </div>
  );
}

