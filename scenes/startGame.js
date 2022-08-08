class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  create() {
    /*
      gameSettings = JSON.parse(localStorage.getItem('SDsave'));
      if (gameSettings === null || gameSettings.length <= 0) {
        localStorage.setItem('SDsave', JSON.stringify(defaultValues));
        gameSettings = defaultValues;
      }
    */
    this.cameras.main.setBackgroundColor(0x077837);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'PATIENCE', 150).setOrigin(.5).setTint(0xcbf7ff);

    /*   var startTime = this.add.bitmapText(game.config.width / 2 - 50, 275, 'topaz', 'Play Klondike', 50).setOrigin(0, .5).setTint(0x000000);
      startTime.setInteractive();
      startTime.on('pointerdown', this.clickHandler, this);
   */



    for (var g = 0; g < games.length; g++) {
      //check if the number is even
      if (g % 2 == 0) {
        var x = 50;
        var ty = g
      } else {
        var x = 425;
        var ty = g - 1
      }
      var y = 575 + ty * 50;

      var gameText = this.add.bitmapText(x, y, 'topaz', games[g].name, 60).setOrigin(0, .5).setTint(0xffffff).setInteractive();
      gameText.name = games[g].name
      gameText.num = g;

    }


    this.input.on('gameobjectdown', this.click, this);

  }
  clickHandler() {
    onGame = 1
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
  click(e, obj) {
    console.log(obj.num)
    if (obj.name) {


      onGame = obj.num;
      this.scene.start('playGame');
      this.scene.launch('UI');
    }
  }
}