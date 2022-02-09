//create new scene
let game_scene = new Phaser.Scene('Game');

game_scene.init = function(){
    this.minSpeed = 2;
    this.maxSpeed = 4;
    this.minY = 50;
    this.maxY = 300;
    this.playerSpeed = 2;
    this.notShuttingDown = true;
};

//load assers
game_scene.preload = function(){
    this.load.image('background','assets/background.png');
    this.load.image('player','assets/player.png');
    this.load.image('enemy','assets/dragon.png');
    this.load.image('treasure','assets/treasure.png');
};

//called once after the preload ends
game_scene.create = function(){
    this.bg = this.add.sprite(0, 0, 'background');
    this.bg.setOrigin(0,0);
    
    this.player = this.add.sprite(50,this.sys.game.config.height/2., 'player');
    this.player.setScale(0.5);
    this.player.depth = 1;
    
    this.treasure = this.add.sprite(600,180,'treasure');
    
    
    this.enemies = this.add.group({
        key: 'enemy',
        repeat: 3,
        setXY: {
            x: 150,
            y: 100,
            stepX: 100,
            stepY: 20
        }
    });
    
    
    Phaser.Actions.ScaleXY(this.enemies.getChildren(),-0.4,-0.4);
    
    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
        enemy.direction = Math.random() > 0.5 ? -1 : 1;
        let speed = Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed;
        enemy.velocity = speed * enemy.direction;
        enemy.flipX = true;
    }, this);
    
    //return
    
    //this.bg.setPosition(640/2,360/2);
    //player.setPosition(640/2,360/2);
    /*
    //bg.setOrigin(0,0);
    //player.setOrigin(0,0);
    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;
    //console.log(this.bg);
    //console.log(game_scene);
    
    this.player = this.add.sprite(50,gameH/2, 'player');
    this.player.depth = 1;
    //console.log(this.player);
    
    this.player.setScale(1,1);
    
    this.treasure = this.add.sprite(600,180,'treasure');
    

    this.enemy_0 = this.add.sprite(200,100,'enemy');
    this.enemy_1 = this.add.sprite(350,200,'enemy');
    this.enemy_2 = this.add.sprite(500,300,'enemy');
    
    this.enemy_0.setScale(0.75);
    this.enemy_1.setScale(0.75);
    this.enemy_2.setScale(0.75);
    
    //this.enemy.setScale();
    this.enemy_0.flipX = true;
    //this.enemy.angle = 45;
    console.log(this.enemy);
    this.expand = true;
    this.move_forward = false;
    this.forward = false;
    this.scale = false;
    this.move_up = true;
    //this.enemy.setOrigin(0,0);
    this.enemy_down = [true, true, true];
    this.enemy_1_down = true;
    this.enemy_2_down = true;
    console.log(this.enemy_down);
    console.log(this.enemy_down[0]);
    console.log(this.enemy_down);
    
    //console.log(this.enemy_0.y);
    new_y = this.get_enemy_position(this.enemy_0.y,0);
    //console.log(new_y);
    */
}

game_scene.get_enemy_position = function(current_y,enemy_num){
    //console.log(current_y);
    //console.log(current_y,enemy_num);
    if(current_y <= 50 || current_y >= 310){
        this.enemy_down[enemy_num] = !this.enemy_down[enemy_num]
    }
    
    new_y = current_y;
    
    //console.log(enemy_num);
    
    //console.log(this.enemy_down[enemy_num]);
    
    if(this.enemy_down[enemy_num]){
        new_y += 2;
    } else {
        new_y -= 2;
    }
    //console.log(new_y);
    return new_y;
    
}

game_scene.update = function(){
    
    if(this.notShuttingDown){
        //check collision with treasure
        let playerRect = this.player.getBounds();
        let treasureRect = this.treasure.getBounds();

        if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)){
            return this.gameWin();
        }

        //update enemies positions
        let enemies = this.enemies.getChildren();
        for(let i=0;i < enemies.length;i++){
            if(enemies[i].y <= this.minY || enemies[i].y >= this.maxY){
                enemies[i].velocity *= -1;
            }
            enemies[i].y += enemies[i].velocity;

            let enemyRect = enemies[i].getBounds();

            if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)){
                return this.gameLose();
            }
        }

        //update player
        if(this.input.activePointer.isDown){
            this.player.x += this.playerSpeed;
        }
    }
    
};
/*
game_scene.gameOver = function() {
  
  // initiated game over sequence
  this.notShuttingDown = false;
  
  // shake camera
  this.cameras.main.shake(500);
  
  // listen for event completion
  this.cameras.main.on('camerashakecomplete', function(camera, effect){
    
    // fade out
    this.cameras.main.fade(500);
  }, this);
  
  this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
    // restart the Scene
    this.scene.restart();
  }, this);
  
  
  
};
*/

game_scene.gameLose = function(){
    console.log('Game Over!'); 
    this.notShuttingDown = false;
    this.cameras.main.shake(500);
    this.cameras.main.on('camerashakecomplete', function(camera, effect){
        console.log('fading');
        this.cameras.main.fade(500);
    }, this);
    //this.scene.restart();
    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
        this.scene.restart();
    }, this);
};

game_scene.gameWin = function(){
    console.log('You Win!');
    this.notShuttingDown = false;
    this.cameras.main.shake(500);
    console.log('waiting for shake');
    this.cameras.main.on('camerashakecomplete', function(camera, effect){
        console.log('fading');
        this.cameras.main.fade(500);
    }, this);
    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
        this.scene.restart();
    }, this);
};

//set config
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: game_scene
};

//create new game
let game = new Phaser.Game(config);