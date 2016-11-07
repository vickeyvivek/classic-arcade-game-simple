/**---------------------------SOUND--------------------------------**/
var bug = new Audio('sounds/bug.wav');
var collect = new Audio('sounds/collect.mp3');
/**---------------------------ENEMY VARIABLE--------------------------------**/
var Enemy = function(xPos, yPos, speed) {
    /** Variables applied to each of our instances go here,
     *we've provided one for you to get started
     *The image/sprite for our enemies, this uses
     *a helper we've provided to easily load images**/
    this.xStart = xPos;
    this.yStart = yPos;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

/** Update the enemy's position, required method for game
    Parameter: dt, a time delta between ticks**/
Enemy.prototype.update = function(dt) {
    /**You should multiply any movement by the dt parameter**/

    this.xStart = this.xStart + this.speed * dt;

    if (this.xStart > 505) {
        this.xStart = -5;
    }

    /**Collision Check**/
    collisionDetection(this);
};

/**Draw the enemy on the screen, required method for game**/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xStart, this.yStart);
};

/**----------------------------------PLAYER VARIABLE-----------------------------**/
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
    this.points = 0;
    this.lives = 3;
};

Player.prototype.update = function() {
    /**check if player runs into left, bottom, or right canvas walls
    prevent player from moving beyond canvas wall boundaries**/
    if (this.y > 410) {
        this.y = 410;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    /*If player has reach the water, reset his location to the origin and
     *increment runs completed counter by one
     */
    if (this.y <= 0) {
        this.points += 1;
        this.y = 410;
        this.x = 200;
    };
};

Player.prototype.handleInput = function(direction) {
    if (direction == 'left') {
        this.x -= 100;
    }

    if (direction == 'right') {
        this.x += 100;
    }

    if (direction == 'up') {
        this.y -= 83;
    }

    if (direction == 'down') {
        this.y += 83;
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 410;
    if (this.lives === 1) {
        alert("!!!!!!!!!!!!!!GAME OVER!!!!!!!!!!! \n ********You Score: " + this.points);
        location.reload();
    } else {
        this.lives = this.lives - 1;
    }
};

/**--------------------DISPLAYING COLLECTIBLE ITEMS---------------------------**/
var Items = function() {
    var img = [
        'images/Gem-Blue.png',
        'images/Gem-Green.png',
        'images/Gem-Orange.png',
        'images/Heart.png',
        'images/Key.png'
    ];

    this.points = Math.floor(Math.random() * 5);
    this.sprite = img[this.points];
    this.multiplier = 2 * (this.points + 1);

    this.xPosition = 0 + (101 * Math.floor(Math.random() * 5));
    this.yPosition = 63 + (83 * Math.floor(Math.random() * 3));
};

Items.prototype.update = function() {
    ItemCollision();
};

Items.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);
};

/**----------------------COLLISION DETECTION---------------**/
var collisionDetection = function(anEnemy) {
    /** check for collision between enemy and player **/
    //If the player comes within 60px of an enemy's x and y coordinates, reset the game
    if (player.x >= anEnemy.xStart - 60 && player.x <= anEnemy.xStart + 60) {
        if (player.y >= anEnemy.yStart - 60 && player.y <= anEnemy.yStart + 60) {
            bug.play();
            console.log('Collided');
            player.reset();
        }
    }
};

var ItemCollision = function() {
    //If the player comes within 60px of an item's x and y coordinates, increse the score
    if (player.x >= items.xPosition - 60 && player.x <= items.xPosition + 60) {
        if (player.y >= items.yPosition - 60 && player.y <= items.yPosition + 60) {
            collect.play();
            player.points += items.multiplier;
            items = null;
            items = new Items();
        }
    }
};

/**---------------------------------------------------------------------------**/
var items = new Items();
var player = new Player(200, 410, 80);

var enemy1 = new Enemy(-5, 60, Math.floor((Math.random() * 100) + 180));
var enemy2 = new Enemy(-5, 145, Math.floor((Math.random() * 100) + 150));
var enemy3 = new Enemy(-5, 230, Math.floor((Math.random() * 100) + 80));
var enemy4 = new Enemy(-2, 135, Math.floor((Math.random() * 100) + 270));

var allEnemies = [enemy1, enemy2, enemy3, enemy4];

/**This listens for key presses and sends the keys to your
    Player.handleInput() method. You don't need to modify this.**/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});