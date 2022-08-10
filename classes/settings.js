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
let onBack = 3
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
  },
  {
    key: 'cards_apollo',
    name: 'Apollo'
  },
  {
    key: 'cards_civ',
    name: 'Civilization'
  },
  {
    key: 'cards_classic',
    name: 'Classic'
  },
  {
    key: 'cards_draw',
    name: 'Draw'
  },
  {
    key: 'cards_minimal',
    name: 'Minimal'
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
  },
  {
    name: 'Golf',
    objective: 'Transfer all the cards from the seven columns to the single waste pile as quickly as possible.',
    rules: 'A single, exposed card from one of the seven columns may be transferred to the waste pile if it follows either an ascending or descending sequence regardless of suit. Sequences may turn the corner with Kings building on Aces and Aces building on Kings. When no more cards from the columns can be transferred to the waste pile, a card from the stock is dealt to the waste pile and building resumes.'
  },
  {
    name: 'Aces Up',
    objective: 'Transfer all the cards from the seven columns to the single waste pile as quickly as possible.',
    rules: 'A single, exposed card from one of the seven columns may be transferred to the waste pile if it follows either an ascending or descending sequence regardless of suit. Sequences may turn the corner with Kings building on Aces and Aces building on Kings. When no more cards from the columns can be transferred to the waste pile, a card from the stock is dealt to the waste pile and building resumes.'
  },
  {
    name: 'Cruel',
    objective: 'Move all cards to the foundation.',
    rules: 'A card may be added onto a tableau pile if it is one lower than the old top card of the pile and of the same suit.Cards on the tableau that are not under another card are available for play onto the foundation or any non-empty tableau pile.Empty spaces in the tableau may not be filled. Only one card may moved at a time. You may pick up and redeal the cards on the tableau an unlimited number of times.'
  },
  {
    name: 'Free Cell',
    objective: 'Move all cards to the foundation.',
    rules: 'A card may be added onto a foundation pile if it is one higher than the old top card of the pile and of the same suit.Each cell can hold one card. Available cards can be played into any cell. Cards from cells can be played back to the tableau or to the foundation.A card may be added onto a tableau pile if it is one lower than the old top card of the pile and of the opposite color.Cards on the tableau that are not under another card are available for play onto the foundation, an empty cell or any other tableau pile. Empty spaces in the tableau may be filled by any card. Only one card can be moved at a time.'
  }
]