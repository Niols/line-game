import io from 'socket.io-client';

import Card from '../helpers/card';
import Dealer from '../helpers/dealer';
import Zone from '../helpers/zone';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('card-back', 'src/assets/card-back.png');
        this.load.image('card-front-p', 'src/assets/card-front-p.png');
        this.load.image('card-front-q', 'src/assets/card-front-q.png');
        this.load.image('card-front-r', 'src/assets/card-front-r.png');
        this.load.image('card-front-not', 'src/assets/card-front-not.png');
        this.load.image('card-front-and', 'src/assets/card-front-and.png');
        this.load.image('card-front-or', 'src/assets/card-front-or.png');
    }

    create() {
        this.playerId = -1;
        this.opponentCards = [];

        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

        let self = this;

        this.dealer = new Dealer(this);

        this.dealText.on('pointerdown', function () {
            self.socket.emit("dealCards");
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
            self.socket.emit('cardPlayed', gameObject);
        })

        this.socket = io('http://localhost:3000');

        this.socket.on('connect', function () {
            console.log('Connected!');
        });

        this.socket.on('welcome', function (playerId) {
            self.playerId = playerId;
        })

        this.socket.on('dealCards', function () {
            self.dealer.dealCards();
            self.dealText.disableInteractive();
        })

        this.socket.on('cardPlayed', function (gameObject, playerId) {
            if (playerId !== self.playerId) {
                let sprite = gameObject.textureKey;
                self.opponentCards.shift().destroy();
                self.dropZone.data.values.cards++;
                let card = new Card(self, 'card-front-p', 'card-back');
                card.render(((self.dropZone.x - 350) + (self.dropZone.data.values.cards * 50)), (self.dropZone.y), true).disableInteractive();
            }
        })
    }

    update() {

    }
}
