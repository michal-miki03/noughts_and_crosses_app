const play_button = document.querySelector('.confirm_button');
const back_button = document.querySelector('.back_button');
const players = document.querySelectorAll('.name');
const box = document.querySelector('.box');
const game_box = document.querySelector('.game_box');

play_button.addEventListener('click', () => {
    box.classList.add('visually_hide');
    setTimeout(() => {
        box.classList.add('hide');
    }, 1000);
    setTimeout(() => {
        game_box.classList.add('appear');
    }, 1000);
    setTimeout(() => {
        game_box.classList.add('visually_appear');
    }, 1500);
});

back_button.addEventListener('click', () => {
    box.classList.remove('visually_hide');
    box.classList.remove('hide');
    game_box.classList.remove('visually_appear');
    game_box.classList.remove('appear');
});
