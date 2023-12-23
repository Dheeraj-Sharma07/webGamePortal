//Game Constants And Variable
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 10;
let score = 0;
let LastPaintTime = 0;
let SnakeArr = [
    { x: 13, y: 15 }
]

food = { x: 6, y: 7 };
// Game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - LastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    LastPaintTime = ctime;
    //console.log(ctime);
    gameEngine();
}

function isCollide(snake) {
    // if you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // if ypu bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    // 1. Updating the snake array and food
    if (isCollide(SnakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0};
        alert("GameOver. Press any key to play again!");
        SnakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;

    }

    // if you have eaten the food, then increment the score and regenrate the food
    if (SnakeArr[0].y === food.y && SnakeArr[0].x === food.x) {
        foodSound.play();
        score +=1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hi score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        SnakeArr.unshift({ x: SnakeArr[0].x + inputDir.x, y: SnakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Moving the snake
    for (let i = SnakeArr.length - 2; i >= 0; i--) {
        SnakeArr[i + 1] = { ...SnakeArr[i] };

    }

    SnakeArr[0].x += inputDir.x;
    SnakeArr[0].y += inputDir.y;

    // 2. Display snake and food 
    // Display snake
    board.innerHTML = "";
    SnakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);


        // Display food

        foodElement = document.createElement("div");
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;

        foodElement.classList.add('food');
        board.appendChild(foodElement);

    })
}

//Main logic
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval=0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hiscore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; // To start the game enter any button
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }

});
