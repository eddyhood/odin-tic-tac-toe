
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
    const p1Name = document.getElementById('player-one-name');
    const p2Name = document.getElementById('player-two-name');

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
    //Stores values in each grid cell. Reads top left to right like a book.
    let a1 = null;
    let b1 = null;
    let c1 = null;
    let a2 = null;
    let b2 = null;
    let c2 = null;
    let a3 = null;
    let b3 = null;
    let c3 = null;


    function getMove(e) {
        move += 1;
        let choice = (move % 2 == 0) ? getWeapon(e,'P2') : getWeapon(e, 'P1');

    };

    function getWeapon(e, player) {
        const weapon = document.createElement('i');

        if (player == 'P1') {
            weapon.classList.add('flaticon-close');
            keepScore(e, 1);
        } else {
            weapon.classList.add('flaticon-o');
            keepScore(e, 2);
        }
        e.target.appendChild(weapon);
        console.log(weapon)
        return weapon;
    }    

    function keepScore(e, player) {

        switch (e.target.id) {
            case "sq-1":
                a1 = player;
                console.log(a1);
                break
            case "sq-2":
                b1 = player;
                console.log(b1);
                break
            case "sq-3":
                c1 = player;
                console.log(c1);
                break
            case "sq-4":
                a2 = player;
                console.log(a2);
                break
            case "sq-5":
                b2 = player;
                console.log(b2);
                break
            case "sq-6":
                c2 = player;
                console.log(c2);
                break
            case "sq-7":
                a3 = player;
                console.log(a3);
                break
            case "sq-8":
                b3 = player;
                console.log(b3);
                break
            case "sq-9":
                c3 = player;
                console.log(c3);
                break
        }
        calculateWinner();
    }

    function calculateWinner() {
        let winner = null;

        //Top row
        if (a1 == 1 && b1 == 1 && c1 == 1) {
            winner = 'p1';
        }
    
        if (a1 == 2 && b1 == 2 && c1 == 2) {
            winner = 'p2';
        }

        //Middle row
        if (a2 == 1 && b2 == 1 && c2 == 1) {
            winner = 'p1';
        }
    
        if (a2 == 2 && b2 == 2 && c2 == 2) {
            winner = 'p2';
        }

        //Bottom row
        if (a3 == 1 && b3 == 1 && c3 == 1) {
            winner = 'p1';
        }
    
        if (a3 == 2 && b3 == 2 && c3 == 2) {
            winner = 'p2';
        }

        //First Column
        if (a1 == 1 && a2 == 1 && a3 == 1) {
            winner = 'p1';
        }
    
        if (a1 == 2 && a2 == 2 && a3 == 2) {
            winner = 'p2';
        }

         //Second Column
         if (b1 == 1 && b2 == 1 && b3 == 1) {
            winner = 'p1';
        }
    
        if (b1 == 2 && b2 == 2 && b3 == 2) {
            winner = 'p2';
        }

        //Third Column
        if (c1 == 1 && c2 == 1 && c3 == 1) {
            winner = 'p1';
        }
    
        if (c1 == 2 && c2 == 2 && c3 == 2) {
            winner = 'p2';
        }

        //Top Left down to Bottom Right
        if (a1 == 1 && b2 == 1 && c3 == 1) {
            winner = 'p1';
        }
    
        if (a1 == 2 && b2 == 2 && c3 == 2) {
            winner = 'p2';
        }

        //Top Right down to Bottom Left
        if (c1 == 1 && b2 == 1 && a3 == 1) {
            winner = 'p1';
        }
    
        if (c1 == 2 && b2 == 2 && a3 == 2) {
            winner = 'p2';
        }

        if(winner) {
            declareWinner(winner);
        }
    }

    function declareWinner(winner) {
        const playerOne = document.getElementById('player-one-name').innerText;
        const playerTwo = document.getElementById('player-two-name').innerText;
        const gameBoard = document.getElementById('game-board');
        const announcement = document.getElementById('announcement');

        let congratulations = (winner == 'p1') ? playerOne + 'Wins!' : playerTwo + 'Wins!'

        // gameBoard.style.display = 'none';
        announcement.style.display = 'block';
        announcement.innerHTML = congratulations;

    
    }
})();


