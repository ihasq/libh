const attr = {
	define: function(init) {
		for(const index in init) {
			console.log(index);
		}
	},
};

export { attr }