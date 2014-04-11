var N = 8;
var matrix = [[0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0]];
  var canvas = document.getElementById("id_canvas");
  var ctx = canvas.getContext("2d");
  var img = document.createElement('img');
  // definit le fichier
  img.src = 'img/queen.png';



//window.onload = function(){init();};

function init(){
/*
  var canvas = document.getElementById("id_canvas");
  var ctx = canvas.getContext("2d");
  var img = document.createElement('img');
  // definit le fichier
  img.src = 'img/queen.png';
*/

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

window.onload = function draw(){
  if (canvas.getContext) {
   // var ctx=canvas.getContext('2d');
    ctx.fillStyle = "rgb(100,200,0)"; // choix de couleur

    /******* 
    * taille du carreau : 3+3 + 80*8 + 2*7 = 660px
    * bordure externe = 3px
    * bordure inter-cellules = 2 px
    * taille cellule = 80 px 
    ********/
    var size = 6 + 80*N + 2*(N-1);
    ctx.fillRect(5,5,size,size); // remplissage
    var i =0;
    var j =0;
    for (var y=8; y<=size; y+=82){
      for (var x=8; x<=size; x+=82){
        if (i%2 == 0){
          if (j%2 == 0)
            ctx.clearRect(x,y,80,80);
          else{
            ctx.fillStyle = "rgb(100,0,200)";
            ctx.fillRect(x,y,80,80)
          }
        }
        else{
          if (j%2 == 0){
            ctx.fillStyle = "rgb(100,0,200)";
            ctx.fillRect(x,y,80,80);
          }
          else
            ctx.clearRect(x,y,80,80)
        }
        
        var centreX = x+(80/2)-15;
        var centreY = y+(80/2)+19;
        /*
        ctx.font = 'normal 50px Metal';
        ctx.fillStyle = "rgb(1000,0,0)";
        console.log('i=' +i+ ' j='+j+' '+matrix[i][j]);
        ctx.fillText(matrix[i][j],centreX,centreY);
        */
        j+=1;
      }
    i+=1;
    j=0;
    }
    
  }
}

canvas.onclick = function(e){
//  if (e.pageX < 600 && e.pageY < 600){
   
  
  var posX = e.pageX;
  var posY = e.pageY;

  var i = Math.floor(posX / 80);
  var j = Math.floor(posY / 80);
//}
  
  if ( i >= 660 || i < 8 || j >= 660 || j < 8)
  {
    return;
  }

  if (matrix[i][j] != -1)
  {
    return;
  }

  ctx.dawImage(img,posX,posY,60,60);    
}

// Exécution de la fonction
//draw()
