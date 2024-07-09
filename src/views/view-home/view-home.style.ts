import { css } from 'lit'

export const GameMenu = css`
  .game-menu {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
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
`
export const MenuOptions = css`
  .menu-options {
    width: 250px;
    display: flex;
    flex-direction: column;
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
    align-items: flex-start;
    justify-content: flex-start;
    gap: .75rem;
  }
`
