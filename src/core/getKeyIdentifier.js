const generateKeyIdentifier = function() {
	let codeArray = [];
	for(let i = 0; i < 16; i++) {
		codeArray.push(Math.floor(Math.random() * 256));
	};
	return "libh" + window.btoa(String.fromCharCode.apply(null, codeArray)).replace(/=/g, "");
};

export { generateKeyIdentifier };