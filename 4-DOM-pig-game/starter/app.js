/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, gamePlaying, dice1, dice2, diceDOM1, diceDOM2, dicePrev, winningScore;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gamePlaying) {
        
        
        //Remembering previous dice
        //dicePrev = dice;
        //console.log(dicePrev);
        
        // 1. Random number
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        console.log(dice1);
        console.log(dice2);

        // 2. Display the result
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';


        /*
        //3. Update the round score IF the rolled score was not a 1 or 2 x 6
        if (dice === 6 && dicePrev === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        */
        
        if (dice1 !== 1 && dice2 !==1) {
            //Add score
            roundScore += dice1;
            roundScore += dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if (gamePlaying) {
        
    
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        diceDOM1.style.display = 'none';
        diceDOM2.style.display = 'none';
        
        //read user input
        var input = document.querySelector('.final-score').value;

        if (input) {
        winningScore = input;
        } else {
        winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            diceDOM1.style.display = 'none';
            diceDOM2.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
         } else {
        //Next player
        nextPlayer();

        }
    }
});
    
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
        
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    diceDOM1 = document.querySelector('.dice-1');
    diceDOM2 = document.querySelector('.dice-2');
    dice1 = 0;
    dice2 = 0
    dicePrev = 0;
    
    diceDOM1.style.display = 'none';
    diceDOM2.style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    }
    