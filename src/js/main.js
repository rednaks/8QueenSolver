var N = 8;
var root = null;
var solutions = null;

var matrix = createSizedMatrix(N);
var matrixForDraw = matrix;
var canvas;
var ctx;
var img;

window.addEventListener("load", function () {
 canvas = document.getElementById("id_canvas");
 ctx = canvas.getContext("2d");
 img = document.createElement('img');
// definit le fichier
img.src = 'img/queen.png';
});



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
//Console
function printSolutions(aArrayOfSolutions) {
  for(var i = 0; i < aArrayOfSolutions.length; i++) {
    console.log('Sol ' + i);
    afficher(aArrayOfSolutions[i].data);
  }
}

//draw
function draw(aMatrix,origineX,origineY){
 if (canvas.getContext) {
    ctx.fillStyle = "rgb(100,200,0)"; // choix de couleur

    /******* 
    * taille du carreau : 3+3 + 80*8 + 2*7 = 660px
    * bordure externe = 3px
    * bordure inter-cellules = 2 px
    * taille cellule = 80 px 
    ********/

    var size = 6 + 80*N + 2*(N-1);
//  origineY = origineY*(size+20);
    console.log('origineX : ' + origineX + '       origineY : '+origineY);
    ctx.fillRect(origineX,origineY,size,size); // remplissage
    var i =0;
    var j =0;
    for (var y=origineY+3; y < size-1; y+=82){
      for (var x=origineX+3; x < size-1; x+=82){
        if (i%2 == 0){
          if (j%2 == 0)
            ctx.clearRect(x,y,80,80);
          else{
            ctx.fillStyle = "rgb(100,0,200)";
            ctx.fillRect(x,y,80,80);
          }
        }
        else{
          if (j%2 == 0){
            ctx.fillStyle = "rgb(100,0,200)";
            ctx.fillRect(x,y,80,80);
          }
          else
            ctx.clearRect(x,y,80,80);
        } 
        if(aMatrix[i][j] == 1){
          ctx.drawImage(img,x+10,y+10,60,60);
        }
        j+=1;
      }
    i+=1;
    j=0;
    }

  }
}

function drawSolution(aArrayOfSolutions) {
  var nSol = aArrayOfSolutions.length;
  if(nSol == 0) {
    alert("Aucune solution");
    return;
  }

  var sol = Math.floor(Math.random() * nSol);

  draw(aArrayOfSolutions[sol].data,0,0);
}



// Events 

function buildTreeOnClick() {
  N = document.getElementById("dim").value;
  if(N > 7) {
    alert("Oops, je crains que je n'ai pas assez de RAM pour calculer, sorry :s");
    return;
  }
  root = buildTree(N);
}

function searchForSolutionsOnClick() {

  if(root == null) {
    alert("Vous devez générer l'arbre de décision d'abord");
    return;
  }

  solutions = searchForSolutions(root);

}

function drawSolutionOnClick() {
  if(solutions == null) {
    alert("Vous devez générer les solutions !");
    return;
  }

  drawSolution(solutions);

}

