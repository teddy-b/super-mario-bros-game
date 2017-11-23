var PreloadState = (function() {
	function PreloadState(game) {
		State.call(this, game);
	}

	PreloadState.prototype = Object.create(State.prototype);
	PreloadState.prototype.constructor = PreloadState;

	PreloadState.prototype.preload = function() {
		State.prototype.preload.call(this);

		this.load.image('mainmenu', 'assets/images/super-mario-bros.jpg');
		this.load.image('levelup', 'assets/images/levelup.jpg');
		this.load.image('gameover', 'assets/images/gameover.jpg');
		this.load.spritesheet('playersheetSmall', 'assets/sprites/mario_sheet_small.png', 16, 16);
		this.load.spritesheet('playersheetBig', 'assets/sprites/mario_sheet_big.png', 16, 32);
		this.load.spritesheet('fireballSheet', 'assets/sprites/fireball_sheet.png', 8, 8);
		this.load.tilemap('world_1', 'assets/tilemaps/world_1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tiles', 'assets/tilemaps/tile_sheet.png');
		this.load.spritesheet('tilesheet', 'assets/tilemaps/tile_sheet.png', 16, 16);
		this.load.image('home', 'assets/images/home.png');
		this.load.image('cart', 'assets/images/cart.png');
		this.load.image('start', 'assets/images/start.png');
		this.load.audio('bump', 'assets/sounds/smb_bump.wav');
		this.load.audio('jump', 'assets/sounds/smb_jump-small.wav');
		this.load.audio('song', 'assets/sounds/smb_theme_song.mp3');
	};

	PreloadState.prototype.create = function() {
		State.prototype.create.call(this);

		this.state.start('mainmenu');
	};

	return PreloadState;
}());