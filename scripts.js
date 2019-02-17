

//Selects all .memory-card divs
const cards = document.querySelectorAll('.memory-card');

//Variables, all to change
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;




function flipCard() {

	//if lockBoard equals true, stop the function. Right at the start, lockBoard is false, so function runs on. 
	if (lockBoard) return; 

	//this is the whole .memory-card div that you clicked on. If this equals firstCard, stop the function. 
	if (this === firstCard) return;

	//adds the .flip class to the .memory-card you clicked on
	this.classList.add('flip');

	//if hasFlippedCard is not true, set hasFlippedCard to false. set firstCard to this (the card you clicked on), and stop.
	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	//second click - secondCard is now the second .memory-card you click on
	secondCard = this;

	//run function checkForMatch, to see if the data-cattype on the divs match
	checkForMatch();
}




function checkForMatch() {

	//if the first card's cattype equals the second card's, run function disableCards to leave them flipped, and remove the event listener on them to make them not clickable
	if (firstCard.dataset.cattype === secondCard.dataset.cattype) {
		disableCards();
		return;
	}

	//else, run function unflip cards to flip them over again since it was not a match
	unflipCards();
}




// if there was a match, this function runs, disabling the two matched cards from further clicking, and run resetBoard
function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
}




function unflipCards() {
	
	// Set lockBoard to true
	lockBoard = true;

	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();

	}, 1500); //delay to give us time to see the flip
}





// The firstCard and secondCard variables need to be reset after each round
function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}




/* IIFE (Immediately Invoked Function Expression), a JavaScript function that runs as soon as it is defined.

(function () {
    statements
})();

*/

(function shuffle() {
	cards.forEach(card => {
		let ramdomPos = Math.floor(Math.random() * 12);
		card.style.order = ramdomPos;
	});
})();





//event listener on each card, listening for a click, fires flipCard function
cards.forEach(card => card.addEventListener('click', flipCard));