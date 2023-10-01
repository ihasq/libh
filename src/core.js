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

/*
 * 	krmbn0576 さんに感謝します: Qiita記事「JavaScriptのフックパターンの楽な書き方」
 * 	https://qiita.com/krmbn0576/items/473e18e182972b41dd1b
 */

/**
 * 
 * @param { function } BASE_CLASS
 * @param { string } TARGET
 * @param { function } ADDITION
 * 
 */

function appendHook(BASE_CLASS, TARGET, ADDITION) {
	if (BASE_CLASS.prototype[TARGET]) {
		BASE_CLASS = BASE_CLASS.prototype
	} else if (!BASE_CLASS[TARGET]) {
		throw new Error('Cannot find hook')
	};
	const ORIGIN = BASE_CLASS[TARGET];
	BASE_CLASS[TARGET] = function() {
		arguments[arguments.length] = ORIGIN;
		arguments.length++;
		return ADDITION.apply(this, arguments);
	};
};

export {
	Frameloop,
	getDeepCopy, appendHook,
}