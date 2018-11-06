



//Keyboard Walk/Stop Controls

var KEYCODE_A = 65;	 //Make Crab Walk Left
var KEYCODE_D = 68;  //Make Crab Walk Right

//Keyboard Attack Controls

var KEYCODE_Q = 81; //Make Crab Attack Left
var KEYCODE_E = 69; //Make Crab Attack Right



//stage/canvas
var canvas, stage;

//text fields - Used for tutorial/game title 

var titleField, infoField;

//game objects

var crab;

//backgrounds & foreground

var background, foreground;

var crabXV = 0;
var crabYV = 0;
var crabSpeed = 2.5;


//motion limit
var groundLevel = 600;
var leftLimit = 250;
var rightLimit = 550;


var gravityEffect = .3;


var walking = false;

function init() {
    //Canvas and Stage Setup
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    
    //load sounds assets first
    
    loadSounds();

    
    //call setup Functions
    
    addBackground();
    addCrab(); 
    addForeground();
    addtitleField();
    
    
    
    
    
//My Motion/Game Engine

createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", onTick);
    
  
    document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);
     
}


function loadSounds(){
    
    //Event HANDLER TO PLAY ANY SOUNDS RIGHT AWAY
      createjs.Sound.addEventListener("fileload", onSoundsLoad);
    
    
    
    createjs.Sound.registerSound("sounds/CrabPeople.mp3","theme"); 
        createjs.Sound.registerSound("sounds/JabSound.mp3","jab"); 
    //Credit to Jab Sound - https://www.youtube.com/watch?v=dy5k-TnfpZE

   
    
}


function onSoundsLoad(event) {
    
    
        
        createjs.Sound.play("theme", {loop: -1});
            console.log("Playing Crab People");
    
     //credit https://www.youtube.com/watch?v=tV5wmDhzgY8 (I Changed/Edited the Song in Audtion)
    
    
    
}



function addBackground(){
    background = new createjs.Bitmap("images/Background.png");
    background.x = 0;
    
//add it to stage
        stage.addChild(background);
    
}

function addForeground(){
    //Bitmap 
    foreground = new createjs.Bitmap("images/Foreground.png");
 
    foreground.x = 0;
        foreground.y = 430;
    //add to the stage
            stage.addChild(foreground);
}



function addtitleField(){
	titleField = new createjs.Text("The Crabs Revenge - Justin Dafoe", "bold 34px Verdana", "#fff");
    
    titleField.x = 50;
    titleField.y = 40;
    

    stage.addChild(titleField);
    
    
    infoField = new createjs.Text("Press A & D To Walk\nPress or Hold Q to Attack Left\nPress or Hold E to Attack Right\nRelease All Keys to Stop",  "bold 15px Verdana", "#eadddd");
    
    infoField.x = 50;
    infoField.y = 100;
    stage.addChild(infoField);
    
}



function addCrab(){
    crab = new Crab();
        crab.x = 400;
        crab.y = 550;
    
    crab.scaleX = .8;
    crab.scaleY = .8;
        crab.resting();
        
    stage.addChild(crab);
}

function onTick(){
    
    crab.x += crabXV;

    crab.y += crabYV;
    
     
     
    if(crab.y > 524){
        crab.y = 524;
         
        
    }
    
    background.x += -crabXV/1.5;
    foreground.x += -crabXV;
    
    //Right Borders
    if(background.x < -2645){
            background.x = -2645;
          
    } 
    
    //Left Border
    
    if(background.x > -50){
            background.x = -50;
    } 
    
    
    
     if(crab.x > rightLimit){
            crab.x = rightLimit;
         
    } else if(crab.x < leftLimit){
            crab.x = leftLimit;
    }
    
    

    
   
    
    
    //ground
    if (crab.y > groundLevel){
        
        crab.y = groundLevel;
        
       
    }
    
    
    
    
    
    stage.update();
    
    
    
   
}

function onKeyDown(e){
    //can test the keycode value
    console.log("Keycode: "+e.keyCode);
    
    if(e.keyCode == KEYCODE_A){
        
        if(walking == false){
            crabXV = -crabSpeed;
                walking = true;
            crab.walking();
        }
            
      
    
           
   
          
        
        
    } else if(e.keyCode == KEYCODE_D){
        
       if(walking == false){
            crabXV = crabSpeed;
                walking = true;
            crab.walking();
        }
        
    } else if(e.keyCode == KEYCODE_Q){
        crab.attackleft();
        createjs.Sound.play("jab");
        
        
            
    } else if(e.keyCode == KEYCODE_E){
        crab.attackright();  
        createjs.Sound.play("jab");
    }

}
      


function onKeyUp(e){
     
    if(e.keyCode == KEYCODE_A){
        
        //SET THE VELOCITY
        crabXV = 0;
        crab.resting();
        walking = false;
        
        
        
    } else if(e.keyCode == KEYCODE_D){
        crabXV = 0;
        crab.resting();
        walking = false;
        
          
    } else if(e.keyCode == KEYCODE_Q){
        crab.resting();
        
    } else if(e.keyCode == KEYCODE_E){
        crab.resting();
          
    
  
    
    
    }
    
}



