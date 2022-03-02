let input = document.getElementById("name");
let startButton = document.getElementById("start");

class Tamagotchi{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
}

let boredom = 0;
let hunger = 0;
let sleepiness = 0;

// begins the game with a new pet
function startGame(){
    let name = input.value;
    let newPet = createPet(name);
    console.log(newPet)
}


//creates a new pet
function createPet(name){
    return new Tamagotchi(name, 0);
}


//sets timer for boredom hunger and sleepiness;
function startIntervals(){

}

//starts game when button is clicked
startButton.onclick = function(){
    startGame();
}