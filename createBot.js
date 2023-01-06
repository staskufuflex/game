'use strict';

class CreateBot {
    constructor(name) {
        this.live = new Live(name);
        this.bot = bot(name);
        this.boxBot = document.createElement('div');
        this.boxBot.classList.add('boxbot');
        this.boxBot.classList.add('bot-anim');
        this.boxBot.setAttribute ('id',  name);
        scene.append(this.boxBot);
        this.boxBot.append(this.live);
        this.boxBot.append(this.bot);

        this.offDamageBot = function() {
            this.boxBot.removeEventListener('click', damageBot);
        }

        this.damage = function() {
            this.boxBot.addEventListener('click', damageBot);
        }
    }
}

let countLive;

const damageBot = (event) => {
   if (event.target.tagName !== 'IMG') {
        return;
    } else {
        if (countLive <= 0) {
            clearTimeout(timerId);
            death.play();
            event.target.parentNode.remove();
            setTimeout(() => level.delScene(), 2000);
            setTimeout(() => openNewGame(), 2000);
        } else {
            let blood = new Blood(event.x, event.y);
            setTimeout(() => document.querySelector('.blood').remove(), 400);
            countLive -= Math.floor(Math.random() * 20);
            //lineRed.textContent = `${countLive}hp`;
            event.target.previousSibling.lastChild.style.width = `${countLive}%`;
            event.target.previousSibling.lastChild.style.borderRadius = '10px 0 0 10px';
            if (countLive < 10) {
                lineRed.textContent = '';
            } else {
                lineRed.textContent = `${countLive}hp`;
            }
        }
    }
}

