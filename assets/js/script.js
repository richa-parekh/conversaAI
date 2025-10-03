const changeMode = () => {
	const element = document.getElementById("root");
	if (element.classList.contains("dark")) {
		element.classList.remove("dark");
	} else {
		element.classList.add("dark");
	}
};