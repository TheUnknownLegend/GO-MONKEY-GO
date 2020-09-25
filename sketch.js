var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var ground;
var FoodGroup, obstacleGroup;
var score = 0;
var background1, background2;
var sound1, sound2;
var gameover, gameover1;

var RUNNING = 0;
var END = 1;
var gameState = 0;

function preload() {

  monkeyImg = loadImage("sprite_0.png");
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  background2 = loadImage("images.jfif");
  sound1 = loadSound("Banana.flac");
  sound2 = loadSound("gameOver.wav");
  gameover1 = loadImage("GAMEOVER.jpg");

}



function setup() {
  createCanvas(600, 600);
  background1 = createSprite(300, 300, 3, 3);
  background1.addImage("background", background2)
  background1.scale = 3.5;

  ground = createSprite(300, 580, 800, 10);
  ground.shapeColor = "lightgrey";

  monkey = createSprite(100, 520, 1, 1);
  monkey.addAnimation("Mr.Monkey", monkey_running);
  monkey.scale = 0.2;

  obstacleGroup = createGroup();
  FoodGroup = createGroup();
}


function draw() {

  //jump when the space key is pressed
  if (keyDown("space") && monkey.y >= 400) {
    monkey.velocityY = -13;
  }

  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8

  monkey.collide(ground);


  if (gameState === RUNNING) {
    food();
    obstacleSpawner();
    drawSprites();
    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score + 1;
      sound1.play();
    }

      if (obstacleGroup.isTouching(monkey)) {
        gameState = END;
        sound2.play();
      }
    
  } else if (gameState === END) {
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();

    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityEach(0);

    if (keyDown('r')) {
      gameState = RUNNING;
    }

    fill("red");
    textFont("Curlz MT");
    textSize(30);
    text("You Died", 280, 270);

    fill("brown");
    textFont("Curlz MT");
    textSize(30);
    text("Press 'R' to Restart", 240, 300);

  }

  fill("green");
  textFont("Castellar");
  textSize(18);
  text("Score : " + score, 20, 25);
}

function food() {
  if (frameCount % 200 === 0) {
    banana = createSprite(520, 530, 1, 1);
    banana.addImage("baanaanaa", bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -8;
    banana.lifetime = 800;
    FoodGroup.add(banana);
  }

}

function obstacleSpawner() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(520, 530, 1, 1);
    obstacle.addImage("itsArock", obstacleImage);
    obstacle.scale = 0.3;
    obstacle.velocityX = -(7.5 + 3 * score / 5);
    obstacle.lifetime = 800;
    obstacleGroup.add(obstacle);
  }
}
