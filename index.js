const cards = ["c6", "c7", "c8", "c9", "c10", "ca", "cj", "ck", "cq", "d6", "d7", "d8", "d9", "d10", "da", "dj", "dk", "dq", "h6", "h7", "h8", "h9", "h10", "ha", "hj", "hk", "hq", "s6", "s7", "s8", "s9", "s10", "sa", "sj", "sk", "sq"];
const playerCards = [];
const botCards = [];
ps= playerScore();
bs= botScore();
const wins = 0;
const draws = 0;
const loses = 0;
document.getElementById("stand").disabled = true;
const scores = {
    c6: 6,
    d6: 6,
    h6: 6,
    s6: 6,
    c7: 7,
    d7: 7,
    h7: 7,
    s7: 7,
    c8: 8,
    d8: 8,
    h8: 8,
    s8: 8,
    c9: 9,
    d9: 9,
    h9: 9,
    s9: 9,
    c10: 10,
    d10: 10,
    h10: 10,
    s10: 10,
    cq: 3,
    dq: 3,
    hq: 3,
    sq: 3,
    ck: 4,
    dk: 4,
    hk: 4,
    sk: 4,
    cj: 2,
    dj: 2,
    hj: 2,
    sj: 2,
    ca: 11,
    da: 11,
    ha: 11,
    sa: 11,

}
// q: 3
//k=4
//j=2
//a=11

function generateSrc(cardName) {
    return `./assets/images/cards/${cardName}.jpg`;
}

function randomItem() {
    return cards[Math.floor(Math.random() * cards.length)];
}

function onHitClick() {
    document.getElementById("stand").disabled = false;
    const randomcard = randomItem();
    playerCards.push(randomcard);
    const imgSrc = generateSrc(randomcard);
    const image = document.createElement('img');
    image.src = imgSrc;
    image.className = 'card';
    document.getElementById('player-board-container').appendChild(image);
    playerScore();
    if (playerScore() > 21) {
        document.getElementById("hit").disabled = true;
        alert("you lost")
        document.getElementById("stand").disabled = true;
    }
    if (playerScore() === 21) {
        alert("you win")
        document.getElementById("stand").disabled = true;
    }
}

async function onStandClick() {
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("nextRound").disabled = true;
    let ps = playerScore()
    let bs = botScore();
    while (true) {
        bot(scores);
        await sleep(1000);
        if (botScore() > 17) {
            document.getElementById("nextRound").disabled = false;
            break;
        }

    }
    notify(ps,bs);
}
function scoreCounter(item, index) {
    if (index === 1) {
        if (scores[playerCards[0]] === 11 && scores[playerCards[1]] === 11) {
            return 10;
        } else {
            return scores[item];
        }
    } else {
        return scores[item];
    }

}

function nextRound() {
    document.getElementById("hit").disabled = false;
    document.getElementById("stand").disabled = false;
    // scoretable();
    // reset();
}

function playerScore() {
    let sum = 0;
    playerCards.forEach(item => {
        sum += scoreCounter(item);
    })
    document.getElementById('playerScore').innerHTML = sum;
    return sum;
}

function botScore() {
    let sum = 0;
    botCards.forEach((item, index) => {
        sum += scoreCounter(item, index);
    })
    document.getElementById('botScore').innerHTML = sum;
    return sum;
}

function notify(ps,bs) {    
    if (bs > ps) {
        alert("you lost")
    }
    if (bs == ps) {
        alert("draw");
    }
    if (ps > bs) {
        alert("you win");
    }
}


function sleep() {
    return new Promise(resolve => setTimeout(resolve, 3000));
}


function bot() {
    const randomcard = randomItem();
    botCards.push(randomcard);
    const imgSrc = generateSrc(randomcard);
    const image = document.createElement('img');
    image.src = imgSrc;
    image.className = 'card';
    document.getElementById('bot-board-container').appendChild(image);
    // scoreCounter(randomcard);
    // botScore();
    if (botScore() > 21) {
        document.getElementById("hit").disabled = true;
        alert("you win")
    }
    if (botScore() === 21) {
        alert("you lost")
    }
    else {
        notify(ps,bs);
    }

}

// function scoretable() {
//     let ps = playerScore()
//     let bs = botScore();
//     if (ps > bs) {
//          wins++;
//          document.getElementById('win').innerHTML=wins;
//          return wins;
        
//     }
// }

// function reset(){
// playerCards=[];
// botCards=[];
// }


