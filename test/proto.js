import { html } from "../src/mod";

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

	let revText = "",
		revStrOp = async () => {
			revText = reverseString(await $`input[type=text]`.value)
		};

	return () => html`
		<div>
			<input type="text"/>
			<button onclick=${revStrOp}>Reverse Me!</button>
			<h2>${revText}</h2>
		</div>
	`;
}

const ReactText = () => {
	const inputEl = useRef(null);
	const [text, setText] = useState("");
	const handleClick = () => {
		setText(inputEl.current.value);
	};

	console.log("レンダリング！！");

	return (
		<>
			<input ref={inputEl} type="text" />
			<button onClick={handleClick}>set text</button>
			<p>テキスト : {text}</p>
		</>
	);
};

const LibhText = $ => {

	let text = "";
	const handleClick = async () => {
		text = await $`input[type=text]`.value
	}

	$.onevent = () => {
		console.log("レンダリング！！");
	}

	return () => html`
		<div>
			<input type="text" />
			<button onclick=${handleClick}>set text</button>
			<p>テキスト : ${text}</p>
		</div>
	`;
}

const Recorder = $ => {

	const startRecording = async () => {

		const src = await navigator.mediaDevices.getDisplayMedia({
			video: {
				width: 1280,
				height: 720,
				frameRate: 60
			},
			audio: false,
		});

		$`video`.srcObject = src;
	};

	return () => html`
		<video></video>
		<button onclick=${startRecording}>start recording</button>
	`;
}