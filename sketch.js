var balloon,balloonImg,balloonImg2,balloonImg3,bg,bgImg,balloonPosition;


function preload(){

  bgImg=loadImage("bg.png");
  balloonImg=loadAnimation("balloon1.png","balloon2.png","balloon3.png");
  balloonImg2=loadAnimation("balloon2.png");
  balloonImg3=loadAnimation("balloon3.png");
  
}
function setup() {
  database=firebase.database();

  createCanvas(1000,600);

  bg=createSprite(500,300,1000,600);
  bg.addImage(bgImg);
  bg.scale=0.4;
  balloon=createSprite(400, 200, 50, 50);
  balloon.addAnimation("flyingBalloon",balloonImg);
  balloon.scale=0.6;

  balloonPosition = database.ref('hotAirBalloonn/height');
  balloonPosition.on("value",readHeight,showError);
}

function draw() {
  background(0); 
  
    if(keyDown(LEFT_ARROW)){
      balloon.x=balloon.x-10;
      updateHeight(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      balloon.x=balloon.x+10;
      updateHeight(+10,0);
    }
    else if (keyDown(UP_ARROW)){
      balloon.y=balloon.y-10;
      balloon.addAnimation("flyingBalloon",balloonImg2);
      balloon.scale=balloon.scale-0.01;
      updateHeight(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
      balloon.y=balloon.y+10;
      balloon.addAnimation("flyingBalloon",balloonImg3);
      balloon.scale=balloon.scale+0.01;
      updateHeight(0,+10);
    }

  drawSprites();
  textSize(25);
  strokeWeight(5);
  fill ("black");
  text("Use Arrow Keys to move the HotAirBalloon",5,20);
}
function updateHeight(x,y){
  database.ref('hotAirBalloonn/height').set({
    'x': height.x+x,
    'y': height.y+y
  })
}
function readHeight(data){
  height = data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}
function showError(){
  console.log("Error in writing to the database");
}