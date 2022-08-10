class Klondike {
  constructor(scene) {
    this.scene = scene
    this.totalCols = 7
    this.cardSpacingX = 15
    this.cardSpacingY = 15
    this.stock = { num: 1, col: 0, row: 0 }
    this.waste = { num: 1, col: 1, row: 0 }
    this.foundation = { num: 4, col: 3, row: 0, build: 'aceUp' }
    this.tableau = { num: 7, col: 0, row: 1, build: 'colorAlt' }
    this.free = null
    this.reserve = null
    this.allowRedeal = true
    this.allowMult = true
    this.allowFoundCheck = true
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
    this.stacksSetup = [[1], [2], [3], [4], [5], [6], [7]];
  }
  deal() {
    //set up tableau
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < this.stacksSetup[col]; row++) {
        var card = d.cards.pop();
        if (row == this.tabSetUp[col]) {
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
    console.log(d.cards.length)
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
    console.log(stock)
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
  redeal() {
    this.scene.drawPile.disableInteractive()
    this.redealCount++
    var length = waste.length
    for (var i = 0; i < length; i++) {
      var card = waste.pop()
      card.place = 'stock'
      card.stack = -1
      var frame = onBack;
      card.setTexture('backs', frame)
      card.displayWidth = card.cardWidth
      card.displayHeight = card.cardHeight
      card.faceDown = true;
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
    //gameData[currentGameNum].wins++;
    //this.saveData();

    alert('win!')
  }
}