class Canfield {
  constructor(scene) {
    this.scene = scene
    this.totalCols = 6
    this.cardSpacingX = 15
    this.cardSpacingY = 15
    this.stock = { num: 1, col: 0, row: 2 }
    this.waste = { num: 1, col: 0, row: 1 }
    this.foundation = { num: 4, col: 2, row: 0, build: 'randomup' }
    this.tableau = { num: 4, col: 2, row: 1, build: 'colorAlt' }
    this.free = null
    this.reserve = { num: 1, col: 0, row: 0 }
    this.allowRedeal = true
    this.allowMult = true
    this.moveKingEmpty = false
    this.showFoundationLabel = true
    this.foundationValue = null
    this.draw = 3
    this.yOffset = 250
    this.redealMax = 400
    this.tableauReveal = 50
    this.redealCount = 0
    this.tabSetUp = [0, 1, 2, 3, 4, 5, 6];
    this.stacksSetup = [[1], [6], [7], [8], [9], [10], [11]];
  }
  deal() {
    //set up reserve
    for (var i = 0; i < 13; i++) {
      var card = d.cards.pop();
      card.place = 'reserve'
      card.stack = 0
      reserve.push(card)

      if (i == 12) {
        card.setFrame(card.index)
        card.faceDown = false
      } else {
        var frame = onBack;
        card.setTexture('backs', frame)
        card.displayWidth = card.cardWidth
        card.displayHeight = card.cardHeight
      }

      this.scene.children.bringToTop(card)
      var tween = this.scene.tweens.add({
        targets: card,
        x: reservePosition.x,
        y: reservePosition.y,
        // y: 550 + row * 50,
        duration: 300,
        delay: i * 50
      });

    }
    //set up foundation
    var card = d.cards.pop();
    var frame = card.index;
    card.faceDown = false
    card.setFrame(frame)
    card.place = 'foundation'
    card.stack = card.suitNum
    this.foundationValue = card.value
    foundation[card.suitNum].push(card);
    this.scene.children.bringToTop(card)
    var tween = this.scene.tweens.add({
      targets: card,
      x: foundPositions[card.suitNum].x,
      y: foundPositions[card.suitNum].y,
      // y: 550 + row * 50,
      duration: 300,
      delay: 1000
    });


    // set rank Text
    this.scene.rTextC.setText(card.rankShort);
    this.scene.rTextD.setText(card.rankShort);
    this.scene.rTextH.setText(card.rankShort);
    this.scene.rTextS.setText(card.rankShort);



    //set up tableau
    for (var col = 0; col < this.tableau.num; col++) {
      for (var row = 0; row < 1; row++) {
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
          delay: 1500 + ((col + row) * 100)
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
      var frame = onBack;
      card.setTexture('backs', frame)
      card.displayWidth = card.cardWidth
      card.displayHeight = card.cardHeight
      card.faceDown = true;
      card.place = 'stock'
      card.stack = -1
      stock.push(card)
      //card.flip('b')

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
      this.scene.flipStack(fromStack, fromPlace)
      return
    }
    //if ((this.scene.selection[0].value + 1 == toCard.value && this.scene.selection[0].color != toCard.color) || toCard.moveEmpty) {

    if (this.checkSequence(this.scene.selection[0], toCard) || toCard.moveEmpty) {

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
        } else if (from.place == 'reserve') {
          reserve.pop()
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
  checkSequence(from, to) {
    if (from.value + 1 == to.value && from.color != to.color) {
      return true
    }
    if (to.value == 1 && from.value == 13 && from.color != to.color) {
      return true
    }
    return false

  }
  moveToFoundation(card) {
    if (card.place == 'tableau') {
      tableau[card.stack].pop();
      card.place = 'foundation'
      this.scene.flipStack(card.stack, 'tableau')
    } else if (card.place == 'waste') {
      waste.pop();
      card.place = 'foundation'
    } else if (card.place == 'reserve') {
      reserve.pop();
      card.place = 'foundation'
      this.scene.flipStack(card.stack, 'reserve')
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