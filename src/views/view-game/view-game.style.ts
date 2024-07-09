import { css } from 'lit'

export const GridCannon = css`
  .grid-cannon {
    width: 100%;
    height: 100%;
  }
`
export const GridContainer = css`
  .grid-container {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: .5rem;
  }
`
export const GameGrid = css`
  .game-grid {
    padding: 1rem;

    border: 3px solid black;
    border-radius: 1rem;
    background-color: green;

    aspect-ratio: .5/.75;
    height: 100%;

    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(5, 1fr);
  }
`
export const Card = css`
  .card {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    transition: border .1s;
    border: 3px solid black;
    border-radius: 1rem;

    cursor: pointer;
    user-select: none;

    font-size: 1.5rem;

    min-width: 50px;
  }
`

// .face {
//   padding: .25rem;
//   background-color: white;
// }
//
// .empty {
//   padding: .25rem;
//   border: 3px dotted white;
// }
//
// .selected {
//   border: 3px solid yellow;
// }
//
// .back {
//   padding: .25rem;
//   background: radial-gradient(circle closest-side, blue, purple);
// }
//
// .hidden {
//   background: none;
//   border: none;
// }
//
// #deck {
//   grid-column: 1;
//   color: rgba(0,0,0,0);
// }
//
// #deck:not(.empty) {
//   color: yellow;
// }
//
// #hand {
//   grid-column: 2;
// }
//
// #aces {
//   color: white;
//   grid-column: 3;
// }
//
// #aces .empty {
//   color: white;
// }
//
// #jokers {
//   color: white;
//   grid-column: 4;
// }
//
// #jokers .empty {
//   color: white;
// }
//
// #discard {
//   grid-column: 5;
// }
