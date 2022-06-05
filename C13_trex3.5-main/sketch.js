var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var gamestate=("playing");

var obstaclesGroup;

var cloudsGroup;

var speed = -4;

var gameOver;

var gameOverSound;

var jumpSound;

var checkPointSound;

var restart;

var newImage;

var end = 1;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  trexCollided = loadAnimation("trex_collided.png");

  game_Over = loadImage("gameOver.png");

  restartImage = loadImage("restart.png");

  gameOverSound = loadSound("GameOverSound.mp3");

  jumpSound = loadSound("mario-bros-jump.mp3");

  checkPointSound = loadSound("mario-bros-checkpoint.mp3");

  obstacleImage1 = loadImage("obstacle1.png");
  obstacleImage2 = loadImage("obstacle2.png");
  obstacleImage3 = loadImage("obstacle3.png");
  obstacleImage4 = loadImage("obstacle4.png");
  obstacleImage5 = loadImage("obstacle5.png");
  obstacleImage6 = loadImage("obstacle6.png");
 
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  obstaclesGroup = new Group ()
  cloudsGroup = new Group ()

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;

  gameOver = createSprite(width/2,80,20,10);
  gameOver.addImage("gameOver",game_Over);
  gameOver.scale = 0.9

  restart1 = createSprite(width/2,135,10,10);
  restart1.addImage("restart",restartImage);
  restart1.scale = 0.73
  
  trex.addAnimation("trexCollided",trexCollided);

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = speed;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  gameOver.visible = false;
  restart1.visible = false;
  
  console.log("Hello"+ 5)
  
}

function draw() {
  console.log(gamestate);
  background("white");
  if (ground.x < 250){
    ground.x = ground.width/2;
  }
  trex.collide(invisibleGround);

  if(gamestate== "playing"){
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
      jumpSound.play()
    }
    trex.velocityY = trex.velocityY + 0.8

    spawnClouds();
    spawnObstacles();

  if(frameCount % 100==0){
    checkPointSound.play()
    speed= speed -4
    }
  }
  console.log(ground.veloxityX);
  console.log(speed);
  obstaclesGroup.setVelocityXEach(speed);
  ground.velocityX = speed
  

  if(trex.isTouching(obstaclesGroup)){
    gamestate = "end"
  }
  
  if(mousePressedOver(restart1)){
    reset()}

  if(gamestate== "end"){
    
    ground.velocityX = 0
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    trex.changeAnimation("trexCollided")
    gameOver.visible = true;
    restart1.visible = true; 
  if(end==1){
    
    gameOverSound.play()
    end = 2
  }

  }

  //spawn the clouds
  drawSprites();

}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(width,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloudsGroup.add(cloud);
    
    //assigning lifetime to the variable
    cloud.lifetime = 470
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
}

function reset(){
trex.changeAnimation("running")
gamestate = "playing"
restart1.visible = false
gameOver.visible = false
cloudsGroup.destroyEach()
obstaclesGroup.destroyEach()


}

function spawnObstacles(){

  if(frameCount % 200 === 0){
      
    obstacle = createSprite(width,170,15,15);
    obstacle.lifetime = 440
    
    obstacle.velocityX = speed 
    
    obstacle.scale = 0.7;
    
    obstaclesGroup.add(obstacle);

    switch(Math.round(random(1,6))){
    case 1: obstacle.addImage("Image1",obstacleImage1);
    break;
    case 2: obstacle.addImage("Image2",obstacleImage2);
    break;
    case 3: obstacle.addImage("Image3",obstacleImage3);
    break;
    case 4: obstacle.addImage("Image4",obstacleImage4);
    break;
    case 5: obstacle.addImage("Image5",obstacleImage5);
    break;
    case 6: obstacle.addImage("Image6",obstacleImage6);
    break;
    default:break;

    }
  }

}

