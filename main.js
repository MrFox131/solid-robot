			
var canvas = document.getElementById("game"),
    ctx     = canvas.getContext('2d');
function Resize(){
    canvas = document.getElementById("game")
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function Start(){
    timer = setInterval(Update, 1000/60);
}

function Stop(){
    clearInterval(timer);
}

function Update(){
    Draw();
}


background_speed = 1
class Space{
    constructor(image, x, y){
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = image;
    }

    Update(anotherspace)
    {
        this.y += background_speed;
        if(this.y>canvas.height){
            this.y = anotherspace.y-canvas.height+background_speed;
        }

    }
}
class Player {
    constructor(image){
        this.x = canvas.width/2-canvas.width/30;
        this.y = canvas.height - canvas.width/15-20;
        this.image = new Image();
        this.image.src = image;
    }
    Move(axis, d){
        if (axis == "x"){
            this.x +=d;
            if(this.x<0){
                this.x = 0;
            }
            if(this.x>canvas.width - canvas.width/15){
                this.x = canvas.width - canvas.width/15;
            }
        } else {
            this.y += d;
            if(this.y<0){
                this.y = 0;
            }
            if(this.y>canvas.height-canvas.width/15-20){
                this.y=canvas.height-canvas.width/15-20;
            }
        }
    }
    MoveByTouch(dx,dy){
        this.x += dx;
        this.y += dy;
        if(this.x<0){
            this.x = 0;
        }
        if(this.x>canvas.width - canvas.width/15){
            this.x = canvas.width - canvas.width/15;
        }
        if(this.y<0){
            this.y = 0;
        }
        if(this.y>canvas.height-canvas.width/15-20){
            this.y=canvas.height-canvas.width/15-20;
        }
    }
}
Resize();
playerSpeed = 3.5;
space = new Space("background.jpg", 0, 0);
space2 = new Space("background.jpg", 0, -canvas.height);
player = new Player("playerspaceship.png");
keyIsDown = {
    UP: false,
    DOWN: false,
    RIGHT: false,
    LEFT:false,
    SPACE:false
}
function keyDown(e){
    switch(e.keyCode){
        case 32:
            keyIsDown.SPACE = true;
            break;
        case 37:
            keyIsDown.LEFT = true;
            break;
        case 39:
            keyIsDown.RIGHT = true;
            break;
        case 38:
            keyIsDown.UP = true;
            break;
        case 40:
            keyIsDown.DOWN = true;
            break;
            
    }
}
function keyUp(e){
    switch(e.keyCode){
        case 32:
            keyIsDown.SPACE = false;
            break;
        case 37:
            keyIsDown.LEFT = false;
            break;
        case 39:
            keyIsDown.RIGHT = false;
            break;
        case 38:
            keyIsDown.UP = false;
            break;
        case 40:
            keyIsDown.DOWN = false;
            break;
            
    }
}
window.addEventListener("keyup", keyUp);
window.addEventListener("keydown", keyDown);
touchscreen = false;
ongoingTouch = null;
var fireTimer;
function Fire(){
    console.log("Fire");
}
function TouchStartHandle(e){
    e.preventDefault();
    console.log("touchStarted");
    touchscreen = true;
    if(fireTimer == null){
        fireTimer = setInterval(Fire, 1000/6);
    }
    if(ongoingTouche!=null){
        ongoingTouch = e.changedTouches[0];
    }
}
function TouchMoveHandle(e){
    console.log("toucheChanged");
    e.preventDefault();
    if(ongoingTouch && ongoingTouch.identifier!=e.changedTouches[0].identifier){
        return;
    }
    player.MoveByTouch(e.changedTouches[0].pageX-ongoingTouch.pageX, e.changedTouches[0].pageY-ongoingTouch.pageY, true);
}
function TouchEndHandle(e){
    console.log("touchended");
    e.preventDefault();
    if(ongoingTouch && ongoingTouch.identifier!=e.changedTouches[0].identifier){
        ongoingTouch = null;
    }
}
window.addEventListener("touchstart", TouchStartHandle);
window.addEventListener("touchmove", TouchMoveHandle);
window.addEventListener("touchend", TouchEndHandle);

function Draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    space.Update(space2);
    space2.Update(space);
    if(keyIsDown.LEFT){
        player.Move("x", -playerSpeed)
    }
    if(keyIsDown.RIGHT){
        player.Move("x", playerSpeed);
    }
    if(keyIsDown.UP){
        player.Move("y", -playerSpeed);
    }
    if(keyIsDown.DOWN){
        player.Move("y", playerSpeed);
    }
    if(keyIsDown.SPACE ){
        if (fireTimer==undefined){
            fireTimer = setInterval(Fire, 1000/6);
        }
    } else {
        if(fireTimer){
            clearInterval(fireTimer);
            fireTimer = null;
        }
    }
    ctx.drawImage(space.image, 0,0,space.image.width, space.image.height, space.x, space.y, canvas.width, canvas.height);
    ctx.drawImage(space2.image, 0,0,space2.image.width, space2.image.height, space2.x, space2.y, canvas.width, canvas.height);
    ctx.drawImage(player.image, 0,0,player.image.width, player.image.height, player.x, player.y, canvas.width/15, canvas.width/15);
}

window.addEventListener("resize", Resize);
Start()