class TurboArray {
	#private;
	constructor() {
		this.#private = {
			table: Object.create(null),
			length: 0,
		}
	};

	at(arrayIndex) {
		if(this.#private.length) {
			return this.#private.table[arrayIndex % this.#private.length]
		} else {
			return undefined
		}
	};

	push(property) {
		this.#private.table[this.#private.length] = property;
		this.#private.length++;
	};

	flush() {
		this.#private.length = 0;
	};

	forEach(callbackFn) {

	};

	get length() {
		return this.#private.length;
	};
};

export { TurboArray };