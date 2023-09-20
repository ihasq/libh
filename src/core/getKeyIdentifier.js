const getKeyIdentifier = function() {
	let keyString = [];
	for(let i = 0; i < 16; i++) {
		keyString.push(Math.floor(Math.random() * 256));
	};
	keyString = window.btoa(String.fromCharCode.apply(null, keyString)).replace(/=/g, "")
	return keyString;
};

export { getKeyIdentifier };