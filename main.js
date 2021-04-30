			
var canvas = document.getElementById("game"),
    ctx     = canvas.getContext('2d');
function Resize(){
    canvas = document.getElementById("game")
    canvas.width = document.getElementsByTagName("body")[0].clientWidth;
    canvas.height = document.getElementsByTagName("body")[0].clientHeight;
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
function gameOver(){
    
}

var bullets = []

class Bullet {
    constructor(our, x, y){
        this.our = our;
        this.x = x;
        this.y = y;
    }
    Update(){
        this.y += playerSpeed*1.2*(this.our?-1:1);
    }
}

class Player {
    constructor(image){
        this.x = canvas.width/2-canvas.height/50;
        this.y = canvas.height - canvas.height/20-canvas.height*0.1;
        this.image = new Image();
        this.image.src = image;
        this.lives = 3;
        this.bulletproof = false;
    }
    Collision(){
        if(bulletproof){
            return;
        }
        lives--;
        if(lives==0){
            Stop();
            gameOver();
        }
        bulletproof = true;
        setTimeout(()=>player.bulletproof = false, 3000);
    }
    Move(axis, d){
        if (axis == "x"){
            this.x +=d;
            if(this.x<0){
                this.x = 0;
            }
            if(this.x>canvas.width - canvas.height/20){
                this.x = canvas.width - canvas.height/20;
            }
        } else {
            this.y += d;
            if(this.y<0){
                this.y = 0;
            }
            if(this.y>canvas.height-canvas.height/20-20){
                this.y=canvas.height-canvas.height/20-20;
            }
        }
    }
    MoveByTouch(dx,dy){
        this.x += dx;
        this.y += dy;
        if(this.x<0){
            this.x = 0;
        }
        if(this.x>canvas.width - canvas.height/20){
            this.x = canvas.width - canvas.height/20;
        }
        if(this.y<0){
            this.y = 0;
        }
        if(this.y>canvas.height-canvas.height/20-20){
            this.y=canvas.height-canvas.height/20-20;
        }
    }
    Fire(){
        bullets.push(new Bullet(true, this.x+canvas.height/40, this.y+5));
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
mousecontrole= false;
ongoingTouch = null;
var fireTimer;
function Fire(){
    console.log("fire")
    player.Fire();
}
function TouchStartHandle(e){
    e.preventDefault();
    if(fireTimer == undefined){
        fireTimer = setInterval(Fire, 1000/6);
    }
    if(ongoingTouch==null){
        ongoingTouch = e.changedTouches[0];
    }
}
function TouchMoveHandle(e){
    e.preventDefault();
    if(ongoingTouch && ongoingTouch.identifier!=e.changedTouches[0].identifier){
        return;
    }
    player.MoveByTouch((e.changedTouches[0].pageX-ongoingTouch.pageX), e.changedTouches[0].pageY-ongoingTouch.pageY, true);
    ongoingTouch = e.changedTouches[0];
}
function TouchEndHandle(e){
    e.preventDefault();
    if(ongoingTouch && ongoingTouch.identifier==e.changedTouches[0].identifier){
        ongoingTouch = null;
    }
}
function setTouchScreenControl(e){
    window.removeEventListener("touchstart", setTouchScreenControl);
    window.removeEventListener("keyup", keyUp);
    window.removeEventListener("keydown", keyDown);
    window.removeEventListener("keydown", keyboardControl);
    touchscreen = true;
    window.addEventListener("touchstart", TouchStartHandle, { passive: false });
    window.addEventListener("touchmove", TouchMoveHandle, { passive: false });
    window.addEventListener("touchend", TouchEndHandle, { passive: false });
    Start();
}

window.onload = init;

function init(){   
    Resize();
    ctx.clearRect(0,0,canvas.width, canvas.height);
    space.Update(space2);
    space2.Update(space);
    ctx.drawImage(space.image, 0,0,space.image.width, space.image.height, space.x, space.y, canvas.width, canvas.height);//отрисовка фона
    ctx.drawImage(space2.image, 0,0,space2.image.width, space2.image.height, space2.x, space2.y, canvas.width, canvas.height);//отрисовка 2 фона
    ctx.font = "30px arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Touch the screen", canvas.width/2, canvas.height/2);
    ctx.fillText("or", canvas.width/2, canvas.height/2+30);
    ctx.fillText("Press \"Space\"", canvas.width/2, canvas.height/2+60);
    window.addEventListener("touchstart", setTouchScreenControl);
    window.addEventListener("keydown", keyboardControl);
}

function keyboardControl(e){
    console.log("Keyboard control detected");
    window.removeEventListener("touchstart", setTouchScreenControl);
    window.removeEventListener("keydown", keyboardControl);
    Start();
}

document.addEventListener("loaded", init);

function Draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    space.Update(space2);
    space2.Update(space);
    if(!touchscreen && !mousecontrole){
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
            if(fireTimer && !touchscreen){
                clearInterval(fireTimer);
                fireTimer = null;
            }
        }
    }
    ctx.drawImage(space.image, 0,0,space.image.width, space.image.height, space.x, space.y, canvas.width, canvas.height);//отрисовка фона
    ctx.drawImage(space2.image, 0,0,space2.image.width, space2.image.height, space2.x, space2.y, canvas.width, canvas.height);//отрисовка 2 фона
    ctx.drawImage(player.image, 0,0,player.image.width, player.image.height, player.x, player.y, canvas.height/20, canvas.height/20);//отрисовка игрока
    someTemp = []
    bullets.forEach (bullet => {
        bullet.Update();
        ctx.beginPath();
        ctx.moveTo(bullet.x, bullet.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle="red"
        ctx.lineTo(bullet.x, bullet.y+10*(bullet.our?-1:1));
        ctx.stroke();
        ctx.closePath();
        if(bullet.y>0){
            someTemp.push(bullet)
        }
    })
    bullets = someTemp;
}

window.addEventListener("resize", Resize);
