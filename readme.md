My project is a racing game. I use requestAnimationFrame() to create the continuous movement in my game. 

You get three lives to start and you use the arrow keys to move. If you hit another car you lose a life, the car spins and the car movement pauses temporarily with a setTimeout. You are still able to move your car out of the way in that timeout though.

The game keeps a high score that is stored in the localStorage at the end of each game. You are able to clear that score with the Reset button on the Start Screen, which will set the scorebox text back to 0 as well.

At the start of each game you are also able to select a difficulty before clicking the start here button, which changes the speed of the game. If you do not select a difficulty you can still start the game, it will just be at a speed bewteen Easy and Medium.