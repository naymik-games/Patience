class Bakers {
  constructor(scene) {
    this.scene = scene
    this.totalCols = 7
    this.numDecks = 1
    this.cardSpacingX = 15
    this.cardSpacingY = 15
    this.stock = null
    this.waste = null
    this.foundation = { num: 4, col: 3, row: 0, build: 'aceUp' }
    this.tableau = { num: 13, col: 0, row: 1, build: 'suitdesc' }
    this.free = null
    this.reserve = null
    this.allowRedeal = false
    this.allowMult = false
    this.allowFoundationMove = false;
    this.moveKingEmpty = false
    this.moveToEmpty = false
    this.showFoundationLabel = false
    this.allowFoundCheck = true
    this.foundationValue = 1
    this.topSelectOnly = true
    this.draw = 3
    this.yOffset = 200
    this.redealMax = 200
    this.tableauReveal = 35
    this.redealCount = 0
    this.tabSetUp = [0, 1, 2, 3, 4, 5, 6];
    this.stacksSetup = [[4], [4], [4], [4], [4], [4], [4], [4], [4], [4], [4], [4]];
  }
  deal() {
    //set up tableau
    for (var col = 0; col < 13; col++) {
      for (var row = 0; row < 4; row++) {
        var card = d.cards.pop();

        var frame = card.index;
        card.faceDown = false
        card.setFrame(frame)


        card.place = 'tableau'
        card.stack = col
        card.slot = row
        tableau[col].push(card)


      }
    }
    // console.log(tableau)
    //bury kinds
    for (var col = 0; col < 13; col++) {
      for (var row = 0; row < 4; row++) {
        var card = tableau[col][row]
        if (card.value == 13) {
          var stackIndex = tableau[col].findIndex(x => x.index === card.index);
          var movedCard = tableau[col].splice(stackIndex, 1)
          tableau[col].unshift(movedCard[0])
        }
      }
      //
    }
    //deal the cards
    for (var col = 0; col < 13; col++) {
      for (var row = 0; row < 4; row++) {
        var card = tableau[col][row]
        this.scene.children.bringToTop(card)
        var tween = this.scene.tweens.add({
          targets: card,
          x: tabPositions[col].x,
          y: tabPositions[col].y + row * this.tableauReveal,
          // y: 550 + row * 50,
          duration: 300,
          delay: (col + row) * 100
        });
      }
    }
    console.log(tableau)
  }
  moveSelected(toCard) {
    if (this.scene.selection[0].value + 1 == toCard.value || this.scene.selection[0].value == 13) {

      var fromStack
      var fromPlace
      for (var i = 0; i < this.scene.selection.length; i++) {
        var from = this.scene.selection[i];
        from.clearTint()
        fromStack = from.stack
        fromPlace = from.place
        if (from.place == 'tableau') {
          tableau[from.stack].pop()
        } else if (from.place == 'waste') {
          waste.pop()
        }

        from.stack = toCard.stack
        from.place = toCard.place
        var stackLength = tableau[toCard.stack].length
        tableau[toCard.stack].push(from);
        //console.log(stackLength)
        this.scene.children.bringToTop(from)
        // from.setPosition(toCard.x,(toCard.y + 50) + (i * 50))
        var tween = this.scene.tweens.add({
          targets: from,
          x: tabPositions[toCard.stack].x,
          y: (tabPositions[toCard.stack].y + (stackLength) * this.tableauReveal),
          duration: 200,
          onCompleteScope: this.scene,
          onComplete: function () {
            this.selection = []
          }
        })


      }
      this.scene.flipStack(fromStack, fromPlace)
      /*  if (tableau[fromStack][tableau[fromStack].length - 1].faceDown) {
         tableau[fromStack][tableau[fromStack].length - 1].flip('f')
       } */
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
      tableau[card.stack].pop();
      card.place = 'foundation'
      this.scene.flipStack(card.stack, 'tableau')
    } else if (card.place == 'waste') {
      waste.pop();
      card.place = 'foundation'
    } else if (card.place == 'free') {
      cells[card.stack].pop();
      card.place = 'foundation'
    }
    card.stack = card.suitNum
    foundation[card.suitNum].push(card);
    this.scene.children.bringToTop(card)
    var tween = this.scene.tweens.add({
      targets: card,
      x: foundPositions[card.suitNum].x,
      y: foundPositions[card.suitNum].y,
      duration: 200,
      onCompleteScope: this,
      onComplete: function () {
        this.checkWin()
      }
    })

  }

  moveToEmptyStack(card, stack) {
    if (card.place == 'tableau') {
      tableau[card.stack].pop();
      card.place = 'tableau'
      this.scene.flipStack(card.stack, card.place)
    } else if (card.place == 'waste') {
      waste.pop();
      card.place = 'tableau'
    }
    tableau[stack].push(card);
    this.scene.children.bringToTop(card)
    var tween = this.scene.tweens.add({
      targets: card,
      x: tabPositions[stack].x,
      y: tabPositions[stack].y,
      duration: 200
    })
  }
  checkWin() {
    for (var f = 0; f < this.foundation.num; f++) {
      if (foundation[f].length < 13) {
        return
      }
    }
    this.scene.endGame()
  }
}