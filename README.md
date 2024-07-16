# Grid Cannon

This is a complete JavaScript and HTML5 implementation of Tom Francis' solitare card game [Grid Cannon](https://www.pentadact.com/2019-08-20-gridcannon-a-single-player-game-with-regular-playing-cards/). This project intentionaly has minimial frills in its overall asthetic and animations. The goal was to create a game that you can quickly start playing in a browser on any device - similar to wordle and other HTML5 games.

---

### Device support
Works on all devices (mobile, tablet, and desktop) in all aspect ratios. The site is also designed to work as a PWA

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
To find and destroy all royals in the deck before running out of cards.

### How to place cards
1. Draw the top card from the deck
2. Place card in grid
    - <b>If the drawn card is a royal</b>, place the card on the outside of the grid near its most similar card. You are not allowde to place royal cards on-top of dead royals.
    - <b>If the drawn card is a Joker or Ace</b>, place the card in its own respective Ace or Joker pile.
    - <b>If the drawn card is a `2 - 10`</b>, deal on-top of any card in the 3x3 grid with a value less-than or equal to the card you're placing. You may also place cards into any empty grid position
3. Your hand is a stack of up to 3 cards and you must always play the top card on your hand.
4. If you have no more royals to attack on the board, deal out cards until you find a royal. Place the royal next to its most similar card on the perimeter of the grid, and place the cards you dealt out on the bottom of the deck.

### Aces and jokers
Aces and Jokers are special cards that you can use at any point throughout the game
1. An Ace is allowed to be placed on any card. Aces have a rank of 1 and help you get out of a sticy situation when you can't play a numbered card
2. Using a Joker allows you to pick up an entire stack of cards and place them at them at the bottom of the deck. The joker along with any aces in the stack go in the discard pile. 

### How to attack royal cards
Attacking a royal requires placing a `2 - 10` card in a grid-position that is opposite of a royal - such that there are 2 cards between the card you're playing and the royal you're attacking.

Each royal has different kill conditions:
1. <b>If you're attacking a Jack</b>, the 2 cards between yours and the Jack must be add up to 11+.
2. <b>If you're attacking a Queen</b>, the 2 cards between yours and the Queen must be the same color and add up to 12+.
3. <b>If you're attacking a King</b>, the 2 cards between yours and the King must be the same suit and add up to 13+.

After attacking and killing a royal, the royal is set face-down.

### Scoring:
1. Dead Jacks are 1 point
2. Dead Queens are 2 points
3. Dead Kings are 3 points
4. If you kill two cards on the same turn, you get 2x points. For example: If I killed a King & Queen on the same turn, that's 3 points for the King, 2 points for the Queen, mutlipled by 2 would be 10 points. `(2 + 3) x 2 = 10 points`

### Win condition
1. All royals are dead

### Lose condition
1. There are Royals still alive
2. You have no more Aces
3. You have no more Jokers
4. You can't play any cards from your hand
 
