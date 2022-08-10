class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {


    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image("particle", "assets/particle.png");
    for (var i = 0; i < 125; i++) {
      this.load.image("particle", "assets/particle.png");
    }




    //this.load.image("particle", "assets/sprites/particle.png");
    this.load.bitmapFont('topaz', 'assets/fonts/topaz.png', 'assets/fonts/topaz.xml');
    this.load.spritesheet("icons", "assets/sprites/icons.png", {
      frameWidth: 96,
      frameHeight: 96
    });
    this.load.spritesheet("gems", "assets/sprites/gems.png", {
      frameWidth: 100,
      frameHeight: 100
    });

    this.load.spritesheet("particle_color", "assets/particles.png", {
      frameWidth: 6,
      frameHeight: 6
    });
    this.load.spritesheet("rover", "assets/sprites/rover.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet("cards_modern", "assets/sprites/cards_modern.png", {
      frameWidth: 140,
      frameHeight: 190,
      spacing: 2,
      margin: 2
    });
    this.load.spritesheet("cards_sixty_2", "assets/sprites/cards_sixties_2.png", {
      frameWidth: 178,
      frameHeight: 250,
      spacing: 2,
      margin: 2
    });
    this.load.spritesheet("cards_largeindex", "assets/sprites/cards_largeindex.png", {
      frameWidth: 178,
      frameHeight: 250,
      spacing: 2,
      margin: 2
    });
    this.load.spritesheet("cards_simple", "assets/sprites/cards_simple.png", {
      frameWidth: 206,
      frameHeight: 292,
      spacing: 2,
      margin: 2
    });
    this.load.spritesheet("cards_black_simple", "assets/sprites/cards_black_simple.png", {
      frameWidth: 140,
      frameHeight: 190,
      spacing: 2,
      margin: 2
    });
    this.load.spritesheet("cards_real", "assets/sprites/cards_real.png", {
      frameWidth: 103,
      frameHeight: 138,
      spacing: 10,
      margin: 5
    });
    this.load.spritesheet("backs", "assets/sprites/backs.png", {
      frameWidth: 178,
      frameHeight: 250,
      spacing: 2,
      margin: 0
    });
    this.load.spritesheet("cards_apollo", "assets/sprites/cards_apollo.png", {
      frameWidth: 178,
      frameHeight: 250,
      spacing: 2,
      margin: 2
    });

    this.load.spritesheet("cards_civ", "assets/sprites/cards_civ.png", {
      frameWidth: 225,
      frameHeight: 315,
      spacing: 2,
      margin: 2
    });
    this.load.spritesheet("cards_classic", "assets/sprites/cards_classic.png", {
      frameWidth: 140,
      frameHeight: 190,
      spacing: 2,
      margin: 2
    });
    this.load.image('blank', 'assets/sprites/blank.png');

  }
  create() {
    this.scene.start("startGame");
    //this.scene.start("PlayGame");

  }
}








