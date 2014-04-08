var N = 8;
var matrix = [[0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0]];


function initGame(){
}



function placerReine(x,y) {
  if(matrix[x][y] == 0){
    matrix[x][y] = 1;
    return true;
  }
  return false;
}

function bloquerPlacements(x, y) {

  for(var i = 0; i < N;i++) {
      matrix[x][i] = -1; // Horizontal
      matrix[i][y] = -1; // Vertical
      
      if( y+i < 8 && x+i < 8)
        matrix[i+x][i+y] = -1; // Diag1 bas

      if((x-i) >= 0 && (y-i) >=0)
        matrix[x-i][y-i] = -1; // Diag1 haut

      if((x-i) >= 0 && (y + i) < 8)
      matrix[x-i][y+i] = -1; // Diag2 Bas

      if( y-i >= 0 && x+i < 8)
        matrix[x+i][y-i] = -1; // Diang2 haut
  }

  matrix[x][y] = 1; // Corriger la matrice
}


function afficher(){
  var msg = "";
  for(var i = 0; i < N;i++)
  {
    for(var j = 0; j < N;j++){
      msg = msg + '|'+matrix[i][j];
    }
    msg = msg + '\n';
    console.log(msg);
    msg = "";
  }
}

