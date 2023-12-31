// Function called at game start, creates lines and car you drive, and styles the placement of obstacle cars and lines.



function start(){
    startscreen.classList.add('hide');
    gamearea.innerHTML = "";

    $('.score').removeClass('hide');

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

function setArrows(){
    if(mobile){
        let html = `<div class="button">
            <button id="left" style="width: 15vw; font-size: 2.5vw;" class="btn btn-primary">Left</button>
        </div>
        <div class="button2">
            <button id="right" style="width: 15vw; font-size: 2.5vw;"  class="btn btn-primary">Right</button>
        </div>`;
        $('.carGame').append(html);
        document.querySelector('#right').addEventListener('touchstart', rightDown);
        document.querySelector('#right').addEventListener('touchend', rightUp);
        document.querySelector('#left').addEventListener('touchstart', leftDown);
        document.querySelector('#left').addEventListener('touchend', leftUp);

        
    }


}

// Funtion to choose a random number to add to file path to style the url of the obstacle car image.

function randomImage() {
    return Math.floor(Math.random() * 7) + 1;
}

