import { css } from 'lit'

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
    height: 90%;
  }

  .card[data-rank="0"] {
    color: purple;
  }

  .card[data-suit="DIAMOND"], .card[data-suit="HEART"] {
    color: red;
  }

  .card[data-suit="CLUB"], .card[data-suit="SPADE"] {
    color: black;
  }

  .card[data-is-dead="true"], .card[data-is-face-showing="false"] {
    padding: .25rem;
    background: radial-gradient(circle closest-side, blue, purple);
    color: yellow;
  }

  .card[data-is-highlighted="true"] {
    border: 3px solid yellow;
  }

  .card[data-is-empty="true"] {
    padding: .25rem;
    border: 3px dotted white;
  }

  .card[data-is-empty="false"] {
    padding: .25rem;
    background-color: white;
  }

  .card[data-is-hidden="true"] {
    background: none;
    border: none;
  }
`
