class TurboArray {
	#object;
	#index;
	#proxy;
	constructor(array) {
		this = {};
		this.#object = Object.create(null);
		this.#index = 0;
	}

	push(content) {

	};

	splice(...args) {
		/**
		 * (start) ...
		 * (start, deleteCount)...
		 * 
		 */
	};

	get length() {
		return this.index
	};

	forEach(callbackFn) {

	};
};

const test = new TurboArray();

export { TurboArray as FastArray }