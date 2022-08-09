class pauseGame extends Phaser.Scene {
  constructor() {
    super("pauseGame");
  }
  preload() {


  }
  create() {
    this.backBack1 = this.add.image(game.config.width / 2, game.config.height / 2, 'blank').setTint(0x000000);
    this.backBack1.displayWidth = 760;
    this.backBack1.displayHeight = 1110;

    this.backBack2 = this.add.image(game.config.width / 2, game.config.height / 2, 'blank').setTint(0x3e5e71);
    this.backBack2.displayWidth = 750;
    this.backBack2.displayHeight = 1100;

    this.backBack3 = this.add.image(game.config.width / 2, game.config.height / 2, 'blank').setTint(0xadadad);
    this.backBack3.displayWidth = 710;
    this.backBack3.displayHeight = 1060;

    var titleLabel = this.add.bitmapText(game.config.width / 2, 350, 'topaz', games[onGame].name, 75).setOrigin(.5).setTint(0x000000);

    var objectiveLabel = this.add.bitmapText(game.config.width / 2, 450, 'topaz', 'Objective', 40).setOrigin(.5).setTint(0x000000);
    var objective = this.add.bitmapText(game.config.width / 2, 525, 'topaz', games[onGame].objective, 35).setOrigin(.5).setTint(0x000000).setMaxWidth(650);
    var rulesLabel = this.add.bitmapText(game.config.width / 2, 625, 'topaz', 'Rules', 40).setOrigin(.5).setTint(0x000000);
    var rules = this.add.bitmapText(game.config.width / 2, 675, 'topaz', games[onGame].rules, 30).setOrigin(.5, 0).setTint(0x000000).setMaxWidth(650);


    var exit = this.add.image(game.config.width / 2, game.config.height / 2 + 475, 'icons', 2)


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
