# Grid Cannon

This is a complete JavaScript and HTML5 implementation of Tom Francis' solitare card game [Grid Cannon](https://www.pentadact.com/2019-08-20-gridcannon-a-single-player-game-with-regular-playing-cards/). This project intentionaly has minimial frills in its overall asthetic and animations. The goal was to create a game that you can quickly start playing in a browser on any device - similar to wordle and other HTML5 games.

If you want to play, the game is live on https://gridcannon.com

---

### Rules
1. <a href="#setup">Setup</a>
2. <a href="#objective">Objective</a>
3. <a href="#how-to-place-cards">How to place cards</a>
4. <a href="#aces-and-jokers">Aces and Jokers</a>
4. <a href="#how-to-attack-royal-cards">How to attack royal cards</a>
5. <a href="#win-condition">Win Condition</a>
6. <a href="#lose-condition">Lose Condition</a>


### Setup
1. Start with a shuffeled deck that includes jokers
2. With the deck face-down, draw cards from the top of the deck into a 3x3 grid while making sure the skip over the middle grid position.
    - <b>If you draw any royal cards, Jokers, or Aces while dealing</b>, place them off to the side in their own piles
3. Take any left onver royal cards and place them next to the most similar card on the outside of the grid. "Most similar card" in this context means:
    - Highest value card with the same suit
    - <b>If there is no card with the same suit</b>, then the next most similar card is the highest value card with the same color.
    - <b>If there is no a card with the same color</b>, then the next most similar card is just the highest value card.

### Objective
To find and kill all royals in the deck before running out of cards.

### How to place cards
1. Draw the top card from the deck
2. Place card in grid
    - <b>If the drawn card is a royal</b>, place the card on the outside of the grid near its most similar card. You are not allowd to place royal cards on-top of dead royals.
    - <b>If the drawn card is a Joker or Ace</b>, place the card in the your respective Ace or Joker pile.
    - <b>If the drawn card is a `2 - 10`</b>, deal on-top of any card in the 3x3 grid with a value less-than or equal to the card you're placing. You may also deal your card into the empty middle position.

<b>NOTE:</b> If you cannot place the drawn card in the grid, and you do not have any Aces or Jokers, the drawn card goes facedown in a discard pile and cannot be used the rest of the game.</b>

### Aces and Jokers
Aces and Jokers are special cards that you can use at any point throughout the game
1. Using an Ace allows you to pick up a stack of cards in the 3x3 grid and shuffle it back into the deck. After using an Ace, place the card in the discard pile.
2. Using a Joker allows you to take the top card off any stack and place it on top of any another playable position in the 3x3 grid. After using a Joker, place the card in the discard pile.

### How to attack royal cards
Attacking a royal requires placing a `2 - 10` card in a grid-position that is opposite of a royal - such that there are 2 cards between the card you're playing and the royal you're attacking.

Each royal has different kill conditions:
1. <b>If you're attacking a Jack</b>, the 2 cards between yours and the Jack must be add up to 11+.
2. <b>If you're attacking a Queen</b>, the 2 cards between yours and the Queen must be the same color and add up to 12+.
3. <b>If you're attacking a King</b>, the 2 cards between yours and the King must be the same suit and add up to 13+.

After attacking and killing a royal, the royal is set face-down.

### Win condition
1. All royals are dead

### Lose condition
1. There are Royals still alive
2. Your deck is empty
3. You have no more Aces
4. You have no more Jokers
