const play_button = document.querySelector('.confirm_button');
const back_button = document.querySelector('.back_button');
const players = document.querySelectorAll('.name');
const box = document.querySelector('.box');
const game_box = document.querySelector('.game_box');
const game_fields = [...document.querySelectorAll('.field')];
const PLAYER1 = 'nought';
const PLAYER2 = 'cross';
let round = 0;

play_button.addEventListener('click', () => {
    box.classList.add('visually_hide');
    setTimeout(() => {
        box.classList.add('hide');
        game_box.classList.add('appear');
        setTimeout(() => {
            game_box.classList.add('visually_appear');
        }, 200);
    }, 1000);
});

function choose(event) {
    const sign = round % 2 === 0 ? PLAYER1 : PLAYER2;
    event.target.classList.add(sign);
    round++;
}

game_fields.forEach(field => field.addEventListener('click', choose));

// back_button.addEventListener('click', () => {
//     box.classList.remove('visually_hide');
//     box.classList.remove('hide');
//     game_box.classList.remove('visually_appear');
//     game_box.classList.remove('appear');
// });
