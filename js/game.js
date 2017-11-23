var Game = (function() {
	function Game() {
		Phaser.Game.call(this, 400, 240, Phaser.AUTO, 'game', null, false, false);

		this.userId = 0;
		this.coins = 0;
		this.marios = 3;
		this.mushrooms = 0;
		this.shootings = 0;
		this.doubleJumps = 0;
		this.lowGravities = 0;
		this.gamesPlayed = 0;
		this.score = 0;
		this.levelReached = 1;
	}

	Game.prototype = Object.create(Phaser.Game.prototype);
	Game.prototype.constructor = Game;

	Game.prototype.boot = function() {
		Phaser.Game.prototype.boot.call(this);

		this.scale.minWidth = this.width;
		this.scale.minHeight = this.height;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.setScreenSize();

		this.renderer.renderSession.roundPixels = true;
		this.stage.smoothed = false;

		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.input.maxPointers = 1;
	};

	Game.prototype.start = function() {
		this.state.add('preload', PreloadState, true);
		this.state.add('menu', MenuState, false);
		this.state.add('mainmenu', MainMenuState, false);
		this.state.add('play', PlayState, false);
		this.state.add('levelup', LevelupState, false);
		this.state.add('world_1', WorldOne, false);
		this.state.add('gameover', GameOverState, false);
	};

	return Game;
}());