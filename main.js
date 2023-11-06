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

document.querySelector('#here').addEventListener('click', start);

let keys = {
    ArrowUp: false, 
    ArrowDown: false, 
    ArrowRight: false, 
    ArrowLeft: false
}

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


// Function to put the other functions in and recall within itself with requestAnimationFrame.
// Also where the ability to move the car with the arrow keys is, as well as where the score is created.


function gamePlay(){

    let car = document.querySelector('.car');
    let road = gamearea.getBoundingClientRect();

    let thisCar = car.getBoundingClientRect();

    if(player.start){

        moveLines();
        
        if(isInvincible === false){
            moveCar(car)
        }
        
        if(keys.ArrowLeft && player.x > 0){
            player.x -= player.speed;
        }
        if(keys.ArrowRight && player.x < road.width - thisCar.width){
            player.x += player.speed;
        }


        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px';

        window.requestAnimationFrame(gamePlay);
        if(isInvincible === false){
            player.score++
        }
        if(player.score >= highest)
        {
            highest = player.score;
        }
        score.innerHTML = `<p id="your-score">Your Score: ${player.score}</p>` + `<p id="highest-score">Highest Score: ${highest}</p>` + `<p>Lives: <span id="livesYouHave"></span></p>`;
        ;
        livesHandler()
    }
    
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
}

// Function called at game start, creates lines and car you drive, and styles the placement of obstacle cars and lines.

function start(){
    startscreen.classList.add('hide');
    gamearea.innerHTML = "";

    $('.score').removeClass('hide')

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    lives = 3;

   for(let x = 0; x < 5;x++){
        let roadline = document.createElement('div');
        roadline.classList.add('lines')
        roadline.y = (x * 150);
        roadline.style.top = roadline.y+'px';
        gamearea.appendChild(roadline);
    }
    
    let car = document.createElement('div');
    car.classList.add('car');
    gamearea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    let road = gamearea.getBoundingClientRect()
    let roadWidth = road.width
    let roadHeight = road.height;
    

    for(let x = 0;x < 3;x++){
        let othercar = document.createElement('div');
        othercar.classList.add('obstacle')
        othercar.y = ((x + 1)*350) * -1;
        othercar.style.top = othercar.y + 'px';
        othercar.style.left = Math.floor(Math.random()*(roadWidth)) + 'px';
        
        othercar.style.backgroundImage = `url(./obstacles/obstacle` + randomImage() +`.png)`
        gamearea.appendChild(othercar);
    }
    
}

// Funtion to choose a random number to add to file path to style the url of the obstacle car image.

function randomImage() {
    return Math.floor(Math.random() * 7) + 1;
}








