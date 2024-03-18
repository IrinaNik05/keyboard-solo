const word = document.querySelector('.word');
const correctWord = document.querySelector('.correct-count');
const wrongWord = document.querySelector('.wrong-count');
const mistakesIntWord = document.querySelector('.word-mistakes');
const content = document.querySelector('.content');
const start = document.querySelector('.btn');
const timer = document.querySelector('#timer');
const message = document.querySelector('.message');

content.hidden = true;
let seconds = 0;
let minutes = 0;
let interval;

function updateTime() {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    timer.textContent = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
};

start.addEventListener('click', function() {
    content.hidden = false;
    start.style.display = 'none';
    interval = setInterval(updateTime, 1000);
});

let randomWord = "";
let letter = [];
let i = 0;
let counterRight = 0;
let counterWrong = 0;
let counterMistakes = 0;

function addWordByLetter() {
    const words = ['pencil', 'orange', 'planet', 'doll', 'cup', 'bread', 'dress', 'glasses', 'shoes'];
    randomWord = words[Math.floor(Math.random() * words.length)];
    word.innerHTML = randomWord.split('').map(item => `<span>${item}</span>`).join('');
    letter = word.querySelectorAll('span');
    i = 0;
    mistakesIntWord.textContent = 0;
    counterMistakes = 0;
};

addWordByLetter();

document.addEventListener('keydown', function(event) {
    if (event.key === letter[i].textContent) {
        letter[i].className = "c";
        i++;
    } else {
        counterMistakes++
        mistakesIntWord.textContent = counterMistakes;
        letter[i].className = "w";
    }

    if (i === randomWord.length) {

        if (counterMistakes === 0) {
            counterRight++;
            correctWord.textContent = counterRight;
        } else {
            counterWrong++;
            wrongWord.textContent = counterWrong;
        }
    };

    function showMessage(text) {
        clearInterval(interval);
        word.style.display = 'none';
        message.classList.remove("hidden");
        message.textContent = `${text}`;
    };

    if (i >= randomWord.length) {
        if (counterRight === 5) {
            showMessage(`Вы победили! Ваше время: ${timer.textContent}.`);
        } else if (counterWrong === 5) {
            showMessage("Вы проиграли!");
        }
        addWordByLetter();
    };
});