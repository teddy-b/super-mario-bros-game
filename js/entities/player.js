var Player = (function() {
		var PLAYER_MAX_SPEED = 120,
				PLAYER_MAX_SPRINT_SPEED = 180,
				PLAYER_ACCEL = 182,
				PLAYER_DRAG = 165,
				PLAYER_JUMP_SPEED = -385,
				PLAYER_MAX_FALL_SPEED = 320,
				FIREBALL_SPEED = 240,
				FIRE_RATE = 300,

				PlayerStates = {
						Idle: 0,
						Walking: 1,
						Jumping: 2,
						Turning: 3,
						Ducking: 4
				};

		function Player(game, x, y, id) {
				var playersheet = game.mushrooms ? 'playersheetBig' : 'playersheetSmall';

				Entity.call(this, game, x, y, playersheet, 0);

				this.game = game;
				this.id = id || 0;
				this.moveSpeed = PLAYER_ACCEL;
				this.maxSpeed = PLAYER_MAX_SPEED;
				this.currentState = PlayerStates.Idle;
				this.jumpReleased = true;
				this.jumps = 0;
				this.facing = Phaser.RIGHT;

				this.prevFacing = this.facing;
				this.jumping = false;
				this.grounded = false;
				this.sprinting = false;
				this.turning = false;
				this.moving = [];

				this.nextFire = 0;
				this.fireballSpeed = FIREBALL_SPEED;
				this.fireRate = FIRE_RATE;

				this.canShoot = !!this.game.shootings;
				this.fireballsGroup = this.game.fireballsGroup;

				this.addAnimations([{ 
								name: 'walk', 
								frames: [1, 2, 3] 
						}], 8, true);
		}

		Player.prototype = Object.create(Entity.prototype);
		Player.prototype.constructor = Player;

		Player.prototype.setup = function(level) {
				Entity.prototype.setup.call(this, level);

				this.velocity = this.body.velocity;
				this.accel = this.body.acceleration;
				this.body.maxVelocity.set(this.maxSpeed, this.maxSpeed * 10);
				this.body.drag.set(PLAYER_DRAG, 0);
				this.body.setSize(this.body.width - 2, this.body.height);
				this.body.collideWorldBounds = true;
		};

		Player.prototype.update = function() {
				var currentAnim = this.animations.currentAnim,
						delay = Math.min(200, (PLAYER_MAX_SPEED / (Math.abs(this.velocity.x) / 80)));

				if (this.facing !== this.prevFacing) {
						this.flip();
						this.prevFacing = this.facing;
				}

				switch (this.currentState) {
						case PlayerStates.Walking:
								currentAnim.delay = delay;
								this.animations.play('walk');
								break;
						case PlayerStates.Jumping:
								this.frame = 5;
								break;
						case PlayerStates.Turning:
								this.frame = 4;
								break;
						default:
								this.frame = 0;
								break;
				}

				this.grounded = this.body.onFloor() || this.body.touching.down;

				if (this.moving[Phaser.LEFT] ) {
						this.accel.x = -this.moveSpeed;
				} else if (this.moving[Phaser.RIGHT]) {
						this.accel.x = this.moveSpeed;
				} else {
						this.accel.x = 0;
						if (this.velocity.x === 0 && this.grounded) {
								this.currentState = PlayerStates.Idle;
						}
				}

				if (this.grounded && !this.turning &&
								((this.velocity.x < -PLAYER_MAX_SPEED * 0.6 && this.accel.x > 0) ||
								(this.velocity.x > PLAYER_MAX_SPEED * 0.6 && this.accel.x < 0))) {
						this.turning = true;
						this.currentState = PlayerStates.Turning;
				}

				if (Math.abs(this.velocity.x) > 0 && this.grounded && !this.turning) {
						this.currentState = PlayerStates.Walking;
				}

				if (this.grounded && this.jumping && !this.turning) {
						this.jumping = false;
						this.currentState = PlayerStates.Idle;
						this.jumps = 0;
				}

				if (this.jumping && this.jumpReleased &&
								this.velocity.y < PLAYER_JUMP_SPEED / 4) {
						this.velocity.y = PLAYER_JUMP_SPEED / 4;
				}

				this.velocity.y = Math.min(this.velocity.y, PLAYER_MAX_FALL_SPEED);
		};

		Player.prototype.jump = function() {
				var that = this;

				if (that.game.doubleJumps && that.jumps < 2 && that.jumpReleased) {
						doJump();
						that.jumps += 1;
				}

				if (that.grounded && !that.jumping && that.jumpReleased) {
						doJump();
				}

				function doJump() {
						that.jumpReleased = false;
						that.jumping = true;
						that.turning = false;
						that.currentState = PlayerStates.Jumping;
						that.velocity.y = PLAYER_JUMP_SPEED;
						that.game.jumpSound.play();
				}
		};

		Player.prototype.sprint = function(active) {
				if (!this.jumping && Math.abs(this.accel.x) > 0 && active) {
						this.body.maxVelocity.x = PLAYER_MAX_SPRINT_SPEED;
				} else if (!active) {
						this.body.maxVelocity.x = this.maxSpeed;
				}

				this.sprinting = active;
		};

		Player.prototype.move = function(direction, active) {
				this.turning = false;
				this.moving[direction] = active;

				if (!this.jumping) {
						this.currentState = PlayerStates.Walking;
						this.facing = direction;
				}
		};

		Player.prototype.fire = function() {
				var fireball;

				if (this.canShoot && this.game.time.now > this.nextFire) {
						this.nextFire = this.game.time.now + this.fireRate;

						if (this.fireballsGroup.countDead() > 0) {

								fireball = this.fireballsGroup.getFirstExists(false);
								fireball.reset(this.x, this.y);
						}

						if (this.facing == Phaser.RIGHT) {
								fireball.body.velocity.x = this.fireballSpeed;
						} else {
								fireball.body.velocity.x = -this.fireballSpeed;
						}
				}
		};

		return Player;
}());