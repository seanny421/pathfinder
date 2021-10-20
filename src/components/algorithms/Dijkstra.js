export function Dijkstra(grid, startNode, finishNode){

   const visitedNodesInOrder = [];  
   startNode.distance = 0;
   const unvisitedNodes = getAllNodes(grid);
   while(!!unvisitedNodes.length){
        //sort all nodes by distance (shortest 1st in list) then use
        //shift to remove first element and return it (closestNode = sortedNodes[0])
       sortNodesByDistance(unvisitedNodes); 
       const closestNode = unvisitedNodes.shift();

        //skip if its a wall
       if(closestNode.isWall)
            continue;


        if(closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if(closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNodes(closestNode, grid);
   }




}

function updateUnvisitedNodes(closestNode, grid){
    const unvisitedNeighbours = getUnvisitedNeighbours(closestNode, grid);
    for(const neighbour of unvisitedNeighbours){
        neighbour.distance = closestNode.distance + 1;
        neighbour.previousNode = closestNode;
    }
    console.log(unvisitedNeighbours);
}

function getUnvisitedNeighbours(node, grid){
    const neighbours = [];
    const {row, col} = node;
    if(row > 0) neighbours.push(grid[row - 1][col]);
    if(row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    //node above current node
    if(col > 0) neighbours.push(grid[row][col-1]);
    if(col < grid[0].length - 1) neighbours.push(grid[row][col+1]);
    
    return neighbours.filter(neighbour => !neighbour.isVisited);
}

function sortNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getAllNodes(grid){
    const nodes = [];
    grid.forEach(row => {
        row.forEach(node => {
           nodes.push(node); 
        });
    });
    return nodes;
}

export function getNodesInShortestOrder(finishNode){
    const nodesInShortestOrder = [];
    let currentNode = finishNode;
    while(currentNode != null){
        nodesInShortestOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestOrder;
    
}
