/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {
        //1. Random Number
        var diceOne = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceOneDOM = document.querySelector("#dice-1");

        diceOneDOM.style.display = "block";
        diceOneDOM.src = "dice-" + diceOne + ".png";

        //3. Update the round score only if the rolled number is NOT a 1 and two cosicutive rolles are not 6
        if (diceOne !== 1) {
            roundScore += diceOne;
            document.getElementById(
                "current-" + activePlayer
            ).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        //1. Add CURRENT SCORE to GLOBAL SCORE
        scores[activePlayer] += roundScore;

        //2. Update the UI
        document.querySelector("#score-" + activePlayer).textContent =
            scores[activePlayer];

        var input = document.querySelector(".final-score").value;
        var winningScore = input ? input : 100;

        //3. Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent =
                "WINNER!";

            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.add("winner");
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.remove("active");

            document.querySelector("#dice-1").style.display = "none";

            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;

    //Updating Round Score
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    //Update the current active player
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    //Hide the dice
    document.querySelector("#dice-1").style.display = "none";

    //Reset the previous dice roll
    previousRoll = 0;
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    gamePlaying = true;

    document.querySelector("#dice-1").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");
}
