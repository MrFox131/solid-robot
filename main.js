			
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


speed = 1
class Space
    {
        constructor(image, x, y){
            this.x = x;
            this.y = y;
            this.image = new Image();
            this.image.src = image;
        }
        
        Update(anotherspace)
        {
            this.y += speed;
            if(this.y>canvas.height){
                this.y = anotherspace.y-canvas.height+speed;
            }

        }
    }
Resize();
space = new Space("file:///C:/Users/Fox%20and%20Dragon/Desktop/web2.0/background.jpg", 0, 0);
space2 = new Space("file:///C:/Users/Fox%20and%20Dragon/Desktop/web2.0/background.jpg", 0, -canvas.height);

function Draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    space.Update(space2);
    space2.Update(space);
    ctx.drawImage(space.image, 0,0,space.image.width, space.image.height, space.x, space.y, canvas.width, canvas.height);
    ctx.drawImage(space2.image, 0,0,space2.image.width, space2.image.height, space2.x, space2.y, canvas.width, canvas.height);
}

window.addEventListener("resize", Resize);
Start()