
import React, { useState, useEffect } from "react";

export default function MiddleArea({ motions, onPlay, onDropMotion, onDeleteMotion, currentSprite }) {
  const [actionTabs, setActionTabs] = useState([{ id: currentSprite.id, label: `Action 1` }]);
  const [selectedTab, setSelectedTab] = useState(currentSprite.id);
  const [spritePositions, setSpritePositions] = useState({}); 

  
  const handleDrop = (e, spriteId) => {
    e.preventDefault();
    const motion = e.dataTransfer.getData("motion");
    if (motion) {
      onDropMotion(motion, spriteId); 
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  
  const handleAddActionTab = () => {
    const newTab = {
      id: `${currentSprite.id}-${actionTabs.length + 1}`, 
      label: `Action ${actionTabs.length + 1}`,
    };
    setActionTabs((prevTabs) => [...prevTabs, newTab]);
    setSelectedTab(newTab.id); 
  };

  
  const checkCollision = (spriteA, spriteB) => {
    const aPos = spritePositions[spriteA.id];
    const bPos = spritePositions[spriteB.id];

    if (!aPos || !bPos) return false;

    const isColliding = (
      aPos.x < bPos.x + 50 && 
      aPos.x + 50 > bPos.x &&
      aPos.y < bPos.y + 50 && 
      aPos.y + 50 > bPos.y
    );

    return isColliding;
  };

  
  const swapMotions = (spriteA, spriteB) => {
    const motionsA = motions[spriteA.id] || [];
    const motionsB = motions[spriteB.id] || [];


    motions[spriteA.id] = motionsB;
    motions[spriteB.id] = motionsA;

    
    setSpritePositions((prev) => ({
      ...prev,
      [spriteA.id]: { ...prev[spriteA.id] }, 
      [spriteB.id]: { ...prev[spriteB.id] },
    }));
  };

  
  useEffect(() => {
    const checkForCollisions = () => {
      actionTabs.forEach((tabA) => {
        actionTabs.forEach((tabB) => {
          if (tabA.id !== tabB.id && checkCollision(tabA, tabB)) {
            swapMotions(tabA, tabB);
          }
        });
      });
    };

    checkForCollisions(); 

  }, [spritePositions, actionTabs, motions]); 

  return (
    <div className="bg-white p-4 w-full flex flex-col h-full border border-gray-300 rounded-md overflow-hidden">
      {/* Action Tabs */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex">
          {actionTabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 ${selectedTab === tab.id ? "bg-green-500 text-white" : "bg-gray-200"} rounded-tl`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button onClick={onPlay} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Play
        </button>
      </div>

      {/* Motion Drop Area for Selected Tab */}
      <div className="flex flex-col w-full flex-grow overflow-y-auto">
        {actionTabs.map((tab) => (
          <div
            key={tab.id}
            className={`transition-opacity duration-300 ${selectedTab === tab.id ? "block" : "hidden"}`}
            onDrop={(e) => handleDrop(e, tab.id)}
            onDragOver={handleDragOver}
            style={{ minHeight: "500px", border: "1px dashed #ccc", padding: "8px", borderRadius: "8px" }}
          >
            {motions[tab.id] && motions[tab.id].map((motion, index) => (
              <div
                key={index}
                className="mb-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer flex justify-between items-center hover:bg-blue-600"
              >
                {motion}
                <button onClick={() => onDeleteMotion(tab.id, index)} className="text-red-500 hover:text-red-700">
                  🗑️
                </button>
              </div>
            ))}
            {(!motions[tab.id] || motions[tab.id].length === 0) && (
              <p className="text-gray-500">Drag motions here</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
      {/* Button to Add New Action Tab for Current Sprite */}
      <button
        onClick={handleAddActionTab}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-normal"
      >
        Add Action
      </button>
      </div>
    </div>
  );
}


