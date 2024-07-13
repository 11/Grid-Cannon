import { LitElement, html, css, PropertyValueMap } from 'lit'
import * as S from './view-game.style'

import '@/components/game-card/'
import type { CardAttributes } from './grid-cannon/card'
import Deck from './grid-cannon/deck'
import Grid, { GRID_SIZE_X, GRID_SIZE_Y } from './grid-cannon/grid'
import Hand, { HandRenderState } from './grid-cannon/hand'
import { dealGame } from './grid-cannon/controls'
import { isNil } from 'lodash'

export class ViewGame extends LitElement {
  static styles = [
    S.GridCannon,
    S.GridContainer,
    S.GameGrid,
  ]

  static properties = {
    grid: { type: Array },
    aces: { type: Array },
    jokers: { type: Array },
    hand: { type: Object },
    event: { typep: String },
  }

  grid: Array<CardAttributes | null>
  hand: HandRenderState | null
  event: string | null

  gameDeck: Deck | null
  gameGrid: Grid | null
  gameHand: Hand | null

  constructor() {
    super()

    this.grid = []
    this.hand = null
    this.event = null

    this.gameGrid = null
    this.gameHand = null
    this.gameDeck = null
  }

  public connectedCallback(): void {
    super.connectedCallback()

    const { deck, grid, hand } = dealGame()
    this.gameDeck = deck
    this.gameGrid = grid
    this.gameHand = hand

    this.grid = this.gameGrid.getRenderState()
    this.hand = this.gameHand.getRenderState()
    this.event = 'deal'
  }

  renderGrid() {
    return html`
      ${this.grid.map((cardAttr: CardAttributes | null, index: number) => {
        const gridX = Math.floor(index / GRID_SIZE_X)
        const gridY = Math.floor(index % GRID_SIZE_Y)

        if (Grid.EMPTY_POSITIONS.has(`${gridX}${gridY}`)) {
          return html`
            <game-card
              .gridX=${gridX}
              .gridY=${gridY}
              .isGameCard=${false}
              .isHidden=${true}
            >
            </game-card>
          `
        }

        return html`
          <game-card
            .gridX=${gridX}
            .gridY=${gridY}
            .isGameCard=${true}
            .isHidden=${false}
            .isEmpty=${isNil(cardAttr)}
          >
            ${cardAttr?.cardText}
          </game-card>
        `
      })}
    `
  }

  renderHand() {
    let ace = null
    let joker = null
    let hand = null
    if (!isNil(this.hand )) {
      ace = this.hand.ace
      joker = this.hand.joker
      hand = this.hand.hand
    }

    return html`
      <game-card
        id='deck'
        .isEmpty=${(this.gameDeck?.Size === 0)}
        .isFaceShowing=${false}
      >
        Deal
      </game-card>

      <game-card
        id='hand'
        .isEmpty=${isNil(hand)}
      >
        ${hand?.cardText}
      </game-card>

      <game-card
        id='aces'
        .isEmpty=${isNil(ace)}
      >
        ${!isNil(ace)
          ? html`${ace.cardText}`
          : html`Aces`}
      </game-card>

      <game-card
        id='jokers'
        .isEmpty=${true}
      >
        ${!isNil(joker)
          ? html`${joker.cardText}`
          : html`Jokers`}
      </game-card>

      <game-card
        id='discard'
        .isEmpty=${true}
      >
      </game-card>
    `
  }

  render() {
    return html`
      <section class='grid-cannon hidden'>
        <div class='grid-container'>
          <div class='game-grid'>
            ${this.renderGrid()}
            ${this.renderHand()}
          </div>
        </div>
      </section>
    `
  }
}

customElements.define('view-game', ViewGame)
