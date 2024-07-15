import { css } from 'lit'
import * as device from '../../lib/device'

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
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(5, 1fr);

    padding: 1rem;
    background-color: green;

    height: 100%;
    max-width: 95%;
    aspect-ratio: .5/.75;
  }

  @media screen and (max-width: ${device.PHONE_WIDTH_CSS}) {
    .game-grid {
      grid-gap: .5rem;
    }
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
