var ItemBlock = (function() {
	function ItemBlock(game, x, y, key, frame) {
		Block.call(this, game, x, y, key, frame);

		this.bumped = false;

		this.addAnimations([{ 
				name: 'blink', 
				frames: [24, 25, 26] 
			}], 4, true);
		
		this.anim = this.animations.getAnimation('blink');
		this.anim.play();
	}

	ItemBlock.prototype = Object.create(Block.prototype);
	ItemBlock.prototype.constructor = ItemBlock;

	ItemBlock.prototype.bump = function() {
		if (!this.bumped) {
			this.bumped = true;
			this.game.bumpSound.play();
			this.loadTexture('tilesheet', 27);
			this.animations.stop();
		}
	};

	return ItemBlock;
}());