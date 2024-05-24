document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div");
    const scoreDisplay = document.querySelector("span");
    const startBtn = document.querySelector(".start");

    const width = 10;
    let currentIndex = 0; // first div in grid
    let appleIndex = 0; // firtst div in grid
    let currentSnake = [2, 1, 0]; // 2 is the head, 0 is the tail, 1s are the body
    let currentHead = currentSnake[0];
    let direction = 1; // down
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;   


    // start and restart game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove("snake"));
        squares[currentHead].classList.remove("head");
        squares[appleIndex].classList.remove("apple");
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        interval = setInterval(moveOutcomes, intervalTime);
        currentSnake.forEach(index => squares[index].classList.add("snake"));
    }

    // dealing with all move outcomes
    function moveOutcomes() {
        // deals with snake hitting borders or itself
        if (
            (currentSnake[0] + width >= (width*width) && direction === width) || // if snake hits bottom
            (currentSnake[0] % width === width-1 && direction === 1) || // if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
            (squares[currentSnake[0] + direction].classList.contains("snake")) // if snake hits itself
        ) {
            return clearInterval(interval);
        }

        const tail = currentSnake.pop();
        squares[tail].classList.remove("snake");
        currentSnake.unshift(currentSnake[0] + direction);
        squares[currentHead].classList.remove("head");
        currentHead = currentSnake[0];

        // deals with snake getting apple
        if (squares[currentSnake[0]].classList.contains("apple")) {
            squares[currentSnake[0]].classList.remove("apple");
            squares[tail].classList.add("snake");
            currentSnake.push(tail);
            randomApple();
            score ++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }

        squares[currentSnake[0]].classList.add("snake");
        squares[currentSnake[0]].classList.add("head");
    }

    // generate new apple once apple is eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        } while (squares[appleIndex].classList.contains("snake"));
        squares[appleIndex].classList.add("apple");
    }

    // assign function to keycodes
    function control(e) {
        squares[currentIndex].classList.remove("snake");
        
        if (e.keyCode === 39) {
            direction = 1;
        } else if (e.keyCode === 38) {
            direction = -width;

        } else if (e.keyCode === 37) {
            direction = -1;
        } else if (e.keyCode === 40) {
            direction = +width;
        }
    }

    document.addEventListener("keyup", control);
    startBtn.addEventListener("click", startGame);
});