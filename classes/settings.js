let gameOptions = {
  gemSize: 100,
  fallSpeed: 100,
  destroySpeed: 200,
  offsetX: 50,
  offsetY: 250,
  gameMode: 'time', //moves, challenge
  defaultTime: 60,



}
let gameSettings
let bgColors = [0x077837, 0x000000, 0x993300, 0x0033cc, 0xf7eac6, 0x333333, 0x488a81]
let defaultSettings = { deckNum: 0, sound: false, color: 0, back: 0 };
let onColor = 0
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
  },
  {
    key: 'cards_simple',
    name: 'Simple Dark'
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
  },
  {
    name: 'Canfield',
    objective: 'To build the foundations up in suit until each pile contains thirteen cards.',
    rules: 'You can fill up foundations using the top card of the reserve or tableau piles. You can move cards from one tableau pile to another, and from a reserve pile to a tableau pile in descending sequence of alternating suit colors. You can move either a single card or a set of cards. When one of the tableaus becomes empty it will be filled immediately with a card from the reserve pile.\nWhen you have made all the moves initially available, begin turning over cards from the stock pile. 3 cards at a time are turned over from the stock. You can move cards from the stock pile to tableaus or foundations following the rule above.\nThe stock pile can be turned over as many times as you wish.'
  }
]