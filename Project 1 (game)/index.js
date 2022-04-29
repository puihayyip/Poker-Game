const innerHTML = (text) => {
  const textnode = document.createTextNode(text);
  const node = document.createElement("p");
  node.appendChild(textnode);
  document.querySelector("h2").appendChild(node);
};

const run = (players) => {
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

  const arrNum = {};
  const arrSuits = {};
  const cardObj = { Num: arrNum, Suits: arrSuits };
  for (const [key, value] of Object.entries(playerCardsObj)) {
    //splitting cards to compare
    if (key !== "Community Cards") {
      console.log(`${key}: ${value.slice(0, 2)}`);
    } else {
      console.log(`${key}: ${value}`);
    }
    arrNum[key] = [];
    arrSuits[key] = [];
    for (card of playerCardsObj[key]) {
      arrNum[key].push(card.split(" ")[0]);
      arrSuits[key].push(card.split(" ")[1]);
    }
  }

  for (const [key, value] of Object.entries(cardObj.Suits)) {
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
            playerCardsObj[key].isFlush[1] = ["♢"];
          }
          break;
        case "♣":
          countClub++;
          if (countClub >= 5) {
            playerCardsObj[key].isFlush = [true];
            playerCardsObj[key].isFlush[1] = ["♣"];
          }
          break;
        case "♡":
          countHeart++;
          if (countHeart >= 5) {
            playerCardsObj[key].isFlush = [true];
            playerCardsObj[key].isFlush[1] = ["♡"];
          }
          break;
        case "♠":
          countSpade++;
          if (countSpade >= 5) {
            playerCardsObj[key].isFlush = [true];
            playerCardsObj[key].isFlush[1] = ["♠"];
          }
          break;
      }
    }

    if (playerCardsObj[key].isFlush[0]) {
      console.log(`${key} has a ${playerCardsObj[key].isFlush[1]} flush!`);
    }
  }

  for (const [key, value] of Object.entries(cardObj.Num)) {
    //check if there's a straight and update playerCardsObj
    playerCardsObj[key].isStraight = [false];

    for (let Arr of straightArr) {
      let counter = 0;
      for (let num of Arr) {
        if (cardObj.Num[key].includes(num)) {
          counter++;
          if (counter === 5) {
            playerCardsObj[key].isStraight = [true];
            playerCardsObj[key].isStraight[1] = num;
          }
        }
      }
    }
    if (playerCardsObj[key].isStraight[0]) {
      console.log(
        `${key} has a ${playerCardsObj[key].isStraight[1]} high straight!`
      );
    }
  }

  for (const [key, value] of Object.entries(cardObj.Num)) {
    //create obj of combination of cards and update playerCardsObj
    if (key !== "Community Cards") {
      playerCardsObj[key]["combi of nums"] = {};

      for (let i = 0; i < 7; i++) {
        if (
          !Object.keys(playerCardsObj[key]["combi of nums"]).includes(
            cardObj.Num[key][i]
          )
        ) {
          playerCardsObj[key]["combi of nums"][cardObj.Num[key][i]] = 1;
        } else {
          playerCardsObj[key]["combi of nums"][cardObj.Num[key][i]] += 1;
        }
      }
      playerCardsObj[key]["hello there"] = {};
      for (const [key2, value] of Object.entries(
        playerCardsObj[key]["combi of nums"]
      )) {
        for (let i = 0; i < cardValue.length; i++) {
          if (key2 === cardValue[i]) {
            playerCardsObj[key]["hello there"][i + 2] =
              playerCardsObj[key]["combi of nums"][key2];
          }
        }
      }
      // console.log(playerCardsObj[key]["combi of nums"]);
    }
  }
  return;
};
