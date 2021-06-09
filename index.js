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
    //create 100 of these elements with a for loop
    for (let i=0; i < width*width; i++) {
     //create element
    const square = document.createElement('div')
    //add styling to the element
    square.classList.add('square')
    //put the element into our grid
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
    clearInterval(timerId)
    currentCaterpillar = [2,1,0]
    score = 0
    //re add new score to browser
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateApple()
    //readd the class of snake to our new currentSnake
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
        
    ){
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
    //add styling so we can see it
    
    //deal with caterpillar head gets apple
    if (squares[currentCaterpillar[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentCaterpillar[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('caterpillar')
        console.log(tail)
        //grow our snake array
        currentCaterpillar.push(tail)
        console.log(currentCaterpillar)
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