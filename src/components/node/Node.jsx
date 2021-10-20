import React from "react";

export default function Node({row, col, isStart, isFinish, isWall, isCorner, onMouseUp, onMouseEnter, onMouseDown, isVisited}){
    return(
        <div 
            id={`node-${row}-${col}`}
            onMouseDown={() => onMouseDown(row, col)} 
            onMouseUp={() => onMouseUp()} 
            onMouseEnter={() => onMouseEnter(row, col)} 
            className={`node 
            ${isStart ? "bg-green-700": ""} 
            ${isFinish ? "bg-red-800": ""} 
            ${isCorner ? "rounded-xlg" : ""}
            ${isVisited ? "node-visited" : ""}
            ${isWall ? "bg-purple-300": ""}`}>
        </div>
    );
}
