// piggybank for Ingo
// Heiko Gölzer 2025

let pbutton;
let mbutton;
let img;

let size = 10;
let incr = 5;
let decr = 10;

function preload() {
	img = loadImage('piggybank.png');
}

function setup() {
	// Load the saved size when the page loads
	// localStorage stores everything as text, so we convert it back to a number
	let savedSize = localStorage.getItem('size');

	if (savedSize !== null) {
		size = int(savedSize);
	}

	createCanvas(windowWidth, windowHeight);
	noLoop();
	background(200);
	textSize(windowWidth / 12);
	textAlign(CENTER, CENTER);

	document.querySelector('canvas').setAttribute('role', 'img');
	document.querySelector('canvas').setAttribute('aria-label', 'Piggy bank size display');

	pbutton = createButton("+");
	pbutton.mouseClicked(grow);
	pbutton.size(windowWidth / 3, windowHeight / 3);
	pbutton.position(10, 10);
	pbutton.style("font-size", windowWidth / 12 + 'px');
	pbutton.style('color', 'black');
	pbutton.style('background-color', '#0BDA51');

	mbutton = createButton("-");
	mbutton.mouseClicked(shrink);
	mbutton.size(windowWidth / 3, windowHeight / 3);
	mbutton.position(windowWidth - windowWidth / 3 - 10, 10);
	mbutton.style("font-size", windowWidth / 12 + 'px');
	mbutton.style('color', 'black');
	mbutton.style('background-color', '#cd1c18');

	drawPiggy();
}

function drawPiggy() {
	background(200);
	let psize = size * 2 + 1;
	image(img, windowWidth / 2 - (psize / 2), windowHeight / 3 * 2 - (psize * img.height / img.width / 2), psize, psize * img.height / img.width);
	text(str(size), windowWidth / 2, windowHeight / 6);
}

function grow() {
	size = size + incr;
	localStorage.setItem('size', size); // Save to localStorage (Key, Value)
	drawPiggy();
}

function shrink() {
	size = size - decr;
	size = max(size, 0);
	localStorage.setItem('size', size); // Save to localStorage (Key, Value)
	drawPiggy();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	pbutton.size(windowWidth / 3, windowHeight / 3);
	pbutton.position(10, 10);
	pbutton.style("font-size", windowWidth / 12 + 'px');
	mbutton.size(windowWidth / 3, windowHeight / 3);
	mbutton.position(windowWidth - windowWidth / 3 - 10, 10);
	mbutton.style("font-size", windowWidth / 12 + 'px');
	drawPiggy();
}