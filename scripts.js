const cards = document.querySelectorAll('.memory-card');
const congratulationsModal = document.getElementById('congratulations');
const closeModal = document.getElementsByClassName("close")[0];
const totalNumberOfCards = cards.length;

let hasFlippedCard = false;
let lockBoard = false;
let numberOfFlippedCards = 0;
let firstCard, secondCard;

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
		numberOfFlippedCards += 2;

		// all cards are flipped
		numberOfFlippedCards == totalNumberOfCards ? congratulatePlayer() : resetBoard();
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

function congratulatePlayer() {
	congratulationsModal.style.display = "block";
}

closeModal.onclick = function() {
    congratulationsModal.style.display = "none";
}

cards.forEach(card => card.addEventListener('click', flipCard));
