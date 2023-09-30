const Frameloop = {
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
		if(Frameloop.func.stack.length !== 0) {
			for(let i = 0; i < Frameloop.func.stack.length; i++) {
				if(Frameloop.func.stack[i].result !== Frameloop.func.stack[i].funcBody()) {
				}
			}
		}
		if(Frameloop.task.stack.length !== 0) {
			for(let i = 0; i < Frameloop.task.stack.length; i++) {
				Frameloop.task.stack[i]();
			}
		};
		Frameloop.task.stack = [];
		window.requestAnimationFrame(Frameloop.run);
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

class LibhIdentifier extends String {
	constructor({ uuid }) {
		super(`<span id=${uuid} hidden></span>`);
	};
	LIBH_STATIC = {
		FLAG: true,
		getAsNode() {
			const RETURN_NODE = document.createElement("span");
			RETURN_NODE.innerText = Date.now();
			RETURN_NODE.id = BUFFER.RENDER_TARGET_UUID;
			return RETURN_NODE;
		},
	};
};

export {
	Frameloop,
	PLUGIN_REGISTRY,
	getDeepCopy,
	LibhIdentifier
}