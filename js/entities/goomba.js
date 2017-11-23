var Goomba = (function() {
		var GOOMBA_SPEED = 60;

		function Goomba(game, x, y, key, frame) {
				Entity.call(this, game, x, y, key, frame);

				this.speed = GOOMBA_SPEED;
				this.animations.add('walk', [290, 291]);
		}

		Goomba.prototype = Object.create(Entity.prototype);
		Goomba.prototype.constructor = Goomba;

		Goomba.prototype.setup = function(level) {
				Entity.prototype.setup.call(this, level);

				this.bumped = false;
				this.body.allowGravity = true;
				this.body.collideWorldBounds = true;
		};

		Goomba.prototype.move = function() {
				this.body.velocity.x = this.speed;
				this.animations.play('walk', 8, true);

				if (this.body.blocked.left) {
						this.speed = Math.abs(this.speed);
				}

				if (this.body.blocked.right) {
						this.speed = -Math.abs(this.speed);
				}
		};

		Goomba.prototype.die = function() {
				var that = this;

				if (!that.bumped) {
						that.bumped = true;
						that.frame = 292;
				}

				setInterval(function(){ 
						that.destroy();
				}, 200);
		};

		return Goomba;
}());