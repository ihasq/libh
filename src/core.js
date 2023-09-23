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
		stack: [],
		pendedDiff: Object.create(null),
	},
	task: {
		stack: []
	},
	registerNewFunction(keyFn) {
		this.func.stack.push({
			funcBody: keyFn,
			result: null,
		})
	},
	pushNewTask(taskFn) {
		this.task.stack.push(taskFn);
	},

	run() {
		if(frameloop.func.stack.length !== 0) {
			for(let i = 0; i < frameloop.func.stack.length; i++) {
				if(frameloop.func.stack[i].result !== frameloop.func.stack[i].funcBody()) {
				}
			}
		}
		if(frameloop.task.stack.length !== 0) {
			for(let i = 0; i < frameloop.task.stack.length; i++) {
				frameloop.task.stack[i]();
			}
		};
		frameloop.task.stack = [];
		window.requestAnimationFrame(frameloop.run);
	},
};

const STATIC_UUID = {
	registry: Object.create(null),
	index: 0,
	reset() {
		for(let i = 0; i < 256; i++) {
			this.registry[i] = crypto.randomUUID();
		};
		this.index = 0;
	}
};

function getStaticUUID() {
	if(STATIC_UUID.index === 255) {
		setTimeout(STATIC_UUID.reset, 0);	
	};
	STATIC_UUID.index++;
	return STATIC_UUID.registry[STATIC_UUID.index];
};

STATIC_UUID.reset();

export { getStaticUUID, frameloop }