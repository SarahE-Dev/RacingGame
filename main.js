let start = null;
let dot1 = document.querySelector('.dot-1');
let dot2 = document.querySelector('.dot-2')
let dot3 = document.querySelector('.dot-3');
let dot4 = document.querySelector('.dot-4');
let dot5 = document.querySelector('.dot-5');
let dot6 = document.querySelector('.dot-6');


function startAnim(timestamp){
    if(!start){start = timestamp;}
    
    let progress = timestamp - start;
    dot1.style.top = Math.min(progress / 7, 700) + "px";
    dot2.style.top = Math.min(progress / 7, 700) + 50 + "px";
    dot3.style.top = Math.min(progress / 7, 700) + 100 + "px";
    dot4.style.top = Math.min(progress / 7, 700) + 150 + "px";
    dot5.style.top = Math.min(progress / 7, 700) + 200 + "px";
    dot6.style.top = Math.min(progress / 7, 700) + 250 + "px";
    
    window.requestAnimationFrame(startAnim);
}

window.requestAnimationFrame(startAnim)

