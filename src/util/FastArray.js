class FastArray {
	#object;
	#index;
	constructor(array) {
		this = "a";
		this.#object = Object.create(null);
		this.#index = 0;
	}

	push(content) {

	};

	splice() {};

	get length() {
		return this.index
	};

	forEach(callbackFn) {

	}
}

export { FastArray }