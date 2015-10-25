// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var player;
var pipes = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/chocolate1.png");
    game.load.image("flappy", "assets/flappy.png");
    game.load.audio("score", "assets/point.ogg");
    game.load.image("pipe","assets/pipe.png");
    game.load.image("Backdrop","assets/backdorp.png")
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

    // set the background colour of the scene
    game.add.image(0, 0, "Backdrop");
    var background = game.add.image(0, 0, "Backdrop");
    background.width = 790;
    background.height = 400;

    //var sprite=game.add.sprite(10,20, "playerImg");
    //sprite.scale.x=0.3;
    //sprite.scale.y=0.3;
    //var sprite=game.add.sprite(700, 20, "playerImg");
    //sprite.scale.x=0.3;
    //sprite.scale.y=0.3;
    //var sprite=game.add.sprite(20, 350, "playerImg");
    //sprite.scale.x=0.3;
    //sprite.scale.y=0.3;
    //var sprite=game.add.sprite(700, 350, "playerImg");
    //sprite.scale.x=0.3;
    //sprite.scale.y=0.3;
    //helooo

    //game.input
      //  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        //if(pipe.x==80);
        //.onDown.add(changeScore);

    //player = game.add.sprite(100, 200, "flappy");

    game.input.onDown.add(clickHandler);

    //alert(score);
    score=-1
    labelScore = game.add.text(20, 20, "0")




    generatePipe();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(80, 200, "flappy");
    game.physics.arcade.enable(player);
    //player.body.velocity.x = 50;
    player.body.gravity.y = 150;

    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);

    //changeScore();
    var pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
    generatePipe);

}


function clickHandler(event) {
    //alert("click!");
    //alert("The position is: " + event.x + "," + event.y);
    //game.add.sprite(event.x, event.y, "flappy");

}


function playSound() {

    game.sound.play("score");
}

function changeScore() {

    labelScore.setText(score.toString());
    score = score + 1;
    playSound();

}
function generatePipe() {
    //for(var count=0; count<8; count++) {
    //    if (count != 5) {
    //        //alert("count is smaller than 5!");
    //        //game.add.sprite(50, 50 * count, "pipe");
    //        //game.add.sprite(200, 50 * count, "pipe");
    //        //game.add.sprite(350, 50 * count, "pipe");
    //        //game.add.sprite(500, 50 * count, "pipe");
    //        //game.add.sprite(650, 50 * count, "pipe");
    //    }
    //}
    //        var gapStart = game.rnd.integerInRange(1, 5);
    //        for (var count=0; count < 8; count=count+1) {
    //            if(count != gapStart  &&  count != gapStart + 1) {
    //                game.add.sprite(50, count * 50, "pipe");
    var gap = game.rnd.integerInRange(1 ,5);
    for (var count=0; count < 8; count++) {
        if (count != gap  &&  count != gap+1) {
            addPipeBlock(790, count*50);
        }
    }
    changeScore();
}

   // for (var count=2; count<10; count+=2) {
     //   game.add.sprite(count * 50, 200, "pipe");
    //}

function addPipeBlock(x, y) {

    var pipeBlock = game.add.sprite(x,y,"pipe");
        pipes.push(pipeBlock);
        game.physics.arcade.enable(pipeBlock);
        pipeBlock.body.velocity.x = -200;
}
function playerJump() {
    player.body.velocity.y = -80;
}
function update() {
    game.physics.arcade
        .overlap(player,
    pipes,
    gameOver);
}

function gameOver(){
    game.destroy();
}
function gameOver() {
    location.reload();
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    for(var index=0; index < pipes.length; index++) {
        game.physics.arcade
            .overlap(player,
            pipes[index],
            gameOver);
    }
        if(player.y>400){
            gameOver();

        }


        if(player.y<0){
            gameOver();
        }
}
