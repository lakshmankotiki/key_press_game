/**Player selection game
 * Requirements:
 * 1. when the user click on start button 
 * 2. spinner should be rotate for randor number of times
 * 3. After that a message wll appear says player go
 * 4. once this happens, the first player who press their contro will win the game
 */
const spinner = document.querySelector('.spinner p');
const spinnerContainer = document.querySelector('.spinner');
let rotateCount = 0;
let startTime = null;
let rAF;
const btn = document.querySelector('button');
const result = document.querySelector('.result');

//create a random number for calculating random intervals
function randomGen(min,max) {
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}

//animation callback function
function draw(timestamp) {
    if(!startTime) {
     startTime = timestamp;
    }
  
    rotateCount = (timestamp - startTime) / 3;
   
    if(rotateCount > 359) {
      rotateCount %= 360;
    }
    //assignin transformation degrees based on condtion
    spinner.style.transform = 'rotate(' + rotateCount + 'deg)';
    //animation recursive function and attachng handler as callback
    rAF = requestAnimationFrame(draw);
}

//When page loads we are hiding the spinner nd winner defaultly
result.style.display = 'none';
spinnerContainer.style.display = 'none';

//this fun sets the app back to the original state
function reset() {
    btn.style.display = 'block';
    result.textContent = '';
    result.style.display = 'none';
}

//adding click event handler when click on start button
btn.addEventListener('click', start);
function start() {
  draw();
  spinnerContainer.style.display = 'block';
  btn.style.display = 'none';
  setTimeout(setEndgame, randomGen(5000,10000));
}

function setEndgame() {
    //stop the spinner animation
    cancelAnimationFrame(rAF);
    //hiding the spinner after clicking on startbutton
    spinnerContainer.style.display = 'none';
    result.style.display = 'block';
    result.textContent = 'PLAYERS GO!!';

    //getting pressed key down element
    document.addEventListener('keydown', keyHandler);

    function keyHandler(e) {
        console.log(e.key);
        if(e.key === 'a' || e.key === 'A') {
        result.textContent = 'Player 1 won!!';
        } else if(e.key === 'l' || e.key === 'L') {
        result.textContent = 'Player 2 won!!';
        }

        //remove listener because once the winner decalred no more key press is possible
        document.removeEventListener('keydown', keyHandler);
        setTimeout(reset, 5000);
    }
}   