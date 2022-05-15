let deck = []; //creating deck of card
const run = (players, playerCardsObj, playerNames) => {
    const suits = ['♢', '♣', '♡', '♠'];
    const cardValue = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const cardValueStraight = [...cardValue];
    cardValueStraight.splice(0, 0, 'A'); //declare new array to check for straights as "A" loops back
    straightArr = [];
    for (let i = 0; i < 10; i++) {
        straightArr.push(cardValueStraight.slice(i, i + 5));
    }

    // const deck = []; //creating deck of card
    for (let Suits of suits) {
        for (let CardValue of cardValue) {
            deck.push(CardValue + ' ' + Suits);
        }
    }

    const shuffler = () => {
        //function to shuffle deck
        for (let i = 0; i < deck.length; i++) {
            tempPos = deck[i];
            index = Math.floor(Math.random() * 52);
            deck[i] = deck[index];
            deck[index] = tempPos;
        }
        return deck;
    };

    const numPlayers = players; //require player input to how many players are there
    const setup = () => {
        //return object of players' cards and community cards
        shuffler();
        const communityCards = [];
        for (let j = numPlayers * 2; j < numPlayers * 2 + 5; j++) {
            communityCards.push(deck[j]);
        }

        for (let i = 1; i <= playerNames.length; i++) {
            const playerName = playerNames[i - 1];
            playerCardsObj[playerName] = [deck[2 * i - 2], deck[2 * i - 1]];
            for (let card of communityCards) {
                playerCardsObj[playerName].push(card);
            }
        }

        playerCardsObj['Community Cards'] = communityCards;

        return playerCardsObj;
    };
    playerCardsObj = setup();

    const cardManipulate = () => {
        const suits = ['♢', '♣', '♡', '♠'];
        playerCardsObj['Community Cards'] = ['9 ♡', '9 ♠', '9 ♣', '2 ♢', 'Q ♢'];
        playerCardsObj['Player 1'] = ['4  ♢', '2 ♠', '9 ♡', '9 ♠', '9 ♣', '2 ♢', 'Q ♢'];
        playerCardsObj['Player 2'] = ['4  ♡', 'Q ♡', '9 ♡', '9 ♠', '9 ♣', '2 ♢', 'Q ♢'];
    };
    // cardManipulate();

    const arrNum = {};
    const arrSuits = {};
    const cardObj = { Num: arrNum, Suits: arrSuits };
    for (const [key, value] of Object.entries(playerCardsObj)) {
        //splitting cards to compare
        // $('.card').append($('<h3>').attr('id', `${key}showCards`));
        // $('.showCommunityCard').after($('<h3>').attr('id', `${key}showCards`));
        if (key === 'Community Cards') {
            $('.showCommunityCard').text(`${key}: ${value}`);
        } else {
            // $(`[id="${key}showCards"]`).text(`${key}: ${value.slice(0, 2)}`);
        }
        arrNum[key] = [];
        arrSuits[key] = [];
        for (card of playerCardsObj[key]) {
            arrNum[key].push(card.split(' ')[0]);
            arrSuits[key].push(card.split(' ')[1]);
        }
    }

    for (const [key, value] of Object.entries(cardObj.Num)) {
        //create obj of combination of cards and update playerCardsObj
        if (key !== 'Community Cards') {
            playerCardsObj[key].cardCombinations = {};

            for (let i = 0; i < 7; i++) {
                if (!Object.keys(playerCardsObj[key].cardCombinations).includes(cardObj.Num[key][i])) {
                    playerCardsObj[key].cardCombinations[cardObj.Num[key][i]] = 1;
                } else {
                    playerCardsObj[key].cardCombinations[cardObj.Num[key][i]] += 1;
                }
            }
            playerCardsObj[key].sortedHand = {}; //update combi of cards of player with respect to strength in sortedHand
            for (const [key2, value] of Object.entries(playerCardsObj[key].cardCombinations)) {
                for (let i = 0; i < cardValue.length; i++) {
                    if (key2 === cardValue[i]) {
                        playerCardsObj[key].sortedHand[i + 2] = playerCardsObj[key].cardCombinations[key2];
                    }
                }
            }
        }
    }

    const checkFlush = () => {
        const pushFlush = (key) => {
            const flushArr = [];
            for (let i in cardObj.Suits[key]) {
                let value = 0;
                if (cardObj.Suits[key][i] === playerCardsObj[key].isFlush[1]) {
                    if (cardObj.Num[key][i] === 'J' || cardObj.Num[key][i] === 'Q' || cardObj.Num[key][i] === 'K' || cardObj.Num[key][i] === 'A') {
                        switch (cardObj.Num[key][i]) {
                            case 'J':
                                value = '11';
                                break;
                            case 'Q':
                                value = '12';
                                break;
                            case 'K':
                                value = '13';
                                break;
                            case 'A':
                                value = '14';
                                break;
                        }
                    } else {
                        value = cardObj.Num[key][i];
                    }

                    flushArr.push(parseInt(value));
                }
            }
            flushArr.sort((a, b) => a - b);
            if (flushArr.length == 6) {
                flushArr.splice(0, 1);
            } else if (flushArr.length == 7) {
                flushArr.splice(0, 2);
            }
            playerCardsObj[key].isFlush.push(flushArr);
        };

        for (const [key] of Object.entries(cardObj.Suits)) {
            if (key !== 'Community Cards') {
                //check if there's a flush and update playerCardsObj
                let countDiamond = 0;
                let countClub = 0;
                let countHeart = 0;
                let countSpade = 0;
                playerCardsObj[key].isFlush = [false];

                for (let i in cardObj.Suits[key]) {
                    switch (cardObj.Suits[key][i]) {
                        case '♢':
                            countDiamond++;
                            if (countDiamond >= 5) {
                                playerCardsObj[key].isFlush = [true];
                                playerCardsObj[key].isFlush[1] = '♢';
                            }
                            break;
                        case '♣':
                            countClub++;
                            if (countClub >= 5) {
                                playerCardsObj[key].isFlush = [true];
                                playerCardsObj[key].isFlush[1] = '♣';
                            }
                            break;
                        case '♡':
                            countHeart++;
                            if (countHeart >= 5) {
                                playerCardsObj[key].isFlush = [true];
                                playerCardsObj[key].isFlush[1] = '♡';
                            }
                            break;
                        case '♠':
                            countSpade++;
                            if (countSpade >= 5) {
                                playerCardsObj[key].isFlush = [true];
                                playerCardsObj[key].isFlush[1] = '♠';
                            }
                            break;
                    }
                }

                if (playerCardsObj[key].isFlush[0]) {
                    pushFlush(key);
                }
            }
        }
    };
    checkFlush();

    for (const [key] of Object.entries(cardObj.Num)) {
        //check if there's a straight and update playerCardsObj
        playerCardsObj[key].isStraight = [false];

        for (let Arr of straightArr) {
            let counter = 0;
            for (let num of Arr) {
                if (cardObj.Num[key].includes(num)) {
                    counter++;
                    switch (num) {
                        case 'J':
                            num = 11;
                            break;
                        case 'Q':
                            num = 12;
                            break;
                        case 'K':
                            num = 13;
                            break;
                        case 'A':
                            num = 14;
                            break;
                    }
                    if (counter === 5) {
                        playerCardsObj[key].isStraight[0] = true;
                        playerCardsObj[key].isStraight[1] = num;
                    }
                }
            }
        }
    }

    const pairTripsQuads = () => {
        for (const [key, value] of Object.entries(playerCardsObj)) {
            if (key !== 'Community Cards') {
                playerCardsObj[key].statements = [];
                // console.log(key, value);

                for (const [key1, value1] of Object.entries(playerCardsObj[key].sortedHand)) {
                    // console.log(key1, value1);
                    switch (value1) {
                        case 2:
                            playerCardsObj[key].statements.push('onePair');
                            break;
                        case 3:
                            playerCardsObj[key].statements.push('trips');
                            break;
                        case 4:
                            playerCardsObj[key].statements.push('quads');
                            break;
                    }
                }

                const dir = playerCardsObj[key].statements;
                let check = false;
                const checkDups = () => {
                    let counter = 0;
                    for (const i in dir) {
                        if (dir[i] === 'onePair') {
                            counter++;
                        }
                    }
                    if (counter >= 2) {
                        playerCardsObj[key].statements.push('dups');

                        check = true;
                        return check;
                    }
                };
                checkDups();

                if (dir.includes('trips') && dir.includes('onePair')) {
                    playerCardsObj[key].statements.push('fullHouse');
                }
            }
        }
    };

    pairTripsQuads();
};

const result = (onlyWinner) => {
    const cardRanking = {
        highCard: 1,
        onePair: 2,
        dups: 3,
        trips: 4,
        straight: 5,
        flush: 6,
        fullHouse: 7,
        quads: 8,
        straightflush: 9
    };

    let bestHandIndex = 0;
    let bestPlayer = 0;
    for (let [key] of Object.entries(playerCardsObj)) {
        //final hand of player
        if (key !== 'Community Cards') {
            if (playerCardsObj[key].statements.includes('quads')) {
                playerCardsObj[key].hand = 'quads';
                playerCardsObj[key].power = cardRanking.quads;
                // console.log(`${key} have quads`);
            } else if (playerCardsObj[key].statements.includes('fullHouse')) {
                playerCardsObj[key].hand = 'fullHouse';
                playerCardsObj[key].power = cardRanking.fullHouse;
                // console.log(`${key} have full house`);
            } else if (playerCardsObj[key].isFlush[0]) {
                playerCardsObj[key].hand = 'flush';
                playerCardsObj[key].power = cardRanking.flush;
                // console.log(`${key} has a ${playerCardsObj[key].isFlush[1]} flush!`);
            } else if (playerCardsObj[key].isStraight[0]) {
                playerCardsObj[key].hand = 'straight';
                playerCardsObj[key].power = cardRanking.straight;
                // console.log(
                // `${key} has a ${playerCardsObj[key].isStraight[1]} high straight!`
                // );
            } else if (playerCardsObj[key].statements.includes('trips')) {
                playerCardsObj[key].hand = 'trips';
                playerCardsObj[key].power = cardRanking.trips;
                // console.log(`${key} have trips`);
            } else if (playerCardsObj[key].statements.includes('dups')) {
                playerCardsObj[key].hand = 'dups';
                playerCardsObj[key].power = cardRanking.dups;
                // console.log(`${key} have dups`);
            } else if (playerCardsObj[key].statements.includes('onePair')) {
                playerCardsObj[key].hand = 'onePair';
                playerCardsObj[key].power = cardRanking.onePair;
                // console.log(`${key} have only 1 pair`);
            } else {
                playerCardsObj[key].hand = 'highCard';
                playerCardsObj[key].power = cardRanking.highCard;
                // console.log(`${key} only have a high card,lame`);
            }

            if (playerCardsObj[key].power > bestHandIndex) {
                bestHandIndex = playerCardsObj[key].power;
                bestPlayer = key;
            }
        }
    }

    // let bestHandIndex = data[0]
    // let bestPlayer = data[1]
    // console.log(playerCardsObj);
    const checkTopRepeats = (num) => {
        let maxSameNumCards = { value: 0, player: [] };
        let counter = 1;

        // console.log(conflictInfo);

        let highestKey = {};
        for (let playerKey of conflictInfo) {
            const playerDups = playerCardsObj[playerKey].sortedHand;
            const reversedKeys = Object.keys(playerDups).reverse();
            for (let key of reversedKeys) {
                if (playerDups[key] === num) {
                    highestKey[playerKey] = parseInt(key);
                    delete playerDups[key];
                    break;
                }
            }

            if (maxSameNumCards.value === highestKey[playerKey]) {
                counter++;
            } else if (maxSameNumCards.value < highestKey[playerKey]) {
                maxSameNumCards.value = highestKey[playerKey];
                maxSameNumCards.player = playerKey;
            }
        }

        let index = [];
        for (let i = 0; i < conflictInfo.length; i++) {
            if (highestKey[conflictInfo[i]] !== maxSameNumCards.value) {
                index.push(conflictInfo[i]);
            }
        }

        for (let player in conflictInfo) {
            for (let rejectedPlayer of index) {
                if (conflictInfo[player] === rejectedPlayer) {
                    conflictInfo.splice(player, 1);
                }
            }
        }

        // console.log(highestKey);
        console.log(maxSameNumCards, counter);
        return [maxSameNumCards, counter];
    };

    function highCardDecon() {
        let winner = 'draw';
        const checkHighCard = checkTopRepeats(1);
        if (checkHighCard[1] === 1) {
            winner = checkHighCard[0].player;
        } else {
            const checkSecondHighCard = checkTopRepeats(1);
            if (checkSecondHighCard[1] === 1) {
                winner = checkSecondHighCard[0].player;
            } else {
                const checkThirdHighCard = checkTopRepeats(1);
                if (checkThirdHighCard[1] === 1) {
                    winner = checkThirdHighCard[0].player;
                } else {
                    const checkFourthHighCard = checkTopRepeats(1);
                    if (checkFourthHighCard[1] === 1) {
                        winner = checkFourthHighCard[0].player;
                    } else {
                        const checkFifthHighCard = checkTopRepeats(1);
                        if (checkFifthHighCard[1] === 1) {
                            winner = checkFifthdHighCard[0].player;
                        }
                    }
                }
            }
        }

        if (winner === 'draw') {
            console.log(`Players have high cards. Its a draw`);
            $('h3.result').text(`Players have high cards. Its a draw`);
        } else {
            console.log(`Players have high cards. Winner is ${winner}`);
            $('h3.result').text(`Players have high cards. Winner is ${winner}`);
            return winner;
        }
    }

    function onePairDecon() {
        let winner = 'draw';

        const checkFirstPair = checkTopRepeats(2);
        if (checkFirstPair[1] === 1) {
            winner = checkFirstPair[0].player;
        } else {
            const checkHighCard = checkTopRepeats(1);
            if (checkHighCard[1] === 1) {
                winner = checkHighCard[0].player;
            } else {
                const checkSecondHighCard = checkTopRepeats(1);
                if (checkSecondHighCard[1] === 1) {
                    winner = checkSecondHighCard[0].player;
                } else {
                    const checkThirdHighCard = checkTopRepeats(1);
                    if (checkThirdHighCard[1] === 1) {
                        winner = checkThirdHighCard[0].player;
                    }
                }
            }
        }

        if (winner === 'draw') {
            console.log(`Players have a pair. Its a draw`);
            $('h3.result').text(`Players have a pair. Its a draw`);
        } else {
            console.log(`Players have a pair. Winner is ${winner}`);
            $('h3.result').text(`Players have a pair. Winner is ${winner}`);
            return winner;
        }
    }

    function dupsDecon() {
        let winner = 'draw';

        const checkFirstPair = checkTopRepeats(2);
        if (checkFirstPair[1] === 1) {
            winner = checkFirstPair[0].player;
        } else {
            const checkSecondPair = checkTopRepeats(2);
            if (checkSecondPair[1] === 1) {
                winner = checkSecondPair[0].player;
            } else {
                const checkKicker = checkTopRepeats(1);
                if (checkKicker[1] === 1) {
                    winner = checkKicker[0].player;
                }
            }
        }

        if (winner === 'draw') {
            console.log(`Players have dups. Its a draw`);
            $('h3.result').text(`Players have dups. Its a draw`);
        } else {
            console.log(`Players have dups. Winner is ${winner}`);
            $('h3.result').text(`Players have dups. Winner is ${winner}`);
            return winner;
        }
    }

    function tripsDecon() {
        let winner = 'draw';
        const tripObj = {};
        let maxTrip = [0, -1];
        for (let key of conflictInfo) {
            const playerTrip = playerCardsObj[key].sortedHand;
            tripObj[key] = Object.keys(playerTrip).find((key) => playerTrip[key] === 3);
            if (maxTrip[0] < tripObj[key]) {
                maxTrip[0] = tripObj[key];
                maxTrip[1] = key;
            }
        }
        let counter = 0;
        for (let i = 0; i < conflictInfo.length; i++) {
            if (tripObj[conflictInfo[i]] === maxTrip[0]) {
                counter++;
            }
        }

        if (counter > 1) {
            tripsDecon2();
        } else {
            winner = conflictInfo[maxTrip[0] - 1];
        }

        function tripsDecon2() {
            const tripArr = [];
            for (let key of conflictInfo) {
                const sortedHandTrips = playerCardsObj[key].sortedHand;
                delete sortedHandTrips[maxTrip[0]];
                tripArr.push(Object.keys(sortedHandTrips));
            }
            for (let i = 3; i >= 0; i--) {
                if (parseInt(tripArr[0][i]) > parseInt(tripArr[1][i])) {
                    winner = conflictInfo[0];
                    break;
                } else if (parseInt(tripArr[1][i]) > parseInt(tripArr[0][i])) {
                    winner = conflictInfo[1];
                    break;
                }
            }
        }

        if (winner === 'draw') {
            console.log(`Players have trips. Its a draw`);
            $('h3.result').text(`Players have trips. Its a draw`);
        } else {
            console.log(`Players have trips. Winner is ${winner}`);
            $('h3.result').text(`Players have trips. Winner is ${winner}`);
            return winner;
        }
    }

    function straightDecon() {
        let winner = 'draw';
        let bestStraight = { value: 0, player: [] };
        for (let player of conflictInfo) {
            const hand = parseInt(playerCardsObj[player].isStraight[1]);
            if (hand > bestStraight.value) {
                bestStraight.value = hand;
            }
        }

        for (let player of conflictInfo) {
            const hand = parseInt(playerCardsObj[player].isStraight[1]);
            if (hand === bestStraight.value) {
                bestStraight.player.push(player);
            }
        }

        if (bestStraight.player.length > 1) {
            console.log(`${bestStraight.player} draw`);
        } else {
            winner = bestStraight.player[0];
        }

        if (winner === 'draw') {
            console.log(`Players have straight. Its a draw`);
            $('h3.result').text(`Players have straight. Its a draw`);
        } else {
            console.log(`Players have straight. Winner is ${winner}`);
            $('h3.result').text(`Players have straight. Winner is ${winner}`);
            return winner;
        }
    }

    function flushDecon() {
        const flushArrCompare = [];
        let winner = 'draw';
        for (let i = 4; i >= 0; i--) {
            for (let j = 0; j < conflictInfo.length; j++) {
                flushArrCompare[j] = playerCardsObj[conflictInfo[j]].isFlush[2][i];
            }
            console.log(flushArrCompare);
            let maxNum = [0, -1];
            for (let j = 0; j < flushArrCompare.length; j++) {
                for (let n = j + 1; n < flushArrCompare.length; n++) {
                    if (flushArrCompare[j] !== flushArrCompare[n]) {
                        if (flushArrCompare[n] > maxNum[0]) {
                            maxNum[0] = flushArrCompare[n];
                            maxNum[1] = n;
                        }
                    }
                }
            }
            if (maxNum[1] !== -1) {
                winner = conflictInfo[maxNum[1]];
                break;
            }
        }

        if (winner === 'draw') {
            console.log(`Players have flush. Its a draw`);
            $('h3.result').text(`Players have flush. Its a draw`);
        } else {
            console.log(`Players have flush. Winner is ${winner}`);
            $('h3.result').text(`Players have flush. Winner is ${winner}`);
            return winner;
        }
    }

    function fullHouseDecon() {
        let winner = 'draw';
        const checkTrips = checkTopRepeats(3);
        if (checkTrips[1] === 1) {
            winner = checkTrips[0].player;
        } else {
            const checkPairs = checkTopRepeats(2);
            if (checkPairs[1] === 1) {
                winner = checkPairs[0].player;
            }
        }

        if (winner === 'draw') {
            console.log(`Players have full house. Its a draw`);
            $('h3.result').text(`Players have full house. Its a draw`);
        } else {
            console.log(`Players have full house. Winner is ${winner}`);
            $('h3.result').text(`Players have full house. Winner is ${winner}`);
            return winner;
        }
    }

    function quadsDecon() {
        const quadObj = {};
        for (let key of conflictInfo) {
            const hand = playerCardsObj[key].sortedHand;
            quadObj[key] = Object.keys(hand).find((key) => hand[key] === 4);
        }
        let quadChecker = [0, 0];
        for (let [key, value] of Object.entries(quadObj)) {
            if (value > quadChecker[0]) {
                quadChecker[0] = value;
                quadChecker[1] = key;
            }
        }
        const winner = quadChecker[1];
        console.log(`Players have quads. Winner is ${winner}`);
        $('h3.result').text(`Players have quads. Winner is ${winner}`);
        return winner;
    }

    const decider = (bestHandIndex, bestPlayer) => {
        //declare winner
        let counter = 0;
        let conflictKeys = [];
        for (let key of Object.keys(playerCardsObj)) {
            if (playerCardsObj[key].power === bestHandIndex) {
                counter++;
                conflictKeys.push(key);
            }
        }
        if (counter > 1) {
            console.log(`${conflictKeys} have the same hands`);
            return conflictKeys;
        } else if (onlyWinner) {
            // console.log(`${bestPlayer} wins!`);
            console.log(playerCardsObj);
            $('h3.result').text(`${bestPlayer} won!`).css('background', 'white').css('font-size', '0.9em');
            $('.showStackSize').css('display', 'flex');
            app.playerStats[bestPlayer].stack += app.pot;
            $(`[id="${bestPlayer}stack"]`).text(`${bestPlayer}: $${app.playerStats[bestPlayer].stack}`);
        } else if (counter === 1) {
            // console.log(`${bestPlayer} wins!`);
            // console.log(playerCardsObj);
            $('h3.result')
                .text(`${bestPlayer} wins with a ${Object.keys(cardRanking).find((key) => cardRanking[key] === bestHandIndex)}`)
                .css('background', 'white')
                .css('font-size', '0.9em');
            $('.showStackSize').css('display', 'flex');
            app.playerStats[bestPlayer].stack += app.pot;
            $(`[id="${bestPlayer}stack"]`).text(`${bestPlayer}: $${app.playerStats[bestPlayer].stack}`);
        }
    };

    const printWinner = (winner) => {
        if (winner != undefined && winner !== 'draw') {
            console.log(playerCardsObj);
            // $('h3.result').text(`${winner} won!`);
            $('.showStackSize').css('display', 'flex');
            app.playerStats[winner].stack += app.pot;
            $(`[id="${winner}stack"]`).text(`${winner}: $${app.playerStats[winner].stack}`);
        } else {
            console.log(playerCardsObj);
            $('h3.result').text(`It's a draw!`);
            $('.showStackSize').css('display', 'flex');
            // $(`[id="${player}stack"]`).text(`${player}: $${app.playerStats[winner].stack}`);
        }
    };

    const gameEndActions = () => {
        let drawArr = [];
        if (conflictInfo) {
            switch (bestHandIndex) {
                case 1:
                    printWinner(highCardDecon());
                    break;
                case 2:
                    printWinner(onePairDecon());
                    break;
                case 3:
                    printWinner(dupsDecon());
                    break;
                case 4:
                    printWinner(tripsDecon());
                    break;
                case 5:
                    printWinner(straightDecon());
                    break;
                case 6:
                    printWinner(flushDecon());
                    break;
                case 7:
                    printWinner(fullHouseDecon());
                    break;
                case 8:
                    printWinner(quadsDecon());
                    break;
                default:
                    alert('Wh0t mate');
            }

            // console.log(drawArr)
        }
        $('div.playerPages').hide('slow');
        // console.log(playerCardsObj);
        for (let variableKey in playerCardsObj) {
            if (playerCardsObj.hasOwnProperty(variableKey)) {
                delete playerCardsObj[variableKey];
            }
        }

        if (!onlyWinner) {
            setTimeout(() => {
                $('.card').slideDown();
            }, 500);
        }

        setTimeout(() => {
            $('.result').slideDown();
        }, 500);
    };

    const simplifyObj = () => {
        for (let [key] of Object.entries(playerCardsObj)) {
            for (let [key2] of Object.entries(playerCardsObj[key])) {
                if (key2 === '0' || key2 === '1' || key2 === '2' || key2 === '3' || key2 === '4' || key2 === '5' || key2 === '6') {
                    continue;
                }
                delete playerCardsObj[key][key2];
            }
        }
    };

    const conflictInfo = decider(bestHandIndex, bestPlayer);
    gameEndActions();
    simplifyObj();
};

/////////////////////////////////////////DOM below/////////////////////////////////////////

$('.click-to-start').mouseenter(() => {
    $('.click-to-start').css('color', 'white');
});

$('.click-to-start').mouseleave(() => {
    $('.click-to-start').css('color', 'black');
});

$('.click-to-start').on('click', (e) => {
    $('#startpage').fadeOut('fast');
    setTimeout(() => {
        $('#settingPage').fadeIn();
    }, 500);
});

const app = {};

const addPlayers = () => {
    $('#submitButton').hide();
    app.numOfPlayers = parseInt($('#numOfPlayers').val());
    const $playerForm = $('form.playerDetails');
    for (let i = 1; i <= app.numOfPlayers; i++) {
        const $player = $('<label>').attr('for', 'numOfPlayers').text(`Player ${i} Name: `);
        const $playerInput = $('<input>').attr('type', 'text').attr('id', `player${i}Name`).addClass('playerInput').attr('placeholder', `Player ${i}`);
        $playerForm.append($player).append($playerInput).append('&nbsp;');
        const $buyIn = $('<label>').attr('for', 'buyInAmt').text('   Buy In Amount: $ ');
        const $buyInInput = $('<input>')
            .attr('type', 'text')
            .attr('id', `player${i}BuyIn`)
            .attr('placeholder', `${100 * $('#blindValue').val()}`);
        $playerForm.append($buyIn).append($buyInInput).append($('<br>')).append($('<br>'));
    }

    $('#putOnYourPokerFace').show();
};

let blinds = 0;
$('#submitButton').on(
    'click',
    (repeatFuncBlinds = () => {
        let value = parseInt($('#blindValue').val());
        app.blindSize = value;
        if (value && value <= 1000 && value >= 1) {
            blinds = $('#blindValue').val();
        } else {
            alert('Please enter the fields correctly');
            $('#blindValue').val('');
            repeatFuncBlinds();
        }
        addPlayers();
    })
);

app.players = [];
app.playersStash = [];
app.pot = 0;
const storeInitialData = () => {
    for (let i = 1; i <= app.numOfPlayers; i++) {
        if ($(`#player${i}Name`).val() === '') {
            app.players.push($(`#player${i}Name`).attr('placeholder'));
        } else {
            app.players.push($(`#player${i}Name`).val());
        }

        if ($(`#player${i}BuyIn`).val() === '') {
            app.playersStash.push($(`#player${i}BuyIn`).attr('placeholder'));
        } else {
            app.playersStash.push($(`#player${i}BuyIn`).val());
        }
    }
};

const createPlayerPage = (player) => {
    $wrapper = $('<div>').attr('id', `${player}Page`).addClass('playerPages').hide();
    $wrapper.append($('<h1>').addClass('playersPage'));
    $wrapper.append($('<p>').addClass('playersPage').text(gameSequence[0]));
    $wrapper.append($('<div>').attr('id', `${player}communityCards`));
    $wrapper.append($('<div>').attr('id', `${player}playersCards`).addClass('hideBtn'));
    $wrapper.append($('<div>').attr('id', `${player}commandButtons`));
    $wrapper.append($('<div>').attr('id', `${player}globalStats`));
    $('body').append($wrapper);

    $(`[id="${player}communityCards"]`).append($('<p>').text('Community Cards').css('text-decoration', 'underline'));
    $(`[id="${player}playersCards"]`).append($('<p>').text('Players Cards').css('text-decoration', 'underline'));
    $(`[id="${player}playersCards"]`).append($('<div>').addClass('hidden').hide());
    $(`[id="${player}commandButtons"]`).append($('<form>').attr('id', `${player}commandBtn`));
    $(`[id="${player}commandBtn"]`).append($('<button>').attr('type', 'button').attr('id', `${player}PageFoldBtn`).text('Fold'));
    $(`[id="${player}commandBtn"]`).append($('<label>').attr('for', 'raiseAmount').css('margin-left', '2em').text('Raise: $'));
    $(`[id="${player}commandBtn"]`).append($('<input>').attr('type', 'text').attr('id', `${player}PageRaiseAmt`));
    $(`[id="${player}commandBtn"]`).append($('<button>').attr('type', 'button').attr('id', `${player}PageRaiseBtn`).text('Raise!'));
    $(`[id="${player}commandBtn"]`).append($('<button>').attr('type', 'button').css('margin-left', '2em').attr('id', `${player}PageCallBtn`).text('Call'));
    $(`[id="${player}commandBtn"]`).append($('<button>').attr('type', 'button').css('margin-left', '2em').attr('id', `${player}PageCheckBtn`).text('Check'));
    $(`[id="${player}commandBtn"]`).append($('<button>').attr('type', 'button').css('margin-left', '2em').attr('id', `${player}AllInBtn`).text('All In!'));
    $(`[id="${player}Page"]>h1`).text(player);
    $(`[id="${player}globalStats"]`).append($('<p>').addClass('potSize'));
    $(`[id="${player}globalStats"]`).append($('<p>').addClass('betSize'));
    $(`[id="${player}globalStats"]`).append($('<p>').addClass('playerPreviousBet'));
    $('.showStackSize').append($('<h2>').text(`${player}: $${app.playerStats[player].stack}`).attr('id', `${player}stack`));

    $(`[id="${player}communityCards"]`).append($('<p>').addClass('community').text(playerCardsObj['Community Cards'].slice(0, 0)));
    $(`[id="${player}playersCards"]>.hidden`).append($('<p>').text(playerCardsObj[player].slice(0, 2)));
    $('.card').append($('<h3>').attr('id', `${player}showCards`).hide());
    $(`[id="${player}showCards"]`).text(`${player}: ${playerCardsObj[player].slice(0, 2)}`);

    $(`[id="${player}PageFoldBtn"]`).on('click', (e) => {
        foldFunc(e, player);
    });
    $(`[id="${player}PageRaiseBtn"]`).on('click', (e) => {
        raiseFunc(e, player);
    });
    $(`[id="${player}PageCallBtn"]`).on('click', (e) => {
        callFunc(e, player);
    });
    $(`[id="${player}PageCheckBtn"]`).on('click', (e) => {
        checkFunc(e, player);
    });
    $(`[id="${player}AllInBtn"]`).on('click', (e) => {
        allInFunc(e, player);
    });
};

let playerCardsObj = {};

let playerIndex = 2;
let UTGIndex = playerIndex;
const gameSequence = ['Pre-Flop', 'Flop', 'Turn', 'River'];
let sequenceCounter = 0;

const starterFunc = (e) => {
    e.preventDefault();
    storeInitialData();
    run($('#numOfPlayers').val(), playerCardsObj, app.players);

    $('#settingPage').fadeOut('slow');
    let blind = parseInt($('#blindValue').val());
    app['playerStats'] = {};
    app['gameStage'] = gameSequence[sequenceCounter];
    app['betSize'] = blind;
    for (let i = 0; i < app.players.length; i++) {
        let player = app.players[i];
        app.playerStats[player] = {};
        app.playerStats[player].previousBet = 0;
        app.playerStats[player].needToAct = true;
        app.playerStats[player].stack = parseInt(app.playersStash[i]);
        app.playerStats[player].fold = false;
    }

    if (app.numOfPlayers === 2) {
        playerIndex = 1;
        UTGIndex = playerIndex;
        app.playerStats[app.players[0]].stack -= blind;
        app.playerStats[app.players[0]].previousBet = blind;
        app['pot'] = blind;
    } else {
        app['pot'] = 1.5 * blind;
        app.playerStats[app.players[0]].stack -= 0.5 * blind;
        app.playerStats[app.players[0]].previousBet = 0.5 * blind;
        app.playerStats[app.players[1]].stack -= blind;
        app.playerStats[app.players[1]].previousBet = blind;
    }
    for (let players of app.players) {
        createPlayerPage(players);
    }

    gameOn(playerIndex);

    // $(".showResult").on("click",()=>{
    //   result();
    // })
};
$('#putOnYourPokerFace').on('click', starterFunc);

const gameOn = (playerIndex) => {
    console.log(UTGIndex, playerIndex);
    let player = app.players[playerIndex];
    $('.potSize').text(`Pot Size = $${app.pot}`);
    $('.betSize').text(`Bet Size = $${app.betSize}`);
    $('.playerPreviousBet').text(`Previous Bet = $${app.playerStats[player].previousBet}`);
    $('.showStackSize').css('display', 'flex');
    $(`[id="${player}stack"]`).text(`${player}: $${app.playerStats[player].stack}`);
    if (!turnEnd()) {
        setTimeout(() => {
            $(`[id="${player}Page"]`).slideDown();
        }, 500);
    }
    $(`[id="${player}playersCards"]`).on('mousedown', () => {
        $('.hidden').show();
    });
    $(`[id="${player}playersCards"]`).on('mouseup', () => {
        $('.hidden').hide();
    });
};

const callFunc = (e, player) => {
    if (app.playerStats[player].previousBet !== app.betSize) {
        if (app.playerStats[player].stack + app.playerStats[player].previousBet >= app.betSize) {
            $(`[id="${player}Page"]`).hide('slow');

            app.playerStats[app.players[playerIndex]].stack -= app.betSize - app.playerStats[app.players[playerIndex]].previousBet;
            app.pot += app.betSize - app.playerStats[app.players[playerIndex]].previousBet;
            app.playerStats[app.players[playerIndex]].previousBet = app.betSize;

            app.playerStats[player].needToAct = false;

            playerIndex++;
            if (playerIndex === app.numOfPlayers) {
                playerIndex = 0;
            }
            let gameEnded = turnEnd();
            if (!gameEnded) {
                $('.showStackSize').css('display', 'flex');
                $(`[id="${player}stack"]`).text(`${player}: $${app.playerStats[player].stack}`);
                gameOn(playerIndex);
            }
        } else {
            app.pot += app.playerStats[app.players[playerIndex]].stack;
            app.playerStats[app.players[playerIndex]].stack = 0;
        }
    }
};

const foldFunc = (e, player) => {
    if (app.playerStats[player].previousBet !== app.betSize) {
        $(`[id="${player}Page"]`).hide('slow');
        app.playerStats[player].fold = true;
        delete playerCardsObj[player];
        app.players.splice(playerIndex, 1);
        app.numOfPlayers -= 1;
        if (playerIndex === app.numOfPlayers) {
            playerIndex = 0;
        }

        if (app.numOfPlayer === 1) {
            app.playerStats[player].needToAct = false;
        }

        let gameEnded = turnEnd();
        if (!gameEnded) {
            $('.showStackSize').css('display', 'flex');
            $(`[id="${player}stack"]`).text(`${player}: $${app.playerStats[player].stack}`);
            gameOn(playerIndex);
        }
    }
};

const raiseFunc = (e, player) => {
    let bet = parseInt($(`[id="${player}PageRaiseAmt"]`).val());
    if (bet <= app.playerStats[player].stack || bet === app.playerStats[player].stack + app.playerStats[player].previousBet) {
        if (bet && bet >= 2 * app.betSize && bet >= app.blindSize) {
            app.betSize = bet;
            let raiseAmt = app.betSize - app.playerStats[app.players[playerIndex]].previousBet;
            app.playerStats[app.players[playerIndex]].stack -= raiseAmt;
            app.pot += raiseAmt;
            app.playerStats[app.players[playerIndex]].previousBet = bet;
            $(`[id="${player}PageRaiseAmt"]`).val('');
        } else {
            alert('Wrong input in field or bet is too small');
            $(`[id="${player}PageRaiseAmt"]`).val('');
            return;
        }

        $(`[id="${player}Page"]`).hide('slow');

        for (let Player of app.players) {
            if (Player === player) {
                app.playerStats[Player].needToAct = false;
            } else {
                app.playerStats[Player].needToAct = true;
            }
        }

        playerIndex++;
        if (playerIndex === app.numOfPlayers) {
            playerIndex = 0;
        }
        $('.showStackSize').css('display', 'flex');
        $(`[id="${player}stack"]`).text(`${player}: $${app.playerStats[player].stack}`);
        gameOn(playerIndex);
    } else {
        alert('Bet size more than stack');
        $(`[id="${player}PageRaiseAmt"]`).val('');
    }
};

const checkFunc = (e, player) => {
    if (app.betSize === app.playerStats[player].previousBet) {
        $(`[id="${player}Page"]`).hide('slow');
        ++playerIndex;

        console.log(`--------`);
        console.log(playerIndex);
        console.log(`--------`);

        app.playerStats[player].needToAct = false;
        if (playerIndex === app.numOfPlayers) {
            playerIndex = 0;
        }

        let gameEnded = turnEnd();
        if (!gameEnded) {
            $('.showStackSize').css('display', 'flex');
            $(`[id="${player}stack"]`).text(`${player}: $${app.playerStats[player].stack}`);
            gameOn(playerIndex);
        }
    } else {
        alert('Please match bet size');
    }
};

const allInFunc = (e, player) => {
    if (confirm('Sure you want to all in?')) {
        let raiseAmt = app.playerStats[app.players[playerIndex]].stack - app.playerStats[app.players[playerIndex]].previousBet;
        app.playerStats[app.players[playerIndex]].stack -= raiseAmt;
        app.pot += raiseAmt;
        app.playerStats[app.players[playerIndex]].previousBet = app.playerStats[app.players[playerIndex]].stack;
        $(`[id="${player}Page"]`).hide('slow');
        for (let Player of app.players) {
            if (Player === player) {
                app.playerStats[Player].needToAct = false;
            } else {
                app.playerStats[Player].needToAct = true;
            }
        }

        ++playerIndex;
        if (playerIndex === app.numOfPlayers) {
            playerIndex = 0;
        }
        $('.showStackSize').css('display', 'flex');
        $(`[id="${player}stack"]`).text(`${player}: $${app.playerStats[player].stack}`);
        gameOn(playerIndex);
    }
};

const waitChecker = () => {
    let checker = true;
    for (let player of app.players) {
        if (app.playerStats[player].needToAct) {
            checker = false;
            break;
        }
    }
    return checker;
};

const turnEnd = () => {
    if (waitChecker()) {
        if (app.numOfPlayers === 1) {
            ////////Game end checker
            result(true);
            for (let player of app.players) {
                $(`[id="${player}stack"]`).text(`${player}: $${app.playerStats[player].stack}`);
            }
            let i = 0;
            for (let player of Object.keys(app.playerStats)) {
                if (player !== app.players[i]) {
                    app.players.splice(i, 0, player);
                }
                app.playerStats[player].needToAct = true;
                app.playerStats[player].fold = false;
                app.playerStats[player].previousBet = 0;
                i++;
            }

            console.log('running');
            return true;
        } else if (sequenceCounter === 3) {
            result(false);
            for (let player of app.players) {
                $(`[id="${player}stack"]`).text(`${player}: $${app.playerStats[player].stack}`);
            }
            let i = 0;
            for (let player of app.players) {
                $(`[id="${player}showCards"]`).show('fast');
            }
            for (let player of Object.keys(app.playerStats)) {
                if (player !== app.players[i]) {
                    app.players.splice(i, 0, player);
                }
                app.playerStats[player].needToAct = true;
                app.playerStats[player].fold = false;
                app.playerStats[player].previousBet = 0;
                i++;
            }
            return true;
        } else {
            app.gameStage = gameSequence[sequenceCounter];

            if (parseInt($('#numOfPlayers').val()) === 2) {
                playerIndex = UTGIndex - 1;
            } else {
                playerIndex = UTGIndex - 2;
            }

            if (playerIndex < 0) {
                playerIndex = app.numOfPlayers + playerIndex;
            }
            app.betSize = 0;
            for (let player of app.players) {
                app.playerStats[player].needToAct = true;
                app.playerStats[player].previousBet = 0;
            }

            ++sequenceCounter;
            switch (sequenceCounter) {
                case 1:
                    setTimeout(() => {
                        $('p.playersPage').text(gameSequence[sequenceCounter]);
                        $('.community').text(playerCardsObj['Community Cards'].slice(0, 3));
                    }, 700);
                    break;
                case 2:
                    setTimeout(() => {
                        $('p.playersPage').text(gameSequence[sequenceCounter]);
                        $('.community').text(playerCardsObj['Community Cards'].slice(0, 4));
                    }, 700);
                    break;
                case 3:
                    setTimeout(() => {
                        $('p.playersPage').text(gameSequence[sequenceCounter]);
                        $('.community').text(playerCardsObj['Community Cards']);
                    }, 700);
                    break;
            }
        }
    }
};

$('button.result').on('mouseout', (e) => {
    e.target.style.background = '#afafaf';
    e.target.style.color = 'black';
});
$('button.result').on('mouseover', (e) => {
    e.target.style.background = '#313131';
    e.target.style.color = 'white';
});
$('button.result').on('click', (e) => {
    iterator(e);
});

const iterator = (e) => {
    e.preventDefault();

    deck = [];
    sequenceCounter = 0;
    app.gameStage = gameSequence[sequenceCounter];
    app.numOfPlayers = app.players.length;
    ++UTGIndex;
    if (UTGIndex === app.numOfPlayers) {
        UTGIndex = 0;
    }

    setTimeout(() => {
        $('p.playersPage').text(gameSequence[sequenceCounter]);
        $('.community').text('');
    }, 700);

    let blind = parseInt($('#blindValue').val());
    app['betSize'] = blind;
    if (app.numOfPlayers === 2) {
        playerIndex = UTGIndex;
        app.playerStats[app.players.at(playerIndex - 1)].stack -= blind;
        app.playerStats[app.players.at(playerIndex - 1)].previousBet = blind;
        app['pot'] = blind;
    } else {
        playerIndex = UTGIndex;
        app['pot'] = 1.5 * blind;
        app.playerStats[app.players.at(playerIndex - 2)].stack -= 0.5 * blind;
        app.playerStats[app.players.at(playerIndex - 2)].previousBet = 0.5 * blind;
        app.playerStats[app.players.at(playerIndex - 1)].stack -= blind;
        app.playerStats[app.players.at(playerIndex - 1)].previousBet = blind;
    }
    run($('#numOfPlayers').val(), playerCardsObj, app.players);
    $('.result').hide('slow');
    $('.card').hide('slow');
    for (let player of app.players) {
        setTimeout(() => {
            $(`[id="${player}playersCards"]>.hidden`).text(playerCardsObj[player].slice(0, 2));
            $(`[id="${player}showCards"]`)
                .hide()
                .text(`${player}: ${playerCardsObj[player].slice(0, 2)}`);
        }, 1000);
    }
    gameOn(playerIndex);
};
