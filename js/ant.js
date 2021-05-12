function Ant(index){
    this.index=index;

    this.velocity=new Vector(2,2);
    this.velocity.setDirn(random(0,2*Math.PI));
    this.velocity.unitify();
    this.velocity=this.velocity.times(random(1,3));

    this.spriteSpeed=4;
    this.spriteCount=0;

    this.radius=20;

    this.sheetX=randomInt(0,7);

    this.status="walking";
    
    let r=randomInt(0,255);
    let g=randomInt(0,255);
    let b=randomInt(0,255);
    this.color=`rgba(${r},${g},${b},0.2)`;
    
    this.position=new Vector(random(this.radius,window.GAME_WIDTH-this.radius)
                            ,random(this.radius,window.GAME_HEIGHT-this.radius));

    this.update=function(){
        this.position=this.position.add(this.velocity);
        this.spriteCount++;
        if(this.spriteCount%this.spriteSpeed===0)
            this.sheetX=(this.sheetX+1)%7;
    }

    this.collision=function(ants)
    {
        if(this.position.x>window.GAME_WIDTH-this.radius || this.position.x<this.radius)
        {
            this.velocity.x*=-1;
            this.position.x=this.position.x<this.radius?this.radius+1:window.GAME_WIDTH-this.radius;
        }
        if(this.position.y>window.GAME_HEIGHT-this.radius || this.position.y<this.radius)
        {
            this.velocity.y*=-1;
            this.position.y=this.position.y<this.radius?this.radius+1:window.GAME_HEIGHT-this.radius;
        }
        for(let i=this.index+1;i<ants.length;i++){
            let ant=ants[i];
            let dist=distance(this.position,ant.position);
            let minimumDistance=(this.radius+ant.radius)
            if(dist<=minimumDistance){
                let massSum=this.radius+ant.radius;

                let term1=this.velocity.times((this.radius-ant.radius)/massSum);
                let term2=ant.velocity.times((2*ant.radius)/massSum);
                
                let term3=ant.velocity.times((ant.radius-this.radius)/massSum);
                let term4=this.velocity.times((2*this.radius)/massSum);

                this.velocity=term1.add(term2);
                ant.velocity=term3.add(term4);

                //pushing the ant back so that it is completely outside the current ants area
                let deltaVec=ant.position.subtract(this.position);
                deltaVec.unitify();
                deltaVec=deltaVec.times(minimumDistance+1);
                ant.position=this.position.add(deltaVec);
                // console.log(antprevpos,ant.position,distance(ant.position,antprevpos),this.radius+ant.radius);
            }
        }
        this.position=this.position.add(this.velocity);
    }
    
}