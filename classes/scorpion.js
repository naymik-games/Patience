//potential variations: allow free cell, any card fill empty space

//right now has free cell variation turned on

class Scorpion {
  constructor(scene) {
    this.scene = scene
    this.totalCols = 7
    this.cardSpacingX = 15
    this.cardSpacingY = 15
    this.stock = { num: 1, col: 0, row: 7 }
    this.waste = null
    this.foundation = { num: 4, col: 3, row: 0, build: 'aceUp' }
    this.tableau = { num: 7, col: 0, row: 1, build: 'colorAlt' }
    this.free = { num: 3, col: 0, row: 0, build: 'aceUp' }
    this.reserve = null
    this.allowRedeal = true
    this.allowMult = true
    this.moveKingEmpty = true
    this.moveToEmpty = true
    this.showFoundationLabel = false
    this.foundationValue = 1
    this.allowFoundCheck = false
    this.draw = 3
    this.yOffset = 200
    this.redealMax = 200
    this.tableauReveal = 50
    this.redealCount = 0
    this.tabSetUp = [3, 3, 3, 3, 0, 0, 0];;
    this.stacksSetup = [[7], [7], [7], [7], [7], [7], [7]];
  }
  deal() {

    //set up tableau
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < this.stacksSetup[col]; row++) {
        var card = d.cards.pop();
        if (row >= this.tabSetUp[col]) {
          var frame = card.index;
          card.faceDown = false
          card.setFrame(frame)
        } else {
          var frame = onBack;
          card.setTexture('backs', frame)
          card.displayWidth = card.cardWidth
          card.displayHeight = card.cardHeight
        }

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

    //set up stock
    var length = d.cards.length
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
        delay: 1500
      });

    }
  }
  moveSelected(toCard) {
    if (toCard.place == 'cell' && this.scene.selection.length == 1) {
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
    if ((this.scene.selection[0].value + 1 == toCard.value && this.scene.selection[0].suit == toCard.suit) || this.scene.selection[0].value == 13) {

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
  drawStock() {
    //console.log('draw')


    for (var i = 0; i < 3; i++) {
      var card = stock.pop();

      //card.setPosition(15 + 184, 350 - 80.5);
      this.scene.children.bringToTop(card)
      card.place = 'tableau';
      card.stack = i
      tableau[i].push(card);
      card.flip('f');
      var tween = this.scene.tweens.add({
        targets: card,
        x: tabPositions[i].x,
        y: tabPositions[i].y + (tableau[i].length - 1) * this.tableauReveal,
        duration: 300,
        delay: i * 100
      })

    }
  }
}