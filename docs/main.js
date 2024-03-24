import href from "@libh/href"

export default () => {
	return h => h`
		<div>
			<h1
				*background='transition(0)'
			></h1>
			<a ${href}=${{ './count': Count }}></a>
		</div>
	`
};