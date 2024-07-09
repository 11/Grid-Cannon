import { LitElement, html, css } from 'lit'
import { property } from 'lit/decorators.js'

export class ViewGame extends LitElement {
  render() {
    return html`
      <section class='grid-cannon hidden'>
        <div class='grid-container'>
          <div class='game-grid'>
            <div data-grid-x='0' data-grid-y='0' data-game-card='true' class='card hidden'>&nbsp;</div>
            <div data-grid-x='0' data-grid-y='1' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='0' data-grid-y='2' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='0' data-grid-y='3' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='0' data-grid-y='4' data-game-card='true' class='card hidden'>&nbsp;</div>
            <div data-grid-x='1' data-grid-y='0' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='1' data-grid-y='1' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='1' data-grid-y='2' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='1' data-grid-y='3' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='1' data-grid-y='4' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='2' data-grid-y='0' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='2' data-grid-y='1' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='2' data-grid-y='2' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='2' data-grid-y='3' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='2' data-grid-y='4' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='3' data-grid-y='0' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='3' data-grid-y='1' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='3' data-grid-y='2' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='3' data-grid-y='3' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='3' data-grid-y='4' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='4' data-grid-y='0' data-game-card='true' class='card hidden'>&nbsp;</div>
            <div data-grid-x='4' data-grid-y='1' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='4' data-grid-y='2' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='4' data-grid-y='3' data-game-card='true' class='card empty'>&nbsp;</div>
            <div data-grid-x='4' data-grid-y='4' data-game-card='true' class='card hidden'>&nbsp;</div>

            <div id='deck' class='card empty'>Deal</div>
            <div id='hand' class='card empty'>&nbsp;</div>
            <div id='aces' class='card empty'>Aces</div>
            <div id='jokers' class='card empty'>Jokers</div>
            <div id='discard' class='card empty'>&nbsp;</div>
          </div>
        </div>
      </section>
    `
  }
}

customElements.define('view-game', ViewGame)
