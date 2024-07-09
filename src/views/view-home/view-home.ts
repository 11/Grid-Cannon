import { html, LitElement } from 'lit'
import * as S from './view-home.style'

export class ViewHome extends LitElement {
  static styles = [
    S.GameMenu,
    S.GameHeadline,
    S.Title,
    S.Tagline,
    S.MenuOptions,
    S.Button,
    S.Primary,
    S.Secondary,
    S.Credits
  ]

  render() {
    return html`
      <section class='start-screen'>
        <div class='game-menu'>
          <div class='game-headline'>
            <div class='title'> Grid Cannon </div>
            <div class='tagline'>Kill all 12 royals before running out cards.</div>
          </div>
          <div class='menu-options'>
            <button class='primary' type='button' onclick='window.game.startEasy()'>Daily board</button>
            <button class='secondary' type='button' onclick='window.game.startIntermediate()'>New game</button>
            <button class='secondary' type='button' onclick=''>How to play</button>
          </div>
          <div class='credits'>
            <div>Website programmed and designed by <a href="https://doug.art">Doug Rudolph</a></div>
          </div>
        </div>
      </section>
    `
  }
}

customElements.define('view-home', ViewHome)
