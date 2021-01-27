var balloon, balloonImage,balloonImage2,balloonImage3;
var database ;
var height;
var backgImage;

function preload() {
  balloonImage = loadImage("Hot Air Ballon-02.png");
  balloonImage2 = loadImage("Hot Air Ballon-03.png");
  balloonImage3 = loadImage("Hot Air Ballon-04.png");
  backgImage = loadImage("Hot Air Ballon-01.png");
}

function setup(){
    createCanvas(displayWidth,displayHeight);
    database = firebase.database()
    balloon = createSprite(200,240,10,10);
    balloon.addImage( balloonImage)


var balloonPosition = database.ref("balloon/height");
balloonPosition.on("value", readHeight, showError())
//var.on creates a listener

}

function draw(){
    background(backgImage);
    if(keyDown(LEFT_ARROW)){
      updateHeight(-1,0);
        image(balloonImage2)

    }
    else if(keyDown(RIGHT_ARROW)){
     updateHeight(1,0);
     image(balloonImage3)
    }
    else if(keyDown(UP_ARROW)){
      if(balloon.scale>0){      
        updateHeight(0,-1);
      balloon.scale = balloon.scale-0.01;
      image(balloonImage3)
    }
    }
    else if(keyDown(DOWN_ARROW)){
      updateHeight(0,+1);
      image(balloonImage2)
      balloon.scale = balloon.scale+0.01;
    }
    drawSprites();


}

function readHeight(data) {
  height = data.val();
  balloon.x = height.x;    
  balloon.y = height.y;    
}
function updateHeight(x,y){
  database.ref("balloon/height").set({
      'x' : balloon.x + x,
      'y' : balloon.y + y
  });
}



function showError() {
  console.log("error in reading data from database")
}

function image(value) {
balloon.changeImage(value)
}