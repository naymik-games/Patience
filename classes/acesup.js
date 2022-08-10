class Aces {
  constructor(scene) {
    this.scene = scene
    this.totalCols = 5
    this.cardSpacingX = 15
    this.cardSpacingY = 15
    this.acesHigh = true
    this.stock = { num: 1, col: 4, row: 0 }
    this.waste = { num: 1, col: 4, row: 1 }
    this.foundation = null
    this.tableau = { num: 4, col: 0, row: 0, build: 'no' }
    this.free = null
    this.reserve = null
    this.allowRedeal = false
    this.allowMult = false
    this.moveKingEmpty = false
    this.showFoundationLabel = false
    this.singleClick = true
    this.foundationValue = 1
    this.allowFoundCheck = false
    this.draw = 1
    this.yOffset = 300
    this.redealMax = 200
    this.tableauReveal = 50
    this.redealCount = 0
    this.currentValue = null
    this.tabSetUp = [0, 1, 2, 3, 4, 5, 6];
    this.stacksSetup = [[5], [5], [5], [5], [5], [5], [5]];
  }
  deal() {
    for (var col = 0; col < 4; col++) {

      var card = d.cards.pop();
      var frame = card.index;
      card.faceDown = false
      card.setFrame(frame)
      card.place = 'tableau'
      card.stack = col

      tableau[col].push(card)
      this.scene.children.bringToTop(card)
      var tween = this.scene.tweens.add({
        targets: card,
        x: tabPositions[col].x,
        y: tabPositions[col].y,
        // y: 550 + row * 50,
        duration: 300,
        delay: col * 100
      });


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
        delay: 700,
        onCompleteScope: this,
        onComplete: function () {
          //this.drawStock()
        }
      });

    }
  }
  drawStock() {
    //console.log('draw')


    for (var i = 0; i < 4; i++) {
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
      for (var i = 0; i < 4; i++) {
        if (from.stack != i && tableau[i].length > 0) {
          if (tableau[i][tableau[i].length - 1].suit == from.suit) {
            if (from.value < tableau[i][tableau[i].length - 1].value) {
              var fromStack = from.stack
              var fromPlace = from.place

              if (from.place == 'tableau') {
                tableau[from.stack].pop()
              }

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
              return;
              // this.checkWin()
            } else {
              this.scene.selection = []
            }
          } else {
            this.scene.selection = []
          }
        } else {
          this.scene.selection = []
        }
      }//end for
      for (var i = 0; i < 4; i++) {
        if (from.stack != i && tableau[i].length == 0) {

          tableau[from.stack].pop()
          from.stack = i


          tableau[i].push(from);

          this.scene.children.bringToTop(from)
          // from.setPosition(toCard.x,(toCard.y + 50) + (i * 50))
          var tween = this.scene.tweens.add({
            targets: from,
            x: tabPositions[i].x,
            y: tabPositions[i].y,
            duration: 200,
            onCompleteScope: this.scene,
            onComplete: function () {

            }
          })
          this.scene.selection = []
          return;
        }

      }


    } else {
      this.scene.selection = []
    }




  }//end move sle
}