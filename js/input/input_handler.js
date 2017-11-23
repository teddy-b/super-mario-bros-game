var InputHandler = (function() {
		function InputHandler() {
				this.inputMap =  {};
				this.listenerMap = {};
		}

		InputHandler.prototype.setInputMap = function(inputMap) {
				this.inputMap = inputMap || {};
		};

		InputHandler.prototype.addListener = function(key, ctx, handler, onDown, onUp) {
				ctx = ctx || null;
				handler = handler || null;
				onDown = onDown || null;
				onUp = onUp || null;

				if (this.inputMap.hasOwnProperty(key)) {
						this.listenerMap[key] = {
								handler: handler,
								ctx: ctx,
								onDown: onDown,
								onUp: onUp
						};
				}
		};

		InputHandler.prototype.getListenerByInputCode = function(code) {
				var key;
				var listener = null;

				for (var k in this.inputMap) {
						if (this.inputMap[k] === code) {
								key = k;
						}
				}

				if (this.listenerMap.hasOwnProperty(key)) {
						listener = this.listenerMap[key];
				}

				return listener;
		};

		return InputHandler;
}());