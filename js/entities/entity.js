var Entity = (function() {
		function Entity(game, x, y, key, frame) {
				Phaser.Sprite.call(this, game, x, y, key, frame);

				this.facing = Phaser.LEFT;
		}

		Entity.prototype = Object.create(Phaser.Sprite.prototype);
		Entity.prototype.constructor = Entity;

		Entity.prototype.setup = function(level) {
				level.physics.enable(this, Phaser.Physics.ARCADE);
				this.anchor.set(0.5, 0.5);
				this.body.fixedRotation = true;
		};

		Entity.prototype.flip = function() {
				var dir = (this.facing === Phaser.LEFT ? -1 : 1);
				this.scale.x = dir;
		};

		Entity.prototype.addAnimations = function(anims, frameRate, loop) {
				frameRate = frameRate || 60;
				loop = loop || false;

				for (var i = 0, l = anims.length; i < l; ++i) {
						var anim = anims[i];
						this.animations.add(anim.name, anim.frames, frameRate, loop);
				}
		};

		return Entity;
}());