var dog, happyDog, database, foodS, foodStock;
var dogimg,happyDogimg;
var button1,button2;
var food;

function preload()
{
  dogimg = loadImage("../images/dog.png");
  happyDogimg = loadImage("../images/happyDog.png");
}

function setup() {

database = firebase.database();

createCanvas(1000,500);

dog = createSprite(800,200,50,15);
dog.scale = 0.5
dog.addImage(dogimg);

  foodStock = database.ref('Food')
  foodStock.on("value", readStock)

  textSize(15)
  fill("white");
  text("")

  food = new Food();
  button1 = createButton("Feed the Dog");
  button1.position(700,95);
  button1.mousePressed(feedDog)
  
  button2 = createButton("Add Food");
  button2.position(800,95);
  button2.mousePressed(addFood);
}

function draw() {  

  background(46, 139, 87)

  food.display();

fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
lastFed = data.val();
});

  drawSprites();

}

fill(255,255,254)
textSize(15);
if(lastFed>12){
text("Last Feed : "+ lastFed%12 +" PM",350,30)
}
else if(lastFed===0){
  text("Last Feed : 12 AM",350,30)
}
else{
text("Last Feed : "+ lastFed +" AM",350,30)

}

function readStock (data){
  foodS = data.val();
  food.updateFoodStock(foodS);
}

/*function writeStock(x){

if(x<=0){
  x=0;
}
else{
  x=x-1;
}

database.ref('/').update({
  
  Food:x

})
}*/

function feedDog(){
dog.addImage(happyDogimg);
food.updateFoodStock(food.getFoodStock()-1)
database.ref('/').update({
Food:food.getFoodStock(),
fedTime:hour()
})
}

function addFood(){
foodS++
database.ref('/').update({
Food:foodS
});
}