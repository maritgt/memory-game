//Selects all .memory-card
const cards = document.querySelectorAll('.memory-card');

//Variables, all to change
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;



function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	secondCard = this;

	// hasFlippedCard = false;
	checkForMatch();
}



function checkForMatch() {
	if (firstCard.dataset.cattype === secondCard.dataset.cattype) {
		disableCards();
		return;
	}

	unflipCards();
}



function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
}




function unflipCards() {
	
	lockBoard = true;

	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		// lockBoard = false;
		resetBoard();

	}, 1500);
}




function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}



/*

An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.

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



cards.forEach(card => card.addEventListener('click', flipCard));