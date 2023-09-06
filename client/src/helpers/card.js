export default class Card {
  constructor(scene, frontSprite) {
    this.frontSprite = frontSprite;

    this.render = (x, y, front) => {
      let card = scene.add.image(x, y, frontSprite).setScale(0.3, 0.3).setInteractive();
      scene.input.setDraggable(card);
      return card;
    }
  }
}
