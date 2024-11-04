import React, { useState } from "react";

export default function Sidebar({ onAddMotion }) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [steps, setSteps] = useState(10); 
  const [degrees, setDegrees] = useState(15); 
  const handleDragStart = (e, motion) => {
    e.dataTransfer.setData("motion", motion); 
  };
  

  return (
    <div className="bg-white w-64 p-4 border-r border-gray-300">
      <h2 className="text-xl font-semibold mb-4">Sidebar</h2>

      
      <div className="mb-4 flex items-center">
        <button
          onDragStart={(e) => handleDragStart(e, `Go to X: ${x}, Y: ${y}`)}
          draggable
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          Move to X:
          <input
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            placeholder="X"
            className="border text-black mx-2 p-1 rounded w-12"
          />
          Y:
          <input
            type="number"
            value={y}
            onChange={(e) => setY(e.target.value)}
            placeholder="Y"
            className="border text-black mx-2 p-1 rounded w-12"
          />
        </button>
      </div>

      
      <div className="mb-4 flex items-center">
        <button
          onDragStart={(e) => handleDragStart(e, `Move Right ${steps} steps`)}
          draggable
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
        >
          Move Right:
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Steps"
            className="border text-black mx-2 p-1 rounded w-12"
          />
        </button>
      </div>

      
      <div className="mb-4 flex items-center">
        <button
          onDragStart={(e) => handleDragStart(e, `Turn ${degrees} degrees`)}
          draggable
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center"
        >
          Turn:
          <input
            type="number"
            value={degrees}
            onChange={(e) => setDegrees(e.target.value)}
            placeholder="Degrees"
            className="border text-black mx-2 p-1 rounded w-12"
          />
          degrees
        </button>
      </div>

      
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "Move Forward")}
        className="mb-2 p-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        Move Forward
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "Move Backward")}
        className="mb-2 p-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        Move Backward
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "Turn Right")}
        className="mb-2 p-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        Turn Right
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "Turn Left")}
        className="mb-2 p-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        Turn Left
      </div>
    </div>
  );
}

