export function appendHook(BASE_CLASS, TARGET, ADDITION) {
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

export function getDeepCopy(objectData) {
	const KEY_DATA = Object.keys(objectData);
	const RETURN_BUFFER = Object.create(null);
	for(let objectKeyIndex = 0; objectKeyIndex < Object.keys(objectData).length; objectKeyIndex++) {
		RETURN_BUFFER[KEY_DATA[objectKeyIndex]] = (
			(typeof objectData[KEY_DATA[objectKeyIndex]] === "object")? getDeepCopy(objectData[KEY_DATA[objectKeyIndex]]) : objectData[KEY_DATA[objectKeyIndex]]
		)
	};
	return RETURN_BUFFER;
};