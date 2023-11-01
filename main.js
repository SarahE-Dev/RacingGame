let start = null;
let dot1 = document.querySelector('.dot-1');
let dot2 = document.querySelector('.dot-2')
let dot3 = document.querySelector('.dot-3');
let dot4 = document.querySelector('.dot-4');
let dot5 = document.querySelector('.dot-5');
let dot6 = document.querySelector('.dot-6');
let dot7 = document.querySelector('.dot-7');
let dot8 = document.querySelector('.dot-8');
let dot9 = document.querySelector('.dot-9');
let dot10 = document.querySelector('.dot-10');
let car = document.querySelector('#car');



function startAnim(timestamp){
    if(!start){start = timestamp;}
    if(dot1.style.top > 500){
        dot1.style.top = '0px'
    }
    let progress = timestamp - start;
    let applyNum = Math.min(progress / 7, 100);
    if(applyNum >= 75){
        start = 0;
    }
    
    dot1.style.top = applyNum + "px";
    dot2.style.top = applyNum + 40 + "px";
    dot3.style.top = applyNum + 80 + "px";
    dot4.style.top = applyNum + 120 + "px";
    dot5.style.top = applyNum + 160 + "px";
    dot6.style.top = applyNum + 200 + "px";
    dot7.style.top = applyNum + 240 + "px";
    dot8.style.top = applyNum + 280 + "px";
    dot9.style.top = applyNum + 320 + "px";
    dot10.style.top = applyNum + 360 + "px";
    
    window.requestAnimationFrame(startAnim);
}

$(document).keydown(function(e){
    switch (e.key){
    case 'ArrowLeft':
        $("#car").finish().animate({
            left: "-=50"
        });
        break;
    case 'ArrowRight':
        $("#car").finish().animate({
            left: "+=50"
        });
        break;
    }
});

window.requestAnimationFrame(startAnim)


