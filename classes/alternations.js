class Alternations {
  constructor(scene) {
    this.scene = scene
    this.totalCols = 8
    this.numDecks = 2
    this.cardSpacingX = 10
    this.cardSpacingY = 15
    this.stock = { num: 1, col: 7, row: 2 }
    this.waste = { num: 1, col: 7, row: 3 }
    this.foundation = { num: 8, col: 0, row: 0, build: 'aceUp' }
    this.tableau = { num: 7, col: 0, row: 1, build: 'colorAlt' }
    this.validateStack = true
    this.free = null
    this.reserve = null
    this.allowRedeal = false
    this.allowMult = true
    this.allowFoundCheck = true
    this.moveKingEmpty = false
    this.moveToEmpty = true
    this.showFoundationLabel = false
    this.foundationValue = 1
    this.draw = 1
    this.yOffset = 200
    this.redealMax = 1
    this.tableauReveal = 50
    this.redealCount = 0
    this.tabSetUp = [0, 1, 2, 3, 4, 5, 6];
    this.stacksSetup = [[7], [7], [7], [7], [7], [7], [7]];
  }
  deal() {
    //set up tableau
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < this.stacksSetup[col]; row++) {
        var card = d.cards.pop();
        if (row == 0 || row == 2 || row == 4 || row == 6) {
          var frame = card.cardFrame;
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
      card.flip('f');
      var tween = this.scene.tweens.add({
        targets: card,
        x: wastePosition.x + i * 10,
        y: wastePosition.y,
        duration: 300,
        delay: i * 100
      })
      //this.pyramid.push(newStock)
      //this.drawArray.push(newStock);
      //this.drawCount--;

    }
    //console.log(stock.length)
    if (stock.length == 0 && this.redealCount < this.redealMax && this.allowRedeal) {
      this.scene.drawPile.setInteractive()
    }
  }
  moveSelected(toCard) {
    if ((this.scene.selection[0].value + 1 == toCard.value && this.scene.selection[0].color != toCard.color) || toCard.moveEmpty) {

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
      this.checkWin()
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
  moveToFoundation(card, stack) {
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
    card.stack = stack
    foundation[stack].push(card);
    this.scene.children.bringToTop(card)
    var tween = this.scene.tweens.add({
      targets: card,
      x: foundPositions[stack].x,
      y: foundPositions[stack].y,
      duration: 200,
      onCompleteScope: this,
      onComplete: function () {

      }
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
    gameProgress[onGame][1]++
    localStorage.setItem('PatienceProgress', JSON.stringify(gameProgress));
    alert('win!')
  }
}