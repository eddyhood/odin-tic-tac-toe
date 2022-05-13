
//Modules

(function gameControls() {
    const score = document.getElementsByClassName('score');
    const controlBox = document.getElementById('control-box');
    const pvpMode = document.getElementById('pvp');
    const pvcMode = document.getElementById('pvc');
    const playerOneInput = document.getElementById('name');
    const playerOneNameDisplay = document.getElementById('player-one-name');
    const playerTwoInput = document.getElementById('opponent');
    const playerTwoNameDisplay = document.getElementById('player-two-name');
    const startGameBtn = document.getElementById('start-game');
    const restartGameBtn = document.getElementById('restart-game');
    const message = document.getElementById('message');


    //event listeners
    pvcMode.addEventListener('click', () => {
        playerTwoInput.style.display = 'none';
    })

    pvpMode.addEventListener('click', () => {
        playerTwoInput.style.display = 'block';
    })

    const gameMode = function(e) {
        e.preventDefault();
        let playerOne = playerOneInput.value;
        let playerTwo = playerTwoInput.value || 'Computer';

        //Validate names to 15 characters or less
        if (playerOne.length > 15 || playerTwo.length > 15) {
            message.style.display = 'block';
            message.innerText = 'Make Names 15 Characters or Less';
            return;

        //Establish the game object to call    
        }
        if(pvpMode.checked) {
            console.log('pvp game');
        } else if(pvcMode.checked) {
            console.log('pvc game')
        } else {
            console.log('Choose a game mode')
        }
        displayNames(playerOne, playerTwo); 
    };
    

    function displayNames(a, b) {
        controlBox.style.display = 'none';
        for (let i = 0; i < score.length; i++) {
            score[i].style.display = 'block';
        }
        playerOneNameDisplay.innerText = a;
        playerTwoNameDisplay.innerText = b;
        restartGameBtn.style.display = 'block';


    }

    startGameBtn.addEventListener('click', e => gameMode(e))





})();

//factories
function createPlayer() {
    return player;
}