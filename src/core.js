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
	init(str, ...key) {
		// parse string

		if(typeof key[0] === "function") {
			const funcStr = key[0].toString();
			const funcInfo = {
				body: funcStr.match(),
			}
			// parse function
			let objectRoot = {
				this: {
					_count: 0,
					style: {
						"*": {
							color: "red"
						}
					},
					src: "app.com"
				},
				prop: {
					"hx-swap": {
						avatarURL: "google.png"
					}
				}
			}
			const funcPrototype = key[0](objectRoot);
			console.log(funcPrototype);
			return funcPrototype;
		} else if(typeof key[0] === "function") {
			console.log(key[0]);
			return {};
		}
	},

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