//Create variables here
var database;
var dog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dog.png");
  happyDogImg = loadImage("images/happyDog.png");
}

function setup() {
   database = firebase.database();

   foodStock = database.ref('Food');
   foodStock.on("value",readStock);

  createCanvas(500, 500);

  dog = createSprite(250,330);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  
}


function draw() { 
  background(46, 139, 87); 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();

  //add styles here
  textSize(17);
  fill("white");
  stroke(0);
  text("Food remaining: "+foodS,170,200);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}


