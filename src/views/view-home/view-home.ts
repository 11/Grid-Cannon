import { html, LitElement } from 'lit'
import * as S from './view-home.style'
import '@/elements/web-link'

export class ViewHome extends LitElement {
  static styles = [
    S.StartScreen,
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
            <div class='tagline'>Destroy all 12 royals as fast as you can</div>
          </div>
          <div class='menu-options'>
            <web-link href='/new-game'>New game </web-link>
            <web-link .usePrimary=${false} .secondary=${true} href='/'>How to play</web-link>
          </div>
          <div class='credits'>
            <div>Website designed and programmed by <a target="_blank" href="https://doug.art">Doug Rudolph</a></div>
            <div>Game concept by <a target="_blank" href="https://www.pentadact.com/">Tom Francis</a></div>
          </div>
        </div>
      </section>
    `
  }
}

customElements.define('view-home', ViewHome)
