var LevelupState = (function() {
	function LevelupState(game) {
		MenuState.call(this, game, 'levelup');

		this.game = game;
	}

	LevelupState.prototype = Object.create(MenuState.prototype);
	LevelupState.prototype.constructor = LevelupState;

	LevelupState.prototype.create = function() {
		var that = this;

		MenuState.prototype.create.call(that);

		that.game.add.text(32, 32, "Level " + that.game.levelReached, {
			font: "32px Arial", 
			fill: "#fff"
		});

		that.inputHandler.setInputMap({
			start: Phaser.Keyboard.ENTER
		});

		that.inputHandler.addListener('start', that, start);
		that.game.add.button(60, 80, 'start', start, that, 2, 1, 0).fixedToCamera = true;

		function start(keycode) {
			that.game.state.start('play');
		}
	};

	return LevelupState;
}());