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

//2. When the user presses the start button, the game screen transitions into a screen asking for the user to choose one of six farm animals by clicking on their associated picture (chicken, bunny, cow, goat, sheep, pig). Upon clicked, the animal's icon will light up and the user must enter a name for the animal in an input-field. The user must enter a valid name (not empty string) for the confirm button to work and bring them to the game screen.

//3. After submitting, the screen will transition to the game screen showcasing revealing the baby animal who is sleeping. The user may wake the animal by clicking on the image of it. The timer on the message section will show time kept alive and start counting up, the age of the animal will start at 0 and increment over time as well. The barn metric will also show, starting at a value of 0.

//4. Upon reveal, the hunger, happiness, and sleepiness meters of the animal appears along with 3 new buttons on the bottom of the screen (feed, cuddle, and sleep). The meters begin to decrease by different rates and the user must interact with the buttons in order to feed, cuddle, and make the animal go to sleep. When the buttons are pressed, the corresponding metric to the actionable button will increase depending on the type of animal.

//5. As the time passes and the animal will be animated across the screen, moving left and right. While the animal is still alive, the animal will start growing (two stages: baby -> adult), 5 mins of being kept alive the animal will grow to full adult size.

//6. If animal is kept alive in adult size for more 5 mins (total game time and time kept alive = 10 minutes), then the game will be over and the animal will be put in a full barn (barn score is updated for number of animals successfully sent into the barn), so the player gets the Game Over - Successful screen and can choose to raise another animal by pressing the continue button, or reset the entire game from the beginning with the reset button.

//7. At any point if the hunger, sleep, or happiness, meter reaches 0, the animal passes away and the Game over - RIP screen appears where the player can choose to raise another animal by pressing the continue button or to reset the entire game from the beginning with the reset button.


/* === Variables === */


const game = {
  /* --- Game Values --- */
  aliveTimer: null,
  sleepTimer: null,
  time: 0,
  barn: 0,
  animalType: null,
  name: null,
  animal: null,

  /* --- Game Logic --- */
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
    const $start = $(`<button id="start" class="rpgui-button" type="button"><p>Start your farm!</p></button>`);
    $startScreen.append($start);
    
    /* --- Event Listener --- */
    $("#start").on("click", game.setUpMenu);
  },
  
  setUpMenu() {
    const $inside = $("#inside");
    const $startScreen = $("#startScreen");
    $startScreen.remove();
    
    const $menuScreen = $(`<section id="menuScreen"></section>`);
    $inside.append($menuScreen);
    
    const $choose= $(`<h3>Choose your animal: </h4>`);
    $menuScreen.append($choose);
    
    const $animalsDiv = $(`<article id="animalsDiv"></article>`);
    $menuScreen.append($animalsDiv);
    
    //Animals
    const $goatkid = $(`<img src="Images/title/goat_kid/goat_halfbrown_walk_left.gif" class="animals"  id="goat">`);
    $animalsDiv.append($goatkid);
    const $lamb = $(`<img src="Images/title/lamb/sheep_walk_left.gif" class="animals"  id="sheep">`);
    $animalsDiv.append($lamb);
    const $piglet = $(`<img src="Images/title/piglet/pig_walk_left.gif" class="animals" id="pig">`);
    $animalsDiv.append($piglet);
    const $cow = $(`<img src="Images/title/calf_white/babycow_walk_left.gif" class="animals" id="cow">`);
    $animalsDiv.append($cow);
    const $chick = $(`<img src="Images/title/chick_white/babychick_walk_left.gif" class="animals"  id="chicken">`);
    $animalsDiv.append($chick);
    const $bunny = $(`<img src="Images/title/bunny_white/babybunny_walk_left.gif" class="animals"  id="bunny">`);
    $animalsDiv.append($bunny);
    
    const animalsArray = [$goatkid, $lamb, $piglet, $cow, $chick, $bunny];

    //Name and confirm
    const $nameDiv = $(`<article id="nameDiv"></article>`);
    $menuScreen.append($nameDiv);
    const $name = $(`<h3>Give it a name: </h3><input type="text" id="name">`);
    $nameDiv.append($name);
    const $confirm = $(`<button id="confirm" class="rpgui-button" type="button"><p>OK</p></button>`);
    $nameDiv.append($confirm);
  
    
    // Update the type and add CSS selected style to show player selected one animal type
    const updateType = function updateType(event) {
      
      for (i = 0; i < animalsArray.length; i++) {
        if (animalsArray[i].hasClass("selected")) {
          animalsArray[i].removeClass("selected");
        } 
      }
      
      const $animal = $(event.target);
      const type = $animal.attr("id");
      
      $animal.addClass("selected");
      
      return game.animalType = type;
    };

    const checkName = function checkName (){
           
      const animalName = $name[1].value;

      if (animalName === "") {
        $("#name").css("border", "3px solid orangered");
        $("#name").css("box-shadow", "0 0 6px darkred");

        return;
        
      } else {
        generateAnimal();
        game.setUpGame();
      }
    };

    const generateAnimal = function generateAnimal(event) {
     
      const animalName = $name[1].value;
      const type = game.animalType;

      if (type === "chicken") {
        const animal = new Chicken(animalName, randomizeColor());
        return game.animal = animal;
      } else if (type === "bunny") {
        const animal = new Bunny(animalName, randomizeColor());
        return game.animal = animal;
      } else if (type === "cow") {
        const animal = new Cow(animalName, randomizeColor());
        return game.animal = animal;
      } else if (type === "pig") {
        const animal = new Pig(animalName, "light");
        return game.animal = animal;
      } else if (type === "goat") {
        const animal = new Goat(animalName, "dark");
        return game.animal = animal;
      } else if (type === "sheep") {
        const animal = new Sheep(animalName, "light");
        return game.animal = animal;
      }
        
    };

    /* --- Event Listeners --- */

    $("#sheep").on("click", updateType);
    $("#chicken").on("click", updateType);
    $("#pig").on("click", updateType);
    $("#cow").on("click", updateType);
    $("#bunny").on("click", updateType);
    $("#goat").on("click", updateType);

    $("#confirm").on("click", checkName);

  },

  setUpGame() {
    const $inside = $("#inside");
    const $menuScreen = $("#menuScreen");
    $menuScreen.remove();

    const $gameScreen = $(`<section id="gameScreen"></section>`);
    $inside.append($gameScreen);

    // Meters
    const $meters = $("#meters");
    $meters.show();

    // Animal

    const $animalContainer = $(`<article id="animalContainer"></article>`);
    $gameScreen.append($animalContainer);

    const $animalImage = $(`<img src="" id="animal">`);
    $animalContainer.append($animalImage);

    const imageFile = "Images/animals/baby/" + game.animal.type + "_" + game.animal.color + "/baby" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[0] + ".gif";

    $animalImage.attr("src", imageFile);                              
    $gameScreen.append($animalContainer);

    // Message box
    const $content = $(`<div id="content" class="rpgui-container framed-grey">
                        <p id="messages"></p>
                        </div>`);
    $gameScreen.append($content);

    

    const $messages = $("#messages");
    $messages.text(`${game.animal.name} is falling asleep, try tapping it awake!`);

    const $timeAlive = $(`<h5 id="timeAlive">Time alive: ${game.time}:00 </h5>`);
    $("#content").append($timeAlive);
    const $age = $(`<h5 id="age">Age: ${game.animal.age}</h5>`);
    $("#content").append($age);
    const $barn = $(`<h5 id="barn">Barn: ${game.barn} </h5>`);
    $("#content").append($barn);

    const wake = function wake() {
      const fileName = "Images/animals/baby/" + game.animal.type + "_" + game.animal.color + "/baby" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[1] + ".gif";
      $animalImage.attr("src", fileName);
      $messages.text(`${game.animal.name} is awake, maybe try feeding it!`);

    };

    
    const startAliveTimer = function startAliveTimer() {
      game.aliveTimer = setInterval(incrementTime, 1000);
    };
    
    const incrementTime = function incrementTime() {
      game.time += 1;
      game.animal.age = (game.time / 60);
      updateAge();
      decrementMeters();

      let m = Math.floor(game.time/ 60);
      let s = Math.floor(game.time % 60 % 60);
      if (s < 10) {
        $timeAlive.text(`Time alive: ${m}:0${s}`);
      } else {
        $timeAlive.text(`Time alive: ${m}:${s}`);
      }
    };

    startAliveTimer();

    const startSleepTimer = function startSleepTimer() {
      game.sleepTimer = setInterval(incrementSleepTime, 500);
    };
    
    const incrementSleepTime = function incrementSleepTime() {
      if (game.animal.sleepiness > 0 && game.animal.sleepiness < 100) { game.animal.sleep() };
      console.log(game.animal.sleepiness);
    };


    const updateAge = function updateAge() {
      if (game.animal.age > 1) {
        $age.text(`Age: ${Math.floor(game.animal.age)}`);
        if (game.animal.age === 5) {
          $("#messages").text(`${game.animal.name} has reached adulthood!`);
          const adultImage = "Images/animals/adult/" + game.animal.type + "_" + game.animal.color + "/" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[1] + ".gif";
          $animalImage.attr("src", adultImage); 
        } else if (game.animal.age === 10) {
          $("#messages").text(`${game.animal.name} has fully grown and is ready to join the barn!`);
          const grownImage = "Images/animals/adult/" + game.animal.type + "_" + game.animal.color + "/" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[5] + ".gif";
          $animalImage.attr("src", grownImage); 
        }
      } else {
        $age.text("Age: 0");
      }
    }

    const decrementMeters = function decrementMeters() {
      const $hunger = $(".rpgui-progress-fill.red");
      const decreaseHunger = `${game.animal.hunger}%`
      $hunger.width(decreaseHunger);
      $hunger.css("max-width", "100%");

      const $happiness = $(".rpgui-progress-fill.green");
      const decreaseHappiness = `${game.animal.happiness}%`
      $happiness.width(decreaseHappiness);
      $happiness.css("max-width", "100%");

      const $sleepiness = $(".rpgui-progress-fill.blue");
      const decreaseSleepiness = `${game.animal.sleepiness}%`
      $sleepiness.width(decreaseSleepiness);
      $sleepiness.css("max-width", "100%");

      //TODO -- add the death screen in else statements
      if (game.animal.hunger > 0) { 
        game.animal.hunger -= 1; 
      } else if (game.animal.hunger === 0) {
        console.log("died.");
      }
      
      if (game.animal.sleepiness > 0) { 
        game.animal.sleepiness -= 1; 
      } else if (game.animal.sleepiness === 0){
        console.log("died.");
      }

      if (game.animal.happiness > 0) {
         game.animal.happiness -= 1; 
      } else if (game.animal.happiness === 0){
        console.log("died.");
      }
    };

    const fixHunger = function fixHunger(){
      clearInterval(game.sleepTimer);
      
      if (game.animal.hunger > 0 && game.animal.hunger < 100) { game.animal.eat(); }

      if (game.animal.age > 5) {
        $("#messages").text(`You fed ${game.animal.name}, they are less hungry now.`);
        const imageFile = "Images/animals/adult/" + game.animal.type + "_" + game.animal.color + "/" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[4] + ".gif";
        $animalImage.attr("src", imageFile); 
      } else if (game.animal.age < 5) {
        $("#messages").text(`You fed ${game.animal.name}, they are less hungry now.`);
        const imageFile = "Images/animals/baby/" + game.animal.type + "_" + game.animal.color + "/baby" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[4] + ".gif";
        $animalImage.attr("src", imageFile); 
      }
    };

    const fixHappiness = function fixHappiness(){
      clearInterval(game.sleepTimer);
      if (game.animal.happiness > 0 && game.animal.happiness < 100) { game.animal.cuddle(); }

      if (game.animal.age > 5) {
        $("#messages").text(`You cuddled ${game.animal.name}, look at how happy it is!`);
        const imageFile = "Images/animals/adult/" + game.animal.type + "_" + game.animal.color + "/" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[5] + ".gif";
        $animalImage.attr("src", imageFile); 
      } else if (game.animal.age < 5) {
        $("#messages").text(`You cuddled ${game.animal.name}, look at how happy it is!`);
        const imageFile = "Images/animals/baby/" + game.animal.type + "_" + game.animal.color + "/baby" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[5] + ".gif";
        $animalImage.attr("src", imageFile); 
      }
    };

    const fixSleepiness = function fixSleepiness(){
      if (game.animal.sleepiness > 0 && game.animal.sleepiness < 100) { startSleepTimer()}

      if (game.animal.age > 5) {
        $("#messages").text(`Shh... ${game.animal.name} is sleeping.`);
        const imageFile = "Images/animals/adult/" + game.animal.type + "_" + game.animal.color + "/" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[0] + ".gif";
        $animalImage.attr("src", imageFile); 
      } else if (game.animal.age < 5) {
        $("#messages").text(`Shh... ${game.animal.name} is sleeping.`);
        const imageFile = "Images/animals/baby/" + game.animal.type + "_" + game.animal.color + "/baby" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[0] + ".gif";
        $animalImage.attr("src", imageFile); 
      }
    };
    


    // Buttons
    const $buttonDiv = $(`#buttonDiv`);
    const $feed = $(`<button id="feed" class="buttons rpgui-button golden"><p>Feed</p></button>`);
    $buttonDiv.append($feed);
    const $cuddle = $(`<button id="cuddle" class="buttons rpgui-button golden"><p>Cuddle</p></button>`);
    $buttonDiv.append($cuddle);
    const $sleep = $(`<button id="sleep" class="buttons rpgui-button golden"><p>Sleep</p></button>`);
    $buttonDiv.append($sleep);

    /* --- Event Listeners --- */

    $animalImage.on("click", wake);

    $feed.on("click", fixHunger);
    $cuddle.on("click", fixHappiness);
    $sleep.on("click", fixSleepiness);

  },

// TODO -- game over screen
  setUpGameOver () {

  },

  setUpSuccess () {

  },

// TODO -- reset game function
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
    this.animation = ["sleep","walk_right","walk_left","walk_up","walk_down", "heart"];

    //assigned properties
    this.name = name;
    this.color = color;
  }
  // Methods
  eat () {
    this.hunger += 10;
  }
  cuddle () {
    this.happiness += 5;
  }
  sleep () {
    this.sleepiness += 100;
  }
}

class Chicken extends Animal {
  constructor(name, color) {

    super(name, color);

    this.age = 0;
    this.hunger = 100;
    this.happiness = 85;
    this.sleepiness = 85;
    this.type = "chicken";

    //assigned properties
    this.name = name;
    this.color = color;
  }
  //Methods
  eat() {
    this.hunger += 4;
  }
  cuddle () {
    this.happiness += 15;
  }
  sleep () {
    this.sleepiness += 1;
  }
}  

class Cow extends Animal {
  constructor(name, color) {

    super(name, color);

    this.age = 0;
    this.hunger = 90;
    this.happiness = 85;
    this.sleepiness = 90;
    this.type = "cow";

    //assigned properties
    this.name = name;
    this.color = color;
  }
  //Methods
  eat() {
    this.hunger += 2;
  }
  cuddle () {
    this.happiness += 15;
  }
  sleep () {
    this.sleepiness += 1;
  }
} 

class Bunny extends Animal {
  constructor(name, color) {

    super(name, color);

    this.hunger = 95;
    this.happiness = 95;
    this.sleepiness = 90;
    this.type = "bunny";

    //assigned properties
    this.name = name;
    this.color = color;
  }
  //Methods
  eat() {
    this.hunger += 5;
  }
  cuddle () {
    this.happiness += 5;
  }
  sleep () {
    this.sleepiness += 1;
  }
} 

class Goat extends Animal {
  constructor(name, color = "light") {

    super(name, color);

    this.hunger = 90;
    this.happiness = 85;
    this.sleepiness = 90;
    this.type = "goat";

    //assigned properties
    this.name = name;
    this.color = color;
  }
  //Methods
  eat() {
    this.hunger += 10;
  }
  cuddle () {
    this.happiness += 15;
  }
  sleep () {
    this.sleepiness += 1;
  }
}

class Pig extends Animal {
  constructor(name, color = "light") {

    super(name, color);

    this.hunger = 95;
    this.happiness = 90;
    this.sleepiness = 100;
    this.type = "pig";

    //assigned properties
    this.name = name;
    this.color = color;
    
  }
  //Methods
  eat() {
    this.hunger += 5;
  }
  cuddle () {
    this.happiness += 10;
  }
  sleep () {
    this.sleepiness += 1;
  }
}

class Sheep extends Animal {
  constructor(name, color = "dark") {

    super(name, color);

    this.hunger = 90;
    this.happiness = 80;
    this.sleepiness = 80;
    this.type = "sheep";

    //assigned properties
    this.name = name;
    this.color = color;
  }
  //Methods
  eat() {
    this.hunger += 10;
  }
  cuddle () {
    this.happiness += 20;
  }
  sleep () {
    this.sleepiness += 1;
  }
}


/* === Functions === */

const randomizeColor = function randomizeColor() {
  const color = ["light", "dark"];
  const index = Math.floor(Math.random()*color.length);
  return color[index];
};


const sayHello = function sayHello(event){
  console.log("Hi");
};


/* === Event Listeners on Load === */


$(window).on("load", game.hideMeters);

$(window).on("load", game.setUpStart);
