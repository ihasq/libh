let username = "taro";

function libh(str, ...val) {
	return (public) => {
		return [...val][1]()
	}
}

const bodyElement = libh`
	<label ${{
		onclick() {
			console.log(username)
		},
		onmouseover() {

		}
	}}>${() => username}</label>
`;

console.log(bodyElement())

username = "jiro";

console.log(bodyElement())