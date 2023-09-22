function functionParser(fnBody) {
	const TEMPLATE_STRING = "" + fnBody; // === toString()
	const FUNC_TYPE = fnBody.hasOwnProperty("prototype")? "normal" : keys[index].name? "normal" : "arrow";
	console.log(FUNC_TYPE);
	console.log(buffer.funcList.at(index).templateString);
};

export { functionParser };