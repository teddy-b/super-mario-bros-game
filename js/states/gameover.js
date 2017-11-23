var GameOverState = (function() {
	function GameOverState(game) {
		MenuState.call(this, game, 'gameover');
	}

	GameOverState.prototype = Object.create(MenuState.prototype);
	GameOverState.prototype.constructor = GameOverState;

	GameOverState.prototype.create = function() {
		var that = this;

		MenuState.prototype.create.call(that);
	};

	return GameOverState;
}());