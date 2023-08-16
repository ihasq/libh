let username = "taro";

function libh(str, ...val) {
	let strArray = str;
	return (public) => {
		let result = "";
		for(let i = 0; i < val.length; i++) {
			result += strArray[i] + val[i]()
		}
		return (result + strArray[val.length]).replace(/\n|\t/g, "")
	}
}

const bodyElement = libh`
	<label>${() => username}</label>
`;

console.log(bodyElement())

username = "jiro";

console.log(bodyElement())