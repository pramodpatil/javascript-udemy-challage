/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// rollDiceGame = {
//     players: ['player1', 'player2'],
//     isNewGame: true,
//     getRandomNumber: function () {
//         return Math.floor(Math.random() * (6-1+1)) + 1;
//     },
//     activPlayer: function () {
//         if(this.isNewGame) {
//             this.isNewGame = false;
//             return players[0];
//         } else {
//             return players[1];
//         }         
//     }
// }


var scores, active_player, holdScore, numberOfPlayer, prevDiceNumber, winningNumber;

function getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

function newGame() {
    var player;
    numberOfPlayer = 2;
    // debugger;
    for (let i = 0; i < numberOfPlayer; i++) {
        player = document.querySelector(`.player-${i}-panel`);
        player.classList.remove('active', 'winner');
        player.querySelector('.player-score').textContent = 0;
        player.querySelector('.player-current-score').textContent = 0;
    }
    dice_img.style.display = 'none';
    scores = [0, 0];
    holdScore = 0;
    active_player = 0;
    prevDiceNumber = 0;
    document.querySelector(`.player-${active_player}-panel`).classList.add('active');
    winningNumber = Math.abs(document.querySelector('#winNumber').value)  || 100;
    enableDisableBtn(false);
}

function changePlayer() {
    prevDiceNumber = 0;
    document.querySelector(`#current-${active_player}`).textContent = 0;
    document.querySelector(`.player-${active_player}-panel`).classList.toggle('active');
    holdScore = 0;
    dice_img.style.display = 'none';

    active_player = active_player === 1 ? 0 : 1;
    document.querySelector(`.player-${active_player}-panel`).classList.toggle('active');
}


function rollDice() {    
    let diceNumber = getRandomNumber();
    dice_img.style.display = 'block';
    dice_img.setAttribute('src', `dice-${diceNumber}.png`);
    console.log(active_player + ' - ' + prevDiceNumber, diceNumber);
    let isCondition =  (prevDiceNumber + diceNumber) === 12;

    if (diceNumber > 1 && !isCondition) {
        prevDiceNumber = diceNumber;
        holdScore += diceNumber;
        document.querySelector(`#current-${active_player}`).textContent = holdScore;
    } else {
        changePlayer();
    }
}

function enableDisableBtn (flag) {
    dice_btn.disabled = flag;
    hold_btn.disabled = flag;
   
}

function holdDicePoint() {
    scores[active_player] += holdScore;
    document.querySelector(`#score-${active_player}`).textContent = scores[active_player];
    

    if (scores[active_player] >= winningNumber) {
        document.querySelector(`#name-${active_player}`).textContent = 'Winner!';
        document.querySelector(`#current-${active_player}`).textContent = '0';
        document.querySelector(`.player-${active_player}-panel`).classList.remove('active');
        document.querySelector(`.player-${active_player}-panel`).classList.add('winner');
        dice_img.style.display = 'none';
        enableDisableBtn(true);
    } else {
        changePlayer();
    }
}


var dice_btn = document.querySelector('.btn-roll');
var hold_btn = document.querySelector('.btn-hold');
var dice_img = document.querySelector('.dice');
var winningNumber = Math.abs(document.querySelector('#winNumber').value) || 20;
document.querySelector('.btn-new').addEventListener('click', newGame);
dice_btn.addEventListener('click', rollDice);
hold_btn.addEventListener('click', holdDicePoint);


// start new game;
newGame();
