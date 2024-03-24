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


const Ours = () => {
	
	let count = 0;
	
	const addCount = () => count++;

	return h => h`
		<div>
			<button @click=${addCount}>
				私は${count}回クリックされました
			</button>
		</div>
	`
}

const Main = $ => {
	return html => html`
	`
}