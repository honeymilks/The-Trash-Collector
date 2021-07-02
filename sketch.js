var bg, bgImg
var runner
var runnerImg
var gameState
var obstacles
var bimg
var limg
var obstaclesgroup
var edges
var trash,trashgroup
var boimg,cimg,pimg,vimg
var score=0
function preload() {
  bgImg = loadImage("Images/bg.jpg")
  runnerImg = loadAnimation("Images/C1.png", "Images/C2.png", "Images/C3.png", "Images/C4.png", "Images/C5.png", "Images/C6.png")
  bimg = loadImage("Images/banana 2.png")
  limg = loadImage("Images/logs.png")
 // boimg = loadImage("Images/bottle.png")
  pimg = loadImage("Images/paper.png")
  vimg = loadImage("Images/veg.png")
  cimg = loadImage("Images/box.jpg")

}



function setup() {
  createCanvas(displayWidth, displayHeight);
  bg = createSprite(width / 2, height / 2)
  bg.addImage(bgImg)
  bg.velocityX = -2
  bg.visible = false
  runner = createSprite(100, height - 40, 20, 20)
  runner.addAnimation("runner", runnerImg)
  obstaclesgroup= new Group()
  edges=createEdgeSprites()
  trashgroup = new Group()
}

function draw() {
  //background();  
  if (gameState === undefined) {
    welcomepg()
    if (keyDown("space")) {
      gameState = "PLAY"
    }
  }
  if (gameState === "PLAY") {
    //background();
    bg.visible = true
    bg.scale = 0.5
    if (bg.x < 200) {
      bg.x = width / 2;
    }
    //console.log(bg.x)
    if(frameCount % 100===0){
      spawnObstacles()
    }
    if(keyDown("up")&& runner.y>=680){
      runner.velocityY=-10
    }
    runner.velocityY+=0.5
    runner.collide(edges[3])
    console.log(runner.y)

    if(frameCount % 150===0){
      spawnTrash()
    }
    if(runner.isTouching(trashgroup)){
      score+=10
    }
    drawSprites();
  }

text("score:"+score,width-300,30)
}
function welcomepg() {
  background("peachpuff")
  textSize(24)
  text("Welcome,Press the space bar to start the game.", width / 2 - 150, height / 2);
}
function spawnObstacles() {
  obstacles = createSprite(width-50, height - 40)
  obstacles.velocityX = -2
  var randomno = Math.round(random(1, 2))
  switch (randomno) {
    case 1: obstacles.addImage(bimg)
      break;
    case 2: obstacles.addImage(limg)
      break;
      default: break
  }
  obstacles.scale=0.3
obstacles.lifetime=width/obstacles.velocityX
obstaclesgroup.add(obstacles)
}
function spawnTrash(){
trash = createSprite(width-50, height - 40)
 trash.velocityX = -2
  var randomno = Math.round(random(1, 4))
  switch (randomno) {
  //  case 1: trash.addImage(boimg)
     // break;
    case 1: trash.addImage(vimg)
      break;
      case 2: trash.addImage(pimg)
      break;
    case 3: trash.addImage(cimg)
      break;
      default: break
  }
  trash.scale=0.3
trash.lifetime=width/trash.velocityX
trashgroup.add(trash)
}