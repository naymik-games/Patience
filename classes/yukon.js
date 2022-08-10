class Yukon {
  constructor(scene) {
    this.scene = scene
    this.totalCols = 7
    this.cardSpacingX = 15
    this.cardSpacingY = 15
    this.stock = null
    this.waste = null
    this.foundation = { num: 4, col: 0, row: 0, build: 'aceUp' }
    this.tableau = { num: 7, col: 0, row: 1, build: 'colorAlt' }
    this.free = { num: 2, col: 5, row: 0, build: 'aceUp' }
    this.reserve = null
    this.allowRedeal = true
    this.allowMult = true
    this.moveKingEmpty = true
    this.moveToEmpty = true
    this.showFoundationLabel = false
    this.foundationValue = 1
    this.draw = 3
    this.yOffset = 200
    this.redealMax = 200
    this.tableauReveal = 50
    this.redealCount = 0
    this.tabSetUp = [0, 1, 2, 3, 4, 5, 6];
    this.stacksSetup = [[1], [6], [7], [8], [9], [10], [11]];
  }
  deal() {

    //set up tableau
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < this.stacksSetup[col]; row++) {
        var card = d.cards.pop();
        if (row >= this.tabSetUp[col]) {
          var frame = card.index;
          card.faceDown = false
        } else {
          var frame = onBack;
          card.setTexture('backs', frame)
          card.displayWidth = card.cardWidth
          card.displayHeight = card.cardHeight
        }
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
    console.log(d.cards.length)

  }




  moveSelected(toCard) {
    if (toCard.place == 'cell') {
      var fromStack
      var fromPlace
      console.log('move to cell')
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
      this.scene.flipStack(fromStack, fromStack)
      return
    }
    if ((this.scene.selection[0].value + 1 == toCard.value && this.scene.selection[0].color != toCard.color) || this.scene.selection[0].value == 13) {

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
        console.log(stackLength)
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
    } else if (card.place == 'waste') {
      waste.pop();
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
    //gameData[currentGameNum].wins++;
    //this.saveData();

    alert('win!')
  }
}