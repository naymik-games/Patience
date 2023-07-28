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
let gameProgress
let defaultGameProgress = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
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
  },
  {
    key: 'cards_mobile',
    name: 'Mobile'
  },
  {
    key: 'cards_thin',
    name: 'Thin'
  },
  {
    key: 'cards_pixeldark',
    name: 'Pixel Dark'
  },
  {
    key: 'cards_windows7',
    name: 'Windows 7'
  }
]
let onGame = 1
let games = [
  {
    name: 'Klondike',
    objective: 'To build the foundations up in suit to kings.',
    rules: '[b]Foundation [/b]Any ace may be moved to any empty pile in the foundation.\n[b]Tableau [/b]You may build tableau piles down in sequence and [color=red]alternating color[/color].\n The top cards of tableau piles and waste pile are available to play.\nOne card or group of cards in the proper sequence can be moved from pile to pile. \nIf, during play, any closed cards become the top card of a stack, it turns over. \nEmpty tableaus may be filled with a King or group of cards headed with a King.\n[b]Stock [/b]When you have made all the moves initially available, begin turning over cards from the stock pile. 3 cards at a time are turned over from the Stock an unlimited amount of times.'
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
    objective: 'Transfer all the cards to the single waste pile.',
    rules: 'A single, exposed card from one of the seven columns may be transferred to the waste pile if it follows either an ascending or descending sequence regardless of suit. Sequences may turn the corner with Kings building on Aces and Aces building on Kings. When no more cards from the columns can be transferred to the waste pile, a card from the stock is dealt to the waste pile and building resumes.'
  },
  {
    name: 'Aces Up',
    objective: 'Remove all cards from the tableau except for the Aces',
    rules: '[b]Tableau:[/b]Select the lowest rank card from two or more cards of the same suit to remove it.\nSelect a single card to move it to an empty space, if available.\nSelect the stock to deal a card to the top of each column.\n There are no redeals.'
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
  },
  {
    name: 'Scorpion',
    objective: 'Create four stacks, King down to Ace',
    rules: 'Build tableau piles down in suit. Groups of cards can be moved regardless of any sequence. Any face up card in a tableau can be moved to make a build. All the cards covering it are moved together as a unit. Empty tableaus may be filled with a King or group of cards headed by a King. When you have made all the moves initially available, click on the reserve pile to deal the 3 remaining cards face up to the three leftmost piles.'
  },
  {
    name: 'Alternations',
    objective: 'Move all cards to the foundation.',
    rules: 'A card may be added onto a foundation pile if it is one higher than the old top card of the pile and of the same suit.  A card may be added onto a tableau pile if it is one lower than the old top card of the pile and of the opposite color.Cards on the tableau that are not under another card are available for play onto the foundation or any other tableau pile. Empty spaces in the tableau may be filled by any card. Groups of cards in sequence down may be moved from one tableau column to another if the cards are alternately red and black.Each time you click on the stock, one card will be dealt from the stock to the waste. Only one pass through the stock is permitted.'
  },
  {
    name: 'Spiderette',
    objective: 'Sort all cards on the tableau downwards in the same suit',
    rules: 'Single cards may never be moved to the foundation. Seven tableau piles with one card in the first pile, two cards in the second, three in the third, and so on. The top card in each pile is dealt face up, all others are face down. A card may be added onto a tableau pile if it is one lower than the old top card of the pile and of any suit.Thus, the card that could be played on a five would be a four of any suit. Cards on the tableau that are not under another card are available for play onto any other tableau pile. Empty spaces in the tableau may be filled by any card. Groups of cards in sequence down may be moved from one tableau column to another if all cards are of the same suit. Each time you click on the stock, a card will be dealt on top of each tableau pile. '
  },
  {
    name: 'Pyramid',
    objective: 'You win if you successfully remove all cards',
    rules: 'Remove pairs of cards that [color=red]add to thirteen[/color]. Kings can be removed singly. Cards on the pyramid that are not under another card are available for play. Each time you click on the stock, one card will be dealt from the stock to the waste. The top card of the stock is face up and is available for pairing with cards on the waste or elsewhere so long as you select the other card first. Three passes through the stock are permitted. The top card of the waste is available for play.'
  },
  {
    name: 'Monte Carlo',
    objective: 'To discard all the cards in pairs by suit.',
    rules: '[b]Tableau[/b] Kings can be removed immediatly. Ajacent cards of the same rank can be removed. When no moves are left, select the stock, and the tableau will condensed and any remaining stock cards will be dealt to fill in the empty spaces.'
  },
  {
    name: 'Miss Milligan',
    objective: 'Move all cards to the foundation.',
    rules: '[b]Foundation[/b]Any ace may be moved to any empty pile in the foundation.\n[b]Tableau [/b]A card may be added onto a tableau pile if it is one lower than the old top card of the pile and of the [color=red]opposite color[/color]. Cards on the tableau that are not under another card are available for play onto the foundation or any other tableau pile.Empty spaces in the tableau may be filled by kings only. Groups of cards in sequence down may be moved from one tableau column to another if the cards are alternately red and black.\n [b]Stock [/b]Each time you click on the stock, a card will be dealt on top of each tableau pile, unitil the stock is empty.\n[b]Free Cell [/b] A single card or stack of cards can be temporarily stored in the free cell. If there is a stack of cards in the pocket then you can not take cards out individually. Only the complete sequence can be removed.'
  },
  {
    name: 'Bakers',
    objective: 'Move all cards to the foundation.',
    rules: '[b]Foundation[/b]Any ace may be moved to any empty pile in the foundation.\n[b]Tableau [/b]A card may be added onto a tableau pile if it is one lower than the old top card of the pile and of [color=red]any suit[/color].\nCards on the tableau that are not under another card are available for play onto the foundation or any non-empty tableau pile.\nOnly one card may moved at a time, never sequences.\nEmpty spaces in the tableau may be filled with Kings only.'
  },
  {
    name: 'Forty & Eight',
    objective: 'Move all cards to the foundation.',
    rules: '[b]Foundation[/b]Any ace may be moved to any empty pile in the foundation.\n[b]Tableau [/b]A card may be added onto a tableau pile if it is one lower than the old top card of the pile and of [color=red]the same suit[/color].\nCards on the tableau that are not under another card are available for play onto the foundation or any tableau pile.\nOnly one card may moved at a time, never sequences.\nEmpty spaces in the tableau may be filled with any card.\n[b]Stock and Waste [/b] Each time you click on the stock, one card will be dealt from the stock to the waste. Two passes through the stock are permitted.\nThe top card of the waste is available for play to the tableau or the foundation.'
  },
  {
    name: 'Penguin',
    objective: 'Move all cards to the foundation.',
    rules: '[b]Foundation[/b]Any ace may be moved to any empty pile in the foundation.\n[b]Tableau [/b]A card may be added onto a tableau pile if it is one lower than the old top card of the pile and of [color=red]the same suit[/color].\nCards on the tableau that are not under another card are available for play onto the foundation or any tableau pile.\nOnly one card may moved at a time, never sequences.\nEmpty spaces in the tableau may be filled with any card.\n[b]Stock and Waste [/b] Each time you click on the stock, one card will be dealt from the stock to the waste. Two passes through the stock are permitted.\nThe top card of the waste is available for play to the tableau or the foundation.'
  }
]