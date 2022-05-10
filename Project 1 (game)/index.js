const innerHTML = (text) => {
  const textnode = document.createTextNode(text);
  const node = document.createElement("p");
  node.appendChild(textnode);
  document.querySelector("h2").appendChild(node);
};

// const run = (players) => {
let players = 5;
const suits = ["♢", "♣", "♡", "♠"];
const cardValue = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const cardValueStraight = [...cardValue];
cardValueStraight.splice(0, 0, "A"); //declare new array to check for straights as "A" loops back
straightArr = [];
for (let i = 0; i < 10; i++) {
  straightArr.push(cardValueStraight.slice(i, i + 5));
}

const deck = []; //creating deck of card
for (let Suits of suits) {
  for (let CardValue of cardValue) {
    deck.push(CardValue + " " + Suits);
  }
}
// console.log(deck);
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
// console.log(deck);

const numPlayers = players; //require player input to how many players are there
const setup = () => {
  //return object of players' cards and community cards
  shuffler();
  const playerCardsObj = {};
  const communityCards = [];
  for (let j = numPlayers * 2; j < numPlayers * 2 + 5; j++) {
    communityCards.push(deck[j]);
  }

  for (let i = 1; i <= numPlayers; i++) {
    const playerName = "Player " + i;
    playerCardsObj[playerName] = [deck[2 * i - 2], deck[2 * i - 1]];
    for (let card of communityCards) {
      playerCardsObj[playerName].push(card);
    }
  }

  playerCardsObj["Community Cards"] = communityCards;

  return playerCardsObj;
};
playerCardsObj = setup();

// const cardManipulate = () => {
//   playerCardsObj["Community Cards"] = ["5 ♡", "6 ♣", "3 ♡", "9 ♠", "10 ♡"];
//   playerCardsObj["Player 1"] = [
//     "2 ♠",
//     "10 ♠",
//     "5 ♡",
//     "6 ♣",
//     "3 ♡",
//     "9 ♠",
//     "10 ♡",
//   ];
//   playerCardsObj["Player 2"] = [
//     "A ♡",
//     "10 ♢",
//     "5 ♡",
//     "6 ♣",
//     "3 ♡",
//     "9 ♠",
//     "10 ♡",
//   ];
// };
// cardManipulate();

const arrNum = {};
const arrSuits = {};
const cardObj = { Num: arrNum, Suits: arrSuits };
for (const [key, value] of Object.entries(playerCardsObj)) {
  //splitting cards to compare
  if (key === "Community Cards") {
    // console.log(`${key}: ${value}`);
    $("div.card").append($("<h3>").text(`${key}: ${value}`));
  } else {
    // console.log(`${key}: ${value.slice(0, 2)}`);
    $("div.card").append($("<h3>").text(`${key}: ${value.slice(0, 2)}`));
  }
  arrNum[key] = [];
  arrSuits[key] = [];
  for (card of playerCardsObj[key]) {
    arrNum[key].push(card.split(" ")[0]);
    arrSuits[key].push(card.split(" ")[1]);
  }
}

for (const [key, value] of Object.entries(cardObj.Num)) {
  //create obj of combination of cards and update playerCardsObj
  if (key !== "Community Cards") {
    playerCardsObj[key].cardCombinations = {};

    for (let i = 0; i < 7; i++) {
      if (
        !Object.keys(playerCardsObj[key].cardCombinations).includes(
          cardObj.Num[key][i]
        )
      ) {
        playerCardsObj[key].cardCombinations[cardObj.Num[key][i]] = 1;
      } else {
        playerCardsObj[key].cardCombinations[cardObj.Num[key][i]] += 1;
      }
    }
    playerCardsObj[key].sortedHand = {}; //update combi of cards of player with respect to strength in sortedHand
    for (const [key2, value] of Object.entries(
      playerCardsObj[key].cardCombinations
    )) {
      for (let i = 0; i < cardValue.length; i++) {
        if (key2 === cardValue[i]) {
          playerCardsObj[key].sortedHand[i + 2] =
            playerCardsObj[key].cardCombinations[key2];
        }
      }
    }
    // console.log(playerCardsObj[key]["combi of nums"]);
  }
}

const checkFlush = () => {
  const pushFlush = (key) => {
    const flushArr = [];
    for (let i in cardObj.Suits[key]) {
      let value = 0;
      if (cardObj.Suits[key][i] === playerCardsObj[key].isFlush[1]) {
        if (
          cardObj.Num[key][i] === "J" ||
          cardObj.Num[key][i] === "Q" ||
          cardObj.Num[key][i] === "K" ||
          cardObj.Num[key][i] === "A"
        ) {
          switch (cardObj.Num[key][i]) {
            case "J":
              value = "11";
              break;
            case "Q":
              value = "12";
              break;
            case "K":
              value = "13";
              break;
            case "A":
              value = "14";
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

  for (const [key, value] of Object.entries(cardObj.Suits)) {
    if (key !== "Community Cards") {
      //check if there's a flush and update playerCardsObj
      let countDiamond = 0;
      let countClub = 0;
      let countHeart = 0;
      let countSpade = 0;
      playerCardsObj[key].isFlush = [false];

      for (let i in cardObj.Suits[key]) {
        switch (cardObj.Suits[key][i]) {
          case "♢":
            countDiamond++;
            if (countDiamond >= 5) {
              playerCardsObj[key].isFlush = [true];
              playerCardsObj[key].isFlush[1] = "♢";
            }
            break;
          case "♣":
            countClub++;
            if (countClub >= 5) {
              playerCardsObj[key].isFlush = [true];
              playerCardsObj[key].isFlush[1] = "♣";
            }
            break;
          case "♡":
            countHeart++;
            if (countHeart >= 5) {
              playerCardsObj[key].isFlush = [true];
              playerCardsObj[key].isFlush[1] = "♡";
            }
            break;
          case "♠":
            countSpade++;
            if (countSpade >= 5) {
              playerCardsObj[key].isFlush = [true];
              playerCardsObj[key].isFlush[1] = "♠";
            }
            break;
        }
      }

      if (playerCardsObj[key].isFlush[0]) {
        pushFlush(key);
        // console.log(`${key} has a ${playerCardsObj[key].isFlush[1]} flush!`);
      }
    }
  }
};
checkFlush();

for (const [key, value] of Object.entries(cardObj.Num)) {
  //check if there's a straight and update playerCardsObj
  playerCardsObj[key].isStraight = [false];

  for (let Arr of straightArr) {
    let counter = 0;
    for (let num of Arr) {
      if (cardObj.Num[key].includes(num)) {
        counter++;
        if (counter === 5) {
          playerCardsObj[key].isStraight[0] = true;
          playerCardsObj[key].isStraight[1] = num;
        }
      }
    }
  }
  // if (playerCardsObj[key].isStraight[0]) {
  // console.log(
  //   `${key} has a ${playerCardsObj[key].isStraight[1]} high straight!`
  // );
  // }
}

const pairTripsQuads = () => {
  for (const [key, value] of Object.entries(playerCardsObj)) {
    if (key !== "Community Cards") {
      playerCardsObj[key].statements = [];
      // console.log(key, value);

      for (const [key1, value1] of Object.entries(
        playerCardsObj[key].sortedHand
      )) {
        // console.log(key1, value1);
        switch (value1) {
          case 2:
            playerCardsObj[key].statements.push("onePair");
            break;
          case 3:
            playerCardsObj[key].statements.push("trips");
            break;
          case 4:
            playerCardsObj[key].statements.push("quads");
            break;
        }
      }

      const dir = playerCardsObj[key].statements;
      let check = false;
      const checkDups = () => {
        let counter = 0;
        for (const i in dir) {
          if (dir[i] === "onePair") {
            counter++;
          }
        }
        if (counter >= 2) {
          playerCardsObj[key].statements.push("dups");

          check = true;
          return check;
        }
      };
      checkDups();

      if (dir.includes("trips") && dir.includes("onePair")) {
        playerCardsObj[key].statements.push("fullHouse");
      }
    }
  }
};

pairTripsQuads();

const cardRanking = {
  highCard: 1,
  onePair: 2,
  dups: 3,
  trips: 4,
  straight: 5,
  flush: 6,
  fullHouse: 7,
  quads: 8,
  straightflush: 9,
};

let bestHandIndex = 0;
let bestPlayer = 0;
for (let [key, value] of Object.entries(playerCardsObj)) {
  //final hand of player
  if (key !== "Community Cards") {
    if (playerCardsObj[key].statements.includes("quads")) {
      playerCardsObj[key].hand = "quads";
      playerCardsObj[key].power = cardRanking.quads;
      console.log(`${key} have quads`);
    } else if (playerCardsObj[key].statements.includes("fullHouse")) {
      playerCardsObj[key].hand = "fullHouse";
      playerCardsObj[key].power = cardRanking.fullHouse;
      console.log(`${key} have full house`);
    } else if (playerCardsObj[key].isFlush[0]) {
      playerCardsObj[key].hand = "flush";
      playerCardsObj[key].power = cardRanking.flush;
      console.log(`${key} has a ${playerCardsObj[key].isFlush[1]} flush!`);
    } else if (playerCardsObj[key].isStraight[0]) {
      playerCardsObj[key].hand = "straight";
      playerCardsObj[key].power = cardRanking.straight;
      console.log(
        `${key} has a ${playerCardsObj[key].isStraight[1]} high straight!`
      );
    } else if (playerCardsObj[key].statements.includes("trips")) {
      playerCardsObj[key].hand = "trips";
      playerCardsObj[key].power = cardRanking.trips;
      console.log(`${key} have trips`);
    } else if (playerCardsObj[key].statements.includes("dups")) {
      playerCardsObj[key].hand = "dups";
      playerCardsObj[key].power = cardRanking.dups;
      console.log(`${key} have dups`);
    } else if (playerCardsObj[key].statements.includes("onePair")) {
      playerCardsObj[key].hand = "onePair";
      playerCardsObj[key].power = cardRanking.onePair;
      console.log(`${key} have only 1 pair`);
    } else {
      playerCardsObj[key].hand = "highCard";
      playerCardsObj[key].power = cardRanking.highCard;
      console.log(`${key} only have a high card,lame`);
    }

    if (playerCardsObj[key].power > bestHandIndex) {
      bestHandIndex = playerCardsObj[key].power;
      bestPlayer = key;
    }
  }
}

const decider = (bestHandIndex, bestPlayer) => {
  //declare winner
  let counter = 0;
  let conflictKeys = [];
  for (let [key, value] of Object.entries(playerCardsObj)) {
    if (playerCardsObj[key].power === bestHandIndex) {
      counter++;
      conflictKeys.push(key);
    }
  }
  if (counter > 1) {
    // console.log(`${conflictKeys} have the same hands`);
    // $("div.winner").append(
    //   $("<h3>")
    //     .text(`${conflictKeys} have the same hands`)
    //     .css("background", "white")
    // );
    return conflictKeys;
  } else {
    console.log(`${bestPlayer} wins!`);
    $("div.winner").append(
      $("<h3>")
        .text(
          `${bestPlayer} wins with a ${Object.keys(cardRanking).find(
            (key) => cardRanking[key] === bestHandIndex
          )}`
        )
        .css("background", "white")
    );
  }
};

const conflictInfo = decider(bestHandIndex, bestPlayer);
console.log(playerCardsObj);

function highCardDecon() {
  let winner = "draw";
  const checkHighCard = checkTopPair(1);
  winner = checkHighCard[0].player;

  if (winner === "draw") {
    console.log(`Its a draw`);
  } else {
    console.log(`Winner is ${winner}`);
  }
}

function onePairDecon() {
  let winner = "draw";

  const checkPair = checkTopPair(2);
  if (checkPair[1] === 1) {
    winner = checkPair[0].player;
  } else {
    const checkHighCard = checkTopPair(1);
    winner = checkHighCard[0].player;
  }

  if (winner === "draw") {
    console.log(`Its a draw`);
  } else {
    console.log(`Winner is ${winner}`);
  }
}

const checkTopPair = (num) => {
  let maxDups = { value: 0, player: "" };
  let counter = 1;
  for (let playerKey of conflictInfo) {
    const playerDups = playerCardsObj[playerKey].sortedHand;
    const reversedKeys = Object.keys(playerDups).reverse();
    let highestKey = 0;
    for (let key of reversedKeys) {
      if (playerDups[key] === num) {
        highestKey = parseInt(key);
        delete playerDups[key];
        break;
      }
    }
    if (maxDups.value === highestKey) {
      counter++;
    } else if (maxDups.value < highestKey) {
      maxDups.value = highestKey;
      maxDups.player = playerKey;
    }
  }
  // console.log(maxDups);
  return [maxDups, counter];
};

function dupsDecon() {
  let winner = "draw";

  const checkFirstPair = checkTopPair(2);
  if (checkFirstPair[1] > 1) {
    const checkSecondPair = checkTopPair(2);
    if (checkSecondPair[1] > 1) {
      const checkKicker = checkTopPair(1);
      winner = checkKicker[0].player;
    } else {
      // console.log(checkSecondPair[0]);
      winner = checkSecondPair[0].player;
    }
  } else {
    // console.log(checkFirstPair[0]);
    winner = checkFirstPair[0].player;
  }

  if (winner === "draw") {
    console.log(`Its a draw`);
  } else {
    console.log(`Winner is ${winner}`);
  }
}

function tripsDecon() {
  let winner = "draw";
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

  if (winner === "draw") {
    console.log(`Its a draw`);
  } else {
    console.log(`Winner is ${winner}`);
  }
}

function straightDecon() {
  let winner = "undecided";
  let bestStraight = [0, []];
  let straights = [];
  for (let i = 0; i < conflictInfo.length; i++) {
    const hand = playerCardsObj[conflictInfo[i]].isStraight[1];
    if (hand > bestStraight[0]) {
      bestStraight[0] = hand;
    }
  }

  for (let i = 0; i < conflictInfo.length; i++) {
    const hand = playerCardsObj[conflictInfo[i]].isStraight[1];
    if (hand === bestStraight[0]) {
      bestStraight[1].push(conflictInfo[i]);
      // console.log(bestStraight);
    }
  }

  if (bestStraight[1].length === 1) {
    winner = bestStraight[1][0];
    console.log(`Winner is ${winner}`);
  } else {
    winner = "draw";
    console.log("Its a draw");
  }

  return winner;
}

function flushDecon() {
  const flushArrCompare = [];
  let winner = "undecided";
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

  if (winner === "undecided") {
    winner = "draw";
    console.log(`Its a draw`);
  } else {
    console.log(`Winner is ${winner}`);
  }
  return winner;
}

function fullHouseDecon() {
  const fullHouseObj1 = {};
  const fullHouseObj2 = {};
  for (let key of conflictInfo) {
    const hand = playerCardsObj[key].sortedHand;
    fullHouseObj1[key] = Object.keys(hand).find((key) => hand[key] === 3);
    fullHouseObj2[key] = Object.keys(hand).find((key) => hand[key] === 2);
  }
  let fullHouseChecker = [0, 0];
  for (let [key, value] of Object.entries(fullHouseObj1)) {
    if (value > fullHouseChecker[0]) {
      fullHouseChecker[0] = value;
      fullHouseChecker[1] = key;
    } else if (value === fullHouseChecker[0]) {
      fullHouseChecker[1] = "undecided";
    }
  }

  if (fullHouseChecker[1] === "undecided") {
    for (let [key, value] of Object.entries(fullHouseObj2)) {
      if (value > fullHouseChecker[0]) {
        fullHouseChecker[0] = value;
        fullHouseChecker[1] = key;
      } else if (value === fullHouseChecker[0]) {
        fullHouseChecker[1] = "undecided";
      }
    }
  }
  let winner = fullHouseChecker[1];
  if (winner === "undecided") {
    winner = "draw";
    console.log(`Its a draw`);
  } else {
    console.log(`Winner is ${winner}`);
  }
  return winner;
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
  console.log(`Winner is ${winner}`);
  return winner;
}

if (conflictInfo) {
  switch (bestHandIndex) {
    case 1:
      highCardDecon();
      break;
    case 2:
      onePairDecon();
      break;
    case 3:
      dupsDecon();
      break;
    case 4:
      tripsDecon();
      break;
    case 5:
      straightDecon();
      break;
    case 6:
      flushDecon();
      break;
    case 7:
      fullHouseDecon();
      break;
    case 8:
      quadsDecon();
      break;
    default:
      alert("Wh0t mate");
  }
}
