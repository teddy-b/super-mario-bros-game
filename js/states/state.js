var State = (function() {
	function State(game) {
		Phaser.State.call(this, game);

		this.game = game;
		this.background = null;
		this.inputHandler = null;
	}

	State.prototype = Object.create(Phaser.State.prototype);
	State.prototype.constructor = State;

	State.prototype.create = function() {
		Phaser.State.prototype.create.call(this);

		this.inputHandler = new KeyboardHandler();
		this.inputHandler.create(this.input);
	};

	return State;
}());