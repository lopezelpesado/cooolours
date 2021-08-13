// constants

const cooolours = Array.from(document.getElementsByClassName("cooolours"));

// functions

// random number between 0 and 255

function randomNumber0To360() {
	return Math.floor(Math.random() * 361);
}

// random number between 0 and 100

function randomNumber0To100() {
	return Math.floor(Math.random() * 101);
}

// random colour generator

function randomHSLCooolour() {
	return `${randomNumber0To360()}, ${randomNumber0To100()}%, ${randomNumber0To100()}%`;
}

// create list of random colours

function createColoursList() {
	return {
		color1: randomHSLCooolour(),
		color2: randomHSLCooolour(),
		color3: randomHSLCooolour(),
		color4: randomHSLCooolour(),
		color5: randomHSLCooolour(),
	};
}

// color fetcher

function fetchColor(randomColorHSL) {
	return fetch(
		`https://www.thecolorapi.com/id?hsl=${randomColorHSL.replaceAll(" ", "")}`
	).then((response) => response.json());
}

// fetch the randomly generated colours and replace them in the color list with actual colors

async function fetchReplaceAndSetColors(list) {
	let i = 0;
	for (const color in list) {
		fetchedColor = await fetchColor(list[color]);
		list[color] = fetchedColor;
		cooolours[i].style.backgroundColor = list[color].name.closest_named_hex;
		cooolours[i].querySelector("h2").textContent = list[color].name.value;
		i++;
	}
	console.log(list);
}

// set cooolours with random colours

function setCooolours() {
	cooolours.forEach((e) => {
		e.style.backgroundColor = `hsl(${randomHSLCooolour()})`;
	});
}

// stuff to do on page load

const colorList = createColoursList();

console.log(colorList);

fetchReplaceAndSetColors(colorList);
