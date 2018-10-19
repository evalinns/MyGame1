const playerShipSpeed = 200;

class MainGameScene extends Phaser.Scene {
    
    constructor() 
    {
        super({key: "MainGameScene"}); 
    }
    
    preload()
    {
        this.load.image('player-ship', 'assets/images/player-ship.png');
        this.load.image('asteroid-medium', 'assets/images/asteroid-medium-01.png');
        this.load.image('asteroid-medium-large', 'assets/images/asteroid-large-01.jpeg');
        this.load.image('Space1200', 'assets/images/Space1200.jpg');
        
        this.load.audio('game-music', 'assets/music/maingame.mp3');
        this.load.audio('titlescreen', 'assets/music/titlescreen.mp3');
        
        this.load.image('bullet', 'assets/images/bullet-simple.png');
        
        this.load.image('bullet', 'assets/images/bullet-simple.png');
    }

    create()
    {
        this.cursors = this.input.keyboard.createCursorKeys();            
        this.asteroidGroup = this.add.group();
        this.bulletGroup = this.add.group();

        this.add.image(0, 0, 'Space1200')
        this.createPlayerShip();
        this.createAsteroid();    
        
    this.music = this.sound.add('game-music');
    this.music.play();
    this.music.volume = 0.5;
    this.music.loop = true;
        // Existing code...   
        
        // Existing code
    this.asteroidTimer = 2000;
    }

    update(time, delta)
    {
        if (this.cursors.right.isDown) {
         this.playerShip.setVelocityX(playerShipSpeed);
        }
        else if (this.cursors.left.isDown){
        this.playerShip.setVelocityX(-playerShipSpeed);
            
        }
        else{     
        this.playerShip.setVelocityX(0);}
            
            
        if (this.cursors.up.isDown) {
        this.playerShip.setVelocityY(-playerShipSpeed);
            
        }
        else if (this.cursors.down.isDown){   
        this.playerShip.setVelocityY(playerShipSpeed);
            
        }
        else {
        this.playerShip.setVelocityY(0); }
        
        this.asteroidTimer -= delta;
        if ( this.asteroidTimer < 0 )
        {
        this.createAsteroid(); 
        this.asteroidTimer = 2000;
        }
        
         if (this.cursors.space.isDown) {
        console.log("Fire Bullet!");
    }
        
        if (this.cursors.space.isDown) {
       this.fireBullet();
    }  
        	// Existing Code
	this.physics.overlap(this.asteroidGroup, this.bulletGroup, this.onAsteroidBulletCollision, null, this);
}

onAsteroidBulletCollision(asteroid, bullet) {
	asteroid.destroy();
	bullet.destroy();
        
    }
    createPlayerShip()
    {
        let startX = game.config.width / 2;
        let startY = game.config.height - 50;
        
        this.playerShip = this.physics.add.image(startX, startY, 'player-ship');   
        this.playerShip.setImmovable();
        this.playerShip.setCollideWorldBounds(true); 
    }
    
    createAsteroid() 
    {
        let graphic = 'asteroid-medium'
        let randomNumber = Phaser.Math.RND.between(1, 6);
        if (randomNumber == 1)
            graphic = 'asteroid-medium-large'
        
        let randomX = Phaser.Math.RND.between(0, 500);
        
        let asteroid = this.physics.add.image(randomX, 0, graphic);
        asteroid.setVelocity(0, 100);
        
        this.asteroidGroup.add(asteroid);
    }  
    
    fireBullet() {
    let x = this.playerShip.x;
    let y = this.playerShip.y;

    let bullet = this.physics.add.image(x, y, 'bullet');
    bullet.setVelocity(0, -100);

    this.bulletGroup.add(bullet);
}

}