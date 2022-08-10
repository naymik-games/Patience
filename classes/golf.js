class Golf {
  constructor(scene) {
    this.scene = scene
    this.totalCols = 7
    this.cardSpacingX = 15
    this.cardSpacingY = 15
    this.stock = { num: 1, col: 0, row: 3 }
    this.waste = { num: 1, col: 3, row: 3 }
    this.foundation = null
    this.tableau = { num: 7, col: 0, row: 0, build: 'no' }
    this.free = null
    this.reserve = null
    this.allowRedeal = false
    this.allowMult = false
    this.moveKingEmpty = false
    this.showFoundationLabel = false
    this.singleClick = true
    this.foundationValue = 1
    this.draw = 1
    this.yOffset = 200
    this.redealMax = 200
    this.tableauReveal = 50
    this.redealCount = 0
    this.currentValue = null
    this.tabSetUp = [0, 1, 2, 3, 4, 5, 6];
    this.stacksSetup = [[5], [5], [5], [5], [5], [5], [5]];
  }
  deal() {
    for (var col = 0; col < 7; col++) {
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
        delay: 1500,
        onCompleteScope: this,
        onComplete: function () {

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
      this.currentValue = card.value
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
  moveSelected() {
    var from = this.scene.selection[0];
    if (this.scene.isTopCard(from)) {


      //console.log(this.currentValue)
      if (this.currentValue == 1) {
        var tempminus = 13
        var tempplus = 2
      } else if (this.currentValue == 13) {
        var tempminus = 12
        var tempplus = 1
      } else {
        var tempminus = this.currentValue + 1
        var tempplus = this.currentValue - 1
      }
      // console.log(tempminus)
      // console.log(tempplus)

      if (tempplus == from.value || tempminus == from.value) {
        var fromStack = from.stack
        var fromPlace = from.place
        this.currentValue = from.value
        if (from.place == 'tableau') {
          tableau[from.stack].pop()
        }

        // from.stack = toCard.stack
        from.place = 'waste'

        waste.push(from);

        this.scene.children.bringToTop(from)
        // from.setPosition(toCard.x,(toCard.y + 50) + (i * 50))
        var tween = this.scene.tweens.add({
          targets: from,
          x: wastePosition.x,
          y: wastePosition.y,
          duration: 200,
          onCompleteScope: this.scene,
          onComplete: function () {

          }
        })
        this.scene.selection = []
        this.checkWin()
      } else {
        this.scene.selection = []
      }

    } else {
      this.scene.selection = []
    }




  }
  checkWin() {
    for (var f = 0; f < this.tableau.num; f++) {
      if (tableau[f].length > 0) {
        return
      }
    }
    //gameData[currentGameNum].wins++;
    //this.saveData();

    alert('win!')
    this.scene.scene.start('startGame')
    this.scene.scene.stop('playGame')
    this.scene.scene.stop('UI')

  }

}