class pauseGame extends Phaser.Scene {
  constructor() {
    super("pauseGame");
  }
  preload() {
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI'
    });
    this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

  }

  create() {
    this.backBack1 = this.add.image(game.config.width / 2, game.config.height / 2, 'blank').setTint(0x000000);
    this.backBack1.displayWidth = 800;
    this.backBack1.displayHeight = 1310;

    this.backBack2 = this.add.image(game.config.width / 2, game.config.height / 2, 'blank').setTint(0xcbf7ff);
    this.backBack2.displayWidth = 790;
    this.backBack2.displayHeight = 1300;

    this.backBack3 = this.add.image(game.config.width / 2, game.config.height / 2, 'blank').setTint(0xadadad);
    this.backBack3.displayWidth = 750;
    this.backBack3.displayHeight = 1260;

    var titleLabel = this.add.bitmapText(game.config.width / 2, 250, 'topaz', games[onGame].name, 75).setOrigin(.5).setTint(0x000000);

    var objectiveLabel = this.add.bitmapText(game.config.width / 2, 350, 'topaz', 'Objective', 40).setOrigin(.5).setTint(0x000000);
    var objective = this.add.rexBBCodeText(115, 400, games[onGame].objective, { fontFamily: 'Arial', fontSize: 48, color: '#000000', align: 'left', wrap: { mode: 1, width: 670 } });
    //var objective = this.add.bitmapText(game.config.width / 2, 525, 'topaz', games[onGame].objective, 35).setOrigin(.5).setTint(0x000000).setMaxWidth(650);
    var rulesLabel = this.add.bitmapText(game.config.width / 2, 550, 'topaz', 'Rules', 40).setOrigin(.5).setTint(0x000000);
    //var rules = this.add.bitmapText(game.config.width / 2, 675, 'topaz', games[onGame].rules, 30).setOrigin(.5, 0).setTint(0x000000).setMaxWidth(650);


    var txt = this.add.rexBBCodeText(0, 0, '[b]h[/b]ello', { fontFamily: 'Arial', fontSize: 48, color: '#000000' });
    // var txt = scene.add.rexBBCodeText(x, y, '[b]h[/b]ello', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });



    var textArea = this.rexUI.add.textArea({
      x: 450,
      y: 1000,
      width: 670,
      height: 775,

      //background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),

      text: txt,//this.add.bitmapText(0, 0, 'lato').setFontSize(45).setTint(0x000000),
      /* space: { text: 10 }, */
      /*  slider: {
         track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x260e04),
         thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x7b5e57)
       }, */

    }).


      layout()//.drawBounds(this.add.graphics(), 0x000000);

    textArea.
      setText(games[onGame].rules);//games[onGame].rules

    var exit = this.add.image(750, 250, 'icons', 2)


    //var exit = this.add.bitmapText(game.config.width / 2, game.config.height / 2 + 475, 'atari', 'EXIT', 40).setOrigin(.5).setTint(0x3e5e71);
    exit.setInteractive();
    exit.on('pointerdown', function () {

      // localStorage.setItem('ringTotal', JSON.stringify(this.ringTotal));
      this.scene.stop();
      this.scene.resume('UI');
      this.scene.resume('playGame');
    }, this);
  }

}
