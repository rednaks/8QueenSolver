var N = 8;
var matrix = createSizedMatrix(N);


function createSizedMatrix(aSize){
  N = aSize;
  var row = new Array();
  for(var i = 0; i < aSize; i++)
    row[i] = 0;

  var matrix = new Array();
  for(var i = 0; i < aSize; i++)
    matrix[i] = row.slice(0); // Copy by value.

  return matrix;
}


function placerReine(aMatrix, x,y) {
  if(aMatrix[x][y] == 0){
    aMatrix[x][y] = 1;
    return true;
  }
  return false;
}

function bloquerPlacements(aMatrix, x, y) {

  for(var i = 0; i < N;i++) {
      aMatrix[x][i] = -1; // Horizontal
      aMatrix[i][y] = -1; // Vertical
      
      if( y+i < N && x+i < N)
        aMatrix[i+x][i+y] = -1; // Diag1 bas

      if((x-i) >= 0 && (y-i) >=0)
        aMatrix[x-i][y-i] = -1; // Diag1 haut

      if((x-i) >= 0 && (y + i) < N)
      aMatrix[x-i][y+i] = -1; // Diag2 Bas

      if( y-i >= 0 && x+i < N)
        aMatrix[x+i][y-i] = -1; // Diang2 haut
  }

  aMatrix[x][y] = 1; // Corriger la matrice
}


function afficher(aMatrix){
  var msg = "";
  for(var i = 0; i < N;i++)
  {
    for(var j = 0; j < N;j++){
      msg = msg + '|'+aMatrix[i][j];
    }
    msg = msg + '\n';
    console.log(msg);
    msg = "";
  }
}


function solvedGame(aMatrix) {
  var nQueens = 0;
  for(var i = 0; i < N; i++) {
    for(var j = 0; j< N; j++) {
      if(aMatrix[i][j] == 1)
        nQueens++;
    }
  }

  return nQueens == N;
}

function copyMatrixByVal(aMatrix){
  return JSON.parse(JSON.stringify(aMatrix));
}

function createNode(aMatrix, aEmptyTiles){
  var node = {
    data: aMatrix,
    emptyTiles: aEmptyTiles, // An array of coords that contains the emptyTiles.
    children: new Array()
  }

  return node;
}

function getEmptyTiles(aMatrix){
  var emptyTiles = new Array();
  var n = 0;
  for(var i = 0; i < N; i++){
    for(var j = 0; j < N; j++){
      if(aMatrix[i][j] == 0)
        emptyTiles[n++] = [i, j];
    }
  }

  return emptyTiles;
}


function buildTree(aSize){

  var matrix = createSizedMatrix(aSize);
  var emptyTiles = getEmptyTiles(matrix);
  var root = createNode(matrix, emptyTiles);
  buildTreeRoot(root);

  return root;
}



function buildTreeRoot(root){

  for(var i = 0;i < root.emptyTiles.length; i++){
    var aMatrix = copyMatrixByVal(root.data);
    var tile = root.emptyTiles[i];

    if(placerReine(aMatrix, tile[0], tile[1])){
      bloquerPlacements(aMatrix, tile[0], tile[1]);

      var emptyTiles = getEmptyTiles(aMatrix);
      var node = createNode(aMatrix, emptyTiles);
      root.children.push(node);
      buildTreeRoot(node); // The new node will be considered as root for the next iteration call.
    }
  }

}


function solutionAlreadyFound(aArrayOfSolutions, aSolution) {
  for(var i = 0; i < aArrayOfSolutions.length;i++) {
    if(aArrayOfSolutions[i].data.toString() == aSolution.data.toString())
      return true;
  }

  return false;
}


function searchForSolutions(root) {

  var solutions = new Array();
  dfs(root, solutions);

  return solutions;
}




function dfs(root, aSolutions){

  var nChildren = root.children.length;
  if(nChildren == 0) {
    if(solvedGame(root.data))
      return root;
    return null;
  }

  for(var i = 0; i < nChildren; i++){
    var sol = dfs(root.children[i], aSolutions);
    if(sol != null)
      if(!solutionAlreadyFound(aSolutions, sol))
        aSolutions.push(sol);
  }
}

function printSolutions(aArrayOfSolutions) {
  for(var i = 0; i < aArrayOfSolutions.length; i++) {
    console.log('Sol ' + i);
    afficher(aArrayOfSolutions[i].data);
  }
}
