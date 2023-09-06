import Card from './card';

export default class Dealer {
  constructor(scene) {
    this.dealCards = () => {
      for (let i = 0; i < 5; i++) {
        let playerCard = new Card(scene, 'card-front-p', 'card-back');
        playerCard.render(475 + (i * 100), 650, true);

        let opponentCard = new Card(scene, 'card-front-p', 'card-back');
        scene.opponentCards.push(opponentCard.render(475 + (i * 100), 125, false).disableInteractive());
      }
    }
  }
}
