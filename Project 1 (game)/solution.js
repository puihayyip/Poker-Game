function innerHTML(text) {
  const textnode = document.createTextNode(text);
  const node = document.createElement("p");
  node.appendChild(textnode);
  document.querySelector("h1").appendChild(node);
}

/////////////////////////////////////////////////
////// Answer the Following
/////////////////////////////////////////////////
// 1. datatype: boolean
//    data structure example: const light switch =true;
// 2. datatype: string
//    data structure example: const emailAdd = "simon.lau.sg@gmail.com";
// 3. datatype: array
//    data structure example: const spaceship = [hull,laserblasters,tractor beam, warp drive];
// 4. datatype: array
//    data structure example: const studentNames = [ali,barry,charlie,denis,evan];
// 5. datatype: object
//    data structure example: const student = {ali: "classroom", barry: "classroom", charlie: "toilet", denis: "hall", evan: "home"};
// 6. datatype: boolean
//    data structure example:
// const student = {
//   ali: { location: "classroom", tvShows: ["house of cards", "suits"] },
//   barry: { location: "classroom", tvShows: ["Dragonball", "Naruto"] },
//   charlie: { location: "toilet", tvShows: ["Digimon", "Pokemon"] },
//   denis: { location: "hall", tvShows: ["爱（我问天）", "KO one"] },
//   evan: { location: "home", tvShows: ["Breaking Bad", "Stranger Things"] },
// };

/////////////////////////////////////////////////
////// Take it Easy
/////////////////////////////////////////////////

colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
const colorBlue = colors.indexOf("blue");
// innerHTML(colorBlue);
const puihay = {
  food: "lor mee",
  hobby: "leetcoding",
  town: "hougang",
  favDatatype: "objects",
};
const puihaysHobby = puihay.hobby;

/////////////////////////////////////////////////
////// Crazy Object!
/////////////////////////////////////////////////

const crazyObject = {
  taco: [
    { meat: "steak", cheese: ["panela", "queso", "chihuahua"] },
    {
      meat: "chicken",
      salsa: [
        "pico",
        "hot",
        "hotter",
        "really hot",
        "really really hot",
        "omg my mouth is burning",
      ],
    },
  ],
  larry: {
    nicknames: ["LD", "Chicken Teriyaki Boyyyyyy"],
    quotes: [
      "Pretty pretty prettayyyyy good",
      "Is that a parkinson's thing?",
      "women love a self confident bald man",
      "I'm a walking talking enigma",
    ],
    characters: [
      {
        name: "Jeff",
        occupation: "manager",
      },
      {
        name: "funkhauser",
        occupation: "tv dude",
      },
      {
        name: "susie",
        occupation: "jeffs wife",
        favourtieHobby: "Swearing at Larry and Jeff",
      },
    ],
  },
};
console.log(crazyObject.taco[1].salsa[5]);
console.log(crazyObject.larry.quotes[0]);
console.log(crazyObject.larry.characters[2].favourtieHobby);
console.log(crazyObject.larry.nicknames[1]);
console.log(crazyObject.larry.characters[1]);
crazyObject.larry.quotes.push(
  "I'm trying to elevate small talk to medium talk"
);
console.log(crazyObject.larry.quotes[4]);

/////////////////////////////////////////////////
////// Object-ception
/////////////////////////////////////////////////

const inception = {
  reality: {
    dreamLayer1: {
      dreamLayer2: {
        dreamLayer3: {
          dreamLayer4: {
            dreamLayer5: {
              dreamLayer6: {
                limbo: "Joseph Gordon Levitt",
              },
            },
          },
        },
      },
    },
  },
};
inception.reality.dreamLayer1.dreamLayer2.dreamLayer3.dreamLayer4.dreamLayer5.dreamLayer6.limbo =
  null;

/////////////////////////////////////////////////
////// Bond Films
/////////////////////////////////////////////////

const bondFilms = [
  {
    title: "Skyfall",
    year: 2012,
    actor: "Daniel Craig",
    gross: "$1,108,561,008",
  },
  {
    title: "Thunderball",
    year: 1965,
    actor: "Sean Connery",
    gross: "$1,014,941,117",
  },
  {
    title: "Goldfinger",
    year: 1964,
    actor: "Sean Connery",
    gross: "$912,257,512",
  },
  {
    title: "Live and Let Die",
    year: 1973,
    actor: "Roger Moore",
    gross: "$825,110,761",
  },
  {
    title: "You Only Live Twice",
    year: 1967,
    actor: "Sean Connery",
    gross: "$756,544,419",
  },
  {
    title: "The Spy Who Loved Me",
    year: 1977,
    actor: "Roger Moore",
    gross: "$692,713,752",
  },
  {
    title: "Casino Royale",
    year: 2006,
    actor: "Daniel Craig",
    gross: "$669,789,482",
  },
  {
    title: "Moonraker",
    year: 1979,
    actor: "Roger Moore",
    gross: "$655,872,400",
  },
  {
    title: "Diamonds Are Forever",
    year: 1971,
    actor: "Sean Connery",
    gross: "$648,514,469",
  },
  {
    title: "Quantum of Solace",
    year: 2008,
    actor: "Daniel Craig",
    gross: "$622,246,378",
  },
  {
    title: "From Russia with Love",
    year: 1963,
    actor: "Sean Connery",
    gross: "$576,277,964",
  },
  {
    title: "Die Another Day",
    year: 2002,
    actor: "Pierce Brosnan",
    gross: "$543,639,638",
  },
  {
    title: "Goldeneye",
    year: 1995,
    actor: "Pierce Brosnan",
    gross: "$529,548,711",
  },
  {
    title: "On Her Majesty's Secret Service",
    year: 1969,
    actor: "George Lazenby",
    gross: "$505,899,782",
  },
  {
    title: "The World is Not Enough",
    year: 1999,
    actor: "Pierce Brosnan",
    gross: "$491,617,153",
  },
  {
    title: "For Your Eyes Only",
    year: 1981,
    actor: "Roger Moore",
    gross: "$486,468,881",
  },
  {
    title: "Tomorrow Never Dies",
    year: 1997,
    actor: "Pierce Brosnan",
    gross: "$478,946,402",
  },
  {
    title: "The Man with the Golden Gun",
    year: 1974,
    actor: "Roger Moore",
    gross: "$448,249,281",
  },
  { title: "Dr. No", year: 1962, actor: "Sean Connery", gross: "$440,759,072" },
  {
    title: "Octopussy",
    year: 1983,
    actor: "Roger Moore",
    gross: "$426,244,352",
  },
  {
    title: "The Living Daylights",
    year: 1987,
    actor: "Timothy Dalton",
    gross: "$381,088,866",
  },
  {
    title: "A View to a Kill",
    year: 1985,
    actor: "Roger Moore",
    gross: "$321,172,633",
  },
  {
    title: "License to Kill",
    year: 1989,
    actor: "Timothy Dalton",
    gross: "$285,157,191",
  },
];

let bondTitles = [];
for (obj of bondFilms) {
  bondTitles.push(obj.title);
}
console.log(bondTitles);

let oddBonds = [];
for (let i in bondFilms) {
  if (bondFilms[i].year % 2 !== 0) {
    oddBonds.push(bondFilms[i].title);
  }
}
innerHTML(oddBonds);

let cumulativeGross = 0;
for (obj of bondFilms) {
  let grossInt = obj.gross.split("");
  for (let i in grossInt) {
    if (grossInt[i] === "," || grossInt[i] === "$") {
      grossInt.splice(i, 1, "");
    }
  }
  cumulativeGross += parseInt(grossInt.join(""));
}
console.log(cumulativeGross);

/////////////////////////////////////////////////
////// HFM Bond Films Challenge
/////////////////////////////////////////////////

function arrActor(bondFilms) {
  let arr = [];
  for (let i in bondFilms) {
    arr.push(bondFilms[i].actor);
  }
  return arr;
}

function newObj(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let count = 1;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && arr[j] !== "") {
        count++;
        arr.splice(j, 1, "");
      }
      obj[arr[i]] = count;
    }
    delete obj[""];
  }
  return obj;
}

function sortAppearances(Obj, arr) {
  let min = arr.length;
  for (const property in Obj) {
    if (Obj[property] < min) {
      min = Obj[property];
    }
  }
  let key = "";
  for (const property in Obj) {
    if (Obj[property] === min) {
      key = property;
    }
  }
  for (let i in bondFilms) {
    if (bondFilms[i].actor === key) {
      console.log(bondFilms[i]);
    }
  }
}

const arr = arrActor(bondFilms);
obj = newObj(arr);
sortAppearances(obj, arr);
