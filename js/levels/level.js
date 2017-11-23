var Level = (function() {
	var NORMAL_GRAVITY = 960,
		LOW_GRAVITY = 190;

	function Level(game) {
		State.call(this, game);

		this.gravity = game.lowGravities ? LOW_GRAVITY : NORMAL_GRAVITY;
		this.mapKey = '';
		this.levelManager = null;
		this.timer = null;

		this.player = null;
	}

	Level.prototype = Object.create(State.prototype);
	Level.prototype.constructor = Level;

	Level.prototype.preload = function() {
		State.prototype.preload.call(this);
	};

	Level.prototype.create = function() {
		State.prototype.create.call(this);

		this.inputHandler.setInputMap({
			jump: Phaser.Keyboard.C,
			sprint: Phaser.Keyboard.X,
			fire: Phaser.Keyboard.SPACEBAR

		});

		this.inputHandler.addListener('left', this, onMove);
		this.inputHandler.addListener('right', this, onMove);
		this.inputHandler.addListener('jump', this, null, onJump, onJumpReleased);
		this.inputHandler.addListener('sprint', this, onSprint);
		this.inputHandler.addListener('fire', this, onFire);

		// input listeners
		function onMove(keycode, active) {
			var dir = (keycode === Phaser.Keyboard.LEFT ? Phaser.LEFT : Phaser.RIGHT);
			this.player.move(dir, active);
		}

		function onJump(keycode) {
			this.player.jump();
		}

		function onJumpReleased(keycode) {
			this.player.jumpReleased = true;
		}

		function onSprint(keycode, active) {
			this.player.sprint(active);
		}

		function onFire(keycode) {
			this.player.fire();
		}
		
		this.levelManager = new LevelManager(this);

		this.levelManager.create();
		this.player = this.levelManager.player;
	};

	Level.prototype.update = function() {
		this.levelManager.update();
	};

	return Level;
}());