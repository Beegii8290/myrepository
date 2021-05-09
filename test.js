const first=document.getElementById("first")
const second=document.getElementById("second")
const wonCount=document.getElementById("wonCount")
const wonCount1=document.getElementById("wonCount1")
const playBtn=document.getElementById("playBtn")
const secBtn=document.getElementById("secBtn")
const modal=document.querySelector(".modal")
const easy=document.getElementById("Easy")
const hard=document.getElementById("Hard")
class Vec{
    constructor(x=0, y=0){
        this.x=x;
        this.y=y;
    }
    get len(){
        return Math.sqrt(this.x*this.x+this.y*this.y)
    }
    set len(value){
        const fact=value/this.len;
        this.x*=fact;
        this.y*=fact;
    }
}
class Rect{
    constructor(w,h){
        this.pos=new Vec;
        this.size=new Vec(w,h)
    }
    get left(){
        return this.pos.x - this.size.x /2;
    }
    get right(){
        return this.pos.x + this.size.x /2;
    }
    get top(){
        return this.pos.y - this.size.y /2;
    }
    get bottom(){
        return this.pos.y + this.size.y /2;
    }
}
class Ball extends Rect{
    constructor(){
        super(10,10)
        this.vel=new Vec;
    }
}
class Player extends Rect{
    constructor(){
        super(20,100)
        this.score=0
       
    }
}
class Pong{
    constructor(canvas){
        this._canvas=canvas
        this._ctx=canvas.getContext('2d')
        this.ball=new Ball;

        

        this.players=[
            new Player,
            new Player,
        ];
        this.players[0].pos.x=40;
        this.players[1].pos.x=this._canvas.width-40;
        this.players.forEach(player=>{
            player.pos.y=this._canvas.height/2;
        })

        let lastTime;
        const callback =(millis) => {
         if(lastTime){
            this.update((millis-lastTime)/1000);
        };
        lastTime=millis;
        requestAnimationFrame(callback);
        }
        callback()
        this.reset()
        canvas.addEventListener('mousemove',event=>{
            pong.players[0].pos.y=event.offsetY;
        })
        playBtn.onclick=(e)=>{
            playBtn.innerText="Easy"
            secBtn.innerText="Hard"
            this.players[1].pos.y=this.ball.pos.y;
            if(playBtn.onclick=(e)=>{
                modal.classList.add("hidden")
                canvas.addEventListener("click",()=>{
                    this.slowStart();
                })   
                })
                secBtn.onclick=(e)=>{
                    modal.classList.add("hidden")
                    canvas.addEventListener("click",()=>{
                        this.start();
                    }) 
                }  
        }
        secBtn.onclick=(e)=>{
            modal.classList.add("hidden")
            canvas.addEventListener("click",()=>{
                this.start();
                this.players[1].pos.y=this._canvas.height/2
                addEventListener("keydown",(e)=>{
                    switch(e.key){
                        case"ArrowUp":this.players[1].pos.y-=30;
                        break;
                        case"ArrowDown":this.players[1].pos.y+=30;
                        break;
                    }
                })
                
            })
        }
    
    };
    collide(player,ball){
        if(player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top){
            const len=ball.vel.len  
            ball.vel.x= -ball.vel.x
            ball.vel.y += 300*(Math.random()-.6)
            ball.vel.len = len* 1.05
        }
    }
    draw(){
        this._ctx.fillStyle="#000"
        this._ctx.fillRect(0,0,this._canvas.width,this._canvas.height)
        
         this.drawRect(this.ball);
         this.players.forEach(player=>this.drawRect(player))
    }
    drawRect(rect){
        this._ctx.fillStyle="white"
        this._ctx.fillRect(rect.left,rect.top,rect.size.x,rect.size.y)
    }
    reset(){
        this.ball.pos.x=this._canvas.width/2
        this.ball.pos.y=this._canvas.height/2

        this.ball.vel.x=0
        this.ball.vel.y=0
    }
    start(){
        if(this.ball.vel.x===0 && this.ball.vel.y===0){
            this.ball.vel.x=300*(Math.random() > .5 ? 1 :-1)
            this.ball.vel.y=300*(Math.random()*2-1)
            //bombognii hurd
            this.ball.vel.len=300;
        }
    }
    slowStart(){
        if(this.ball.vel.x===0 && this.ball.vel.y===0){
            this.ball.vel.x=300*(Math.random() > .5 ? 1 :-1)
            this.ball.vel.y=300*(Math.random()*2-1)
            //bombognii hurd
            this.ball.vel.len=100;
        }
    }
    update(dt) {
        this.ball.pos.x += this.ball.vel.x*dt
        this.ball.pos.y += this.ball.vel.y*dt
    
        if(this.ball.left < 0){
            const playerId=this.ball.vel.x < 0| 0;
            second.innerText++;
            /*this.players[playerId].score++;*/
            this.reset();
            
            this.ball.vel.x=-this.ball.vel.x
        }
        else if(this.ball.right > this._canvas.width){
            first.innerText++;
            this.reset();
        }
        
        if(this.ball.top < 0||this.ball.bottom> this._canvas.height){
            this.ball.vel.y=-this.ball.vel.y
        };
        
        this.players.forEach(player =>this.collide(player,this.ball))
        this.draw();
           
        
        if(first.innerText==10){
            wonCount.innerText++;
            first.innerText=0;
            second.innerText=0;
        }
        else if(second.innerText==10){
            wonCount1.innerText++;
            second.innerText=0;
            first.innerText=0;
        }
        if(wonCount.innerText==3){
            alert("Player 1 won")
            modal.classList.remove("hidden")
            playBtn.innerText="Restart game!"
            secBtn.innerText="Back to menu"
            this.start();
        }
        else if(wonCount1.innerText==3){
            alert("Player 2 won")
            modal.classList.remove("hidden")
            playBtn.innerText="Restart game!"
            secBtn.innerText="Back to menu"
            this.start();
        }
        
    }
    
    
}
const canvas=document.getElementById("pong");
const pong=new Pong(canvas)



/*canvas.addEventListener("keydown",(e)=>{
    this.players[1].pos.y-=this.ball.pos.y;
})*/

    


