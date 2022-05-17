
let mode = null;

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
            mode = 'pvp';
            let p1 = createPlayer(playerOne);
            let p2 = createPlayer(playerTwo);
        } else if(pvcMode.checked) {
            mode = 'pvc';
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
    const sq1 = document.getElementById('sq1');
    const sq2 = document.getElementById('sq2');
    const sq3 = document.getElementById('sq3');
    const sq4 = document.getElementById('sq4');
    const sq5 = document.getElementById('sq5');
    const sq6 = document.getElementById('sq6');
    const sq7 = document.getElementById('sq7');
    const sq8 = document.getElementById('sq8');
    const sq9 = document.getElementById('sq9');
    const gameBoard = document.getElementById('game-board');
    const announcement = document.getElementById('announcement');
    const restartGameBtn = document.getElementById('restart-game');
    const battleAgainBtn = document.getElementById('battle-again');
    const p1Points = document.getElementById('p1-points');
    const p2Points = document.getElementById('p2-points');

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
    restartGameBtn.addEventListener('click', resetScores);
    battleAgainBtn.addEventListener('click', battleAgain);

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

    //score
    let playerOnePoints = 0;
    let playerTwoPoints = 0;

    function getMove(e) {
        //check to see if players created before letting game start 
        let squareID = e.srcElement.id;
        let checkID = document.getElementById(squareID);
        const playerOne = document.getElementById('player-one-name').innerText;
        if (playerOne != 'Player 1' && checkID.childNodes.length == 0) {
            if(mode == 'pvp'){
                move += 1;
                (move % 2 == 0) ? getWeapon(e,'P2') : getWeapon(e, 'P1');
            } else{
                //Log players move and get computer's move right after;
                move += 1;
                getWeapon(e, 'P1');
                getComputerMove();

            }
        } 
    };

    function getWeapon(e, player) {
        const weapon = document.createElement('i');

        if (player == 'P1') {
            weapon.classList.add('flaticon-close');
            keepScore(e.target.id, 1);
        } else {
            weapon.classList.add('flaticon-o');
            keepScore(e.target.id, 2);
        }
        e.target.appendChild(weapon);
        return weapon;
    }    

    function getComputerMove() {
        let squares = [sq1, sq2, sq3, sq4, sq5, sq6, sq7, sq8, sq9];
        let checked = [];
    
        //Get available squares and added to checked array
        for(let square of squares) {
            if(square.innerHTML == '') {
                checked.push(square);
            }
        }
    
        //Create a legal computer move
        let computerMove = Math.floor(Math.random() * checked.length);
        let attackSquare = document.getElementById(checked[computerMove].id)
        console.log('attack square is' + String(attackSquare.id))
    
        //build and place weapon
        const weapon = document.createElement('i');
        weapon.classList.add('flaticon-o');
        attackSquare.appendChild(weapon);
        keepScore(attackSquare.id, 2 )
    } 
    

    function keepScore(squareId, player) {

        switch (squareId) {
            case "sq1":
                a1 = player;
                break
            case "sq2":
                b1 = player;
                break
            case "sq3":
                c1 = player;
                break
            case "sq4":
                a2 = player;
                break
            case "sq5":
                b2 = player;
                break
            case "sq6":
                c2 = player;
                break
            case "sq7":
                a3 = player;
                break
            case "sq8":
                b3 = player;
                break
            case "sq9":
                c3 = player;
                break
        }
        calculateWinner();
    }

    function calculateWinner() {
        let winner = null;

        //Top row
        if (a1 == 1 && b1 == 1 && c1 == 1) {
            winner = 'p1';
            playerOnePoints += 1;
        }
    
        if (a1 == 2 && b1 == 2 && c1 == 2) {
            winner = 'p2';
            playerTwoPoints += 1;
        }

        //Middle row
        if (a2 == 1 && b2 == 1 && c2 == 1) {
            winner = 'p1';
            playerOnePoints += 1;
        }
    
        if (a2 == 2 && b2 == 2 && c2 == 2) {
            winner = 'p2';
            playerTwoPoints += 1;
        }

        //Bottom row
        if (a3 == 1 && b3 == 1 && c3 == 1) {
            winner = 'p1';
            playerOnePoints += 1;
        }
    
        if (a3 == 2 && b3 == 2 && c3 == 2) {
            winner = 'p2';
            playerTwoPoints += 1;
        }

        //First Column
        if (a1 == 1 && a2 == 1 && a3 == 1) {
            winner = 'p1';
            playerOnePoints += 1;
        }
    
        if (a1 == 2 && a2 == 2 && a3 == 2) {
            winner = 'p2';
            playerTwoPoints += 1;
        }

         //Second Column
         if (b1 == 1 && b2 == 1 && b3 == 1) {
            winner = 'p1';
            playerOnePoints += 1;
        }
    
        if (b1 == 2 && b2 == 2 && b3 == 2) {
            winner = 'p2';
            playerTwoPoints += 1;
        }

        //Third Column
        if (c1 == 1 && c2 == 1 && c3 == 1) {
            winner = 'p1';
            playerOnePoints += 1;
        }
    
        if (c1 == 2 && c2 == 2 && c3 == 2) {
            winner = 'p2';
            playerTwoPoints += 1;
        }

        //Top Left down to Bottom Right
        if (a1 == 1 && b2 == 1 && c3 == 1) {
            winner = 'p1';
            playerOnePoints += 1;
        }
    
        if (a1 == 2 && b2 == 2 && c3 == 2) {
            winner = 'p2';
            playerTwoPoints += 1;
        }

        //Top Right down to Bottom Left
        if (c1 == 1 && b2 == 1 && a3 == 1) {
            winner = 'p1';
            playerOnePoints += 1;
        }
    
        if (c1 == 2 && b2 == 2 && a3 == 2) {
            winner = 'p2';
            playerTwoPoints += 1;
        }

        if(winner) {
            declareWinner(winner);
        } else {
            checkDraw(winner);
        }

        p1Points.innerText = 'Score: ' + playerOnePoints;
        p2Points.innerText = 'Score: ' + playerTwoPoints;
    }

    function checkDraw(winner) {
        let squares = [a1, a2, a3, b1, b2, b3, c1, c2, c3];
        let check = squares.includes(null);
        if(check != true && winner != true) {
            gameBoard.style.filter = 'blur(2px)';
            restartGameBtn.style.display = 'block';
            battleAgainBtn.style.display = 'block';
            announcement.style.display = 'block';
            announcement.innerHTML = `It's a draw. Try again!`;
        }
    }

    function declareWinner(winner) {
        const playerOne = document.getElementById('player-one-name').innerText;
        const playerTwo = document.getElementById('player-two-name').innerText;

        let congratulations = (winner == 'p1') ? playerOne + ' Wins!' : playerTwo + ' Wins!'

        gameBoard.style.filter = 'blur(2px)';
        restartGameBtn.style.display = 'block';
        battleAgainBtn.style.display = 'block';
        announcement.style.display = 'block';
        announcement.innerHTML = congratulations;
    }

    function resetScores() {
        playerOnePoints = 0;
        playerTwoPoints = 0;
        p1Points.innerText = 'Score: ' + playerOnePoints;
        p2Points.innerText = 'Score: ' + playerTwoPoints;
        battleAgain();
    }

    function battleAgain() {
        gameBoard.style.filter = 'blur(0px)';
        restartGameBtn.style.display = 'none';
        battleAgainBtn.style.display = 'none';
        announcement.style.display = 'none';

        //reset board values
        move = 0;
        a1 = null;
        b1 = null;
        c1 = null;
        a2 = null;
        b2 = null;
        c2 = null;
        a3 = null;
        b3 = null;
        c3 = null;

        //Empty square icons
        let squares = gameBoard.children;
        for(i = 0; i < squares.length; i++) {
            squares[i].innerText = '';
        }
        
    }

})();


