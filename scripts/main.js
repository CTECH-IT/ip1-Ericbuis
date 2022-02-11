var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var leanne = new Image();
var bg = new Image();
var fg = new Image();
var treeNorth = new Image();
var treeSouth = new Image();

leanne.src = "images/leanne.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
treeNorth.src = "images/treeNorth.png";
treeSouth.src = "images/treeSouth.png";


// some variables

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files

var scor = new Audio();

scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}

// tree coordinates

var tree = [];

tree[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < tree.length; i++){
        
        constant = treeNorth.height+gap;
        ctx.drawImage(treeNorth,tree[i].x,tree[i].y);
        ctx.drawImage(treeSouth,tree[i].x,tree[i].y+constant);
             
        tree[i].x--;
        
        if( tree[i].x == 125 ){
            tree.push({
                x : cvs.width,
                y : Math.floor(Math.random()*treeNorth.height)-treeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + leanne.width >= tree[i].x && bX <= tree[i].x + treeNorth.width && (bY <= tree[i].y + treeNorth.height || bY+leanne.height >= tree[i].y+constant) || bY + leanne.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }
        
        if(tree[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(leanne,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();