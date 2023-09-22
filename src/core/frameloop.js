const frameloop = {
	isActive: false,
	rafID: "",
	ignite() {
		if(!this.isActive) {
			this.rafID = window.requestAnimationFrame(this.run);
			this.isActive = true;
		};
	},
	cancel() {
		window.cancelAnimationFrame(this.rafID);
		this.rafID = "";
		this.isActive = false;
	},
	func: {
		stack: Object.create(null),
		index: 0,
		pendedDiff: Object.create(null),
	},
	task: {
		stack: Object.create(null),
		index: 0,
	},
	registerNewFunction(keyFn) {
		this.func.stack[this.func.index] = {
			funcBody: keyFn,
			result: null,
		};
		this.func.index++;
	},
	pushNewTask(taskFn) {
		this.task.stack[this.task.index] = taskFn;
		this.task.index++;
	},

	run() {
		if(frameloop.func.index !== 0) {
			for(let i = 0; i < frameloop.func.index; i++) {
				if(frameloop.func.stack[i].result !== frameloop.func.stack[i].funcBody()) {
				}
			}
		}
		if(frameloop.task.index !== 0) {
			for(let i = 0; i < frameloop.task.index; i++) {
				frameloop.task.stack[i]();
			}
		};
		frameloop.task.index = 0;
		window.requestAnimationFrame(frameloop.run);
	},

};

export { frameloop };