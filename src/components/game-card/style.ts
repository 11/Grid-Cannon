import { css } from 'lit'
import * as device from '@/lib/device'

export const Card = css`
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    transition: border .1s;
    border: 4px solid black;
    border-radius: 1rem;

    cursor: pointer;
    user-select: none;

    font-size: 1.5rem;
    box-sizing: border-box;

    min-width: 50px;
    height: 100%;
  }

  .card[data-suit="NULL"] {
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

  .card[data-is-hand-card="false"][data-is-hidden="false"][data-is-empty="true"] {
    padding: .25rem;
    color: white;
    /* this border is to keep the cards the same width and height with crads that have a border*/
    border: 4px solid #005900;
    background-color: #005900;
  }

  /* need this to do so highlight orange works on empty grid positions */
  .card[data-is-hand-card="false"][data-is-hidden="false"][data-is-empty="true"][data-is-highlighted="true"] {
    padding: .25rem;
    color: white;
    border: 4px solid orange;
    background-color: #005900;
  }

  .card[data-is-highlighted="true"] {
    border: 4px solid orange;
  }

  /* css for the */
  .card[data-is-hand-card="true"][data-is-empty="true"] {
    border: 2px dotted white;
    background-color: #005900;
    color: white;
    padding: .25rem;
  }

  .card[data-is-empty="false"] {
    padding: .35rem;
    background-color: white;
  }

  .card[data-is-hidden="true"] {
    background: none;
    border: none;
  }

  @media screen and (max-width: ${device.PHONE_WIDTH_CSS}) {
    .card {
      min-width: 10px;
      font-size: 1.25rem;
    }
  }
`

export const CardText = css`
  .card-text {
    font-size: 1.25rem;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .card-text[data-bottom="true"] {
    transform: rotate(180deg);
  }
`

export const CardGrid = css`
  .card-grid {
    display: grid;
    width: 100%;
    height: 90%;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    justify-items: center;
    align-items: center;
    font-size: 1.6rem;
  }

  .card-symbol-0 { opacity: 0; }
  .card-symbol-1 { font-size: 7rem; }
  .card-symbol-2 { opacity: 0; }
  .card-symbol-3 { opacity: 0; }
  .card-symbol-4 { opacity: 0;}
  .card-symbol-5 { opacity: 0; }
  .card-symbol-6 { opacity: 0; }
  .card-symbol-7 { opacity: 0; }
  .card-symbol-8 { opacity: 0; }
  .card-symbol-9 { opacity: 0; }
  .card-symbol-10 { opacity: 0; }
  .card-symbol-11 { opacity: 0; }
`
