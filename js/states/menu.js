var MenuState = (function() {
	function MenuState(game, background) {
		State.call(this, game);
		
		this.background = background;
	}

	MenuState.prototype = Object.create(State.prototype);
	MenuState.prototype.constructor = MenuState;

	MenuState.prototype.create = function() {
		State.prototype.create.call(this);

		this.game.background = this.game.add.sprite(0, 0, this.background);
		this.game.background.height = this.game.height;
		this.game.background.width = this.game.width;

		this.game.add.button(10, 10, 'home', goToHome, this, 2, 1, 0).fixedToCamera = true;
		this.game.add.button(30, 10, 'cart', goToShop, this, 2, 1, 0).fixedToCamera = true;

		function goToHome() {
			window.location = '/home';
		}

		function goToShop() {
			window.location = '/shop';
		}
	};

	return MenuState;
}());