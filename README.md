# Developing a Virtual Poker game

## Project Brief
**MVP - Minimum Viable Product**
- Built with HTML, CSS and JavaScript (jQuery was used for DOM manipulation)
- Hosted on GitHub pages
- Commits to GitHub frequently
- A README.md file to explain the concept and technology used behind this game
- To be displayed on a browser

**Stretch Goals**
- Able to store game details, allowing the details to be retained after refreshing the page
- Utilize backend to allow users to only see details he/she is meant to see in developer tools

## Timeframe 
2 weeks
## Technologies & Tools Used
- HTML
- CSS
- JavaScript
- Git & GitHub

## Description
This is a game of Texas Poker NLH, one of the most popular form of poker. It comes with accurate rules, turn rotation, betting, hands reading and comparison without user intervention. This game is designed and implemented using HTML, CSS and JavaScript while attending the Software Engineering Immersive course at General Assembly.

I picked this project as I am fairly well-versed in the rules of the game and would serve as a healthy challenge for myself as the game is fairly complex upon closer inspection. I believe this game could also serve as a tutorial for new players to pick up poker without the risk of losing money.

## How to Play
Poker is a gambling game with betting involved, winner would be the last one with money still left in his/her stack.

Each player will be assigned 2 cards, and given actions to act during his/her turn. After each round of action, more community cards would be revealed, giving players more information on the eventual best hand they could have when they have to show down with other players. Players will bet into a pot and subsequent players have the option to fold (exit the game), call (match the bet), raise (increase the bet size), check (pass his/her turn given there is no new bets). The pot will go to the player remaining if the rest fold/player who won a show down with other players. Show down is the comparison of the best 5 card combination each player can make with all 5 community cards and 2 hole cards. The position of dealer (button) will move after each game, ensuring players have different positions each game.

Poker is a highly technical game, akin to playing chess, requiring patience, intelligence, ability to understand your opponents' strengths and weaknesses. This is a game that depends very little on luck as one might initially believe, relying on a player's management of risk instead of dumb luck most of the time. A good poker player should be an expert in game theory, statistics, tons of guts and last but not least, have a convincing poker face!

For more details on the rules of poker, please visit [Wiki](https://en.wikipedia.org/wiki/Texas_hold_%27em "link to wiki article") or watch an explanory video on [Youtube](https://www.youtube.com/watch?v=pSRGErzzIo4 "link to youtube video").

## Components of the Game
1. Initial game setup [Timeline: 1 day]: Create 52 unique cards, shuffling it and assigning cards to players and community. Identified types of hand each player has.
2. Hands comparison [Timeline: 1 week]: Compare hands to find winner. Deconflict functions for each type of hands, to find the winner when multiple players have the same type of hand.
3. User input and integration with exisiting code [Timeline: 1 day]: Request and store input values from the setup page. Using these input to iterate setup function.
4. Logic and graphics for the rotation of players, and betting system [Timeline: 1 week]: Created actions each player could have and the rules surrounding each action. Allowed rotation of players, rotation of dealer, coded in stages of game (pre-flop, flop, turn, river) and the corresponding starting player. Allowed manipulation and storage of pot size, individual stack size, bet size and transfer of pot money.

When working on the project, I made a point to give relavent names to functions/variables to allow easier debugging when reading through older codes I wrote. I also made sure to stage and push the project up to GitHub regularly when I make amendments.

## Key Learnings
1. Learning how to structure my code logically and reduce dependencies to make sure that functions are iterable and easy to understand.
2. Learnt to use only an global object to store game values and local variables for all my other functions.
3. Managed to use almost all concepts and variable manipulation methods learnt in class to ensure my code is easily readable.

## Future Developments / Improvements
- Create a more visually appealing page for players with easily understandable visuals for information instead of text
- Rewrite functions to have iteration and user input in mind, instead of patching issues due to static functions.
- Seperate files into individual JS file instead of just 1 JS file which is confusing and hard to navigate.
- Store player states even when the page is refreshed.

## Summary
This is my first time creating a game all by myself under a tight timeline. Frankly, I underestimated the difficulty of translating the game into computer logic when it is so obvious to a human player. Luckily, I was still able to recreate this game without referencing guides for similar games online. On hindsight, it would not be such a bad idea to do so to give me more creative and new ideas to approach similar problems.


## Post Mortem
### Approach and Process
1. I would analyze the game as a whole before jumping straight into crafting the logic of the rules behind the game and neglecting user interface. I had a hard time dissecting my main code into parts to be used as functions for user button inputs.
2. I felt that I adopted a bottom-up approach to this game, building functions along the way to fit my needs. This allowed me to work without delay and not be paralysed while planning for this complex project.

### Code and Code Design
1. When accessing object keys, make sure to use consistent and logical names. Hours were spent debugging over typo mistakes as JS will create new object keys instead of throwing an error when trying to access a key that doesn't exist. I would need to identify more functions that would repeat itself so that I can DRY. Inaccurate lines of codes were implemented in different places, resulting in errors when they should've been the same. Compare starterFunc in line 891 and iterator in 1205.
3. I created switch cases for the different types of conflict hands and filled in the function 1 by 1 afterwards. I think it is important to work top down for certain aspects of the project to prevent missing out on certain cases. Reference to gameEndActions function in line 690.

### SEI Post Mortem
1. I was resourceful in looking up different object and array methods, to avoid myself writing functions that already exists.
2. I need to learn how to isolate and debug issues effectively. I would also need to learn how to write more robust and independent functions. Variables are currently manipulated in multiple functions, making it extremely difficult to pinpoint an error.
3. I think the level of the course is sufficient to get our toes wet and spark enough curiosity to explore more features in the project.
