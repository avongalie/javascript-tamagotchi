const input = document.getElementById("name");
const startButton = document.getElementById("start");
const textHunger = document.getElementById("hunger");
const textSleepiness = document.getElementById("sleepiness");
const textBoredom = document.getElementById("boredom");
const feedButton = document.getElementById('feed');
const sleepButton = document.getElementById('sleep');
const playButton = document.getElementById('play');

class Tamagotchi{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
}

let boredom = 0;
let hunger = 0;
let sleepiness = 0;
let petDead = false;

var bored;
var hungry;
var sleep;
var petStatus;

// begins the game with a new pet
function startGame(){
    let name = input.value;
    let newPet = createPet(name);
    console.log(newPet)
    startIntervals();
    petStatus = setInterval(checkPetStatus, 2000);
    
}


//creates a new pet
function createPet(name){
    return new Tamagotchi(name, 0);
}


//sets timer for boredom hunger and sleepiness;
function startIntervals(){
    bored = setInterval(function(){
            boredom++;
            textBoredom.innerText = `Boredem: ${boredom}`;
        },2000)
    hungry = setInterval(function(){
            hunger++;
            textHunger.innerText = `Hunger: ${hunger}`;
        },4000)
    sleep = setInterval(function(){
        sleepiness++;
            textSleepiness.innerText = `Sleepiness: ${sleepiness}`;
        },6000)
}

//checks if pet is dead or not
function checkPetStatus(){
    if(boredom === 10 || hunger === 10 || sleepiness === 10){
        //might not need petDead
        petDead = true;
        clearInterval(bored);
        clearInterval(hungry);
        clearInterval(sleep);
        clearInterval(petStatus);
    }
}

//starts game when button is clicked
startButton.onclick = function(){
    startGame();
}