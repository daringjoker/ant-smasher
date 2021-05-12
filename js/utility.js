function randomInt(a,b){
    return a+Math.round(Math.random()*(b-a));
}
function random(a,b){
    return a+Math.random()*(b-a);
}

function distance(a,b){
    let deltaX=a.x-b.x;
    let deltaY=a.y-b.y;
    return Math.sqrt(deltaX*deltaX+deltaY*deltaY);
}

