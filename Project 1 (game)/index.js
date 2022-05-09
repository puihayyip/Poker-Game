const innerHTML = (text) => {
  const textnode = document.createTextNode(text);
  const node = document.createElement("p");
  node.appendChild(textnode);
  document.querySelector("h2").appendChild(node);
};

// const run = (players) => {
let players = 8;
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
//   playerCardsObj["Community Cards"] = ["2 ♢", "J ♢", "9 ♢", "Q ♢", "A ♢"];
//   // playerCardsObj["Player 1"].statements = ["flush"];
//   playerCardsObj["Player 1"] = [
//     "10 ♡",
//     "3 ♡",
//     "2 ♢",
//     "J ♢",
//     "9 ♢",
//     "Q ♢",
//     "A ♢",
//   ];
//   // playerCardsObj["Player 2"].statements = ["flush"];
//   playerCardsObj["Player 2"] = [
//     "6 ♠",
//     "8 ♠",
//     "2 ♢",
//     "J ♢",
//     "9 ♢",
//     "Q ♢",
//     "A ♢",
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

let mostPower = 0;
let mostPowerKey = 0;
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

    if (playerCardsObj[key].power > mostPower) {
      mostPower = playerCardsObj[key].power;
      mostPowerKey = key;
    }
  }
}

const decider = (mostPower, mostPowerKey) => {
  //declare winner
  let counter = 0;
  let conflictKeys = [];
  for (let [key, value] of Object.entries(playerCardsObj)) {
    if (playerCardsObj[key].power === mostPower) {
      counter++;
      conflictKeys.push(key);
    }
  }
  if (counter > 1) {
    console.log(`${conflictKeys} have the same hands`);
    return conflictKeys;
  } else {
    console.log(`${mostPowerKey} wins!`);
    // $("div.winner").append($("<h3>").text(`${mostPowerKey} wins!`));
  }
};

const conflictInfo = decider(mostPower, mostPowerKey);
console.log(playerCardsObj);

function highCardDecon() {
  for (let key of conflictInfo) {
    console.log(key);
  }
}
function onePairDecon() {
  for (let key of conflictInfo) {
    const hand = playerCardsObj[key].sortedHand;
    console.log(hand);
  }
}
function dupsDecon() {
  for (let key of conflictInfo) {
    console.log(key);
  }
}
function tripsDecon() {
  for (let key of conflictInfo) {
    console.log(key);
  }
}
function straightDecon() {
  for (let key of conflictInfo) {
    console.log(key);
  }
}
function flushDecon() {
  const flushArrCompare = [];
  let winner = "undecided";
  for (let i = 4; i >= 0; i--) {
    for (let j = 0; j < conflictInfo.length; j++) {
      flushArrCompare[j] = playerCardsObj[conflictInfo[j]].isFlush[2][i];
    }
    var maxNum = [0, -1];
    for (let j = 0; j < flushArrCompare.length; j++) {
      for (let n = j + 1; n < flushArrCompare.length; n++) {
        if (flushArrCompare[j] !== flushArrCompare[n]) {
          if (flushArrCompare[j] > maxNum[0]) {
            maxNum[0] = flushArrCompare[j];
            maxNum[1] = j;
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
  switch (mostPower) {
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
