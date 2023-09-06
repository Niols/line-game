export default class Card {
  constructor(scene, frontSprite, backSprite) {
    this.frontSprite = frontSprite;
    this.backSprite = backSprite;

    this.render = (x, y, front) => {
      let card = scene.add.image(x, y, front ? frontSprite : backSprite).setScale(0.3, 0.3).setInteractive();
      scene.input.setDraggable(card);
      return card;
    }
  }
}
