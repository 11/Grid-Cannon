import { css } from 'lit'
import * as device from '../../lib/device'

export const GridCannon = css`
  .grid-cannon {
    width: 100svw;
    height: 100svh;
    max-width: 100svw;
    max-height: 100svh;
    overflow: hidden;
    z-index: 1;
    position: absolute;
    left: 0px;
    top: 0px;
  }
`
export const GridContainer = css`
  .grid-container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .5rem;
  }

  @media screen and (max-width: ${device.PHONE_WIDTH_CSS}) {
    .grid-container {
      gap: 0;
    }
  }
`
export const GameGrid = css`
  .game-grid {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(5, 1fr);

    padding: 1rem;
    background-color: green;

    height: 95%;
    max-width: 95%;
    aspect-ratio: .5/.75;
  }

  @media screen and (max-width: ${device.PHONE_WIDTH_CSS}) {
    .game-grid {
      grid-gap: .5rem;
      margin-bottom: 1.5rem;
    }
  }
`

export const ScoreBanner = css`
  .score-banner {
    color: white;
    font-size: 1.5rem;
    padding-top: .5rem;
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

export const GameOverBanner = css`
  .game-over-banner-container {
    width: 100svw;
    height: 100svh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    position: relative;
  }

  .game-over-banner {
    min-width: 50%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;

    background-color: white;
    color: black;
    border: 3px solid black;
    border-radius: .5rem;
    padding: 1rem;
    z-index: 100;
  }

  .game-over-banner .title {
    font-size: 2.25rem;
  }

  .game-over-banner .score{
    font-size: 1.25rem;
  }

  .game-over-banner .destroyed {
  }

  .game-over-banner .share {
    max-width: 50%;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    padding: 1rem 1.5rem;
    border: 2px solid black;
    border-radius: 2rem;
    color: white;
    background-color: black;
    text-decoration: underline;
    cursor: pointer;
  }

  @media screen and (max-width: ${device.PHONE_WIDTH_CSS}) {
    .game-over-banner {
      width: 100%;
    }
  }
`
