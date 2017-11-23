var WorldOne = (function() {
	var SKY_BLUE = '#6D93FC',
		CASTLE_DISTANCE = 3264;

	function WorldOne(game) {
		Level.call(this, game);

		this.levelId = 1;
		this.mapKey = 'world_1';
		this.target = CASTLE_DISTANCE;
	}

	WorldOne.prototype = Object.create(Level.prototype);
	WorldOne.prototype.constructor = WorldOne;

	WorldOne.prototype.create = function() {
		Level.prototype.create.call(this);
		
		this.stage.backgroundColor = SKY_BLUE;
	};

	return WorldOne;
}());