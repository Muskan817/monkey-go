//global variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground,groundImage,invisible;
var survivalTime=0;
var gameState="play";

function preload(){
  
  
        //preloads for animation and images
        monkey_running =          loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")

        bananaImage = loadImage("banana.png");
        obstaceImage = loadImage("stone.png");
        groundImage=loadImage("jungle.jpg");
}



function setup() {
        createCanvas(700,400);
        
        //created sprites
        ground=createSprite(300,200,700,5);
        ground.addImage("jungle",groundImage);
        monkey=createSprite(70,355)
        
        //added animation to monkey and scaled it down
        monkey.addAnimation("running",monkey_running);
        monkey.scale=0.21;
        invisibleGround=createSprite(300,390,700,5);
  
        //groups
        FoodGroup=new Group();
        obstacleGroup=new Group();
        
}


function draw() {
       if(gameState==="play"){
            background("white");

          
           //space condition for the monkey
         if(keyDown("space")&&monkey.y>=320){
          monkey.velocityY=-20;
         }
         //added gravity to monkey
         monkey.velocityY = monkey.velocityY + 0.8;
         
         if(FoodGroup.isTouching(monkey)){
           FoodGroup.destroyEach();
           survivalTime=survivalTime+2
         }
        

  
             //moving ground
           ground.velocityX=-3
         
           //infinite ground
           if (ground.x < 350){
           ground.x = ground.width/2;
           }
        
       
        
    
         food();
         obstacle();
         monkey.visible=true;
         
         invisibleGround.visible=false;
  

  
        //monkey collide with the ground
        monkey.collide(invisibleGround);

       drawSprites();
  
  
       fill("white");
       stroke("white");
       textSize(20);
       text("Score:"+survivalTime,100,50)
       }
    if(obstacleGroup.isTouching(monkey)){
            gameState="end"; 
             }
  if(gameState==="end"){
     textSize(30)
     fill("white")
     stroke("white");
     text("Game Over",280,200);
     }
}


function food(){

      if(frameCount%80 === 0){
        //food sprite
         var food1=createSprite(500,120,70,50)
         //random y position
         food1.y=Math.round(random(120,200))
        //added image to monkey
         food1.addImage("food",bananaImage);
        //velocity to move the food
         food1.velocityX=-9;
        //decreased the size of food
         food1.scale=0.11;
        //lifetime for the food to protect it from memory leak
         
        //added food to the food group
         FoodGroup.add(food1);
         }
}

function obstacle(){
 if(frameCount% 300 === 0){
    var stone=createSprite(600,355);
    stone.velocityX=-10;
    stone.addImage("obstacle",obstaceImage);
      obstacleGroup.add(stone);
   stone.scale=0.3;
    } 
  
}

