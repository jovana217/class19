var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale= 0.4
  doorsGroup=new Group()
  climbersGroup= new Group()
  invisibleBlockGroup= new Group()
  
}

function draw() {
  background(200);
  if(gameState == "play")
  {
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown(LEFT_ARROW)){
      ghost.x=ghost.x-2
    }
    if(keyDown(RIGHT_ARROW)){
      ghost.x=ghost.x+2
    }
    if(keyDown("space")){
      ghost.velocityY=-10

    }
    ghost.velocityY=ghost.velocityY+0.8
    spawnBalconies()
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY=0
    }
    if(ghost.y>600 || ghost.isTouching(invisibleBlockGroup)){
      gameState="end"
    }

    drawSprites()

  }
  else if(gameState == "end")
  {
    fill("white")
    textSize(35)
    text("GAME OVER",200,300)

  }
  
}
function spawnBalconies(){
  if(frameCount%200==0){
    door=createSprite(300,-50)
    door.addImage(doorImg)
    door.velocityY=1
    climber=createSprite(300,10)
    climber.addImage(climberImg)
    climber.velocityY=1
    invisibleBlock=createSprite(300,15)
    invisibleBlock.velocityY=1
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
    door.x=random(120,400)
    climber.x=door.x
    invisibleBlock.x=door.x
    ghost.depth=door.depth
    ghost.depth=ghost.depth+1
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.debug=true
  }

}