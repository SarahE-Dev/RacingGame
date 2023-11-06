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

        if(mobile){
            document.querySelector('#right').addEventListener('click', ()=>{
                if(player.x < road.width - thisCar.width){
                    player.x += player.speed;
                }
            });
            document.querySelector('#left').addEventListener('click', ()=>{
                if(player.x > 0){
                    player.x -= player.speed;
                }
            })
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