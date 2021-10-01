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


/* === Variables === */


const game = {
  /* --- Game Values --- */
  aliveTimer: null,
  sleepTimer: null,
  time: 0,
  animalType: null,
  name: null,
  animal: null,

  /* --- Game Logic --- */
  hideMeters() {
    const $meters = $(`#meters`);
    $meters.hide();
  },

  setUpStart() {
    $("#endScreen").remove();

    const $inside = $("#inside");
    const $startScreen = $(`<section id="startScreen"></section>`);
    $inside.append($startScreen);

    const $title = $(`<h2 id="title"><img src="Images/title/barn_animal.gif" id="house">Tiny Farm</h2>`);
    $startScreen.append($title);
    const $start = $(`<button id="start" class="rpgui-button" type="button"><p>Start your Farm!</p></button>`);
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
    const $name = $(`<h3 id="prompt">Give it a name: </h3><input type="text" id="name">`);
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
        $("#prompt").text("Please name your animal:");
        $("#prompt").css("color", "orangered");
        return;
        
      } else {
        generateAnimal();
        game.setUpGame();
      }
    };
    $("#name").on("change", () => {
      $("#prompt").css("color", "white");
      $("#prompt").text("Give it a name:");
      $("#name").css("border", "0");
      $("#name").css("box-shadow", "0 0 1px dimgray");
    });

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

    const startSleepTimer = function startSleepTimer() {
      game.sleepTimer = setInterval(incrementSleepTime, 500);
    };
    
    const incrementSleepTime = function incrementSleepTime() {
      if (game.animal.sleepiness > 0 && game.animal.sleepiness < 100) { game.animal.sleep() };
    };
    
    const $messages = $("#messages");
    startSleepTimer();
    $messages.text(`${game.animal.name} is falling asleep, try tapping it awake!`);
    
    const $timeAlive = $(`<h5 id="timeAlive">Time alive: ${game.time}:00 </h5>`);
    $("#content").append($timeAlive);
    const $age = $(`<h5 id="age">Age: ${game.animal.age}</h5>`);
    $("#content").append($age);
    
    const pet = function pet() {
      clearInterval(game.sleepTimer);
      const fileName = "Images/animals/baby/" + game.animal.type + "_" + game.animal.color + "/baby" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[5] + ".gif";
      $animalImage.attr("src", fileName);
      $messages.text(`You pet ${game.animal.name}, it seems ${game.animal.name} likes you!`);
      game.animal.happiness++;
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

    const updateAge = function updateAge() {
      if (game.animal.age > 1) {
        $age.text(`Age: ${Math.floor(game.animal.age)}`);
        if (game.animal.age === 3) {
          $("#messages").text(`${game.animal.name} has reached adulthood!`);
          const adultImage = "Images/animals/adult/" + game.animal.type + "_" + game.animal.color + "/" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[1] + ".gif";
          $animalImage.attr("src", adultImage); 
        } else if (game.animal.age === 5) {
          $("#messages").text(`${game.animal.name} has fully grown, send them off to a loving barn!`);
          const grownImage = "Images/animals/adult/" + game.animal.type + "_" + game.animal.color + "/" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[5] + ".gif";
          $animalImage.attr("src", grownImage); 

          $animalImage.on("click", game.setUpSuccess);

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

      if (game.animal.hunger > 0) { 
        game.animal.hunger -= 1; 
      } else if (game.animal.hunger === 0) {
        death();
      }
      
      if (game.animal.sleepiness > 0) { 
        game.animal.sleepiness -= 1; 
      } else if (game.animal.sleepiness === 0){
        death();
      }

      if (game.animal.happiness > 0) {
         game.animal.happiness -= 1; 
      } else if (game.animal.happiness === 0){
        death();
      }
    };

    const fixHunger = function fixHunger(){
      clearInterval(game.sleepTimer);
      
      if (game.animal.hunger > 0 && game.animal.hunger < 100) { game.animal.eat(); }

      if (game.animal.age > 3) {
        $("#messages").text(`You fed ${game.animal.name}, they are less hungry now.`);
        const imageFile = "Images/animals/adult/" + game.animal.type + "_" + game.animal.color + "/" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[4] + ".gif";
        $animalImage.attr("src", imageFile); 
      } else if (game.animal.age < 3) {
        $("#messages").text(`You fed ${game.animal.name}, they are less hungry now.`);
        const imageFile = "Images/animals/baby/" + game.animal.type + "_" + game.animal.color + "/baby" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[4] + ".gif";
        $animalImage.attr("src", imageFile); 
      }
    };

    const fixHappiness = function fixHappiness(){
      clearInterval(game.sleepTimer);
      if (game.animal.happiness > 0 && game.animal.happiness < 100) { game.animal.cuddle(); }

      if (game.animal.age > 3) {
        $("#messages").text(`You cuddled ${game.animal.name}, look at how happy it is!`);
        const imageFile = "Images/animals/adult/" + game.animal.type + "_" + game.animal.color + "/" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[5] + ".gif";
        $animalImage.attr("src", imageFile); 
      } else if (game.animal.age < 3) {
        $("#messages").text(`You cuddled ${game.animal.name}, look at how happy it is!`);
        const imageFile = "Images/animals/baby/" + game.animal.type + "_" + game.animal.color + "/baby" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[5] + ".gif";
        $animalImage.attr("src", imageFile); 
      }
    };

    const fixSleepiness = function fixSleepiness(){
      if (game.animal.sleepiness > 0 && game.animal.sleepiness < 100) { startSleepTimer()}

      if (game.animal.age > 3) {
        $("#messages").text(`Shh... ${game.animal.name} is sleeping right now.`);
        const imageFile = "Images/animals/adult/" + game.animal.type + "_" + game.animal.color + "/" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[0] + ".gif";
        $animalImage.attr("src", imageFile); 
      } else if (game.animal.age < 3) {
        $("#messages").text(`Shh... ${game.animal.name} is sleeping right now.`);
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

    const death = function death() {
      if (game.animal.hunger === 0 || game.animal.happiness === 0 || game.animal.sleepiness === 0){
        clearInterval(game.aliveTimer);
        clearInterval(game.sleepTimer);
        
        $animalImage.attr("src","Images/end/ghost_walk_down.gif");
        $animalImage.attr("id", "ghost");
        $messages.text(`Oh no! ${game.animal.name} has passed away. Please send them off in peace.`);
        
        /* --- Event Listeners --- */
        $animalImage.off("click", pet);
        $animalImage.on("click", game.setUpGameOver);
      }
    };

    /* --- Event Listeners --- */

    $animalImage.on("click", pet);

    $feed.on("click", fixHunger);
    $cuddle.on("click", fixHappiness);
    $sleep.on("click", fixSleepiness);

  },

  setUpGameOver () {
    game.hideMeters();
    const $inside = $("#inside");
    $("#gameScreen").remove();
    $("#buttonDiv").empty();
    

    const $endScreen = $(`<section id="endScreen"></section>`);
    $inside.append($endScreen);

    const $end = $(`<h2 id="end">GAME OVER<img src="Images/end/ghost_walk_down.gif" id="ghost"></h2><hr id="hrG" class="golden" />`);
    $endScreen.append($end);

    const $resetDiv = $('<div id="resetDiv"></div>');
    $endScreen.append($resetDiv);
    const $reset = $(`<button id="reset" class="rpgui-button" type="button"><p>Reset Game</p></button>`);
    $resetDiv.append($reset);

    
    /* --- Event Listeners --- */
    $end.on("click", () => {
      $("#ghost").attr("src","Images/end/ghost_die.gif");
    });

    $("#reset").on("click", () => {
      $endScreen.remove();
      game.setUpStart()}
    );
  },

  setUpSuccess () {
    game.hideMeters();
    const $inside = $("#inside");
    $("#gameScreen").remove();
    $("#buttonDiv").empty();

    const $endScreen = $(`<section id="endScreen"></section>`);
    $inside.append($endScreen);

    const $end = $(`<h2 id="end">YOU WIN!<img src="" id="yourAnimal"></h2><hr id="hrG" class="golden" />`);
    $endScreen.append($end);
    const successPic = "Images/animals/adult/" + game.animal.type + "_" + game.animal.color + "/" + game.animal.type + "_" + game.animal.color + "_" + game.animal.animation[2] + ".gif";
    const $animalImage = $("#yourAnimal");
    $animalImage.attr("src", successPic); 

    const $resetDiv = $('<div id="resetDiv"></div>');
    $endScreen.append($resetDiv);
    const $reset = $(`<button id="reset" class="rpgui-button" type="button"><p>Reset Game</p></button>`);
    $resetDiv.append($reset);
    
    /* --- Event Listeners --- */
    $end.on("click", () => {
      const newPic = "Images/end/end_house.gif";
      $("#yourAnimal").attr("src", newPic);
    });

    $("#reset").on("click", () => {
      $endScreen.remove();
      game.setUpStart()}
    );
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
  console.log("Hi, my name is Kathy Wu, feel free to message me @kathyswu!");
};


/* === Event Listeners on Load === */


$(window).on("load", game.hideMeters);

$(window).on("load", game.setUpStart);

$("h6").on("click", sayHello);

