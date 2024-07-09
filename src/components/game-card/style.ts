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
  }
`

export const CardFace = css`
  .face {
    padding: .25rem;
    background-color: white;
  }
`
export const CardEmpty = css`
  .empty {
    padding: .25rem;
    border: 3px dotted white;
  }
`

export const CardSelected = css`
  .selected {
    border: 3px solid yellow;
  }
`

export const CardBack = css`
  .back {
    padding: .25rem;
    background: radial-gradient(circle closest-side, blue, purple);
  }
`

export const CardHidden = css`
  .hidden {
    background: none;
    border: none;
  }
`
