const cards = document.querySelectorAll('.memory-card');
window.onload = function() {
    document.getElementById("game-completed-modal").style.visibility = "hidden";

};
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchcount = 0;
function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if (!hasFlippedCard) {
		// first click
		hasFlippedCard = true;
		firstCard = this;

		return;
	}

	// second click
	secondCard = this;

	checkForMatch();
}

function checkForMatch() {
	// do cards match?
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

	isMatch ? disableCards() : unflipCards();
}

function disableCards() {
		// it's a match!
		firstCard.removeEventListener('click', flipCard);
		secondCard.removeEventListener('click', flipCard);
		//Incrmeeting the whenever there is match.
		matchcount++;
		if(matchcount === 6)
            document.getElementById("game-completed-modal").style.visibility = "visible";
            //U can do Blur Out the Background color

    resetBoard();
}

function unflipCards() {
	// not a match
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
	}, 1500);

}

function resetBoard () {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}


(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();


cards.forEach(card => card.addEventListener('click', flipCard));

