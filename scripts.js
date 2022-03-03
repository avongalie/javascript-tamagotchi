const startPage = document.getElementById("startPage");
const tamagotchiPage = document.getElementById("tamagotchi");
const input = document.getElementById("name");
const startButton = document.getElementById("start");
const textHunger = document.getElementById("hunger");
const textSleepiness = document.getElementById("sleepiness");
const textBoredom = document.getElementById("boredom");
const feedButton = document.getElementById('feed');
const sleepButton = document.getElementById('sleep');
const playButton = document.getElementById('play');
const pets = document.querySelectorAll(".choose");

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

var petChoice;
var bored;
var hungry;
var sleep;
var petStatus;
var currentPet;

// begins the game with a new pet
function startGame(){
    let name = input.value;
    let newPet = createPet(name);
    console.log(newPet)
    startIntervals();
    petStatus = setInterval(checkPetStatus, 2000);
    createOnclicks();
    
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

//allows player to bring hunger sleepiness and boredom back to 0
function createOnclicks(){
    feedButton.onclick = (function(){
        hunger = 0;
        textHunger.innerText = `Hunger: ${hunger}`;
    });
    sleepButton.onclick = (function(){
        sleepiness = 0;
        textSleepiness.innerText = `Sleepiness: ${sleepiness}`;
    });
    playButton.onclick = (function(){
        boredom = 0;
        textBoredom.innerText = `Boredem: ${boredom}`;
    });

}

//starts game when button is clicked
startButton.onclick = function(){
    startPage.classList.add("hidden");
    tamagotchiPage.classList.remove("hidden");
    startGame();
}

//creates borders around pets to be chosen
function togglePet(){
    pets[0].onclick = function(){
        petChoice = 0;
        pets[0].style.border = "1px solid red"
        pets[1].style.border = "none"
        pets[2].style.border = "none"
    }
    pets[1].onclick = function(){
        petChoice = 1;
        pets[0].style.border = "none"
        pets[1].style.border = "1px solid red"
        pets[2].style.border = "none"
    }
    pets[2].onclick = function(){
        petChoice = 2;
        pets[0].style.border = "none"
        pets[1].style.border = "none"
        pets[2].style.border = "1px solid red"
    }
}

togglePet();