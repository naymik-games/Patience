/* class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
    this.faceDown = true;
  }
} */
class Card extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, frame, suit, suitNum, foundNum, rank, rankShort, value, index, cardFrame, scale, color, cardWidth, cardHeight) {
    super(scene, x, y, texture, frame, suit, rank, value, index, cardFrame, scale, color, cardWidth, cardHeight);
    // ...
    scene.add.existing(this);
    this.suit = suit;
    this.suitNum = suitNum
    this.foundNum = foundNum
    this.rank = rank;
    this.rankShort = rankShort;
    this.value = value;
    this.index = index
    this.cardFrame = cardFrame
    this.color = color
    this.faceDown = true;
    this.setScale(scale)
    this.cardScale = scale
    this.cardWidth = cardWidth
    this.cardHeight = cardHeight
    this.place = 'stock'
    this.stack = 0
    this.slot = null
    this.setInteractive()

  }
  // ...
  flip(dir) {

    // First tween: We raise and flip the card

    var flipTween = this.scene.tweens.create({
      targets: this,
      scaleY: 1.2,
      scaleX: 0,
      delay: 0,
      duration: 100,
      ease: 'Linear'
    });

    // this.flipCard.frameNr = 0; // Start with backside
    flipTween.on('complete', () => {
      if (dir == 'f') {
        var frame = this.cardFrame
        this.setTexture(cardKey, frame)
        //card.displayWidth = card.cardWidth
        //  card.displayHeight = card.cardHeight
        this.faceDown = false;
      } else {
        var frame = onBack;
        this.setTexture('backs', frame)
        this.displayWidth = this.cardWidth
        this.displayHeight = this.cardHeight
        this.faceDown = true;
      }

      flipBackTween.play();
    });

    // Second tween: we complete the flip and lower the card
    var flipBackTween = this.scene.tweens.create({
      targets: this,
      scaleY: this.cardScale,
      scaleX: this.cardScale,
      duration: 100,
      ease: 'Linear'
    });

    // Once the card has been placed down on the table, we can flip it again
    flipBackTween.on('complete', () => {
      //this.flipCard.isFlipping = false;
    });
    flipTween.play();
  }
  // preUpdate(time, delta) {}
}
class Deck {
  constructor(scene, scale, cardWidth, cardHeight, numDecks) {
    this.cards = [];
    this.scene = scene
    for (var i = 0; i < numDecks; i++) {
      this.createDeck(scale, cardWidth, cardHeight, i)
    }

    this.shuffleDeck()
  }
  createDeck(scale, cardWidth, cardHeight, deckCount) {
    let tempDeck = []
    let suits = ['clubs', 'diamonds', 'hearts', 'spades'];
    let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
    let ranksShort = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    var f = 0
    var cardIndex = 0 + (deckCount * 52)
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        if (suits[i] == 'clubs' || suits[i] == 'spades') {
          var color = 'black';
        } else {
          var color = 'red';
        }
        var foundNum = i + (deckCount * 4)
        tempDeck.push(new Card(this.scene, game.config.width / 2, game.config.height / 2 + 300, cardKey, onBack, suits[i], i, foundNum, ranks[j], ranksShort[j], values[j], cardIndex, f, scale, color, cardWidth, cardHeight));

        f++
        cardIndex++
      }
    }
    this.cards.push(...tempDeck)
  }
  acesHigh() {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].rank == 'ace') {
        this.cards[i].value = 14;
      }
    }
  }
  shuffleDeck() {
    let location1, location2, tmp;
    for (let i = 0; i < 1000; i++) {
      location1 = Math.floor((Math.random() * this.cards.length));
      location2 = Math.floor((Math.random() * this.cards.length));
      tmp = this.cards[location1];
      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }
}
class Player {
  constructor(name) {
    this.playerName = name;
    this.playerCards = [];
  }
}
class Board {
  constructor() {
    this.cardsInMiddle = [];
    this.players = [];
  }
  start(playerOneName, playerTwoName) {
    this.players.push(new Player(playerOneName));
    this.players.push(new Player(playerTwoName));


    // this.players[0].playerCards = d.cards.slice(0, 26);
    //this.players[1].playerCards = d.cards.slice(26, 52);
  }
}
let gameBoard = new Board();