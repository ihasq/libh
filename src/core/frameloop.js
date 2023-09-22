import { TurboArray } from "../util/util.js";

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
		stack: new TurboArray(),
		pendedDiff: Object.create(null),
	},
	task: {
		stack: new TurboArray()
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
				if(frameloop.func.stack.at(i).result !== frameloop.func.stack.at(i).funcBody()) {
				}
			}
		}
		if(frameloop.task.stack.length !== 0) {
			for(let i = 0; i < frameloop.task.stack.length; i++) {
				frameloop.task.stack.at(i)();
			}
		};
		frameloop.task.stack.flush();
		window.requestAnimationFrame(frameloop.run);
	},

};

export { frameloop };