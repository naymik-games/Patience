let gameOptions = {
  gemSize: 100,
  fallSpeed: 100,
  destroySpeed: 200,
  offsetX: 50,
  offsetY: 250,
  gameMode: 'time', //moves, challenge
  defaultTime: 60,



}


let gameSettings;
var defaultValues = {
  mostDotsMoves: 0,
  mostDotsTime: 0,
  levelStatus: [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  totalSquares: 0,
  group: 0,
  currentLevel: 0
}
let cardKey
let onDeck = 2
let decks = [
  {
    key: 'cards_modern',
    name: 'Modern'
  },
  {
    key: 'cards_largeindex',
    name: 'Large Index'
  },
  {
    key: 'cards_sixty_2',
    name: 'Sixties'
  }
]
let onGame = 1
let games = [
  {
    name: 'Klondike',
    objective: 'To build the foundations up in suit to kings.',
    rules: 'The top cards of tableau piles and waste pile are available to play. You may build tableau piles down in sequence and alternating color. One card or group of cards in the proper sequence can be moved from pile to pile. If, during play, any closed cards become the top card of a stack, it turns over. Empty tableaus may be filled with a King or group of cards headed with a King.\nWhen you have made all the moves initially available, begin turning over cards from the stock pile. 3 cards at a time are turned over from the Stock.'
  },
  {
    name: 'Yukon',
    objective: 'To build the foundations up in suit to kings.',
    rules: 'You may build tableau piles down in sequence and alternating color. Groups of cards can be moved regardless of any sequence.\nAny face up card in the tableau can be moved to make a build. All the cards covering it are moved together as a unit. Empty tableaus may be filled with a King or group of cards headed by a King.'
  }
]