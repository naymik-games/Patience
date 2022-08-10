class Cruel {
  constructor(scene) {
    this.scene = scene
    this.totalCols = 5
    this.cardSpacingX = 40
    this.cardSpacingY = 150
    this.stock = { num: 1, col: 0, row: 0 }
    this.waste = null
    this.foundation = { num: 4, col: 1, row: 0, build: 'aceUp' }
    this.tableau = { num: 12, col: 0, row: 1, build: 'suitdesc' }
    this.free = null
    this.reserve = null
    this.allowRedeal = true
    this.allowMult = true
    this.moveKingEmpty = false
    this.showFoundationLabel = false
    this.foundationValue = 1
    this.draw = 3
    this.yOffset = 100
    this.redealMax = 200
    this.tableauReveal = 30
    this.redealCount = 0
    this.tabSetUp = [0, 1, 2, 3, 4, 5, 6];
    this.stacksSetup = [[4], [4], [4], [4], [4], [4], [4], [4], [4], [4], [4], [4]];
  }
  deal() {
    /*  for (let i = 0; i < d.cards.length; i++) {
       const card = d.cards[i];
    
     } */
    //pull out aces
    for (let i = 0; i < 4; i++) {
      var index = d.cards.findIndex(x => x.rank === 'ace');
      console.log(index)
      var aceArray = d.cards.splice(index, 1);
      var ace = aceArray[0]
      console.log(ace.suitNum)
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
    //deal the rest
    for (var col = 0; col < 12; col++) {
      for (var row = 0; row < this.stacksSetup[col]; row++) {
        var card = d.cards.pop();

        var frame = card.index;
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
          delay: 200 + (col + row) * 100
        });

      }
    }
    this.scene.drawPile.setInteractive()
  }
  moveSelected(toCard) {
    if (this.scene.selection[0].value + 1 == toCard.value && this.scene.selection[0].suit == toCard.suit) {
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
          y: (tabPositions[toCard.stack].y + (stackLength) * this.tableauReveal),
          duration: 200,
          onCompleteScope: this.scene,
          onComplete: function () {
            this.selection = []
          }
        })


      }
    } else {
      for (var i = 0; i < this.scene.selection.length; i++) {
        var from = this.scene.selection[i];
        from.clearTint()
      }
      this.scene.selection = []
    }
  }
  moveToFoundation(card) {

    tableau[card.stack].pop();
    card.place = 'foundation'
    this.scene.flipStack(card.stack, 'tableau')

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
        //this.checkWin()
      }
    })
  }
  redeal() {
    //he technically correct order is to "shuffle" by taking the cards on the first pile, putting them on top of the cards from the second pile, then on top of the third, and so on, then taking the top four cards and putting them back in the first pile, then the next four cards in the second, and so on.
  }
}