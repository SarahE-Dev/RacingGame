const score = document.querySelector('.score');
const startscreen = document.querySelector('.startScreen');
const gamearea = document.querySelector('.gameArea');

// Sets beginning score and speed if one is not chosen.

let player = { 
    speed: 5,
    score: 0
}

// Sets high score and sets it as zero if no high score is in localStorage yet.

let highest = localStorage.getItem('highest');
if(!('highest' in localStorage)){
    highest = 0;
}

document.querySelector('#here').addEventListener('click', ()=>{
    start();
    setArrows();
    audioPlayer();
});

let keys = {
    ArrowUp: false, 
    ArrowDown: false, 
    ArrowRight: false, 
    ArrowLeft: false
}

let rightClicked = false;
let leftClicked = false;

let isInvincible = false;
let lives = 0;

$('.score').addClass('hide')

// Event listeners for key presses.

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e){
    keys[e.key] = true;
}

function keyUp(e){
    keys[e.key] = false;
}

function rightDown(){
    rightClicked = true;
}

function rightUp(){
    rightClicked = false;
}

function leftDown(){
    leftClicked = true;
}

function leftUp(){
    leftClicked = false;
}

// Checks for collision bewteen the arguments given, which will be the car and other obstacles/cars.

function isCollide(one, two){
    let oneRect = one.getBoundingClientRect();
    let twoRect = two.getBoundingClientRect();

    return !((oneRect.bottom < twoRect.top) || (oneRect.top > twoRect.bottom) || (oneRect.right < twoRect.left) || (oneRect.left > twoRect.right));
}

// Function to move the lines.

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

// Function to end game when out of lives.

function endGame(){
    player.start = false;
    startscreen.classList.remove('hide');
}

// Function to move the cars.

function moveCar(car){
    let obstacle = document.querySelectorAll('.obstacle');
    obstacle.forEach(function(item){
        if(isCollide(car, item)){
            loseLife()
        }
        if(item.y >= 750){
            item.y =- 300;
            item.style.left = Math.floor(Math.random()*350) + 'px';
        }
        item.y += player.speed;
        item.style.top = item.y +'px';

    })
}




// function to call when the check for collision proves to be true.

function loseLife(){
    document.querySelector('.car').classList.add("rotate")
    isInvincible = true;
    if(isInvincible === true){
        lives-=1
    }
    setTimeout(()=>{
        isInvincible = false;
        document.querySelector('.car').classList.remove("rotate")
    }, 2000)
    
}


// Checks the amount of lives. Is called at the end each animation frame.

function livesHandler(){
    let livesText = document.querySelector('#livesYouHave');
    if(lives === 3){
        livesText.innerText = "❤️❤️❤️"
    }
    if(lives === 2){
        livesText.innerText = "🤍❤️❤️"
    }
    if(lives === 1){
        livesText.innerText = "🤍🤍❤️"
    }
    if(lives < 1){
        livesText.innerText = "🤍🤍🤍"
        localStorage.setItem('highest', highest)
        endGame()
    }
}

// Ability to change speed from the dropdown menu on start screen.

$('#easy').on('click', ()=>{
    player.speed = 4;
})

$('#medium').on('click', ()=>{
    player.speed = 6.5;
})

$('#hard').on('click', ()=>{
    player.speed = 9;
})

// Function for the reset button.

function Reset(){
    localStorage.setItem('highest', 0);
    highest = localStorage.getItem('highest')
    $('#highest-score').text('Highest Score: 0')
    $('#your-score').text('Your Score: 0')
}

// check for mobile device.

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

let mobile = isMobile();

if(mobile){
    $('#keys-arrows').text('Left and Right Buttons')
}

function audioPlayer(){
    let music = new Audio('09. Drivessover.mp3')
    music.play()
}













