import React, {useState, useEffect} from "react";
import Node from "../node/Node.jsx";
import { Dijkstra, getNodesInShortestOrder } from "../algorithms/Dijkstra.js";
import Menu from "../menu/Menu.jsx";
{/* import { MyDijkstra, getNodesInShortestOrder } from "../algorithms/MyDijkstra.js"; */}

export default function Grid(){
    const [grid, setGrid] = useState([]);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const [START_NODE_ROW, setSTARTNODEROW] = useState(10);
    const [START_NODE_COL, setSTARTNODECOL] = useState(15);
    const [FINISH_NODE_ROW, setFINISHNODEROW] = useState(10);
    const [FINISH_NODE_COL, setFINISHNODECOL] = useState(35);
    const [algorithms, setAlgorithms] = useState(["Dijkstras", "More in Development"]);
    const [currAlgorithm, setCurrentAlgorithm] = useState("");

    const [movingStart, setMovingStart] = useState(false);
    const [movingFinish, setMovingFinish] = useState(false);


    useEffect(() => {
        setGrid(generateGrid);
    }, []);

    function generateGrid(){
        const grid = [];
        for(let row = 0; row < 20; row++){
           const currentRow = [];
           for(let col = 0; col < 50; col++){
               currentRow.push(createNode(col, row)); 
           }
           grid.push(currentRow);

        }
        return grid;
    }

    function createNode(col, row){
        return {
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            isWall: false,
            distance: Infinity,
            previousNode: null,
            isVisited: false,
        }

    }

    function setFinishNode(grid, row, col){
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const oldNode = newGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const oldFinishNode = {
            ...oldNode,
            isFinish: false,
        };
        setFINISHNODEROW(row);
        setFINISHNODECOL(col);
        const newFinishNode = {
            ...node,
            isFinish: true,
        };

        newGrid[FINISH_NODE_ROW][FINISH_NODE_COL] = oldFinishNode;
        newGrid[row][col] = newFinishNode;
        return newGrid;

    }

    
    function setStartNode(grid, row, col){
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const oldStart = newGrid[START_NODE_ROW][START_NODE_COL];
        const oldStartNode = {
            ...oldStart,
            isStart: false,
        };
        setSTARTNODEROW(row);
        setSTARTNODECOL(col);
        const newStartNode = {
            ...node,
            isStart: true,
        };

        newGrid[START_NODE_ROW][START_NODE_COL] = oldStartNode;
        newGrid[row][col] = newStartNode;
        return newGrid;

    }

    function handleMouseEnter(row, col){
        //if we are moving the start node
        if(movingStart){
            //new -------------------
            const newGrid = setStartNode(grid, row, col);
            setGrid(newGrid);
            //end new
            //old
            {/* animateStartNodeMove(row, col); */}
        }
        else if(movingFinish){
            const newGrid = setFinishNode(grid, row, col);
            setGrid(newGrid);
        }
        else {
            if(!isMousePressed) return;
            const newGrid = newGridToggleWall(grid, row, col);
            setGrid(newGrid);

        }
    }

    function handleMouseDown(row, col){
        setIsMousePressed(true);
        if(row === START_NODE_ROW && col === START_NODE_COL)
            setMovingStart(true);
        else if(row === FINISH_NODE_ROW && col === FINISH_NODE_COL)
            setMovingFinish(true);
        else{
            const newGrid = newGridToggleWall(grid, row, col);
            setGrid(newGrid); 
        }

    }

    function newGridToggleWall(grid, row, col){
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }

    function handleMouseUp(){
       setIsMousePressed(false);  
        if(movingStart) {
            console.log(START_NODE_ROW);
            setStartNode(grid, START_NODE_ROW, START_NODE_COL);
            setMovingStart(false);
        }
        if(movingFinish) {
            setMovingFinish(false);
            setFinishNode(grid, FINISH_NODE_ROW, FINISH_NODE_COL);
        }
    }


    function animateShortestPath(nodesInShortestOrder){
        for(let i = 0; i < nodesInShortestOrder.length; i++){
            const node = nodesInShortestOrder[i];
            setTimeout(() => {
                document.getElementById(`node-${node.row}-${node.col}`).className="node shortest-path";
            }, 50 * i);
        }
    }

    function animateDijkstras(visitedNodesInOrder, nodesInShortestOrder){
        for(let i = 0; i <= visitedNodesInOrder.length; i++){
            if(i === visitedNodesInOrder.length){
                setTimeout(() => {
                    animateShortestPath(nodesInShortestOrder);
                }, 10 * i);
                return;     
            }
            setTimeout(() => {
            const node = visitedNodesInOrder[i]; 
                document.getElementById(`node-${node.row}-${node.col}`).className="node node-visited";
                
            }, 10 * i);
        }

        
    }

    function visualiseDijkstras(){
        if(currAlgorithm === "Dijkstras"){
            const startNode = grid[START_NODE_ROW][START_NODE_COL];
            const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
            const visitedNodesInOrder = Dijkstra(grid, startNode, finishNode);
            const nodesInShortestOrder = getNodesInShortestOrder(finishNode);

            animateDijkstras(visitedNodesInOrder, nodesInShortestOrder);

        }
    }



    return(
       <section id="app"> 
        <Menu setCurrentAlgorithm={setCurrentAlgorithm} visualiseDijkstras={visualiseDijkstras} algorithms={algorithms}/>


        {/* --------------------------------- key ------------------------------------------------------------ */}
        <div className="flex flex-row justify-center mt-4">
            <div className="flex pt-4">
                <h1 className="mx-6">Start Node:</h1><Node isStart={true}/>
            </div>
            <div className="flex pt-4">
                <h1 className="mx-6">Finish Node:</h1><Node isFinish={true}/>
            </div>
            <div className="flex pt-4">
                <h1 className="mx-6">Wall Node:</h1><Node isWall={true}/>
            </div>
            <div className="flex pt-4">
                <h1 className="mx-6">Shorted Path:</h1><div className="node shortest-path"></div>
            </div>
        </div>
        {/* --------------------------------- key ------------------------------------------------------------ */}




        <div className="m-22 select-none 2xl:m-24">
            {/* <button onClick={visualiseDijkstras} className="bg-green-800 rounded p-2 text-white m-4">Visualize Algorithm</button> */}
            {grid.map((row, rowIdx) => {
               return <div key={rowIdx} className="font-none"> 
                   {row.map((node, nodeIdx) => {
                        const {row, col, isWall, isStart, isFinish} = node;
                        return (
                            <Node
                            key={nodeIdx}
                            row={row}
                            col={col}
                            isMousePressed={isMousePressed}
                            onMouseDown={(row, col) => handleMouseDown(row, col)}
                            onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                            onMouseUp={() => handleMouseUp()}
                            isWall={isWall}
                            isStart={isStart}
                            isFinish={isFinish}>
                            </Node>
                        );
                   })}
                </div>
            })} 
        </div>
    </section>
    );
}
