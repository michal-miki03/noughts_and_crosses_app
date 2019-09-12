const start_box = document.querySelector('.start_box');
const names_box = document.querySelector('.names_box');
const game_box = document.querySelector('.game_box');
const start_button = document.querySelector('.start_button');
const play_button = document.querySelector('.confirm_button');
const back_button = document.querySelector('.back_button');
const play_again_button = document.querySelector('.play_again_button');
const input_players_names = [...document.querySelectorAll('.name')];
let game_fields = [...document.querySelectorAll('.field')];
const game_type = [...document.querySelectorAll('.game_type')];
const game_icons = [...document.querySelectorAll('.image')];
const info_image = document.querySelector('.info_image');
const info_text = document.querySelector('.info_text');
let isEnd = false;
let isOnePlayerGame = false;
const PLAYERS_ICONS = ['nought_icon', 'cross_icon', 'winner_icon'];
const PLAYERS_SIGNS = ['nought', 'cross'];
const PLAYERS_NUMBERS = ['Player 1', 'Player 2'];
const players_names = ['', ''];
let board = [['', '', ''], ['', '', ''], ['', '', '']];
const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let round = 0;

game_fields.forEach(field => {
  field.addEventListener('click', choose);
});

back_button.addEventListener('click', () => {
  board = [['', '', ''], ['', '', ''], ['', '', '']];
  for (let ii = 0; ii < PLAYERS_ICONS.length; ii++) {
    info_image.classList.remove(PLAYERS_ICONS[ii]);
  }
  for (let ii = 0; ii < PLAYERS_NUMBERS.length; ii++) {
    game_fields.forEach(field => {
      field.classList.remove(PLAYERS_SIGNS[ii]);
    });
  }
  input_players_names.forEach(input => {
    input.value = '';
  });
  game_box.classList.remove('appear');
  game_box.classList.remove('visually_appear');
  start_box.classList.remove('visually_hide');
  start_box.classList.remove('hide');
});

play_again_button.addEventListener('click', () => {
  isEnd = false;
  round = 0;
  const sign = round % 2;
  board = [['', '', ''], ['', '', ''], ['', '', '']];
  for (let ii = 0; ii < PLAYERS_NUMBERS.length; ii++) {
    game_fields.forEach(field => {
      field.classList.remove(PLAYERS_SIGNS[ii]);
    });
  }
  info_image.classList.remove(PLAYERS_ICONS[+!sign]);
  info_image.classList.remove(PLAYERS_ICONS[2]);
  changePlayer(sign);
});

start_button.addEventListener('click', startGame);

play_button.addEventListener('click', openBoard);

game_type.forEach(input => {
  input.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      startGame();
    }
  });
});

input_players_names.forEach(input => {
  input.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      openBoard();
    }
  });
});

function changePlayer (sign) {
  clearIcons();
  game_icons[sign].style.zIndex = 1;
  info_text.innerHTML = players_names[sign];
}

function startGame () {
  if (game_type[0].checked) {
    isOnePlayerGame = true;
    players_names[0] = 'You';
    players_names[1] = 'Computer';
    info_text.innerHTML = players_names[0];
    start_box.classList.add('visually_hide');
    setTimeout(() => {
      start_box.classList.add('hide');
      game_box.classList.add('appear');
      setTimeout(() => {
        game_box.classList.add('visually_appear');
        changePlayer(0);
      }, 200);
    }, 1000);
  } else {
    isOnePlayerGame = false;
    start_box.classList.add('visually_hide');
    setTimeout(() => {
      start_box.classList.add('hide');
      names_box.classList.add('appear');
      setTimeout(() => {
        names_box.classList.add('visually_appear');
        changePlayer(0);
      }, 200);
    }, 1000);
  }
}

function openBoard () {
  getPlayerNames();
  names_box.classList.remove('visually_appear');
  names_box.classList.add('visually_hide');
  setTimeout(() => {
    names_box.classList.remove('appear');
    game_box.classList.add('appear');
    setTimeout(() => {
      game_box.classList.add('visually_appear');
      changePlayer(0);
    }, 200);
  }, 1000);
}

function getPlayerNames () {
  players_names[0] = input_players_names[0].value
    ? input_players_names[0].value
    : PLAYERS_NUMBERS[0];
  players_names[1] = input_players_names[1].value
    ? input_players_names[1].value
    : PLAYERS_NUMBERS[1];
}

function choose (event) {
  const sign = isOnePlayerGame ? 0 : round % 2;
  const { row, column } = event.target.dataset;

  if (board[row][column] !== '' || isEnd) return;

  event.target.classList.add(PLAYERS_SIGNS[sign]);
  board[row][column] = PLAYERS_NUMBERS[sign];
  if (isOnePlayerGame) {
    check();
    if (!isEnd) {
      setTimeout(() => {
        computerMove();
        check();
      }, 200);
    }
  } else {
    changePlayer(+!sign);
    check();
  }
}

function computerMove () {
  if (round < 8) {
    let row, col;
    do {
      col = Math.floor(Math.random() * 3);
      row = Math.floor(Math.random() * 3);
    } while (board[row][col] !== '');

    board[row][col] = PLAYERS_NUMBERS[1];
    const new_arr = [];
    while (game_fields.length) new_arr.push(game_fields.splice(0, 3));
    new_arr[row][col].classList.add(PLAYERS_SIGNS[1]);
    game_fields = new_arr.flat();
  }
}

function check () {
  const res = board.flat();
  const moves = {
    'Player 1': [],
    'Player 2': []
  };
  res.forEach((sign, index) => (moves[sign] ? moves[sign].push(index) : null));
  winning_combinations.forEach(combinantion => {
    if (
      combinantion.every(index => moves[PLAYERS_NUMBERS[0]].indexOf(index) > -1)
    ) {
      isEnd = true;
    }
    if (
      combinantion.every(index => moves[PLAYERS_NUMBERS[1]].indexOf(index) > -1)
    ) {
      isEnd = true;
    }
    if (isEnd) {
      endGame();
    }
  });
  round++;
  if (round > 8 && !isEnd) draw();
}

function draw () {
  const sign = round % 2;
  info_text.innerHTML = 'Play again!';
  info_image.classList.remove(PLAYERS_ICONS[+!sign]);
  info_image.classList.remove(PLAYERS_ICONS[1 + !sign]);
}

function endGame () {
  const sign = round % 2;
  info_text.innerHTML = `${players_names[sign]} won!`;
  clearIcons();
  game_icons[2].style.zIndex = 1;
}

function clearIcons () {
  game_icons.forEach(icon => {
    icon.style.zIndex = 0;
  });
}
