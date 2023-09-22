const frameloop = {
	isActive: false,
	rafID: "",
	ignite() {
		if(!this.isActive) {
			this.rafID = window.requestAnimationFrame(this.run);
			this.isActive = false;
		};
	},
	cancel() {
		window.cancelAnimationFrame(this.rafID);
		this.isActive = false;
	},
	funcRegistry: Object.create(null),
	funcRegistryIndex: 0,
	stack: Object.create(null),
	stackIndex: 0,
	run() {
		if(frameloop.stackIndex !== 0) {
			for(let i = 0; i < frameloop.stackIndex; i++) {
				frameloop.stack[i]();
			}
		};
		this.stackIndex = 0;
		window.requestAnimationFrame(frameloop.run);
	}
};

export { frameloop };