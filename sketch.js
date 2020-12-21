//Create variables here
var dog, dogImage;
var happydogImage;
var database, foodStock, foodS;
var fedTime, lastFed;
var foodObj;
var gardenImg,  bedroomImg, washroomImg;
var sadDogImg;
var gameState;

function preload()
{
  dogImage=loadImage("images/dogImg.png");
  happydogImage=loadImage("images/dogImg1.png");
  
  gardenImg=loadImage("virtualpetimages/Garden.png");
  bedroomImg=loadImage("virtualpetimages/Bed Room.png");
  washroomImg=loadImage("virtualpetimages/Wash Room.png")
  
  sadDogImg=loadImage("virtualpetimages/deadDog.png")
}

function setup() {
	createCanvas(1000, 500);
  database=firebase.database();
  foodObj=new food();
  foodStock=database.ref('food');
  foodStock.on("value", readStock);


  dog=createSprite(800, 200, 150, 150, 150);
  dog.addImage(sadDogImg);
  dog.scale=0.2;

  
    feedButton = createButton('Feed dog');
    feedButton.position(700, 95);
    feedButton.mousePressed(feedDog);

    restockButton = createButton('Restock food');
    restockButton.position(800, 95);
    restockButton.mousePressed(addFood);

    readState=database.ref('gameState');
    readState.on("value", function(data){
      gameState=data.val();
      console.log(gameState);
    });



}


function draw() {  

var currentTime=hour();
if(currentTime===(lastFed+1)){
  updateState("playing");
  foodObj.garden();
}else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
  updateState("bathing");
  foodObj.washroom();
}else if(currentTime===(lastFed+2)){
  updateState("sleeping");
  foodObj.bedroom();
}else{
updateState("hungry");
foodObj.display();
}


  //fill("white");
   // textSize(20);

 //text("Food Supply: "+ foodS, 50, 100);

  if(gameState!=="hungry"){
    feedButton.hide();
    restockButton.hide();
    dog.remove();
  }else{
    feedButton.show();
    restockButton.show();
    dog.addImage(sadDogImg);
  }


    drawSprites();
}


function writeStock(x){
  if(x<=0){
    x=0;
  } else{
    x=x-1;
  }

  database.ref(' / ').set({
    food:x
  })
}

function readStock(data){
  foodS=data.val();
  //console.log(foodS);
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  console.log(hour());
  dog.addImage(happydogImage);
//console.log(foodObj.getFoodStock);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime: hour(),
    gameState:"hungry"
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

function updateState(state){
  gameState: state
}