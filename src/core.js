const FRAMELOOP = {
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
		if(FRAMELOOP.func.stack.length !== 0) {
			for(let i = 0; i < FRAMELOOP.func.stack.length; i++) {
				if(FRAMELOOP.func.stack[i].result !== FRAMELOOP.func.stack[i].funcBody()) {
				}
			}
		}
		if(FRAMELOOP.task.stack.length !== 0) {
			for(let i = 0; i < FRAMELOOP.task.stack.length; i++) {
				FRAMELOOP.task.stack[i]();
			}
		};
		FRAMELOOP.task.stack = [];
		window.requestAnimationFrame(FRAMELOOP.run);
	},
};

const VIEW_MODEL = {
	markerList: []
};

const PLUGIN_REGISTRY = Object.create(null);

function getDeepCopy(objectData) {
	const KEY_DATA = Object.keys(objectData);
	const RETURN_BUFFER = Object.create(null);
	for(let objectKeyIndex = 0; objectKeyIndex < Object.keys(objectData).length; objectKeyIndex++) {
		RETURN_BUFFER[KEY_DATA[objectKeyIndex]] = (
			(typeof objectData[KEY_DATA[objectKeyIndex]] === "object")? getDeepCopy(objectData[KEY_DATA[objectKeyIndex]]) : objectData[KEY_DATA[objectKeyIndex]]
		)
	};
	return RETURN_BUFFER;
};

export {
	FRAMELOOP as frameloop,
	PLUGIN_REGISTRY,
	getDeepCopy
}