let canvas=document.getElementById("myCanvas")
let ctx=canvas.getContext("2d");
let minPadding=0;
let antCount=20;


let sheet=new Image();
sheet.src="assets/antsprite.png";

let splat=new Image();
splat.src="assets/splatter.png";

let hitSound=new Audio();
hitSound.src="assets/hit.mp3";

let killSound=new Audio();
killSound.src="assets/killed.mp3";

let spriteWidth=69;
let spriteHeight=60;

function resize(){
    window.GAME_WIDTH=window.innerWidth-2*minPadding;
    window.GAME_HEIGHT=window.innerHeight-2*minPadding;
    ctx.canvas.width=window.GAME_WIDTH;
    ctx.canvas.height=window.GAME_HEIGHT;
}
resize();
let ants=[];
let splatter=[];
for(let i=0;i<antCount;i++){
    ants.push(new Ant(i));
}

function nextFrame(){
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    requestAnimationFrame(nextFrame)
    splatter.forEach((sp)=>{
        ctx.save();
        ctx.translate(sp.x,sp.y);
        ctx.rotate(sp.angle);
        ctx.translate(-sp.x,-sp.y);
        ctx.drawImage(splat,0,0,splat.width,splat.height,
            sp.x-spriteWidth/2,sp.y-spriteHeight/2, spriteWidth, spriteHeight);
        ctx.restore();
    })
    ants.forEach((ant,index)=>{
        ant.collision(ants);
        ant.update();      
        ctx.save();
        ctx.translate(ant.position.x,ant.position.y);
        ctx.rotate(ant.velocity.getDirn());
        ctx.translate(-ant.position.x,-ant.position.y);
        ctx.drawImage(sheet, ant.sheetX*spriteWidth,17,spriteWidth,spriteHeight,
             ant.position.x-spriteWidth/2,ant.position.y-spriteHeight/2, spriteWidth, spriteHeight);
        ctx.restore();
    })
}

function onClick(e){
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    console.log(x,y);
    // mPos.x=x;
    // mPos.y=y;
    // mPos.display=true;
    hitSound.play();

    let mousePos=new Vector(x,y);
    ants.forEach((ant,index)=>{
        if(distance(mousePos,ant.position)<ant.radius*1.5)
        {
            ants[index]=new Ant(index);
            killSound.play();
            splatter.push({
                x,y,
                angle:random(0,2*Math.PI)
            });
            if(splatter.length>5){
                splatter.shift()
            }
        }
    })
}

window.addEventListener("resize",resize);
canvas.addEventListener("click",onClick);
requestAnimationFrame(nextFrame);