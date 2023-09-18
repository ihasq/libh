const core = {
	elementRegistry: Object.create(null),
	portRegistry: [
	/*
		{
			
		}
	 */
	],
	functionRegistry: Object.create(null),
	functionRegistryLength: 0,
	stringCache: Object.create(null),
	placeholderCache: [],
	keyCache: Object.create(null),
	funcCache: Object.create(null),
	attributeRegistry: Object.create(null),

	config: {},
	compile: {},
	property: {
		version: "0.0.1"
	},
	state: {
		isRunning: false,
	},
	renderTask: [],
	createPortRegistry: function() {

	},

};

export { core }