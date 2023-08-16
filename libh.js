const libhcore = {
	elementRegistry: [],
	portRegistry: [
	/*
		{
			
		}
	 */
	]
}

export function libh(str, ...val) {
	if(typeof val[0] === "object") {
		console.log(val[0])
	}
	libhcore.elementRegistry.push({
		variables: val
	});

	function html() {
		const nonce = "libh:" + Math.random().toString() + Date.now().toString()
		setTimeout(() => {
			try {
				document.getElementById(nonce).parentElement.id = "libh:" + libhcore.portRegistry.length;
			} catch(error) {
				throw new Error("Cannot find render target");
			}
			libhcore.portRegistry.push({
				
			})
			document.getElementById(nonce).remove();
			function render() {
				document.getElementById("libh:0").innerHTML = val[1]()
				requestAnimationFrame(render)
			}
			requestAnimationFrame(render)
		}, 0)
		return `<libh:identifier id="${nonce}"/>`
	}

	html.addEventListener = (eventName, callback) => {
		callback()
	}
	html.delete = () => {

	}
	return html
}