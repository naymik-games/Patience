class UI extends Phaser.Scene {

  constructor() {

    super("UI");
  }
  preload() {



  }
  create() {

    this.header = this.add.image(game.config.width / 2, 15, 'blank').setOrigin(.5, 0).setTint(0xaab5af);
    this.header.displayWidth = 870;
    this.header.displayHeight = 100;


    this.score = 0;
    this.titleText = this.add.bitmapText(30, 60, 'topaz', games[onGame].name, 60).setOrigin(0, .5).setTint(0x1b332d).setAlpha(1);

    this.resetIcon = this.add.image(560, 65, 'icons', 1).setInteractive().setTint(0x1b332d).setScale(.8);
    this.resetIcon.on('pointerdown', function () {
      this.scene.start('playGame')
      this.scene.start()

    }, this);

    this.settingIcon = this.add.image(680, 65, 'icons', 4).setInteractive().setTint(0x1b332d).setScale(.8);
    this.settingIcon.on('pointerdown', function () {
      this.scene.launch('pauseGame');
      this.scene.pause('playGame');
      this.scene.pause('UI');
    }, this);



    this.homeIcon = this.add.image(800, 65, 'icons', 3).setInteractive().setTint(0x1b332d).setScale(.8);
    this.homeIcon.on('pointerdown', function () {
      this.scene.start('startGame');
      this.scene.stop('playGame');
      this.scene.stop('UI')
    }, this)

    /* this.restartText = this.add.bitmapText(870, 60, 'topaz', 'Refresh', 60).setOrigin(1, .5).setTint(0x365544).setAlpha(1).setInteractive();
    this.restartText.on('pointerdown', function () {
      this.scene.start('playGame')
      this.scene.start()

    }, this) */


    var Main = this.scene.get('playGame');
    Main.events.on('score', function () {

      this.score += 1;
      //console.log('dots ' + string)
      this.scoreText.setText(this.score)
    }, this);



  }

  update() {

  }



}