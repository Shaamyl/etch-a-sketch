let gridContainer = document.querySelector('.gridContainer');
let totalBoxes = 2500; //default total boxes
let resolutionStatus = document.querySelector('.resolution');
let brush = document.querySelector('.brush');
let isWhiteTheme = true;

let isPainting = true;
let brushText = "Brush: Black";
gridContainer.setAttribute("style", createGridRule(totalBoxes)); //adding rule to make grid container's columns equal to totalBoxes**(1/2)

createGrid(totalBoxes);	//creating initial grid

let chooseNumberButton = document.querySelector('.chooseNumberButton');

chooseNumberButton.addEventListener('click', function listen(e) {
	let newTotalBoxes = prompt("Enter N, the resolution of the etch-a-sketch. Max: 100");
	if(newTotalBoxes === '' || isNaN(newTotalBoxes) || newTotalBoxes > 100){ //validating entered data
		listen(e);
		return;
	}else if(newTotalBoxes === null){
		return;
	}
	let oldDivs = document.querySelectorAll('.gridContainer>div'); 
	oldDivs.forEach((div) => {
		gridContainer.removeChild(div);
	});
	totalBoxes = newTotalBoxes**2;
	createGrid(totalBoxes);	//creating grid with new dimensions
	brushText = "Brush: Black";
	if(isPainting)
	brush.textContent= "Brush: Black";
	gridContainer.setAttribute("style", createGridRule(totalBoxes));
	resolutionStatus.textContent = "Resolution: " + totalBoxes**(1/2) + "x" + totalBoxes**(1/2);
	
});

//navBar buttons' event listeners below:

let clearButton = document.querySelector('.clearButton');

clearButton.addEventListener('click', (e1) => {
	let oldDivs = document.querySelectorAll('.gridContainer>div');
	oldDivs.forEach((div) => {
		div.style.backgroundColor="#FFF";
	});
});

let rainbowButton = document.querySelector('.rainbowButton');

rainbowButton.addEventListener('click', (e1) => {
	if(isPainting)
	brush.textContent="Brush: Rainbow";
	brushText = "Brush: Rainbow";
	let divs = document.querySelectorAll('.gridContainer>div');
	divs.forEach((div) => {
		div.removeEventListener('mouseenter', rainbowButtonListener); //remove any previous listeners attached to div
		div.removeEventListener('mouseenter', slowButtonListener);
		div.removeEventListener('mouseenter', createGridListener);
		div.removeEventListener('mouseenter', blackButtonListener);
		div.addEventListener('mouseenter', rainbowButtonListener);
	});
});

function rainbowButtonListener(e){ //listener attached to each div when rainbowButton clicked
			let r = Math.random()*256;
			let g = Math.random()*256;
			let b = Math.random()*256;
			if(isPainting)
			e.target.style.backgroundColor = "rgb("+r+","+g+","+b+")";
		}

let blackButton = document.querySelector('.blackButton');

blackButton.addEventListener('click', (e1) => {
	if(isPainting)
	brush.textContent="Brush: Black";
	brushText = "Brush: Black";
	let divs = document.querySelectorAll('.gridContainer>div');
	divs.forEach((div) => {
		div.removeEventListener('mouseenter', rainbowButtonListener);
		div.removeEventListener('mouseenter', slowButtonListener);
		div.removeEventListener('mouseenter', createGridListener);
		div.removeEventListener('mouseenter', blackButtonListener);
		div.addEventListener('mouseenter', blackButtonListener);
	});
});

function blackButtonListener(e){
			if(isPainting)
			e.target.style.backgroundColor = "#000";
		}
		
let slowButton = document.querySelector('.slowButton');

slowButton.addEventListener('click', (e1) => {
	if(isPainting)
	brush.textContent="Brush: Slow Black";
	brushText = "Brush: Slow Black";
	let divs = document.querySelectorAll('.gridContainer>div');
	divs.forEach((div) => {
		div.removeEventListener('mouseenter', rainbowButtonListener);
		div.removeEventListener('mouseenter', slowButtonListener);
		div.removeEventListener('mouseenter', createGridListener);
		div.removeEventListener('mouseenter', blackButtonListener);
		div.addEventListener('mouseenter', slowButtonListener);
	});
});

function slowButtonListener(e){
	
			let currentColor = window.getComputedStyle(e.target ,null).getPropertyValue('background-color');
			if(isPainting){
				if(currentColor === "rgba(0, 0, 0, 0)"){
					e.target.style.backgroundColor = "rgba(0,0,0,0.1)";
				}else if(currentColor === "rgba(0, 0, 0, 0.1)"){
					e.target.style.backgroundColor = "rgba(0,0,0,.2)";
				}else if(currentColor === "rgba(0, 0, 0, 0.2)"){
					e.target.style.backgroundColor = "rgba(0,0,0,.3)";
				}else if(currentColor === "rgba(0, 0, 0, 0.3)"){
					e.target.style.backgroundColor = "rgba(0,0,0,.4)";
				}else if(currentColor === "rgba(0, 0, 0, 0.4)"){
					e.target.style.backgroundColor = "rgba(0,0,0,.5)";
				}else if(currentColor === "rgba(0, 0, 0, 0.5)"){
					e.target.style.backgroundColor = "rgba(0,0,0,.6)";
				}else if(currentColor === "rgba(0, 0, 0, 0.6)"){
					e.target.style.backgroundColor = "rgba(0,0,0,.7)";
				}else if(currentColor === "rgba(0, 0, 0, 0.7)"){
					e.target.style.backgroundColor = "rgba(0,0,0,.8)";
				}else if(currentColor === "rgba(0, 0, 0, 0.8)"){
					e.target.style.backgroundColor = "rgba(0,0,0,.9)";
				}else if(currentColor === "rgba(0, 0, 0, 0.9)"){
					e.target.style.backgroundColor = "rgba(0,0,0,1)";
				}else if(currentColor === "rgb(0, 0, 0)"){
					
				}else{
					e.target.style.backgroundColor = "rgba(0,0,0,0.1)";
				}
			}
		}
	
let themeButton = document.querySelector('.themeButton');
themeButton.onclick = function(){
	if(isWhiteTheme){
		document.getElementById("pagestyle").setAttribute("href", "styles/style2.css");
		document.querySelector('img').src = "images/title2.png";
		themeButton.textContent = "White Theme";
		isWhiteTheme = false;
	}else{
		document.getElementById("pagestyle").setAttribute("href", "styles/style.css");
		document.querySelector('img').src = "images/title.png";
		themeButton.textContent = "Retro Theme";
		isWhiteTheme = true;
	}
};
		
		
function createGrid(totalBoxes){
	for(let i = 0; i <totalBoxes; i++){
		let div = document.createElement('div');
		div.classList.add('gridBox');
		div.addEventListener('mouseenter', createGridListener);
		div.addEventListener('click', (e) => {
			if(isPainting === true){
				isPainting = false;
				brush.textContent = "Brush: Off";
			}else{
				isPainting = true;
				brush.textContent = brushText;
			}
		});
		gridContainer.appendChild(div);	
	}
}

function createGridListener(e) {  //initial listener attached to each div in the grid
			if(isPainting)
			e.target.style.backgroundColor = "#000";
		}

function createGridRule(totalBoxes){
	let columns = totalBoxes**(1/2);
	let s = "grid-template-columns: ";
	for(let x = 0; x < columns; x++){
		s += "auto ";
	}
	s = s.trim();
	return s + ";";
}