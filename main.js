class Enemie {
    constructor(){
        if(this.constructor == "Enemie"){
            throw new Error("Cannot create instance of abstract class");
        }
        this.speed  = 1.5;
    }
    Fire(){
        bullets.push(new Bullet(false, this.x+canvas.height*this.constant*0.5, this.y+5));
    }
}

class EasyEnemie extends Enemie{
    constructor(x){
        super();
        this.image = new Image();
        this.image.src = "easyEnemie.png";
        this.lives = 3;
        this.y = canvas.height/10;
        this.x = x;
        this.moveX = Math.random();
        this.moveY = Math.random();
        this.counter=0;
        this.constant = 0.04;
    }
    Collision(){
        this.lives--;
    }
    Update(){
        if(Math.random()<=1/23){
            this.Fire();
        }
        if(this.counter==30){
            this.counter=0;
            this.moveX = Math.random();
            this.moveY = Math.random();
        }
        if(this.moveX>=0.67 && this.x<canvas.width-canvas.height/25){
            this.x+=this.speed;
        } else if(this.moveX<=0.33 && this.x>canvas.height/25){
            this.x-=this.speed;
        }
        if(this.moveY>=0.67 && this.y<canvas.height/2){
            this.y+=this.speed
        } else if(this.moveY<=0.33 && this.y>0){
            this.y-=this.speed;
        }
        this.counter++;
    }
}

class MiddleEnemie extends Enemie{
        constructor(x){
        super();
        this.image = new Image();
        this.image.src = "m_enemieMiddle.png";
        this.lives = 5;
        this.y = canvas.height/10*1.5;
        this.x = x;
        this.moveX = Math.random();
        this.moveY = Math.random();
        this.counter=0;
        this.constant = 0.06;
    }
    Collision(){
        this.lives--;
    }
    Update(){
        if(Math.random()<=1/20){
            this.Fire();
        }
        if(this.counter==30){
            this.counter=0;
            this.moveX = Math.random();
            this.moveY = Math.random();
        }
        if(this.moveX>=0.67 && this.x<canvas.width-canvas.height*this.constant){
            this.x+=this.speed;
        } else if(this.moveX<=0.33 && this.x>canvas.height*this.constant){
            this.x-=this.speed;
        }
        if(this.moveY>=0.67 && this.y<canvas.height/2){
            this.y+=this.speed
        } else if(this.moveY<=0.33 && this.y>0){
            this.y-=this.speed;
        }
        this.counter++;
    }
}

class Boss extends Enemie{
    constructor(x){
        super();
        this.image = new Image();
        this.image.src = "boss.png";
        this.lives = 20;
        this.y = 0;
        this.x = x;
        this.moveX = Math.random();
        this.moveY = Math.random();
        this.counter=0;
        this.constant = 0.2;
    }
    Collision(){
        this.lives--;
    }
    Update(){
            this.Fire();
        if(this.counter==30){
            this.counter=0;
            this.moveX = Math.random();
            this.moveY = Math.random();
        }
        if(this.moveX>=0.67 && this.x<canvas.width-canvas.height*this.constant){
            this.x+=this.speed;
        } else if(this.moveX<=0.33 && this.x>canvas.height*this.constant){
            this.x-=this.speed;
        }
        if(this.moveY>=0.67 && this.y<canvas.height/2){
            this.y+=this.speed
        } else if(this.moveY<=0.33 && this.y>0){
            this.y-=this.speed;
        }
        this.counter++;
    }
    Fire(){
        if(Math.random()<1/20){
        bullets.push(new Bullet(false, this.x+canvas.height*this.constant*0.33, this.y+5));
        }
        if(Math.random()<1/20){
        bullets.push(new Bullet(false, this.x+canvas.height*this.constant*0.5, this.y+5));
        }
        if(Math.random()<1/20){
        bullets.push(new Bullet(false, this.x+canvas.height*this.constant*0.66, this.y+5));
        }
    }
}

class Bullet {
    constructor(our, x, y){
        this.our = our;
        this.x = x;
        this.y = y;
    }
    Update(){
        this.y += playerSpeed*1.3*(this.our?-1:1);
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
        if(this.bulletproof){
            return;
        }
        this.lives--;
        if(this.lives==0){
            Stop();
            gameOver();
        }
        this.bulletproof = true;
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

canvas = document.getElementById("game"),
ctx     = canvas.getContext('2d');
background_speed = 1

function Resize(){
    canvas = document.getElementById("game")
    canvas.width = document.getElementsByTagName("body")[0].clientWidth;
    canvas.height = document.getElementsByTagName("body")[0].clientHeight;
}

function Start(){
    time = 0;
    createFirstWave(); 
    timer = setInterval(Update, 1000/60);
    time_game = setInterval(()=>{time++}, 1000);
    
}

function Stop(){
    clearInterval(timer);
    clearInterval(time_game);
}

function Update(){
    Draw();
}

function restart(e){
    window.removeEventListener("keydown", restart);
    window.removeEventListener("touchstart", restart);
    init();
}

function gameOver(){
    ctx.font = "30px arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("You Lose", canvas.width/2, canvas.height/2);
    window.addEventListener("keydown", restart);
    window.addEventListener("touchstart", restart);
}


var bullets = []
var enemies = []


Resize();
playerSpeed = 3.5;


function createFirstWave(){
    enemies.push(new EasyEnemie(canvas.width/3/2))
    enemies.push(new EasyEnemie(canvas.width/3*2 - canvas.height/6))
    enemies.push(new EasyEnemie(canvas.width  - canvas.height/6))
}

function createSecondWave(){
        enemies.push(new EasyEnemie(canvas.width/3/2))
    enemies.push(new EasyEnemie(canvas.width/3*2 - canvas.height/6))
    enemies.push(new EasyEnemie(canvas.width  - canvas.height/6))
    enemies.push(new MiddleEnemie(canvas.width/2  - canvas.height/4))
    enemies.push(new MiddleEnemie(canvas.width   - canvas.height/4))
}

function createThirdWave(){
        enemies.push(new MiddleEnemie(canvas.width/3  - canvas.height/6))
    enemies.push(new MiddleEnemie(canvas.width   - canvas.height/6))
    enemies.push(new Boss(canvas.width - canvas.width/2))
}
secondWave = false;
thirdWave = false;
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
time = 0;
var fireTimer;
function Fire(){
    console.log("fire")
    player.Fire();
}
function TouchStartHandle(e){
    e.preventDefault();
    if(fireTimer == undefined){
        fireTimer = setInterval(Fire, 1000/3);
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
    fireTimer = setInterval(Fire, 1000/6);
    window.addEventListener("touchstart", TouchStartHandle, { passive: false });
    window.addEventListener("touchmove", TouchMoveHandle, { passive: false });
    window.addEventListener("touchend", TouchEndHandle, { passive: false });
    Start();
}

window.onload = init;

function init(){
    enemies = []
    bullets = []
    space = new Space("background.jpg", 0, 0);
    space2 = new Space("background.jpg", 0, -canvas.height);
    player = new Player("playerspaceship.png");
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
                fireTimer = setInterval(Fire, 1000/3);
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
    ctx.font = "30px arial";
    ctx.fillStyle = "red";
    ctx.fillText(player.lives.toString(), 30, 30);
    ctx.fillText(time.toString(), canvas.width-120, 30);
    ctx.stroke();
    someTemp = []
    bullets.forEach (bullet => {
        bullet.Update();
        ctx.beginPath();
        ctx.moveTo(bullet.x, bullet.y);
        ctx.lineWidth = 4;
        ctx.strokeStyle=bullet.our?"green":"red"
        ctx.lineTo(bullet.x, bullet.y+12*(bullet.our?-1:1));
        ctx.stroke();
        ctx.closePath();
        if(bullet.y>0 &&  bullet.y<canvas.height){
            someTemp.push(bullet);
        }
    })
    bullets = someTemp;
    enemies.forEach(enemie=>{
        enemie.Update()
        ctx.drawImage(enemie.image, 0,0,enemie.image.width, enemie.image.height, enemie.x, enemie.y, canvas.height*enemie.constant, canvas.height*enemie.constant);
    })
    bullets.forEach(bullet => {
        if(bullet.our){
            enemies.forEach((enemie, index) => {
                if(enemie.y<bullet.y && enemie.y+enemie.constant*canvas.height>bullet.y && enemie.x<bullet.x && enemie.x+enemie.constant*canvas.height>bullet.x){
                    bullet.y=-1000;
                    enemie.Collision();
                }
            })
        } else {
            if(player.y<bullet.y && player.y+0.05*canvas.height>bullet.y && player.x<bullet.x && player.x+0.05*canvas.height>bullet.x){
                player.Collision();
                bullet.y = -1000;
            }
        }
    })
    enemies = enemies.filter(enemie=>{
        return enemie.lives>0;
    })
    if(enemies.length == 0){
        if(!secondWave){
            createSecondWave();
            secondWave = true;
        } else if(!thirdWave){
            createThirdWave();
            thirdWave=true;
        } else {
            createSecondWave();
        }
    }
}

window.addEventListener("resize", Resize);
