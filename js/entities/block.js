var Block = (function() {
	function Block(game, x, y, key, frame) {
		Entity.call(this, game, x, y, key, frame);
	}

	Block.prototype = Object.create(Entity.prototype);
	Block.prototype.constructor = Block;

	Block.prototype.setup = function(level) {
		Entity.prototype.setup.call(this, level);

		this.body.allowGravity = false;
		this.body.immovable = true;
	};

	Block.prototype.bump = function() {
		this.game.bumpSound.play();
	};

	return Block;
}());