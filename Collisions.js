//This is the file for dealing with all the collisions of the player. I will set up a GUI editor for creating and adding hitboxes for objects.
//Add an automatic hitbox generator that takes in an image and calculates hitboxes for surfaces that should have collisions based on their colour
//Also have automatic creation of event collisions for the ends of pipes

function collisions(){

    var levelBackground1 = document.createElement("img");
	levelBackground1.src = "./SuperMarioBrosMap1-1-Cropped.png";

    generateHitBoxes(levelBackground1)
    function generateHitBoxes(img){
        var imgData = img.getImageData();
        alert(imgData);
        var hitBoxColours = [x, y]; //A generated array that contains all the x, y coordinates for every single pixel in the image that is a collidable object. 
        //This array will then be parsed by another function that will create hitboxes with the edges being the lines made by the edges of the hitbox pixels
    }

    var bottomPlatformWidth = 105 //How high from the bottom of the canvas the bottom platform is
    if ((player1.y + player1.height) >= (canvas.height - bottomPlatformWidth)){
        player1.y = (canvas.height - bottomPlatformWidth) - player1.height;
        //check if the player is below the bottom platform and if they are then make them higher up to the point where they are not falling
    }
    if (player1.y < 0){
        player1.y = 0;
        initialVelocity = -initialVelocity*0.5;
        time = 0
        //if the player is going up over the top of the screen make them bounce back down
    }

    if (player1.x > canvas.width){
        player1.x = 0;
        //if the player goes off of the side of the screen on the right side move them onto the other (left) side of the screen
    }
    if (player1.x < 0){
        player1.x = canvas.width;
        //same as previous but for the left hand side of the screen
    }

    //These next statements are the same as the previous but for player 2
    if ((player2.y + player2.height) >= (canvas.height - bottomPlatformWidth)){
        player2.y = (canvas.height - bottomPlatformWidth) - player2.height;
        //stop on bottom platform
    }
    if (player2.y < 0){
        player2.y = 0;
        initialVelocity2 = -initialVelocity2*0.5;
        time = 0
        //bounce on roof
    }

    if (player2.x > canvas.width){
        player2.x = 0;
        //move to left side of screen when off of the screen for the right side
    }
    if (player2.x < 0){
        player2.x = canvas.width;
        //same as previous but for left to right
    }


    player1Hitbox();
    function player1Hitbox(){
        for (i = 0; i <= 6;i++){
            //This for loop repeats for each of the different rectangles which the player can collide with, minimising the amount of code neeeded for collisions because I dont need to rewrite it.

            //Top rect hitbox
            if (rect[i].topRect.topLeftX <= player1.middleX && 
                player1.middleX <= rect[i].topRect.topRightX && 
                rect[i].topRect.topLeftY <= player1.bottomLeftY && 
                player1.bottomLeftY <= rect[i].topRect.topBottomLeftY){
                player1.speedY = 0;
                player1.y = rect[i].topRect.topLeftY - player1.height - 0.1
                grounded = true;
                time = 0;
                initialVelocity = 0
                //If the middle of the player is colliding with the top of the rectangle with their bottom then make them stop falling and set the timer to 0
            }


            
            //middle left rect hitbox
            if (rect[i].leftSideRect.leftMiddleTopLeftX <= player1.topRightX && 
                player1.topRightX <= rect[i].leftSideRect.leftMiddleTopRightX && 
                rect[i].leftSideRect.leftMiddleTopY <= player1.middleY && 
                player1.middleY <= rect[i].leftSideRect.leftMiddleBottomY){
                player1.speedX = 0
                player1.x -= 10
                //if the player is colliding with the left hand side of the hitbox on the left side rect hitbox then push them backwards to the left and make them stop moving in that direction
            }

            //middle right rect hitbox
            if (rect[i].rightSideRect.rightMiddleTopLeftX <= player1.topLeftX && 
                player1.topLeftX <= rect[i].rightSideRect.rightMiddleTopRightX && 
                rect[i].rightSideRect.rightMiddleTopY <= player1.middleY && 
                player1.middleY <= rect[i].rightSideRect.rightMiddleBottomY){
                player1.speedX = 0
                player1.x += 10
                //same as mentioned above but for the right hand side hitbox
            
            }

            //bottom rect hitbox
            if (rect[i].bottomRect.bottomTopLeftX <= player1.middleX && 
                player1.middleX <= rect[i].bottomRect.bottomTopRightX && 
                rect[i].bottomRect.bottomTopLeftY <= player1.topLeftY && 
                player1.topLeftY <= rect[i].bottomRect.bottomBottomLeftY){
                player1.speedY = 0;
                initialVelocity = 0;
                player1.y = rect[i].bottomRect.bottomBottomLeftY + 10 
                //This checks to see if the player is colliding with the bottom of the box and if they are then push them downwards and make them stop moving upwards which is done by making the player initial velocity = 0

            }
        }


        if (player2.topLeftX <= player1.topRightX &&
            player1.topLeftX <= player2.topRightX &&
            player2.topLeftY <= player1.bottomLeftY &&
            player1.topLeftY <= player2.bottomLeftY){
            if (player1.y < player2.y){
                player2.x = 0;
                player2.y = 605;
                player2.speedX = 0;
                clearPlayer2 = true;
                var deathLog2 = 0;
                deathLog2 += 1;
                player1.score += 150
                var a = setInterval(function(){
                    player2.speedX = 0;
                    initialVelocity2 = 0;

                },10);

                if (deathLog2 == 1){
                    var y = setTimeout(function(){
                        var x = Math.floor(Math.random()*numberOfSpawnPoints);
                        player2.x = spawnPoint[x].x;
                        player2.y = spawnPoint[x].y;
                        clearPlayer2 = false;
                        clearInterval(a);
                    },3000)
                }
                
            }
            if (player2.y < player1.y){
                clearPlayer1 = true
                player1.x = 0;
                player1.y = 605;
                player1.speedX = 0;
                var deathLog1 = 0;
                deathLog1 += 1;
                player2.score += 150
                var a = setInterval(function(){
                    player1.speedX = 0;
                    initialVelocity = 0;

                },10);
                if (deathLog1 == 1){
                    var y = setTimeout(function(){
                        var x = Math.floor(Math.random()*numberOfSpawnPoints);
                        player1.x = spawnPoint[x].x;
                        player1.y = spawnPoint[x].y;
                        clearPlayer1 = false;
                        clearInterval(a);
                    },3000)
                //This code checks to see if the two players are collding and if they are then eliminate the player with the lowest y value, removing them from the screen and giving the other player points for this
                }
            }
        }
    }
}