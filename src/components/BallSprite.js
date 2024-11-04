import React from "react";

export default function BallSprite() {
  return (


<svg
className="w-20 h-21"
viewBox="0 0 100 100"
xmlns="http://www.w3.org/2000/svg"
>
{/* Earth Circle */}
<circle cx="50" cy="50" r="48" fill="#4EBAF0" stroke="black" strokeWidth="2" />

{/* Landmasses */}
<path
  d="M30,40 C20,30 10,30 10,50 C10,70 30,60 40,50 C40,45 35,45 30,40 Z" 
  fill="#3BBF5C" 
/>
<path
  d="M70,30 C80,20 90,20 90,40 C90,60 70,50 60,40 C60,35 65,35 70,30 Z" 
  fill="#3BBF5C" 
/>
<path
  d="M50,70 C60,75 70,70 70,60 C70,50 60,55 50,55 C40,55 40,65 50,70 Z" 
  fill="#3BBF5C" 
/>
<path
  d="M30,55 C25,50 30,45 35,45 C40,45 45,50 40,55 C35,60 30,60 30,55 Z" 
  fill="#3BBF5C" 
/>

{/* Glossy Effect */}
<circle cx="35" cy="35" r="20" fill="white" opacity="0.2" />
</svg>
  );
}

