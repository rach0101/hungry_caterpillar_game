const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let squares = []
let currentCaterpillar = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = .9
let timerId = 0

function createGrid() {
    //create a 100 square grid with a for loop
    for (let i=0; i < width*width; i++) {
        //create div
        const square = document.createElement('div')
        //add styling to the div
        square.classList.add('square')
        //put the element into our grid aka add newly created child div to our parent div with a class of grid
        grid.appendChild(square)
        //push it into a new squares array    
        squares.push(square)
    }
}

createGrid()

currentCaterpillar.forEach(index => squares[index].classList.add('caterpillar'))

function startGame() {
    //remove the caterpillar
    currentCaterpillar.forEach(index => squares[index].classList.remove('caterpillar'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    // reset timer
    clearInterval(timerId)
    // assign location of caterpillar
    currentCaterpillar = [2,1,0]
    // reset score
    score = 0
    //add score to scoreboard
    scoreDisplay.textContent = score
    // reset direction to 1
    direction = 1
    // set interval
    intervalTime = 1000
    generateApple()
    //add the class of caterpillar to our new currentCaterpillar
    currentCaterpillar.forEach(index => squares[index].classList.add('caterpillar'))
    timerId = setInterval(move, intervalTime)
}

function move() {
    if (
        (currentCaterpillar[0] + width >= width*width && direction === width) || //if caterpillar has hit bottom
        (currentCaterpillar[0] % width === width-1 && direction === 1) || //if caterpillar has hit right wall
        (currentCaterpillar[0] % width === 0 && direction === -1) || //if caterpillar has hit left wall
        (currentCaterpillar[0] - width < 0 && direction === -width) || //if caterpillar has hit top
        squares[currentCaterpillar[0] + direction].classList.contains('caterpillar') //if caterpillar hits itself
     )
    {   
        // ends game and displays Game Over Modal if caterpillar hits a wall or itself
        console.log("game over");
        document.getElementById("overlay").style.display = "block";
        return clearInterval(timerId)
    }
    
    //remove last element from our currentCaterpillar array
    const tail = currentCaterpillar.pop()
    //remove styling from last element
    squares[tail].classList.remove('caterpillar')
    //add square in direction we are heading
    currentCaterpillar.unshift(currentCaterpillar[0] + direction)
    
    //grow caterpillar when it eats apple
    if (squares[currentCaterpillar[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentCaterpillar[0]].classList.remove('apple')
        //grow our caterpillar by adding class of caterpillar to it
        squares[tail].classList.add('caterpillar')
        //grow our caterpillar array
        currentCaterpillar.push(tail)
        //generate new apple
        generateApple()
        //add one to the score
        score++
        //display our score
        scoreDisplay.textContent = score
        //speed up our caterpillar
        clearInterval(timerId)
        console.log(intervalTime)
        intervalTime = intervalTime * speed
        console.log(intervalTime)
        timerId = setInterval(move, intervalTime)
    } 
    squares[currentCaterpillar[0]].classList.add('caterpillar')
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('caterpillar'))
    squares[appleIndex].classList.add('apple')
} 
generateApple()

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
    if (e.keyCode === 39) {
        console.log('right pressed')
        direction = 1
    } else if (e.keyCode === 38) {
        console.log('up pressed')
        direction = -width
    } else if (e.keyCode === 37) {
        console.log('left pressed')
        direction = -1
    } else if (e.keyCode === 40) {
        console.log('down pressed')
        direction = +width
    }
}
document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame)