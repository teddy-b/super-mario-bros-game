var PlayState = (function() {
	function PlayState(game) {
		State.call(this, game);
	}

	PlayState.prototype = Object.create(State.prototype);
	PlayState.prototype.constructor = PlayState;

	PlayState.prototype.create = function() {
		State.prototype.create.call(this);

		this.game.bumpSound = this.game.add.audio('bump');
		this.game.jumpSound = this.game.add.audio('jump');
		this.game.themeSong = this.game.add.audio('song');
		
		this.game.themeSong.play();
		this.state.start('world_1');
	};

	return PlayState;
}());