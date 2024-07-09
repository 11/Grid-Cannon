import { LitElement, html, css } from 'lit'
import * as S from './view-game.style'

import '@/components/game-card/'

export class ViewGame extends LitElement {
  static styles = [
    S.GridCannon,
    S.GridContainer,
    S.GameGrid,
  ]

  render() {
    return html`
      <section class='grid-cannon hidden'>
        <div class='grid-container'>
          <div class='game-grid'>
            <game-card .gridX='${0}' .gridY='${0}' .isGameCard='${true}' .isHidden=${true} .isEmpty=${false}>&nbsp;</game-card>
            <game-card .gridX='${0}' .gridY='${1}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${0}' .gridY='${2}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${0}' .gridY='${3}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${0}' .gridY='${4}' .isGameCard='${true}' .isHidden=${true} .isEmpty=${false}>&nbsp;</game-card>

            <game-card .gridX='${1}' .gridY='${0}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${1}' .gridY='${1}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${1}' .gridY='${2}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${1}' .gridY='${3}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${1}' .gridY='${4}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>

            <game-card .gridX='${2}' .gridY='${0}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${2}' .gridY='${1}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${2}' .gridY='${2}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${2}' .gridY='${3}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${2}' .gridY='${4}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>

            <game-card .gridX='${3}' .gridY='${0}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${3}' .gridY='${1}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${3}' .gridY='${2}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${3}' .gridY='${3}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${3}' .gridY='${4}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>

            <game-card .gridX='${4}' .gridY='${0}' .isGameCard='${true}' .isHidden=${true} .isEmpty=${false}>&nbsp;</game-card>
            <game-card .gridX='${4}' .gridY='${1}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${4}' .gridY='${2}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${4}' .gridY='${3}' .isGameCard='${true}' .isHidden=${false} .isEmpty=${true}>&nbsp;</game-card>
            <game-card .gridX='${4}' .gridY='${4}' .isGameCard='${true}' .isHidden=${true} .isEmpty=${false}>&nbsp;</game-card>

            <game-card id='deck' .isEmpty=${true}>Deal</game-card>
            <game-card id='hand' .isEmpty=${true}>&nbsp;</game-card>
            <game-card id='aces' .isEmpty=${true}>Aces</game-card>
            <game-card id='jokers' .isEmpty=${true}>Jokers</game-card>
            <game-card id='discard' .isEmpty=${true}>&nbsp;</game-card>
          </div>
        </div>
      </section>
    `
  }
}

customElements.define('view-game', ViewGame)
