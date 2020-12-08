var sound1, sound2, sound3;
var shella, shell1;
var shellb, shell2;
var shellc, shell3;
var enemy1, enemya;
var enemyb, enemy2;
var diver, diver1;
var backgrounda, background1;
var score = 0,
  lives = 3,
  gameState = "play";
var shellgroup, enemygroup;

function preload() {
  background1 = loadImage("BACKGROUND.JPG");
  diver1 = loadImage("DIVER.PNG");
  shella = loadImage("SHELL1.PNG");
  shellb = loadImage("SHELL2.PNG");
  shellc = loadImage("SHELL3.PNG");
  enemya = loadImage("ENEMY1.PNG");
  enemyb = loadImage("ENEMY2.PNG");
  sound1 = loadSound("DEATH.WAV");
  sound2 = loadSound("BONUS.WAV");
  sound3 = loadSound("ENEMY.WAV")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgrounda = createSprite(width-350, height / 2);
  backgrounda.addImage(background1);
  backgrounda.scale = 0.7;
  backgrounda.velocityX = -5;

  diver = createSprite(70, height - 250);
  diver.addImage(diver1);
  diver.scale = 0.7;

  shellgroup = new Group();
  enemygroup = new Group();

}

function shell() {
  var select = Math.round(random(1, 3));
  if (frameCount % 120 == 0) {
    if (select == 1) {
      shell1 = createSprite(width, height / 2);
      shell1.addImage(shella);
      shell1.scale = 0.4;
      shell1.velocityX = -5;
      shellgroup.add(shell1);
    }

    if (select == 2) {
      shell2 = createSprite(width, height - 150);
      shell2.addImage(shellb);
      shell2.scale = 0.2;
      shell2.velocityX = -5;
      shellgroup.add(shell2);
    }

    if (select == 3) {
      shell3 = createSprite(width, height - 100);
      shell3.addImage(shellc);
      shell3.scale = 0.4;
      shell3.velocityX = -5;
      shellgroup.add(shell3);
    }
  }
}

function enemy() {
  var select = Math.round(random(1, 2));
  if (frameCount % 180 == 0) {
    if (select == 1) {
      enemy1 = createSprite(width, height / 2);
      enemy1.addImage(enemya);
      enemy1.scale = 0.5;
      enemy1.velocityX = -6;
      enemygroup.add(enemy1);
    }
    if (select == 2) {
      enemy2 = createSprite(width, height / 2);
      enemy2.addImage(enemyb);
      enemy2.scale = 0.5;
      enemy2.velocityX = -6;
      enemygroup.add(enemy2);
    }
  }
}

function draw() {
  background("red");
  //diver.velocityY=0;
  if (gameState == "play") {
    diver.y = mouseY;
    if (backgrounda.x <400) {
      backgrounda.x = backgrounda.width / 4;
    }
    shell();
    enemy();
    if (shellgroup.isTouching(diver)) {
      shellgroup.destroyEach();
      score = score + 2;
      sound2.play();
    }
    if (enemygroup.isTouching(diver)) {
      enemygroup.destroyEach();
      score = score - 5;
      lives = lives - 1;
      sound3.play();

    }
    if (lives <= 0) {
      gameState = "end";
      sound1.play();
    }
  }
  if (gameState == "end") {
    backgrounda.velocityX = 0;
    shellgroup.destroyEach();
    enemygroup.destroyEach();
    score = 0;
    lives = 3;
  }
  if (keyDown("space") || touches.length > 0) {
    gameState = "play";
    backgrounda.velocityX = -5;
    touches = [];
  }
  drawSprites();
  if (gameState == "end") {
    textSize(20);
    fill("black");
    text("GAMEOVER", width - 500, height / 2);
    text("PRESS SPACE TO BAR START", width - 800, height - 150);
  }
  textSize(25);
  fill("black");
  text("SCORE =" + score, width - 150, 50);
  text("LIVES =" + lives, 50, 50);
}