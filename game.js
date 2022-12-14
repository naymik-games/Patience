let game;
let klondike
let d
let gameRules
let tableau
let tabPositions
let stock
let stockPosition
let waste
let wastePosition
let foundation
let foundPositions
let cells
let freePositions
let reserve
let reservePosition
window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },

    scene: [preloadGame, startGame, playGame, UI, pauseGame]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
class playGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  preload() {


  }
  create() {
    if (onGame == 0) {
      gameRules = new Klondike(this)
    } else if (onGame == 1) {
      gameRules = new Yukon(this)
    } else if (onGame == 2) {
      gameRules = new Canfield(this)
    } else if (onGame == 3) {
      gameRules = new Golf(this)
    } else if (onGame == 4) {
      gameRules = new Aces(this)
    } else if (onGame == 5) {
      gameRules = new Cruel(this)
    } else if (onGame == 6) {
      gameRules = new Free(this)
    } else if (onGame == 7) {
      gameRules = new Scorpion(this)
    } else if (onGame == 8) {
      gameRules = new Alternations(this)
    } else if (onGame == 9) {
      gameRules = new Spiderette(this)
    } else if (onGame == 10) {
      gameRules = new Pyramid(this)
    } else if (onGame == 11) {
      gameRules = new Montecarlo(this)
    } else if (onGame == 12) {
      gameRules = new Missmilligan(this)
    } else if (onGame == 13) {
      gameRules = new Bakers(this)
    } else if (onGame == 14) {
      gameRules = new Forty(this)
    } else if (onGame == 15) {
      gameRules = new Penguin(this)
    }



    gameProgress[onGame][0]++
    localStorage.setItem('PatienceProgress', JSON.stringify(gameProgress));

    cardKey = decks[onDeck].key
    var frame = this.textures.getFrame(cardKey, 0);

    var cutWidth = frame.cutWidth
    var cutHeight = frame.cutHeight
    /*  var frameB = this.textures.getFrame('backs', 0);
     console.log(frameB) */
    this.cameras.main.setBackgroundColor(bgColors[onColor]);

    this.cardSpacing = gameRules.cardSpacingX;
    this.cardSpacingY = gameRules.cardSpacingY;

    this.cardBlank = 62;
    var cols = gameRules.totalCols;
    var cardSpace = game.config.width - (this.cardSpacing * (cols + 1))
    var s = (cardSpace / cols) / cutWidth

    this.scale = s;
    this.cardWidth = cutWidth * this.scale;
    this.cardHeight = cutHeight * this.scale;
    //RESERVE//////////////////////////////////////////////
    if (gameRules.reserve) {
      var x = this.cardSpacing + this.cardWidth / 2 + gameRules.reserve.col * (this.cardWidth + this.cardSpacing)
      var y = (gameRules.yOffset + this.cardSpacingY) + gameRules.reserve.row * (this.cardHeight + this.cardSpacingY)
      this.reservePile = this.add.image(x, y, cardKey, 62).setScale(s).setOrigin(.5).setDepth(0).setAlpha(.5);
      this.reservePile.place = 'reservePile'
      reserve = []
      reservePosition = { x: x, y: y }

    }
    //FREE CELLS/////////////////////////////////////////
    if (gameRules.free) {
      cells = []
      freePositions = []
      var count = 0
      for (var f = gameRules.free.col; f < gameRules.free.col + gameRules.free.num; f++) {
        var x = this.cardSpacing + this.cardWidth / 2 + f * (this.cardWidth + this.cardSpacing)
        var y = (gameRules.yOffset + this.cardSpacingY) + gameRules.free.row * (this.cardHeight + this.cardSpacingY)
        freePositions.push({ x: x, y: y })
        var free = this.add.image(x, y, cardKey, 62).setScale(s).setOrigin(.5).setDepth(1).setAlpha(.5).setInteractive();
        free.place = 'cell'
        free.stack = count
        cells.push(new Array())
        count++
      }
      //console.log(cells)
      // console.log(freePositions)
    }
    //FOUNDATION///////////////////////////////////////////
    if (gameRules.foundation) {


      if (gameRules.foundation.num > 0) {
        //markers
        foundation = []
        foundPositions = []
        for (var f = gameRules.foundation.col; f < gameRules.foundation.col + gameRules.foundation.num; f++) {
          var x = this.cardSpacing + this.cardWidth / 2 + f * (this.cardWidth + this.cardSpacing)
          var y = (gameRules.yOffset + this.cardSpacingY) + gameRules.foundation.row * (this.cardHeight + this.cardSpacingY)
          foundPositions.push({ x: x, y: y })
          var found = this.add.image(x, y, cardKey, 62).setScale(s).setOrigin(.5).setDepth(0).setAlpha(.2);
          foundation.push(new Array())
        }
        //arrays
        // console.log(foundation)
        //console.log(foundPositions)
      } else {
        //code if game only has one foundation
      }
      if (gameRules.showFoundationLabel) {
        this.rTextC = this.add.bitmapText(foundPositions[0].x, foundPositions[0].y - 5, 'topaz', '5', 100).setOrigin(.5).setTint(0xffffff);
        this.rTextD = this.add.bitmapText(foundPositions[1].x, foundPositions[1].y - 5, 'topaz', '10', 100).setOrigin(.5).setTint(0xffffff);
        this.rTextH = this.add.bitmapText(foundPositions[2].x, foundPositions[2].y - 5, 'topaz', 'J', 100).setOrigin(.5).setTint(0xffffff);
        this.rTextS = this.add.bitmapText(foundPositions[3].x, foundPositions[3].y - 5, 'topaz', '2', 100).setOrigin(.5).setTint(0xffffff);

      }

    }
    //TABLEAU///////////////////////////////////////////////////////
    if (gameRules.tableau) {
      tableau = []
      tabPositions = []
      if (onGame == 5) {
        for (var row = 1; row < 4; row++) {
          for (var col = 0; col < 4; col++) {
            var x = this.cardSpacing + this.cardWidth / 2 + col * (this.cardWidth + this.cardSpacing)
            if (row == 1) {
              var y = (gameRules.yOffset - 25) + row * (this.cardHeight + this.cardSpacingY + 75)
            } else {
              var y = (gameRules.yOffset + 25) + (row) * (this.cardHeight + (this.cardSpacingY + 50))
            }

            tabPositions.push({ x: x, y: y })
            var tab = this.add.image(x, y, cardKey, 62).setScale(s).setOrigin(.5).setInteractive().setDepth(0).setAlpha(.5);
            tableau.push(new Array())
          }
        }
      } else if (onGame == 11) {
        for (var row = 0; row < 5; row++) {
          for (var col = 0; col < 5; col++) {
            var x = this.cardSpacing + this.cardWidth / 2 + col * (this.cardWidth + this.cardSpacing)
            var y = (gameRules.yOffset + this.cardSpacingY) + row * (this.cardHeight + this.cardSpacingY)
            tabPositions.push({ x: x, y: y })
            var tab = this.add.image(x, y, cardKey, 62).setScale(s).setOrigin(.5).setInteractive().setDepth(0).setAlpha(.5);
            tableau.push(new Array())
          }
        }
      } else if (onGame == 13) {
        for (var row = 1; row < 3; row++) {
          for (var col = 0; col < 7; col++) {
            if (row == 2 && col == 6) {

            } else {
              if (row == 1) {
                var add = 0
              } else {
                var add = 2
              }
              var x = this.cardSpacing + this.cardWidth / 2 + col * (this.cardWidth + this.cardSpacing)
              var y = (gameRules.yOffset + this.cardSpacingY) + (row + add) * (this.cardHeight + this.cardSpacingY)
              tabPositions.push({ x: x, y: y })
              var tab = this.add.image(x, y, cardKey, 62).setScale(s).setOrigin(.5).setInteractive().setDepth(0).setAlpha(.5);
              tableau.push(new Array())
            }



          }
        }

      } else {

        for (var t = gameRules.tableau.col; t < gameRules.tableau.col + gameRules.tableau.num; t++) {
          var x = this.cardSpacing + this.cardWidth / 2 + t * (this.cardWidth + this.cardSpacing)
          var y = (gameRules.yOffset + this.cardSpacingY) + gameRules.tableau.row * (this.cardHeight + this.cardSpacingY)
          tabPositions.push({ x: x, y: y })
          var tab = this.add.image(x, y, cardKey, 62).setScale(s).setOrigin(.5).setInteractive().setDepth(0).setAlpha(.5);
          tableau.push(new Array())
        }
      }

      // console.log(tableau)
      // console.log(tabPositions)
    }

    //STOCK/////////////////////////////////////////////////
    if (gameRules.stock) {
      var x = this.cardSpacing + this.cardWidth / 2 + gameRules.stock.col * (this.cardWidth + this.cardSpacing)
      var y = (gameRules.yOffset + this.cardSpacingY) + gameRules.stock.row * (this.cardHeight + this.cardSpacingY)
      this.drawPile = this.add.image(x, y, cardKey, 62).setScale(s).setOrigin(.5).setDepth(0).setAlpha(.5);
      this.drawPile.place = 'drawPile'
      stock = []
      stockPosition = { x: x, y: y }
    }
    //WASTE /////////////////////////////////////////////////
    if (gameRules.waste) {
      var x = this.cardSpacing + this.cardWidth / 2 + gameRules.waste.col * (this.cardWidth + this.cardSpacing)
      var y = (gameRules.yOffset + this.cardSpacingY) + gameRules.waste.row * (this.cardHeight + this.cardSpacingY)
      this.wastePile = this.add.image(x, y, cardKey, 62).setScale(s).setOrigin(.5).setDepth(0).setAlpha(.5);
      this.wastePile.place = 'wastePile'
      waste = []
      wastePosition = { x: x, y: y }
    }

    let gameBoard = new Board();
    d = new Deck(this, s, this.cardWidth, this.cardHeight, gameRules.numDecks);
    if (gameRules.acesHigh) {
      d.acesHigh()
    }

    //console.log(d.cards.length)
    //create markers

    gameRules.deal()

    // console.log(tableau)

    this.selection = []
    this.toSelection = {}
    if (gameRules.singleClick) {
      this.input.on('gameobjectdown', this.pressSingle, this)
    } else {
      this.input.on('gameobjectdown', this.press, this)
    }

    //d.cards[d.cards.length - 1].flip()
    /* this.input.on("pointerdown", this.gemSelect, this);
     this.input.on("pointermove", this.drawPath, this);
     this.input.on("pointerup", this.removeGems, this);
    */
    //this.check = this.add.image(725, 1000, 'check').setScale(.7);
  }
  update() {

  }
  pressSingle(pointer, card) {
    if (card.faceDown && card.place == 'tableau') { return }
    if (card.faceDown && card.place == 'stock') {
      gameRules.drawStock()
    }
    if (!card.faceDown && card.place == 'tableau') {
      this.selection.push(card);
      gameRules.moveSelected();

    } else if (!card.faceDown && card.place == 'free') {
      this.selection.push(card);
      gameRules.moveSelected();
    }
  }
  press(pointer, card) {
    // console.log(card.place)
    var debug = 'Place ' + card.place + ', Stack ' + card.stack + ', Slot ' + card.slot + ', Suit ' + card.suit + ', Value ' + card.value + ', Index ' + card.index + ', SuitNum ' + card.suitNum + ', col ' + card.col
    //console.log('selection length' + this.selection.length)
    console.log(debug)
    if (card.place == 'drawPile') {
      //console.log("restock")
      if (onGame == 11) {
        gameRules.drawStock()
      } else {
        gameRules.redeal()
      }

    }
    if (card.faceDown && card.place == 'tableau') { return }

    if (card.faceDown && card.place == 'stock') {

      gameRules.drawStock()
      return
    }
    if (gameRules.stockInPlay && card.place == 'stock' && this.selection.length === 0) {

      gameRules.drawStock()
      return
    }
    if (!card.faceDown && (card.place == 'tableau' || card.place == 'waste' || card.place == 'cell' || card.place == 'free' || card.place == 'reserve' || card.place == 'stock' || card.place == 'foundation')) {
      //FIRST CLICK
      if (this.selection.length === 0) {
        if (card.place == 'cell') { return }
        if (card.place == 'foundation' && gameRules.allowFoundationMove == false) { return }
        //check if card can go to foundation
        if (gameRules.allowFoundCheck) {
          var foundationCheck = this.checkFoundation(card.suitNum, card.value, card)
          if (foundationCheck > -1 && (this.isTopCard(card) || card.place == 'waste')) {
            gameRules.moveToFoundation(card, foundationCheck)
            return
          }
        }

        //if card is in tableau and you are allowed to secelect multiple
        if (gameRules.topSelectOnly && !this.isTopCard(card)) { return }
        if (card.place == 'tableau' && gameRules.allowMult) {
          var stackIndex = tableau[card.stack].findIndex(x => x.index === card.index);
          //console.log('stack index ' + stackIndex)
          if (!this.validateStack(tableau, stackIndex, card.stack)) {
            return
          }
          for (var i = stackIndex; i < tableau[card.stack].length; i++) {
            var car = tableau[card.stack][i];
            car.setTint(0x00ff00);
            this.selection.push(car);

          }
          //if auto move king, check and do that
          if (card.value == 13 && gameRules.moveKingEmpty) {
            var temp = this.findEmptyStack();
            if (temp > -1) {
              var toCard = { place: 'tableau', stack: temp, value: -1, moveEmpty: true }
              gameRules.moveSelected(toCard);

            }
            return
          } else if (!gameRules.moveKingEmpty) {
            var temp = this.findEmptyStack();
            if (temp > -1) {
              var toCard = { place: 'tableau', stack: temp, value: -1, moveEmpty: true }
              gameRules.moveSelected(toCard);

            }
            return
          }
        } else if (card.place == 'free' && gameRules.freeMult) {
          //if free cell allow multiple cards, only select from bootom card down
          if (this.isBottomCard(card)) {
            //console.log('correct')
            for (var i = 0; i < cells[card.stack].length; i++) {
              var car = cells[card.stack][i];
              car.setTint(0x00ff00);
              this.selection.push(car);

            }
            //if auto move king, check and do that
            if (card.value == 13 && gameRules.moveKingEmpty) {
              var temp = this.findEmptyStack();
              if (temp > -1) {
                var toCard = { place: 'tableau', stack: temp, value: -1, moveEmpty: true }
                gameRules.moveSelected(toCard);

              }
              return
            } else if (!gameRules.moveKingEmpty) {
              var temp = this.findEmptyStack();
              if (temp > -1) {
                var toCard = { place: 'tableau', stack: temp, value: -1, moveEmpty: true }
                gameRules.moveSelected(toCard);

              }
              return
            }
          }
        } else {
          //if card is in tableau and you are not allowed multiple select card then check for auto move king if allowed
          if (onGame == 10) {
            if (!gameRules.checkCard(card)) {
              return
            }
          }

          this.selection.push(card);
          card.setTint(0x00ff00);
          if (card.value == 13 && gameRules.moveKingToFoundation) {
            gameRules.moveToFoundation(card)

          } else if (card.value == 13 && gameRules.moveKingEmpty && gameRules.moveToEmpty) {
            var temp = this.findEmptyStack();
            if (temp > -1) {
              var toCard = { place: 'tableau', stack: temp, value: -1, moveEmpty: true }
              gameRules.moveSelected(toCard);

            }
            return
          } else if (!gameRules.moveKingEmpty && gameRules.moveToEmpty) {
            //console.log('finding empty spot')

            var temp = this.findEmptyStack();
            if (temp > -1) {
              var toCard = { place: 'tableau', stack: temp, value: -1, moveEmpty: true }
              gameRules.moveSelected(toCard);

            }
            return
          }
          //this.selection.push(card);
        }
      } else {
        //SECOND CLICK
        if (this.selection.length > 0) {
          //console.log('second click')
          if (gameRules.allowDoubleSelection && this.selection.length == 1) {
            //console.log('adding second card...')
            if (onGame == 10) {
              if (!gameRules.checkCard(card)) {
                return
              }
            }
            this.selection.push(card)
          }
          //console.log(this.selection)
          gameRules.moveSelected(card)
        }
        /*   for (var i = 0; i < this.selection.length; i++) {
            var from = this.selection[i];
            from.clearTint()
          }
          this.selection = [] */
      }
    }

  }
  // foundation[num][foundation[num].length - 1].suitNum == num && foundation[num][foundation[num].length - 1].value + 1 == value
  checkFoundation(num, value, from) {
    if (gameRules.numDecks == 2) {
      if (foundation[num].length == 0) {
        if (value == gameRules.foundationValue) {
          return num;
        }
      } else if (this.checkSequenceFound(from, foundation[num][foundation[num].length - 1])) {
        return num;
      } else if (foundation[num + 4].length == 0) {
        if (value == gameRules.foundationValue) {
          return num + 4;
        }
      } else if (this.checkSequenceFound(from, foundation[num + 4][foundation[num + 4].length - 1])) {
        return num + 4;
      } else {
        return -1;
      }
    } else {
      if (foundation[num].length == 0) {
        if (value == gameRules.foundationValue) {
          return num;
        }
      } else if (this.checkSequenceFound(from, foundation[num][foundation[num].length - 1])) {
        return num;
      } else {
        return -1;
      }
    }



  }
  checkSequenceFound(from, to) {
    if (from.value - 1 == to.value && from.suitNum == to.suitNum) {
      return true
    }
    if (to.value == 13 && from.value == 1 && from.suitNum == to.suitNum) {
      return true
    }
    return false

  }
  validateStack(place, index, stack) {
    if (!gameRules.validateStack) {
      return true
    }
    if (index == place[stack].length - 1) {
      //console.log('only one so good')
      return true
    }

    if (gameRules.tableau.build == 'suit') {
      var value = place[stack][index].value;
      var suit = place[stack][index].suit;
      for (var i = index + 1; i < place[stack].length; i++) {
        // console.log('validating...')
        if (place[stack][i].suit != suit || place[stack][i].value + 1 != value || place[stack][i].faceDown) {
          return false
        }
        var value = place[stack][i].value;
        var suit = place[stack][i].suit;
      }
    } else {
      var value = place[stack][index].value;
      var color = place[stack][index].color;
      for (var i = index + 1; i < place[stack].length; i++) {
        //console.log('validating...')
        if (place[stack][i].color == color || place[stack][i].value + 1 != value || place[stack][i].faceDown) {
          return false
        }
        var value = place[stack][i].value;
        var color = place[stack][i].color;
      }
    }

    return true
  }
  isTopCard(card) {
    if (card.place == 'waste') {
      var index = waste.findIndex(x => x.index === card.index);
      if (index == waste.length - 1) {
        return true
      }
    } else if (card.place == 'tableau') {
      var index = tableau[card.stack].findIndex(x => x.index === card.index);
      if (index == tableau[card.stack].length - 1) {
        return true
      }
    } else if (card.place == 'free') {
      var index = cells[card.stack].findIndex(x => x.index === card.index);
      if (index == cells[card.stack].length - 1) {
        return true
      }
    } else if (card.place == 'reserve') {
      var index = reserve.findIndex(x => x.index === card.index);
      if (index == reserve.length - 1) {
        return true
      }
    }
  }
  isBottomCard(card) {
    if (card.place == 'waste') {
      var index = waste.findIndex(x => x.index === card.index);
      if (index == 0) {
        return true
      }
    } else if (card.place == 'tableau') {
      var index = tableau[card.stack].findIndex(x => x.index === card.index);
      if (index == 0) {
        return true
      }
    } else if (card.place == 'free') {
      var index = cells[card.stack].findIndex(x => x.index === card.index);
      if (index == 0) {
        return true
      }
    } else if (card.place == 'reserve') {
      var index = reserve.findIndex(x => x.index === card.index);
      if (index == 0) {
        return true
      }
    }
  }
  flipStack(stack, place) {
    //console.log(place)
    if (stack == -1) {
      return
    }
    if (place == 'tableau') {
      if (tableau[stack].length > 0) {
        var card = tableau[stack][tableau[stack].length - 1];
        if (card.faceDown) {
          card.flip('f')
        }

      }
    } else if (place == 'reserve') {
      //console.log(reserve.length)
      if (reserve.length > 0) {
        var card = reserve[reserve.length - 1];
        // console.log(card.faceDown)
        if (card.faceDown) {
          card.flip('f')
        }

      }
    }

  }
  findEmptyStack() {
    var stack = -1;
    for (var i = 0; i < tableau.length; i++) {
      if (tableau[i].length == 0) {
        stack = i;
        break;
      }
    }
    return stack;
  }
  endGame() {
    gameProgress[onGame][1]++
    localStorage.setItem('PatienceProgress', JSON.stringify(gameProgress));
    alert('win!')
    this.scene.start('startGame')
    this.scene.stop('playGame')
    this.scene.stop('UI')
  }
  addScore() {
    this.events.emit('score');
  }
}




