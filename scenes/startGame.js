class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  create() {

    gameSettings = JSON.parse(localStorage.getItem('Patience'));
    if (gameSettings === null || gameSettings.length <= 0) {
      localStorage.setItem('Patience', JSON.stringify(defaultSettings));
      gameSettings = defaultSettings;
    }
    gameProgress = JSON.parse(localStorage.getItem('PatienceProgress'));
    if (gameProgress === null || gameProgress.length <= 0) {
      localStorage.setItem('PatienceProgress', JSON.stringify(defaultGameProgress));
      gameProgress = defaultGameProgress;
    }
    onDeck = gameSettings.deckNum
    onColor = gameSettings.color
    onBack = gameSettings.back
    this.cameras.main.setBackgroundColor(0x034C22);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'PATIENCE', 150).setOrigin(.5).setTint(0xcbf7ff);

    /*   var startTime = this.add.bitmapText(game.config.width / 2 - 50, 275, 'topaz', 'Play Klondike', 50).setOrigin(0, .5).setTint(0x000000);
      startTime.setInteractive();
      startTime.on('pointerdown', this.clickHandler, this);
   */
    var deckLabel = this.add.bitmapText(200, 250, 'topaz', 'Deck Face', 35).setOrigin(.5).setTint(0xffffff);
    var deck = this.add.image(200, 400, decks[onDeck].key, 12).setInteractive()
    deck.displayWidth = 150
    deck.scaleY = deck.scaleX
    deck.on('pointerdown', function () {
      onDeck++

      if (onDeck == decks.length) {
        onDeck = 0
      }
      deck.setTexture(decks[onDeck].key, 12)
      deck.displayWidth = 150
      deck.scaleY = deck.scaleX
      gameSettings.deckNum = onDeck
      localStorage.setItem('Patience', JSON.stringify(gameSettings));
    }, this)


    var backLabel = this.add.bitmapText(450, 250, 'topaz', 'Deck Back', 35).setOrigin(.5).setTint(0xffffff);
    var deckBack = this.add.image(450, 400, 'backs', onBack).setInteractive()
    deckBack.displayWidth = 150
    deckBack.displayHeight = deck.displayHeight
    deckBack.on('pointerdown', function () {
      onBack++

      if (onBack == 13) {
        onBack = 0
      }
      deckBack.setFrame(onBack)
      gameSettings.back = onBack
      localStorage.setItem('Patience', JSON.stringify(gameSettings));
    }, this)



    var colorLabel = this.add.bitmapText(700, 250, 'topaz', 'Table Color', 35).setOrigin(.5).setTint(0xffffff);
    var backBack = this.add.image(700, 400, 'blank').setTint(0xcbf7ff).setInteractive()
    backBack.displayWidth = 150
    backBack.displayHeight = deck.displayHeight


    var back = this.add.image(700, 400, 'blank').setTint(bgColors[onColor]).setInteractive()
    back.displayWidth = backBack.displayWidth - 20
    back.displayHeight = backBack.displayHeight - 20
    back.on('pointerdown', function () {
      onColor++

      if (onColor == bgColors.length) {
        onColor = 0
      }
      back.setTint(bgColors[onColor])

      gameSettings.color = onColor
      localStorage.setItem('Patience', JSON.stringify(gameSettings));
    }, this)
    var instructions = this.add.bitmapText(450, 540, 'topaz', '(Click to change)', 30).setOrigin(.5).setTint(0xffffff);

    var gameLabel = this.add.bitmapText(game.config.width / 2, 660, 'topaz', 'Pick Your Game', 75).setOrigin(.5).setTint(0xcbf7ff);
    var gameArray = []
    for (var g = 0; g < games.length; g++) {
      //check if the number is even
      if (g % 2 == 0) {
        var x = 50;
        var ty = g
      } else {
        var x = 450;
        var ty = g - 1
      }
      var y = 775 + ty * 50;
      var text = games[g].name + ' (' + gameProgress[g][1] + '/' + gameProgress[g][0] + ')'
      var gameText = this.add.bitmapText(x, y, 'topaz', text, 40).setOrigin(0, .5).setTint(0xffffff).setInteractive();
      gameText.on('pointerup', this.click.bind(this, gameText));
      gameText.name = games[g].name
      gameText.num = g;
      gameArray.push(gameText)
    }

    var resetLabel = this.add.bitmapText(450, 1600, 'topaz', 'Reset Stats', 35).setOrigin(.5).setTint(0xffffff).setInteractive();
    resetLabel.on('pointerdown', function () {
      localStorage.removeItem('PatienceProgress');
      gameProgress = defaultGameProgress
      localStorage.setItem('PatienceProgress', JSON.stringify(gameProgress));
      resetLabel.setText('Stats Reset')
      for (let i = 0; i < gameArray.length; i++) {
        const gameText = gameArray[i];
        var text = games[i].name + ' (' + gameProgress[i][1] + '/' + gameProgress[i][0] + ')'
        gameText.setText(text)
        resetLabel.disableInteractive()
      }
    }, this)
    //this.input.on('gameobjectdown', this.click, this);

  }
  clickHandler() {
    onGame = 1
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
  click(obj) {

    if (obj.name) {
      onGame = obj.num;

      this.scene.start('playGame');
      this.scene.launch('UI');
    }
  }
}