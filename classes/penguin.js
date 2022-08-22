class Penguin {
  constructor(scene) {
    this.scene = scene
    this.totalCols = 7
    this.numDecks = 1
    this.cardSpacingX = 15
    this.cardSpacingY = 15
    this.stock = null
    this.waste = null
    this.foundation = { num: 4, col: 3, row: 6, build: 'aceUp' }
    this.tableau = { num: 7, col: 0, row: 1, build: 'suit' }
    this.free = { num: 7, col: 0, row: 0, build: 'aceUp' }
    this.reserve = null
    this.allowRedeal = false
    this.allowMult = true
    this.validateStack = true
    this.allowFoundCheck = true
    this.moveKingEmpty = false
    this.moveToEmpty = true
    this.showFoundationLabel = true
    this.allowFoundationMove = false;
    this.foundationValue = null
    this.draw = 7
    this.yOffset = 200
    this.redealMax = 200
    this.tableauReveal = 50
    this.redealCount = 0
    this.tabSetUp = [0, 1, 2, 3, 4, 5, 6];
    this.stacksSetup = [[7], [7], [7], [7], [7], [7], [7]];
  }
  deal() {
    var penguinCard = d.cards.pop();
    this.scene.rTextC.setText(penguinCard.rankShort);
    this.scene.rTextD.setText(penguinCard.rankShort);
    this.scene.rTextH.setText(penguinCard.rankShort);
    this.scene.rTextS.setText(penguinCard.rankShort);
    //pull out foundation
    this.foundationValue = penguinCard.value
    for (let i = 0; i < 3; i++) {
      var index = d.cards.findIndex(x => x.rank === penguinCard.rank);
      // console.log(index)
      var aceArray = d.cards.splice(index, 1);
      var ace = aceArray[0]
      //console.log(ace.suitNum)
      ace.setFrame(ace.index)
      ace.stack = ace.suitNum
      ace.place = 'foundation'
      foundation[ace.suitNum].push(ace);
      this.scene.children.bringToTop(ace)
      var tween = this.scene.tweens.add({
        targets: ace,
        x: foundPositions[ace.suitNum].x,
        y: foundPositions[ace.suitNum].y,
        duration: 200,
      })
    }
    //set up tableau
    for (var col = 0; col < this.stacksSetup.length; col++) {
      for (var row = 0; row < this.stacksSetup[col]; row++) {
        if (col == 0 && row == 0) {
          var card = penguinCard
        } else {
          var card = d.cards.pop();
        }


        var frame = card.cardFrame;
        card.faceDown = false
        card.setFrame(frame)

        card.place = 'tableau'
        card.stack = col
        card.slot = row
        tableau[col].push(card)
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
  }
  moveSelected(toCard) {
    if (toCard.place == 'cell' && this.scene.selection.length == 1) {
      var fromStack
      var fromPlace
      //console.log('move to cell')
      var from = this.scene.selection[0];
      fromStack = from.stack
      fromPlace = from.place
      from.clearTint()
      //fromStack = from.stack
      tableau[from.stack].pop()
      from.stack = toCard.stack
      from.place = 'free'
      cells[toCard.stack].push(from)
      this.scene.children.bringToTop(from)
      var tween = this.scene.tweens.add({
        targets: from,
        x: freePositions[toCard.stack].x,
        y: (freePositions[toCard.stack].y),
        duration: 200,
        onCompleteScope: this.scene,
        onComplete: function () {
          this.selection = []
        }
      })
      this.scene.flipStack(fromStack, fromPlace)
      return
    }
    if ((this.scene.selection[0].value + 1 == toCard.value && this.scene.selection[0].suit == toCard.suit) || toCard.moveEmpty) {

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
        } else if (from.place == 'free') {
          cells[from.stack].pop()
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
          y: (tabPositions[toCard.stack].y + (stackLength) * 50),
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
  checkWin() {
    for (var f = 0; f < this.foundation.num; f++) {
      if (foundation[f].length < 13) {
        return
      }
    }
    this.scene.endGame()
  }
}