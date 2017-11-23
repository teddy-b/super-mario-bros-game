var LevelManager = (function() {
	function LevelManager(level) {
		this.player = null;
		this.map = null;
		this.blocksGroup = null;
		this.itemBlocksGroup = null;
		this.coinsGroup = null;
		this.goombasGroup = null;
		this.fireballsGroup = null;

		this.level = level;
		this.game = level.game;
		this.physics = level.physics;
		this.inputHandler = level.inputHandler;
		
		this.coins = this.game.coins;
		this.coinsImage = this.game.add.sprite(70, 10, 'tilesheet', 57);
		this.coinsImage.fixedToCamera = true;
		this.coinsText = this.game.add.text(90, 14, "x " + this.coins, {
			font: "12px Arial", 
			fill: "#fff"
		});
		this.coinsText.fixedToCamera = true;
		this.marios = this.game.marios;
		this.lifesImage = this.game.add.sprite(120, 10, 'playersheetSmall', 0);
		this.lifesImage.fixedToCamera = true;
		this.lifesText = this.game.add.text(140, 14, "x " + this.marios, {
			font: "12px Arial", 
			fill: "#fff"
		});
		this.lifesText.fixedToCamera = true;
		this.score = this.game.score;
		this.scoreText = this.game.add.text(170, 14, "score: " + this.score, {
			font: "12px Arial", 
			fill: "#fff"
		});
		this.scoreText.fixedToCamera = true;
		this.mainGroup = null;
		this.entitiesGroup = null;
		this.collisionLayer = null;
		this.enemiesCollisionLayer = null;
		this.staticLayer = null;
	}

	LevelManager.prototype.create = function() {
		if (this.game.marios < 1) {
			this.game.state.start('gameover');
		}

		this.mainGroup = this.level.add.group();
		this.entitiesGroup = this.level.add.group();
		this.mainGroup.add(this.entitiesGroup);

		this.map = this.level.add.tilemap(this.level.mapKey);
		this.map.addTilesetImage('tiles', 'tiles');

		this.collisionLayer = this.map.createLayer('collision_layer');
		this.collisionLayer.visible = false;
		this.enemiesCollisionLayer = this.map.createLayer('enemies_collision_layer');
		this.enemiesCollisionLayer.visible = false;
		this.staticLayer = this.map.createLayer('static_layer');
		this.staticLayer.resizeWorld();
		this.collisionLayer.resizeWorld();

		this.map.setCollision(475, true, this.collisionLayer);
		this.map.setCollision(475, true, this.enemiesCollisionLayer);
		this.mainGroup.add(this.staticLayer);

		this.blocksGroup = this.level.add.group();
		this.itemBlocksGroup = this.level.add.group();
		this.coinsGroup = this.level.add.group();
		this.goombasGroup = this.level.add.group();
		this.fireballsGroup = this.level.add.group();

		this.game.fireballsGroup = this.fireballsGroup;

		this.map.createFromObjects('block_layer', 2, 'tilesheet', 1, true, false, this.blocksGroup, Block);
		this.map.createFromObjects('itemblock_layer', 25, 'tilesheet', 24, true, false, this.itemBlocksGroup, ItemBlock);
		this.map.createFromObjects('coins_layer', 58, 'tilesheet', 57, true, false, this.coinsGroup, Coin);
		this.map.createFromObjects('goombas_layer', 291, 'tilesheet', 290, true, false, this.goombasGroup, Goomba);

		this.fireballsGroup.enableBody = true;
		this.fireballsGroup.allowGravity = false;
		this.fireballsGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.fireballsGroup.createMultiple(30, 'fireballSheet', 0, false);
		this.fireballsGroup.setAll('anchor.x', 0.5);
		this.fireballsGroup.setAll('anchor.y', 0.5);
		this.fireballsGroup.setAll('outOfBoundsKill', true);
		this.fireballsGroup.setAll('checkWorldBounds', true);
		this.fireballsGroup.setAll('body.allowGravity', false);
		
		this.blocksGroup.callAll('setup', null, this.level);
		this.blocksGroup.callAll('body.setSize', 'body', 10, 16);
		this.itemBlocksGroup.callAll('setup', null, this.level);
		this.coinsGroup.callAll('setup', null, this.level);
		this.goombasGroup.callAll('setup', null, this.level);

		this.mainGroup.add(this.blocksGroup);
		this.mainGroup.add(this.itemBlocksGroup);
		this.mainGroup.add(this.coinsGroup);
		this.mainGroup.add(this.goombasGroup);
		
		this.player = new Player(this.game, 32, this.game.height - 64);
		this.player.setup(this.level);
		this.entitiesGroup.add(this.player);

		this.mainGroup.bringToTop(this.entitiesGroup);

		this.level.camera.follow(this.player, Phaser.FOLLOW_PLATFORMER);
		this.physics.arcade.gravity.y = this.level.gravity;

		this.game.add.button(10, 10, 'home', goToHome, this, 2, 1, 0).fixedToCamera = true;
		this.game.add.button(30, 10, 'cart', goToShop, this, 2, 1, 0).fixedToCamera = true;

		function goToHome() {
			window.location = '/home';
		}

		function goToShop() {
			window.location = '/shop';
		}
	};

	LevelManager.prototype.update = function() {
		var that = this;

		that.physics.arcade.collide(that.player, that.collisionLayer);
		that.physics.arcade.collide(that.player, that.blocksGroup, onBlockBump, null, that);
		that.physics.arcade.collide(that.player, that.itemBlocksGroup, onItemBlockBump, null, that);
		that.physics.arcade.collide(that.coinsGroup, that.itemBlocksGroup, onCoinBump, null, that);
		that.physics.arcade.collide(that.goombasGroup, that.collisionLayer, goombaMove, null, that);
		that.physics.arcade.collide(that.goombasGroup, that.enemiesCollisionLayer, goombaMove, null, that);
		that.physics.arcade.collide(that.player, that.goombasGroup, onGoombaBump, null, that);

		that.physics.arcade.overlap(that.fireballsGroup, that.goombasGroup, killEnemy, null, that);
		that.physics.arcade.overlap(that.fireballsGroup, that.collisionLayer, function(fireball){
			fireball.kill();
		}, null, that);

		if (that.player.body.bottom >= that.game.world.bounds.bottom) {
			looseLife();
		}

		if (that.player.x > that.level.target) {
			levelCompleted();
		}

		that.blocksGroup.callAll('update');
		that.itemBlocksGroup.callAll('update');
		that.entitiesGroup.callAll('update');
		that.coinsGroup.callAll('update');
		that.goombasGroup.callAll('update');

		function onBlockBump(player, block) {
			if (player.body.touching.up) {
				block.bump();
			}
		}

		function onItemBlockBump(player, itemBlock) {
			if (player.body.touching.up) {
				itemBlock.bump();
			}
		}

		function onCoinBump(coin, itemBlock) {
			if (itemBlock.bumped) {
				coin.bump();

				if (!coin.bumped) {
					that.coins += 1;
					that.coinsText.text = 'x ' + that.coins;
					that.score += 1;
					that.scoreText.text = 'score: ' + that.score;
				}

				coin.bumped = true;
			}
		}

		function onGoombaBump(player, goomba) {
			if (player.body.touching.down) {
				if (!goomba.bumped) {
					goomba.die();
					that.score += 1;
					that.scoreText.text = 'score: ' + that.score;
				}
			} else {
				looseLife();
			}
		}

		function goombaMove(goomba) {
			goomba.move();
		}

		function killEnemy(fireball, enemy) {
			fireball.kill();
			enemy.kill();
		}

		function looseLife() {
			that.game.marios -= 1;
			that.game.gamesPlayed += 1;
			that.game.state.start(that.game.state.current);
			that.lifesText.text = 'x ' + that.marios;
		}

		function levelCompleted() {
			that.game.coins = that.coins;
			that.game.marios = that.marios;
			that.game.mushrooms = that.game.mushrooms ? that.game.mushrooms - 1 : 0;
			that.game.shootings = that.game.shootings ? that.game.shootings - 1 : 0;
			that.game.doubleJumps = that.game.doubleJumps ? that.game.doubleJumps - 1 : 0;
			that.game.lowGravities = that.game.lowGravities ? that.game.lowGravities - 1 : 0;
			that.game.gamesPlayed += 1;
			that.game.score = that.score;
			that.game.levelReached += 1;

			that.game.state.start('levelup');
		}
	};

	return LevelManager;
}());