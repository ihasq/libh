const generateKeyIdentifier = function() {
	return (Math.floor(Math.random() * ((32 ** 6) - (32 ** 5) - 1)) + (32 ** 5)).toString(32)
};

export { generateKeyIdentifier };