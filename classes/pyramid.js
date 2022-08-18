class Pyramid {
  constructor(scene) {
    this.scene = scene
    this.totalCols = 7
    this.numDecks = 1
    this.cardSpacingX = 15
    this.cardSpacingY = 15
    this.stock = { num: 1, col: 0, row: 0 }
    this.waste = { num: 1, col: 1, row: 0 }
    this.foundation = { num: 1, col: 6, row: 0, build: 'aceUp' }
    this.tableau = { num: 1, col: 3, row: 1, build: 'colorAlt' }

    this.free = null
    this.reserve = null
    this.allowRedeal = true
    this.allowMult = false
    this.allowFoundCheck = false
    this.moveKingEmpty = false
    this.moveToEmpty = false
    this.moveKingToFoundation = true
    this.allowFoundationMove = false;
    this.allowDoubleSelection = true
    this.stockInPlay = true
    this.showFoundationLabel = false
    this.foundationValue = 1
    this.draw = 1
    this.yOffset = 200
    this.redealMax = 3
    this.tableauReveal = 50
    this.redealCount = 0
    this.tabSetUp = [0, 1, 2, 3, 4, 5, 6];
    this.stacksSetup = [[1], [2], [3], [4], [5], [6], [7]];
  }
  deal() {
    var initial_set = [1, 2, 3, 4, 5, 6, 7]
    var maxCard = initial_set[initial_set.length - 1];
    //	var initial_x = (maxCard * CARD_WIDTH) / 2;
    var initial_x = this.scene.cardSpacing + this.scene.cardWidth / 2 + gameRules.tableau.col * (this.scene.cardWidth + this.scene.cardSpacing)
    // var y = (gameRules.yOffset + this.scene.cardSpacingY) + gameRules.tableau.row * (this.scene.cardHeight + this.scene.cardSpacingY)
    var initial_y = 0
    for (var i = 0; i < 7; i++) {
      var cards = initial_set[i];
      var offsetx = initial_x - cards * this.scene.cardWidth / 2;
      tableau[i] = new Array(cards);
      for (var j = 0; j < cards; j++) {
        var card = d.cards.pop();
        var frame = card.index;
        card.faceDown = false
        card.setFrame(frame)
        card.place = 'tableau'
        card.stack = i
        card.slot = j
        card.location = i + j
        tableau[i][j] = card;
        this.scene.children.bringToTop(card)
        var tween = this.scene.tweens.add({
          targets: card,
          x: offsetx,
          y: (gameRules.yOffset + this.scene.cardSpacingY) + (i + 1) * (this.scene.cardHeight / 2),
          // y: 550 + row * 50,
          duration: 300,
          delay: (i + j) * 100
        });
        /*  $("<img/>", {
           id: "card" + i + j,
           class: "card " + Deck.familly(value) + "_" + Deck.value(value),
           style: "left: " + offsetx + "px; top: " + (i * CARD_HEIGHT / 3) + "px;"
         }).appendTo(playground); */

        offsetx += this.scene.cardWidth + this.scene.cardSpacing;
      }
    }
    //console.log(tableau)
    //set up stock
    var length = d.cards.length
    var count = d.cards.length
    for (var i = 0; i < length; i++) {
      var card = d.cards.pop();
      var frame = onBack;
      card.setTexture('backs', frame)
      card.displayWidth = card.cardWidth
      card.displayHeight = card.cardHeight
      card.place = 'stock'
      card.stack = -1
      stock.push(card)
      this.scene.children.bringToTop(card)
      var tween = this.scene.tweens.add({
        targets: card,
        x: stockPosition.x,
        y: stockPosition.y,
        // y: 550 + row * 50,
        duration: 300,
        delay: 1500,
        onCompleteScope: this,
        onComplete: function () {
          count--
          if (count == 0) {
            stock[stock.length - 1].flip('f')
          }
        }
      });

    }
  }
  drawStock() {
    //console.log('draw')
    if (this.draw > 1) {
      if (stock.length < this.draw) {
        var draw = stock.length;
      } else {
        var draw = this.draw;
      }
    } else {
      var draw = this.draw
    }

    for (var i = 0; i < draw; i++) {
      var card = stock.pop();
      //card.setPosition(15 + 184, 350 - 80.5);
      this.scene.children.bringToTop(card)
      card.place = 'waste';
      waste.push(card);
      if (card.faceDown) {
        card.flip('f');
      }
      var tween = this.scene.tweens.add({
        targets: card,
        x: wastePosition.x + i * 10,
        y: wastePosition.y,
        duration: 300,
        delay: i * 100
      })
      if (stock.length > 0) {
        var stockCard = stock[stock.length - 1]
        if (stockCard.faceDown) {
          stockCard.flip('f');
        }
      }

    }
    console.log(stock)
    if (stock.length == 0 && this.redealCount < this.redealMax && this.allowRedeal) {
      this.scene.drawPile.setInteractive()
    }
  }
  redeal() {
    this.scene.drawPile.disableInteractive()
    this.redealCount++
    var length = waste.length
    for (var i = 0; i < waste.length; i++) {
      var card = waste.pop()
      card.place = 'stock'
      card.stack = -1
      /*      var frame = onBack;
           card.setTexture('backs', frame)
           card.displayWidth = card.cardWidth
           card.displayHeight = card.cardHeight */
      card.faceDown = false;
      stock.push(card)
      // card.flip('b')
      var tween = this.scene.tweens.add({
        targets: card,
        x: stockPosition.x,
        y: stockPosition.y,
        duration: 100,
        //delay: i * 25
      })
    }
  }
  moveSelected(toCard) {
    //console.log(this.scene.selection)
    if (this.scene.selection[0].value + this.scene.selection[1].value == 13) {
      var fromStack
      var fromPlace
      for (var i = 0; i < this.scene.selection.length; i++) {
        var from = this.scene.selection[i];
        from.clearTint()
        fromStack = from.stack
        fromPlace = from.place
        if (from.place == 'tableau') {
          var stackIndex = tableau[from.stack].findIndex(x => x.index === from.index);
          var placeHolder = { slot: from.slot, stack: from.stack, value: -1, place: tableau }
          tableau[from.stack].splice(stackIndex, 1, placeHolder)
        } else if (from.place == 'waste') {
          waste.pop()
        } else if (from.place == 'stock') {
          stock.pop()
          if (stock.length > 0) {
            var stockCard = stock[stock.length - 1]
            if (stockCard.faceDown) {
              stockCard.flip('f');
            }
          }
          if (stock.length == 0 && this.redealCount < this.redealMax && this.allowRedeal) {
            this.scene.drawPile.setInteractive()
          }
        }







        from.stack = 0
        from.place = 'foundation'

        foundation[0].push(from);

        this.scene.children.bringToTop(from)
        // from.setPosition(toCard.x,(toCard.y + 50) + (i * 50))
        var tween = this.scene.tweens.add({
          targets: from,
          x: foundPositions[0].x,
          y: foundPositions[0].y,
          duration: 200,
          onCompleteScope: this.scene,
          onComplete: function () {
            this.selection = []
          }
        })


      }
      //console.log(tableau)
    } else {
      for (var i = 0; i < this.scene.selection.length; i++) {
        var from = this.scene.selection[i];
        from.clearTint()
      }
      this.scene.selection = []
    }
  }
  moveToFoundation(card) {
    if (card.place == 'tableau') {
      var stackIndex = tableau[card.stack].findIndex(x => x.index === card.index);
      var placeHolder = { slot: card.slot, stack: card.stack, value: -1, place: tableau }
      tableau[card.stack].splice(stackIndex, 1, placeHolder)
    } else if (card.place == 'waste') {
      waste.pop();

    } else if (card.place == 'stock') {
      stock.pop();

    }
    card.stack = 0
    card.place = 'foundation'
    foundation[0].push(card);
    this.scene.children.bringToTop(card)
    var tween = this.scene.tweens.add({
      targets: card,
      x: foundPositions[0].x,
      y: foundPositions[0].y,
      duration: 200,
      onCompleteScope: this,
      onComplete: function () {
        this.checkWin()
      }
    })
    card.clearTint()
    this.scene.selection = []
  }
  validPlay() {
    if (this.checkCard(this.scene.selection[0]) && this.checkCard(this.scene.selection[1])) {
      return true
    }
    return false

  }
  checkCard(card) {
    if (card.place == 'tableau') {
      if (typeof tableau[card.stack + 1] == 'undefined') { return true }

      if ((tableau[card.stack + 1][card.slot].value != -1 && tableau[card.stack + 1][card.slot + 1].value != -1)) {

        // console.log('card stack ' + card.stack + ', card slot ' + card.slot)
        // console.log(tableau[card.stack + 1][card.slot])
        return false
      }
      return true
      /* if (typeof tableau[card.stack + 1] != "undefined" &&
        (typeof tableau[card.stack + 1][card.slot] != "undefined" || typeof tableau[card.stack + 1][card.slot + 1] != "undefined")) {

        console.log('card stack ' + card.stack + ', card slot ' + card.slot)
        return false
      }
      return true */
      /* if (typeof tableau[card.stack + 1] != "undefined" &&
        (typeof tableau[card.stack + 1][card.slot] != "undefined" || typeof tableau[card.stack + 1][card.slot + 1] != "undefined")) {


        return false
      } */
    } else {
      return true
    }
  }
  checkWin() {
    if (foundation.length != 52) {
      return
    }
    this.scene.endGame()
  }
}


/* validPlay() {
  console.log('checking valid play...')

  for (var i = 0; i < this.scene.selection.length; i++) {
    var card = this.scene.selection[i]
    if (card.place == 'tableau') {
      //console.log(tableau[card.stack + 1][card.slot])
      if (typeof tableau[card.stack + 1] != "undefined" &&
        (typeof tableau[card.stack + 1][card.slot] != "undefined" || typeof tableau[card.stack + 1][card.slot + 1] != "undefined")) {

        console.log('card stack ' + card.stack + ', card slot ' + card.slot)
        return false
      }
      /* if (typeof tableau[card.stack + 1] != "undefined" &&
        (typeof tableau[card.stack + 1][card.slot] != "undefined" || typeof tableau[card.stack + 1][card.slot + 1] != "undefined")) {


        return false
      } 
    }
  }
return true
} */