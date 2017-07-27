// Enemies our player must avoid
// difficulty determined by player score
var Enemy = function(difficulty) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // enemies only spawn in the same relative position in each row of stone blocks
    // still random as to which row it will spawn
    this.locs = [57, 140, 223];
    this.x = 0;
    this.y = this.locs[Math.floor(Math.random() * 3)];

    // increase potential speed for new enemies as difficulty grows
    this.speed = Math.random() * (100 + difficulty*10);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var diffX = dt * this.speed;

    if (this.x + diffX > ctx.canvas.width) {
        this.x = 0
    } else {
        this.x += diffX;
    }

    // Check if enemy collides with player
    if (this.x+101 >= player.x+18 && this.x+3 <= player.x + 79) {
        if (this.y+77+68 >= player.y+61 && this.y+77 <= player.y+61+69) {

            // Collision occured, reset game
            player.x = player.startX;
            player.y = player.startY;

            player.score = 0;

            allEnemies = [];
            allEnemies.push(new Enemy(0));


        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {

    this.sprite = 'images/char-cat-girl.png';

    // position of starting point
    this.startX = 202;
    this.startY = 400;

    this.x = this.startX;
    this.y = this.startY;

    this.score = 0;

};

Player.prototype.update = function(dt) {

    // Check if player reaches blue tile (they win!!)
    if (this.y+61+79 <= 133) {

        this.score++;

        // Reset player to start position
        this.x = this.startX;
        this.y = this.startY;

        // Make the game harder
        var newEnemy = new Enemy(this.score);
        allEnemies.push(newEnemy);
    }

}

Player.prototype.render = function() {

    // Paint over top overlap
    ctx.fillStyle = 'white';
    ctx.rect(0, 0, ctx.canvas.width, 50);
    ctx.fill();

    // Paint scoreboard text / score
    ctx.fillStyle = 'black';
    ctx.font = '24px Play';
    ctx.fillText('Score: ' + this.score, 400, 40);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(key) {

    // Movements ensure player stays in same relative position in square
    var moveAmtX = 101;
    var moveAmtY = 83;

    // 18px horizontal difference between corner of image and actual sprite
    // 61px vertical difference between corner of image and actual sprite
    // 79px height of actual sprite

    switch (key) {
        case 'left':
            if (this.x+18 - moveAmtX > 0) {
                this.x -= moveAmtX;
            }
            break;
        case 'up':
            this.y -= moveAmtY;
            break;
        case 'right':
            if (this.x+18 + moveAmtX < ctx.canvas.width) {
                this.x += moveAmtX;
            }
            break;
        case 'down':
            if (this.y+61+79 + moveAmtY < ctx.canvas.height-40) {
                this.y += moveAmtY;
            }
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var firstEnemy = new Enemy(0);
var allEnemies = [];
allEnemies.push(firstEnemy);
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
