var ball;
var db, position;
function setup(){
    db = firebase.database()

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //Starting a reader/listener
    db.ref("ball/position").on("value", readPos, showErr);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){

    db.ref("ball/position").set({
        x:position.x + x,
        y:position.y + y,
    });

}

function readPos(data){
    position = data.val(); //copies data exactly to position

    ball.x = position.x;
    ball.y = position.y;
}

function showErr(){
    console.log("Error in the database");
}

/*
READ and WRITING

.ref() - refers to the field that we want to change/read

.on() - Reader - turns on a listener that listens to the changes in value
        - function to read the value
        - function to check for errors in db --> not compulsory

.set() - Writer - changes/updates the value
*/
