document.addEventListener('DOMContentLoaded', () => {

  const cardsArray = [];
  cardsArray.push(new Card('javascript', './images/card1.png'));
  cardsArray.push(new Card('javascript', './images/card1.png'));
  cardsArray.push(new Card('typescript', './images/card2.png'));
  cardsArray.push(new Card('typescript', './images/card2.png'));
  cardsArray.push(new Card('node', './images/card3.png'));
  cardsArray.push(new Card('node', './images/card3.png'));
  cardsArray.push(new Card('react', './images/card4.png'));
  cardsArray.push(new Card('react', './images/card4.png'));
  cardsArray.sort(() => 0.5 - Math.random());

  const cardsWon = [];

  const grid = document.querySelector('.grid');
  const score = document.querySelector('#score');

  function createDeck() {
    grid.innerHTML = '';
    cardsArray.forEach((card, index) => {
      const imgElement = document.createElement('img');
      imgElement.setAttribute('src', card.isMatched ? './images/tick.png' : card.isFlipped ? card.imagePath : './images/question.png');
      imgElement.setAttribute('data-id', index);
      imgElement.addEventListener('click', flipThisCard);
      grid.appendChild(imgElement);
    });

    if (cardsWon.length === cardsArray.length) {
      score.textContent = 'Congratulations! You have matched all the cards!'
    } else {
      score.textContent = cardsWon.length / 2 + ' / ' + cardsArray.length / 2;
    }
  }

  function flipThisCard() {
    const cardId = this.getAttribute('data-id');
    const card = cardsArray[cardId];
    if (card.isMatched) return;
    cardsArray[cardId].isFlipped = true;
    createDeck();
    const flippedCards = cardsArray.filter(card => card.isFlipped);
    if (flippedCards.length == 2) {
      setTimeout(() => checkForMatch(...flippedCards), 500);
    }
  }

  function winCards(card1, card2) {
    card1.isFlipped = false;
    card1.isMatched = true;
    card2.isFlipped = false;
    card2.isMatched = true;
    cardsWon.push(card1, card2);
    createDeck();
  }

  function resetCards(card1, card2) {
    card1.isFlipped = false;
    card2.isFlipped = false;
    createDeck();
  }

  function checkForMatch(card1, card2) {
    if (card1.name === card2.name) {
      alert('You found a match!');
      winCards(card1, card2);
    } else {
      alert('Please try again');
      resetCards(card1, card2);
    }
  }

  createDeck();
});

class Card {
  
  constructor(name, imagePath) {
    this.name = name;
    this.imagePath = imagePath;
    this.isFlipped = false;
    this.isMatched = false;
  }
}