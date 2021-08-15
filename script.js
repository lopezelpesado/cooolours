// constants

const cooolours = Array.from(document.getElementsByClassName("cooolours"));

const colorList = createColoursList();

const tweeter = document.getElementsByTagName("a")[0];

// event listeners

// click on colours to reveal or hide button menu

cooolours.forEach((e) => {
	e.addEventListener("click", (e) => {
		let cooolourDisplay = e.target.querySelector("div").style.display;

		if (cooolourDisplay === "none") {
			e.target.querySelector("div").style.display = "flex";
		} else {
			e.target.querySelector("div").style.display = "none";
		}
	});
});

// click on refresh buttons to get a new color for the corresponding section

cooolours.forEach((e) => {
	let buttons = Array.from(
		e.querySelector("div").getElementsByTagName("button")
	);

	buttons.forEach((e) => {
		e.addEventListener("click", (e) => {
			let thisCooolour = e.target.parentElement.parentElement;
			let thisIndex = cooolours.indexOf(thisCooolour);
			(async () => {
				let newRandomColor = randomHSLCooolour();

				let newCooolour = await fetchColor(newRandomColor.replaceAll(" ", ""));

				console.log(newCooolour);

				colorList[`color${thisIndex + 1}`] = newCooolour;

				cooolours[thisIndex].style.backgroundColor =
					newCooolour.name.closest_named_hex;

				cooolours[thisIndex].querySelector("h2").textContent =
					newCooolour.name.value;

				e.target.parentElement.style.display = "none";

				tweetLinkGenerator();
			})();
		});
	});
});

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

// twitter link generator

function tweetLinkGenerator() {
	tweeter.setAttribute(
		"href",
		`https://twitter.com/intent/tweet?text=Check%20out%20my%20colour%20scheme%3A%20${colorList.color1.name.value}%2C%20${colorList.color2.name.value}%2C%20${colorList.color3.name.value}%2C%20${colorList.color4.name.value}%20and%20${colorList.color5.name.value}%21%20Generate%20your%20own%20at%20https%3A//lopezelpesado.github.io/cooolours/`
	);
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
	tweetLinkGenerator();
	console.log(list);
}

// stuff to do on page load

fetchReplaceAndSetColors(colorList);

console.log(colorList);
