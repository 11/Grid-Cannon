import { css } from 'lit'
import * as device from '@/lib/device'

export const StartScreen = css`
  .start-screen {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
  }
`

export const GameMenu = css`
  .game-menu {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3.5rem;
  }
`

export const GameHeadline = css`
  .game-headline {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .75rem;
  }

  @media screen and (max-width: ${device.PHONE_WIDTH}) {
    .game-headline {
      padding: 1rem;
    }
  }
`

export const Title = css`
  .title {
    font-size: 4rem;
  }
`

export const Tagline = css`
  .tagline {
    font-size: 2rem;
    letter-spacing: .5px;
  }

  @media screen and (max-width: ${device.PHONE_WIDTH}) {
    .tagline {
      text-align: center;
      font-size: 1.5rem;
    }
  }
`
export const MenuOptions = css`
  .menu-options {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: .75rem;
  }
`

export const Button = css`
  button {
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    padding: 1rem 2rem;
    border: 2px solid black;
    border-radius: 2rem;
  }
`

export const Primary = css`
  .primary {
    background-color: black;
    color: white;
    text-decoration: underline
  }
`

export const Secondary = css`
  .secondary {
    padding: 1rem;
    color: black;
  }
`

export const Credits = css`
  .credits {
    font-family: 'Roboto', sans-serif;
    font-weight: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: .75rem;
  }

  @media screen and (max-width: ${device.PHONE_WIDTH}) {
    .credits {
      padding: 1rem;
    }
  }
`
