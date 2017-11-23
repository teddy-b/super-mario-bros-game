var KeyboardHandler = (function() {
	function KeyboardHandler() {
		InputHandler.call(this);
	}

	KeyboardHandler.prototype = Object.create(InputHandler.prototype);
	KeyboardHandler.prototype.constructor = KeyboardHandler;

	KeyboardHandler.prototype.create = function(input) {
		input.keyboard.addCallbacks(this, onKeyDown, onKeyUp);
	};

	KeyboardHandler.prototype.setInputMap = function(inputMap) {
		InputHandler.prototype.setInputMap.call(this, inputMap);

		var map = {
			up: Phaser.Keyboard.UP,
			down: Phaser.Keyboard.DOWN,
			left: Phaser.Keyboard.LEFT,
			right: Phaser.Keyboard.RIGHT
		};

		for (var i in map) {
			if (!this.inputMap.hasOwnProperty(i)) {
				this.inputMap[i] = map[i];
			}
		}
	};

	function onKeyDown(event) {
		var keyCode = event.keyCode;
		var listener = this.getListenerByInputCode(keyCode);

		if (listener) {
			if (listener.onDown) {
				listener.onDown.call(listener.ctx, keyCode);
			}

			if (listener.handler) {
				listener.handler.call(listener.ctx, keyCode, true);
			}
		}
	}

	function onKeyUp(event) {
		var keyCode = event.keyCode;
		var listener = this.getListenerByInputCode(keyCode);

		if (listener) {
			if (listener.onUp) {
				listener.onUp.call(listener.ctx, keyCode);
			}

			if (listener.handler) {
				listener.handler.call(listener.ctx, keyCode, false);
			}
		}
	}

	return KeyboardHandler;
}());