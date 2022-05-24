'use strict';
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
let currentScore, scores, playing, activePlayer;

const init = function () {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  activePlayer = 0;
  diceEL.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 0;
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');

  diceEL.classList.add('hidden');
};
init();
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // console.log(currentScore);
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEL.classList.add('hidden');
      btnRoll.textContent = `player ${activePlayer + 1} wins`;
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  playing = true;
  if (playing) {
    score0EL.textContent = 0;
    score1EL.textContent = 0;
    diceEL.classList.add('hidden');
    current0EL.textContent = 0;
    current1EL.textContent = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    activePlayer = 0;
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
    currentScore = 0;
    btnRoll.textContent = `🎲 Roll dice`;
  }
});
