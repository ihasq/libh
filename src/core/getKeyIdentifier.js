const generateKeyIdentifier = function() {
	return window.btoa(
		String.fromCharCode.apply(null, (() => {
			let codeArray = [];
			for(let i = 0; i < 16; i++) {
				codeArray.push(Math.floor(Math.random() * 256));
			};
			return codeArray;
		})())
	).replace(/=/g, "");
};

export { generateKeyIdentifier };