const frameloop = {
	isLooping: false,
	stack: Object.create(null),
	stackIndex: 0,
	flush() {
		this.stack = Object.create(null);
		this.stackIndex = 0
	},
	ignite() {
		if(!this.isLooping) {
			this.isLooping = true;
			window.requestAnimationFrame(this.run);
		};
	},
	stop() {
		window.cancelAnimationFrame();
		this.isLooping = false;
	},
	push(callbackFn) {
		this.stack[this.stackIndex] = callbackFn;
		this.stackIndex++;
	},

	run() {
		if(frameloop.stackIndex !== 0) {
			for(let i = 0; i < frameloop.stackIndex; i++) {
				frameloop.stack[i]();
			};
			frameloop.flush();
		}
		window.requestAnimationFrame(frameloop.run);
	},
};

export { frameloop };