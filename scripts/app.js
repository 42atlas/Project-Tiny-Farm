/*
  General Assembly
  Project Zero
  First Project: Tiny Farm Game
  Author: Kathy Wu
  Date: 09/28/21
*/

console.log(
  "%c [app.js] loaded!",
  "background-color:lavender; color:white;",
);

/* --- User Stories --- */

//1. When the user loads the game, they are greeted with a start menu with music playing in the background (insert a mute button), that shows the start button

//2. When the user presses the start button, the game screen transitions into a screen asking for the user to choose one of three farm animals by clicking on their associated picture (chicken, bunny, cow?). Upon clicked, the animal's icon will light up and a submit button with an input-field will populate asking the user to input a name for their new animal.

//3. After submitting, the screen will transition and showcase a farm barn background with an egg on the screen (randomized pattern and color) being hatched, firstly the egg is completely uncracked and over 10 seconds it gradually cracks, hatching and revealing the animal. The timer on the top right will show time kept alive and start counting up.

//4. Upon reveal, the hunger, happiness, and sleepiness meters of the animal appears along with 3 new buttons on the bottom of the screen (feed, cuddle, and sleep). The meters begin to decrease by different rates (hunger -0.5/s, happiness - 0.3/s, and sleepiness: 0.1/s) and the user must interact with the buttons in order to feed, cuddle, and make the animal go to sleep. When fed increment the hunger by +10, cuddle + 5 to happiness, sleep +100 over 20 seconds. The animal will have expression bubbles depending on the actionable item and the meters.

//5. As the time passes and the animal will be animated across the screen, moving left and right. While the animal is still alive, the animal will start growing (two stages: baby -> adult), 5 mins of being kept alive the animal will grow to full adult size.

//6. If animal is kept alive in adult size for more 5 mins, then the game will be over and the animal well be put in a full barn (score is updated for number of animals put in the barn), so the player gets the Game Over - Successful screen and can choose to raise another animal by pressing the continue button, or reset the entire game from the beginning with the reset button.

//7. At any point if the hunger, sleep, or happiness, meter reaches 10, the animal passes away and the Game over - RIP screen appears where the player can choose to raise another animal by pressing the continue button or reset the entire game from the beginning with the reset button.


/* === Variables === */










const game = {
  timeAlive: 0,
  barn: 0,

  hideMeters() {
    const $meters = $(`#meters`);
    $meters.hide();
  },

  setUpStart() {
    const $inside = $("#inside");
    const $startScreen = $(`<section id="startScreen"></section>`);
    $inside.append($startScreen);

    const $title = $(`<h2 id="title"><img src="Images/title/barn_animal.gif" id="house">Tiny Farm</h2>`);
    $startScreen.append($title);

    const $start = $(`<button id="start"><p>Start your farm!</p></button>`);
    $startScreen.append($start);
  },

  setUpMenu() {
    const $inside = $("#inside");
    const $menuScreen = $(`<section id="menuScreen"></section>`);
    $inside.append($menuScreen);
    
    const $name = $(`<label>Name your animal: </label><input type="text" id="name">`);
    $menuScreen.append($name);
  },

  setUpGame() {
    const $inside = $("#inside");
    const $gameScreen = $(`<section id="gameScreen"></section>`);
    $inside.append($gameScreen);

    // Farm background
    const $farmBg = $(`<img src="" id="farmBg">`);
    $gameScreen.append($farmBg);

    // Meters
    const $meters = $(`#meters`);
    $meters.show();

    // Animal
    const $animalContainer = $(`<article id="animalContainer">
                                <img src="Images/Chicken/Chicken/ChickenIdle.gif" id="animal">
                                </article>`);
    $gameScreen.append($animalContainer);

    // Message box
    const $content = $(`<div id="content" class="rpgui-container framed-grey">
                        <p id="messages">Insert text here </p>
                        </div>`);
    $gameScreen.append($content);
    
    const $timeAlive = $(`<h5 id="timeAlive">Time alive: </h5>`);
    $("#content").append($timeAlive);
    const $barn = $(`<h5 id="barn">Barn: </h5>`);
    $("#content").append($barn);

    // Buttons
    const $buttonDiv = $(`#buttonDiv`);
    const $feed = $(`<button id="feed" class="buttons rpgui-button golden"><p>Feed</p></button>`);
    $buttonDiv.append($feed);
    const $cuddle = $(`<button id="cuddle" class="buttons rpgui-button golden"><p>Cuddle</p></button>`);
    $buttonDiv.append($cuddle);
    const $sleep = $(`<button id="sleep" class="buttons rpgui-button golden"><p>Sleep</p></button>`);
    $buttonDiv.append($sleep);
  },

  resetGame() {

  },

}

// Animal Class
class Animal {
  constructor(name, color) {
    //hard-coded properties
    this.age = 0;
    this.hunger = 100;
    this.happiness = 100;
    this.sleepiness = 100;
    //assigned properties
    this.name = name;
    this.color = color;
  }
  // Methods
  eat (food) {
    this.hunger += 10;
  }
  cuddle () {
    this.happiness += 5;
  }
  sleep () {
    this.sleepiness += 100;
  }
}

/* === Functions === */

const randomizeColor = function randomizeColor() {
  const color = ["white", "brown", "black"];
  const index = Math.floor(Math.random()*color.length);
  return color[index];
};

const sayHello = function sayHello(event){
  console.log("Hi");
};

// Creating objects

const chicken = new Animal("name", randomizeColor()); 




/* === Event Listeners === */



$(window).on("load", game.hideMeters);

$(window).on("load", game.setUpMenu);

$("#start").on("click", sayHello);

$("title").on("click", sayHello);

$("#feed").on("click", sayHello);

$("#animal").on("click", sayHello);

$("h6").on("click", sayHello);