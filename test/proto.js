import { html } from "../src/mod";

html.configure({ asyncBinding: true });

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

document.body.append(html.createElement(LibhTextReverser));