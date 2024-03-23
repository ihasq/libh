import { write } from "../src/mod";

const Todo = $ => {
	const { set, map, ptr } = $.std;

	const todoMap = map(({ el, id }) => h => h`
		<li key=${id}>${el}</li>
	`);

	const valuePtr = ptr("", null, () => {
		valuePtr.v = "";
	}); // (setup, setCallback, getCallback)

	valuePtr.v = "text";
	console.log(valuePtr.v);

	return h => h`
		<ul>${todoMap}</ul>
		<input value=${valuePtr} type=text />
		<input @^submit=${async () => todoMap.push(valuePtr.v)} type=submit value="Add Todo" />
	`;
}

write(document.body, Todo)