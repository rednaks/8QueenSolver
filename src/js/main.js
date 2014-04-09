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

function draw(){
  var canvas = document.getElementById('id_canvas');
  if (canvas.getContext) {
    var ctx=canvas.getContext('2d');
    ctx.fillStyle = "rgb(100,200,0)";//choix de couleur
    //taille du carreau : 3+3 + 80*8 + 2*7 = 660px
    // bordure externe = 3px
    // bordure inter-cellules = 2 px
    // taille cellule = 80 px
    ctx.fillRect(5,5,660,660);//remplissage
    
    for (var y=8; y<=660; y+=82){
      for (var x=8; x<=660; x+=82){
        ctx.clearRect(x,y,80,80);
        //var centreX = x1+(80/2)-15;
        //var centreY = y1+(80/2)+19;
        //ctx.font = 'normal 50px Metal';
        // console.log('i=' +i+ ' j='+j+' '+tab[i][j]);
        //valeur = getRandom();
        //ctx.fillText(tab[i][j],centreX,centreY);
      }
    }
    
  }
}

// Exécution de la fonction
draw()
