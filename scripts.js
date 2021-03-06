const startPage = document.getElementById("startPage");
const tamagotchiPage = document.getElementById("tamagotchi");
const nameInput = document.getElementById("nameInput");
const startButton = document.getElementById("start");
const textHunger = document.getElementById("hunger");
const textSleepiness = document.getElementById("sleepiness");
const textBoredom = document.getElementById("boredom");
const textAge = document.getElementById("age");
const feedButton = document.getElementById('feed');
const sleepButton = document.getElementById('sleep');
const playButton = document.getElementById('play');
const resetButton = document.getElementById("reset")
const pets = document.querySelectorAll(".choose");
const petPhoto = document.getElementById("pic");
const nameh3 = document.getElementById("name");
const stats = document.getElementById("stats");
const buttons = document.getElementById("buttons");

const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const color3 = document.getElementById("color3");
const color4 = document.getElementById("color4");


class Tamagotchi{
    constructor(name, age, choice){
        this.name = name;
        this.age = age;
        this.choice = choice;
    }
}

let boredom = 0;
let hunger = 0;
let sleepiness = 0;
let age = 0;
let petDead = false;
let petChoice = -1;

var boredomInterval;  
var hungerInterval; 
var sleepinessInterval;
var ageInterval;
var petStatus;
var currentPet;

// begins the game with a new pet
function startGame(){
    let name = nameInput.value;
    let newPet = createPet(name);
    setPetName(newPet.name);
    setPetPhoto(petChoice);
    //console.log(newPet)
    startIntervals();
    checkPetStatus();
    createOnclicks();
    
}


//creates a new pet
function createPet(name){
    return new Tamagotchi(name, 0, petChoice);
}

//shows chosen pet on screen 
function setPetPhoto(choice){
    switch(choice){
        case 0:
            petPhoto.src = "images/cat.png";
            petPhoto.alt = "cat";
            petPhoto.style.height = "150px";
            break;
        case 1:
            petPhoto.src = "images/dog.png";
            petPhoto.alt = "dog";
            petPhoto.style.height = "150px";
            break;
        case 2:
            petPhoto.src = "images/rabbit.png";
            petPhoto.alt = "rabbit";
            petPhoto.style.height = "150px";
            
    }
}

//shows chosen pet name on screen
function setPetName(name){
    nameh3.innerText = name;
}

//sets timer for boredom hunger and sleepiness;
function startIntervals(){
    boredomInterval = setInterval(function(){
            boredom++;
            textBoredom.innerText = `Boredom: ${boredom}`;
        },2000)
    hungerInterval = setInterval(function(){
            hunger++;
            textHunger.innerText = `Hunger: ${hunger}`;
        },4000)
    sleepinessInterval = setInterval(function(){
        sleepiness++;
            textSleepiness.innerText = `Sleepiness: ${sleepiness}`;
        },6000)
    ageInterval = setInterval(function(){
        age++;
        textAge.innerText = `Age: ${age}`;
    },19000)
}


//checks if pet is dead or not
function checkPetStatus(){
    petStatus = setInterval(function(){
        if(boredom === 10 || hunger === 10 || sleepiness === 10){
            //might not need petDead
            petDead = true;
            endIntervals();
            runawayPet();
        }
        if(age === 20){
            killPet();
        }
    }, 2000);
    
}

//ends intervals
function endIntervals(){
    clearInterval(boredomInterval);
    clearInterval(hungerInterval);
    clearInterval(sleepinessInterval);
    clearInterval(petStatus);
    clearInterval(ageInterval)
}

//allows player to bring hunger sleepiness and boredom down by 1
function createOnclicks(){
    feedButton.onclick = (function(){
        if(hunger === 0) return;
        hunger--;
        textHunger.innerText = `Hunger: ${hunger}`;
    });
    sleepButton.onclick = (function(){
        if(sleepiness === 0) return;
        sleepiness--;
        textSleepiness.innerText = `Sleepiness: ${sleepiness}`;
    });
    playButton.onclick = (function(){
        if(boredom === 0) return;
        boredom--;
        textBoredom.innerText = `Boredom: ${boredom}`;
    });

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

//enables pet running away
function runawayPet(){
    petPhoto.src = "images/runAway.gif";
    nameh3.innerText = `Oh no your pet ran away at age ${age}!`;
    petPhoto.style.float = "none";
    petPhoto.style.marginRight = "0";
    stats.classList.add("hidden");
    buttons.classList.add("hidden");
    textAge.classList.add("hidden");
    resetButton.classList.remove("hidden");
    resetButton.onclick = restartGame;
}

//kills pet
function killPet(){
    petPhoto.src = "images/skull.png";
    nameh3.innerText = `Your pet died at age ${age} from old age.`;
    petPhoto.style.float = "none";
    petPhoto.style.marginRight = "0";
    stats.classList.add("hidden");
    buttons.classList.add("hidden");
    textAge.classList.add("hidden");
    resetButton.classList.remove("hidden");
    resetButton.onclick = restartGame;
}

//resets game
function restartGame(){
    boredom = 0;
    sleepiness = 0;
    hunger = 0;
    age = 0;
    textAge.innerText = `Age: ${age}`;
    textBoredom.innerText = `Boredem: ${boredom}`;
    textHunger.innerText = `Hunger: ${hunger}`;
    textSleepiness.innerText = `Sleepiness: ${sleepiness}`;
    petPhoto.style.float = "right";
    petPhoto.style.marginRight = "20%";
    resetButton.classList.add("hidden");
    startPage.classList.remove("hidden");
    tamagotchiPage.classList.add("hidden");
    stats.classList.remove("hidden");
    buttons.classList.remove("hidden");
    textAge.classList.remove("hidden");
    nameInput.value = "";
    pets[petChoice].style.border = "none"
    petChoice = -1;
}

//starts game when button is clicked
startButton.onclick = function(){
    if(petChoice === -1 || nameInput.value.trim() === "") return;
    startPage.classList.add("hidden");
    tamagotchiPage.classList.remove("hidden");
    startGame();
    
}

color1.onclick = function(){
    document.body.style.backgroundColor = "antiquewhite";
}
color2.onclick = function(){
    document.body.style.backgroundColor = "plum";
}
color3.onclick = function(){
    document.body.style.backgroundColor = "lightsalmon";
}
color4.onclick = function(){
    document.body.style.backgroundColor = "palegreen";
}
togglePet();