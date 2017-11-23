var Coin = (function() {
	function Coin(game, x, y, key, frame) {
		Entity.call(this, game, x, y, key, frame);

		this.bumped = false;
	}

	Coin.prototype = Object.create(Entity.prototype);
	Coin.prototype.constructor = Coin;

	Coin.prototype.setup = function(level) {
		Entity.prototype.setup.call(this, level);

		this.body.allowGravity = true;
		this.alpha = 0;
	};

	Coin.prototype.bump = function() {
		if (!this.bumped) {
			this.alpha = 1;
			this.body.velocity.y = -300;
		}

		if (this.bumped && this.body.touching.down) {
			this.kill();
		}
	};

	return Coin;
}());