const ReactTextReverser = () => {
	const [revText, setRevText] = useState("");
	const inputElem = useRef();
  
	const handleClick = () => {
		setRevText(reverseString(inputElem.current.value));
	};

	return (
		<div>
			<input ref={inputElem} type="text"/>
			<button onClick={handleClick}>Reverse Me!</button>
			{revText && <h2>{revText}</h2>}
		</div>
	);
}

const LibhTextReverser = $ => {
	const { set } = $;
	let revText = "";

	const handleClick = async () => {
		revText = reverseString((await $`#basetext`).value);
		set();
	};

	return h => h`
		<div>
			<input id=basetext type=text/>
			<button @click=${handleClick}>Reverse Me!</button>
			${revText && h`<h2>${revText}</h2>`}
		</div>
	`;
}

const ReactText = () => {
	const inputEl = useRef(null);
	const [text, setText] = useState("");

	console.log("レンダリング！！");

	return (
		<>
			<input ref={inputEl} type="text" />
			<button onClick={() => setText(inputEl.current.value)}>set text</button>
			<p>テキスト : {text}</p>
		</>
	);
};

const LibhText = $ => {
	const { set } = $;
	let text = "";

	return h => {
		console.log("レンダリング！！");

		return h`
			<div>
				<input #inputEl type="text" />
				<button @click=${async () => set(text = (await $`#inputEl`).value)}>set text</button>
				<p>テキスト : ${text}</p>
			</div>
		`;
	}
}

const Recorder = $ => {

	let videoSrc = null;

	const startRecording = async () => {

		const src = await navigator.mediaDevices.getDisplayMedia({
			video: {
				width: 1280,
				height: 720,
				frameRate: 60
			},
			audio: false,
		});

		videoSrc = src;
	};

	return h => h`
		<div>
			<video .srcObject=${videoSrc}></video>
			<button @click=${startRecording}>start recording</button>
		</div>
	`;
}
