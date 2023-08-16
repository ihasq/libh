let username = "taro";

function libh(str, ...val) {
	return (public) => {
		return (str[0] + [...val][0]() + str[1]).replace(/\n|\t/g, "")
	}
}

const bodyElement = libh`
	<label>${() => username}</label>
`;

console.log(bodyElement())

username = "jiro";

console.log(bodyElement())