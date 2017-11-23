var MainMenuState = (function() {
	function MainMenuState(game) {
		MenuState.call(this, game, 'mainmenu');
	}

	MainMenuState.prototype = Object.create(MenuState.prototype);
	MainMenuState.prototype.constructor = MainMenuState;

	MainMenuState.prototype.create = function() {
		var that = this;

		MenuState.prototype.create.call(that);

		that.inputHandler.setInputMap({
			start: Phaser.Keyboard.SPACEBAR
		});

		that.inputHandler.addListener('start', that, null, start);
		this.game.add.button(this.game.width / 2 - 30, 150, 'start', start, this, 2, 1, 0).fixedToCamera = true;

		function start(keycode) {
			that.state.start('levelup');
		}
	};

	return MainMenuState;
}());