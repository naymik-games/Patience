class Montecarlo {
  constructor(scene) {
    this.scene = scene
    this.totalCols = 6
    this.numDecks = 1
    this.cardSpacingX = 15
    this.cardSpacingY = 15
    this.stock = { num: 1, col: 0, row: 5 }
    this.waste = null
    this.foundation = { num: 1, col: 3, row: 5, build: 'aceUp' }
    this.tableau = { num: 25, col: 0, row: 0, build: 'no' }
    this.free = null
    this.reserve = null
    this.allowRedeal = false
    this.allowMult = false
    this.moveKingEmpty = false
    this.showFoundationLabel = false
    this.allowFoundCheck = false
    this.singleClick = false
    this.foundationValue = 1
    this.moveKingToFoundation = true
    this.allowDoubleSelection = true
    this.draw = 1
    this.yOffset = 250
    this.redealMax = 200
    this.tableauReveal = 0
    this.redealCount = 0
    this.currentValue = null
    this.tabSetUp = [0, 1, 2, 3, 4, 5, 6];
    this.stacksSetup = [[5], [5], [5], [5], [5], [5], [5]];
  }
  deal() {
    var count = 0
    for (var row = 0; row < 5; row++) {
      for (var col = 0; col < 5; col++) {

        var card = d.cards.pop();

        var frame = card.index;
        card.faceDown = false
        card.setFrame(frame)

        card.place = 'tableau'
        card.stack = count
        card.col = col
        card.slot = row
        tableau[count].push(card)
        this.scene.children.bringToTop(card)
        var tween = this.scene.tweens.add({
          targets: card,
          x: tabPositions[count].x,
          y: tabPositions[count].y,
          // y: 550 + row * 50,
          duration: 300,
          delay: col * 100
        });
        count++
      }
    }
    console.log(tableau)
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
        delay: 1000
      });

    }
  }
  moveSelected(toCard) {
    if (this.scene.selection[0].rank == this.scene.selection[1].rank && this.validPlay()) {

      var fromStack
      var fromPlace
      for (var i = 0; i < this.scene.selection.length; i++) {
        var from = this.scene.selection[i];
        from.clearTint()
        fromStack = from.stack
        fromPlace = from.place
        if (from.place == 'tableau') {
          tableau[from.stack].pop()
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
      this.scene.flipStack(fromStack, fromPlace)
      this.checkWin()
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
    console.log(tableau)
  }
  validPlay() {
    var card1 = this.scene.selection[0]
    var card2 = this.scene.selection[1]
    console.log(card1)
    console.log(card2)
    return (Math.abs(card1.slot - card2.slot) + Math.abs(card1.col - card2.col) == 1) || (Math.abs(card1.slot - card2.slot) == 1 && Math.abs(card1.col - card2.col) == 1);
  }
  moveToFoundation(card) {
    if (card.place == 'tableau') {
      tableau[card.stack].pop();
      card.place = 'foundation'
      this.scene.flipStack(card.stack, 'tableau')
    }
    card.stack = 0
    foundation[0].push(card);
    this.scene.children.bringToTop(card)
    var tween = this.scene.tweens.add({
      targets: card,
      x: foundPositions[0].x,
      y: foundPositions[0].y,
      duration: 200,
      onCompleteScope: this,
      onComplete: function () {

      }
    })
    this.checkWin()
    card.clearTint()
    this.scene.selection = []
  }
  drawStock() {
    //he technically correct order is to "shuffle" by taking the cards on the first pile, putting them on top of the cards from the second pile, then on top of the third, and so on, then taking the top four cards and putting them back in the first pile, then the next four cards in the second, and so on.
    let cardsTemp = []
    /* for (var col = 0; col < 12; col++) {
      cardsTemp.push(...tableau[col]);
    } */
    for (var i = 0; i < 25; i++) {

      if (tableau[i].length > 0) {
        var c = tableau[i].pop()
        cardsTemp.push(c)
      }
    }
    console.log(tableau)
    console.log(cardsTemp)
    var count = 0
    for (var i = 0; i < 25; i++) {


      if (cardsTemp.length > 0) {
        var card = cardsTemp.shift();

        var frame = card.index;
        card.faceDown = false
        card.setFrame(frame)

        card.place = 'tableau'
        card.stack = i
        card.col = Math.floor(i / 5)
        card.slot = i % 5
        tableau[count].push(card)
        this.scene.children.bringToTop(card)
        var tween = this.scene.tweens.add({
          targets: card,
          x: tabPositions[i].x,
          y: tabPositions[i].y,
          // y: 550 + row * 50,
          duration: 300,
          delay: i * 25
        });
        count++
      }

    }
    for (var i = 0; i < 25; i++) {

      if (tableau[i].length == 0 && stock.length > 0) {
        var card = stock.pop();


        //card.setPosition(15 + 184, 350 - 80.5);
        this.scene.children.bringToTop(card)
        card.place = 'tableau';
        card.stack = i
        card.col = Math.floor(i / 5)
        card.slot = i % 5
        tableau[i].push(card);
        card.flip('f');
        var tween = this.scene.tweens.add({
          targets: card,
          x: tabPositions[i].x,
          y: tabPositions[i].y + (tableau[i].length - 1) * this.tableauReveal,
          duration: 300,
          delay: i * 50
        })
      }
    }
    if (stock.length == 0) {
      this.scene.drawPile.setInteractive()
    }
    /* for (var row = 0; row < 5; row++) {
      for (var col = 0; col < 5; col++) {
        if (cardsTemp.length > 0) {
          var card = cardsTemp.shift();

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
            delay: (col + row) * 100
          });
        }

      }
    }
    console.log(tableau) */
  }
  checkWin() {
    console.log('checking win...')
    if (foundation[0].length != 52) {
      return
    }

    this.scene.endGame()
  }
}