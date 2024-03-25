const SomeReactComponent = () => {

	const [ count, setCount ] = useState(0);

	useEffect(() => {
		console.log("count changed")
	}, [count]);

	return (
		<div>
			<button onClick={() => setCount(count => count + 1)}>
				私は{count}回クリックされました
			</button>
		</div>
	)
}

const cardToolBarItem = $ => at => at`
	*color=#333
	*flex=1
	*padding=1rem
	*border=none
	*background-color=#fff
	*transition='background-color 0.2s ease-in-out'
	*cursor=pointer

	:hover {
		*background-color='rgb(218, 218, 218)'
	}
`;

const Ours = () => {
	
	let count = 0;
	
	const addCount = () => count++;

	return h => h`
		<div>
			<button ${cardToolBarItem} @click=${addCount};>
				私は${count}回クリックされました
			</button>
		</div>
	`;
}

const Main = $ => {
	return html => html`
	`
}