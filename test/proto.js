// import { html } from "../src/mod";

const ReactTextReverser = () => {
	const [revText, setRevText] = useState("");
	const inputElem = useRef();
  
	const handleClick = () => {
		setRevText(reverseString(inputElem.current.value));
	};

	return (
		<div>
			<input ref={inputElem} type="text"></input>
			<button onClick={handleClick}>Reverse Me!</button>
			{revText && <h2>{revText}</h2>}
		</div>
	);
}

const LibhTextReverser = $ => {

	let revText = "";

	const handleClick = () => {
		revText = reverseString($`input[type=text]`.value)
	}

	return () => html`
		<div>
			<input type="text"></input>
			<button onclick=${handleClick}>Reverse Me!</button>
			${revText && html`<h2>${revText}</h2>`}
		</div>
	`;
}

document.body.append(new html(LibhTextReverser));