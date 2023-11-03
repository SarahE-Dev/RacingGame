const score = document.querySelector('.score');
const startscreen = document.querySelector('.startScreen');
const gamearea = document.querySelector('.gameArea');
let player = { 
    speed: 4,
    score: 0
}
let highest = 0;
startscreen.addEventListener('click', start);

let keys = {
    ArrowUp: false, 
    ArrowDown: false, 
    ArrowRight: false, 
    ArrowLeft: false
}

let isInvincible = false;
let lives = 3;

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e){
    keys[e.key] = true;

}

function keyUp(e){
    keys[e.key] = false;
    
}



function isCollide(one, two){
    let oneRect = one.getBoundingClientRect();
    let twoRect = two.getBoundingClientRect();

    return !((oneRect.bottom < twoRect.top) || (oneRect.top > twoRect.bottom) || (oneRect.right < twoRect.left) || (oneRect.left > twoRect.right));
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y >= 700){
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';

    })
}

function endGame(){
    player.start = false;
    startscreen.classList.remove('hide');
}

function moveCar(car){
    let obstacle = document.querySelectorAll('.obstacle');
    obstacle.forEach(function(item){
        if(isCollide(car, item)){
            loseLife()
            
            
        }
        // if(isInvincible === false && lives < 1){
        //     endGame();
        // }
        if(item.y >= 750){
            item.y =- 300;
            item.style.left = Math.floor(Math.random()*350) + 'px';
        }
        item.y += player.speed;
        item.style.top = item.y +'px';

    })
}





function gamePlay(){

    let car = document.querySelector('.car');
    let road = gamearea.getBoundingClientRect();

    if(player.start){

        moveLines();
        moveCar(car);
        if(keys.ArrowLeft && player.x > 0){
            player.x -= player.speed;
        }
        if(keys.ArrowRight && player.x < road.width - 60){
            player.x += player.speed;
        }

        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px';

        window.requestAnimationFrame(gamePlay);
        player.score++;
        if(player.score >= highest)
        {
            highest = player.score;
        }
        score.innerHTML = "Your Score:" + player.score + "<br><br>" + "Highest Score:"+ highest  + "<br><br>" + "Lives: " + `<span id="livesYouHave"></span>`;
        ;
        setLives()


    }
    
}

function loseLife(){
    document.querySelector('.car').classList.add("rotate")
    isInvincible = true;
    if(isInvincible === true){
        lives-=1
    }
    setTimeout(()=>{
        isInvincible = false;
        document.querySelector('.car').classList.remove("rotate")
        lives -= 1;
    }, 2000)
    console.log(lives);
    
}

function setLives(){
    $('#livesYouHave').text(lives)
}






function Reset(){
    highest=0;
}

function start(){
    startscreen.classList.add('hide');
    gamearea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

   for(let x = 0; x < 5;x++){
        let roadline=document.createElement('div');
        roadline.setAttribute('class','lines');
        roadline.y = (x * 150);
        roadline.style.top = roadline.y+'px';
        gamearea.appendChild(roadline);
    }
    
    let car = document.createElement('div');
    car.setAttribute('class','car');
    gamearea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for(let x = 0;x < 3;x++){
        let othercar = document.createElement('div');
        othercar.setAttribute('class','obstacle');
        othercar.y = ((x + 1)*350) * -1;
        othercar.style.top = othercar.y + 'px';
        othercar.style.left = Math.floor(Math.random()*350) + 'px';
        othercar.style.backgroundColor = 'rgba('+ randomcolor() + ',' + randomcolor() + ','+ randomcolor() + ')'
        gamearea.appendChild(othercar);
    }
    
}

function randomcolor() {
    return Math.floor(Math.random() * 255) + 2;
}








