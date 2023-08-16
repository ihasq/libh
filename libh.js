const libhcore = {
	registry: []
}

export function libh(str, ...val) {
	libhcore.registry.push({
		generatorId: Date.now().toString() + Math.random().toString(),
		relMap: []
	})
	let strArray = str;
	function generator(...arg) {
		function render(intervalType) {

		}
		if((!!arg)) {
			let intervalType = "";
			if(!arg[1] || arg[1].interval === "animationFrame" || arg[1].interval <= 0) {
				intervalType = "animationFrame";
			} else if(typeof arg[1].interval === "number") {
				intervalType = arg[1].interval;
				if(intervalType > 0) {
					setInterval(render, (1000 / intervalType))
				}
			}
			console.log(intervalType)
			function render() {
				let result = "";
				for(let i = 0; i < val.length; i++) {
					result += strArray[i] + val[i]()
				}
				arg[0].innerHTML = (result + strArray[val.length]).replace(/\n|\t/g, "")
				if(intervalType === "animationFrame") {
					requestAnimationFrame(render)
				}
			};
			render()
		} else {
			let result = "";
			for(let i = 0; i < val.length; i++) {
				result += strArray[i] + val[i]()
			}
			return (result + strArray[val.length]).replace(/\n|\t/g, "")
		}
	}
	generator.append = (...arg) => {
		generator(...arg)
	}
	generator.pause = () => {
	}
	generator.addEventListener = (eventName, callback) => {

	}
	return generator
}