//variable
var trex, treximage,ground,groundimage,invi,cloud,cloudimage,obstacle,o1,o2,o3,o4,o5,o6,og,cg,go,goi,restart,restartImg,trexpop

var cp, die, jump

var gamestate = "play"
var score=0


function preload(){
  // Load the image and audio files....
  
  treximage = loadAnimation("trex1.png","trex3.png","trex4.png")
  
  groundimage=
    loadImage("ground2.png")
  
  cloudimage=
    loadImage("cloud.png")
  
  o1=
    loadImage("obstacle1.png")
    
  o2=
    loadImage("obstacle2.png")
    
  o3=
    loadImage("obstacle3.png")
    
  o4=
    loadImage("obstacle4.png")
    
  o5=
    loadImage("obstacle5.png")  
  
  o6=
    loadImage("obstacle6.png")
  
  goi=
    loadImage("gameOver.png")
  
  restartImg=
    loadImage("restart.png")
  
  trexpop=
    loadImage("trex_collided.png")
  
  cp=
    loadSound("checkPoint.mp3")
  
  die=
    loadSound("die.mp3")
  
  jump=
    loadSound("jump.mp3")
  
}
function setup(){
  createCanvas(600,200)
 //creating the Sprites 
 trex = createSprite (50,160,20,50)
  trex.addAnimation("trex",treximage)
  trex.addAnimation("pop",trexpop)
  trex.scale = 0.7
  
  ground = createSprite (200,180,400,20)
  ground.addImage("ground",groundimage)


  go = createSprite(300,100)
  go.addImage("go",goi)
  go.scale=0.9
  
  restart=createSprite(300,140)
  restart.addImage("restart",restartImg)
  restart.scale=0.5
  
  //creating invi
  invi=createSprite(200,200,400,10)
  
  invi.visible=false
  
   og=createGroup()
   cg=createGroup()
  
  
  
  trex.debug=false
  trex.setCollider("rectangle",0,0,100,100)
}
function draw(){
  background("white")
  drawSprites()
  
  
  
  textSize(20)
  text("Score  - "+ score,20,40)
  if (gamestate=="play"){
//giving velocity
    ground.velocityX=-10+score/100
 trex.changeAnimation("trex",treximage) 
    //calculating the score
    score=score+Math.round(frameCount/70)
    go.visible=false
    restart.visible=false
    clouds() 
  obstacles()
      //If Ground reaches 0 it comes back to 200.
  if (ground.x < 0){
    ground.x=ground.width/2
    
    
  
  }
     trex.velocityY+=0.8 //Adding Gravity
          
  edges=createEdgeSprites()
  trex.collide(invi) 
      
 //When the trex is collided to the invi only then we should be able to click space, to make trex jump.
if(keyDown("space")&&trex.collide(ground)){
  trex.velocityY=-14
jump.play()
}  
    
    if (trex.isTouching(og)){
      gamestate="end"
      die.play();
    }
 
  } else if(gamestate=="end"){
  
  ground.velocityX=0
  cg.setVelocityXEach(0)
  og.setVelocityXEach(0)
  og.setLifetimeEach(-1)
  cg.setLifetimeEach(-1)
  go.visible=true
  restart.visible=true
  trex.velocityY=0
    
    trex.changeAnimation("pop", trexpop)
    if (mousePressedOver(restart)){
      
    reset()  
    }
  }

}

function reset(){
  gamestate="play"
  go.visible=false
  cg.destroyEach();
  og.destroyEach();
  score=0
}

function clouds(){
 if (frameCount%60==0) {
   
   // Frame count is the amount of space between the object(cloud in the way we are doing it)......
   

  cloud=createSprite(600,80)
   
  cloud.velocityX=-4
  cloud.addImage("cloud",cloudimage)
  cloud.depth=trex.depth
  trex.depth++      
  cloud.y=Math.round(random(30,60))
   
   cloud.lifetime=160
   
   cg.add(cloud)
   
 }

  
}

function obstacles(){
  if(frameCount%60==0){
obstacle=createSprite(600,165)
obstacle.velocityX= -10+score/100     
    
    obstacle.scale=0.7
    
    og.add(obstacle)
    obstacle.lifetime=150
    
     var rand =  Math.round(random(1,6)) //= local scope variable
     switch(rand){
       case 1:obstacle.addImage("o1",o1)
         break
         case 2:obstacle.addImage("o2",o2)
         break
         case 3:obstacle.addImage("o3",o3)
         break
         case 4:obstacle.addImage("o4",o4)
         break
         case 5:obstacle.addImage("o5",o5)
         break
         case 6:obstacle.addImage("o6",o6)
         break
         
     }
     }
  
          
  
}




