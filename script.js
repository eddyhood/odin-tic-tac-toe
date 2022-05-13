
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
            let p1 = createPlayer(playerOne);
            let p2 = createPlayer(playerTwo);
        } else if(pvcMode.checked) {
            let p1 = createPlayer(playerOne);
            let p2 = createPlayer('computer');
        } else {
            message.style.display = 'block';
            message.innerText = 'Choose a Game Mode';
            return;
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
function createPlayer(name) {
    let gamesWon = 0;
    let turn;

    return {name, gamesWon, turn}
}

(function playGame() {
    const sq1 = document.getElementById('sq-1');
    const sq2 = document.getElementById('sq-2');
    const sq3 = document.getElementById('sq-3');
    const sq4 = document.getElementById('sq-4');
    const sq5 = document.getElementById('sq-5');
    const sq6 = document.getElementById('sq-6');
    const sq7 = document.getElementById('sq-7');
    const sq8 = document.getElementById('sq-8');
    const sq9 = document.getElementById('sq-9');

    //Event listeners
    sq1.addEventListener('click', e => getMove(e));
    sq2.addEventListener('click', e => getMove(e));
    sq3.addEventListener('click', e => getMove(e));
    sq4.addEventListener('click', e => getMove(e));
    sq5.addEventListener('click', e => getMove(e));
    sq6.addEventListener('click', e => getMove(e));
    sq7.addEventListener('click', e => getMove(e));
    sq8.addEventListener('click', e => getMove(e));
    sq9.addEventListener('click', e => getMove(e));

    let move = 0;


    function getMove(e) {
        move += 1;
        (move % 2 == 0) ? getWeapon(e,'P2') : getWeapon(e, 'P1');
    };

    function getWeapon(e, player) {
        const weapon = document.createElement('i');

        if (player == 'P1') {
            weapon.classList.add('flaticon-close');
        } else {
            weapon.classList.add('flaticon-o');
        }
        e.target.appendChild(weapon);
        return;
    }    
})();
