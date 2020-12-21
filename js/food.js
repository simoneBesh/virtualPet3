class food{
    constructor(){
  
     this.image=loadImage("Milk.png");
     this.lastFed=0;
     this.foodStock=0;
    }

display(){
    background(46, 139, 87);
fill("pink");
textSize(15);
if(lastFed>=12){
    text("lastFed: "+lastFed%12+"PM", 50, 30);
}else if(lastFed===0){
    text("lastFed: 12AM", 50, 30);
}else{
    text("lastFed: "+lastFed+ "AM", 50, 30);
}

    var x = 70, y=100;
    //var pos =this.body.position;
    imageMode(CENTER);

    if(this.foodStock!== 0){
    for(var i = 0; i<this.foodStock; i++){
        if(i%10===0){
            x=70;
            y=y+50;
        }
        image(this.image, x, y, 50, 50);
        x=x+30;
    }
}


}

  
getFoodStock(){
    //console.log(this.foodStock);
return this.foodStock;
}

updateFoodStock(foodStock){
   // console.log(foodStock);
    this.foodStock=foodStock;
}

deductFood(){
    if(foodStock>0){
        this.foodStock=this.foodStock-1;
    }
}

getFeedTime(lastFed){
    this.lastFed=lastFed;

}

garden(){
    background(gardenImg, 550, 500);
}

bedroom(){
    background(bedroomImg, 550, 500);
}

washroom(){
    background(washroomImg, 550, 500);
}


}



