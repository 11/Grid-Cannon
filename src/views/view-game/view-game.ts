import { LitElement, html, css, PropertyValueMap } from 'lit'
import * as S from './view-game.style'

import '@/components/game-card/'
import type { CardAttributes } from '../../lib/grid-cannon/card'
import Deck from '../../lib/grid-cannon/deck'
import Grid, { GRID_SIZE_X, GRID_SIZE_Y } from '../../lib/grid-cannon/grid'
import Hand, { HandRenderState } from '../../lib/grid-cannon/hand'
import { dealGame, drawHand, selectAce, selectGridPosition, selectHand, selectJoker } from '../../lib/grid-cannon/controls'
import { isNil } from 'lodash'

export enum GameEvents {
  SELECT_DECK,
  SELECT_HAND,
  SELECT_JOKER,
  SELECT_ACE,
  SELECT_GRID_POSITION,
}

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
    event: { type: String },
  }

  grid: Array<CardAttributes | null>
  hand: HandRenderState | null
  event: GameEvents

  gameDeck: Deck | null
  gameGrid: Grid | null
  gameHand: Hand | null

  constructor() {
    super()

    this.grid = []
    this.hand = null
    this.event = GameEvents.SELECT_DECK

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
  }

  protected shouldUpdate(changedProperties: Map<string | number | symbol, unknown>): boolean {
    super.update(changedProperties);
    const eventNew = changedProperties.get('event')
    return this.event !== eventNew
  }

  renderGrid() {
    return html`
      ${this.grid.map((cardAttr: CardAttributes | null, index: number) => {
        const gridX = Math.floor(index / GRID_SIZE_X)
        const gridY = Math.floor(index % GRID_SIZE_Y)

        if (Grid.HIDDEN_POSITIONS.has(`${gridX}${gridY}`)) {
          console.log(`${gridX}x${gridY}`)
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

        const isGameCard = !Grid.FACE_POSITIONS.has(`${gridX}${gridY}`)
        const isEmptyCardHighlightable = isNil(cardAttr)
          && !isNil(this.gameHand?.peekHand())
          && !this.gameHand?.peekHand()?.IsFace
          && (this.event === GameEvents.SELECT_ACE || this.event === GameEvents.SELECT_JOKER || this.event === GameEvents.SELECT_HAND)
          && isGameCard

        if (gridX === 2 && gridY === 2) {
          console.log(`${gridX}x${gridY}`, isEmptyCardHighlightable)
          console.log(isNil(cardAttr), !isNil(this.gameHand?.peekHand()), !this.gameHand?.peekHand()?.IsFace, (this.event === GameEvents.SELECT_ACE || this.event === GameEvents.SELECT_JOKER || this.event === GameEvents.SELECT_HAND),isGameCard)
        }

        return html`
          <game-card
            .gridX=${gridX}
            .gridY=${gridY}
            .suit=${cardAttr?.suit}
            .cardText=${cardAttr?.cardText}
            .isGameCard=${isGameCard}
            .isHidden=${false}
            .isEmpty=${isNil(cardAttr)}
            .isDead=${cardAttr?.isDead}
            .isHighlighted=${isEmptyCardHighlightable || cardAttr?.isHighlighted}
            @click=${() => {
              if(isNil(this.gameDeck) || isNil(this.gameGrid) || isNil(this.gameHand)) {
                return
              }

              if (
                this.event === GameEvents.SELECT_HAND
                || this.event === GameEvents.SELECT_ACE
                || this.event === GameEvents.SELECT_JOKER
              ) {
                selectGridPosition(gridX, gridY, this.gameDeck, this.gameGrid, this.gameHand)
                this.grid = this.gameGrid.getRenderState()
                this.hand = this.gameHand.getRenderState()
                this.event = GameEvents.SELECT_GRID_POSITION
              }
            }}
          >
          </game-card>
        `
      })}
    `
  }

  renderHand() {
    let ace = null
    let joker = null
    let hand = null
    let discard = null
    if (!isNil(this.hand )) {
      ace = this.hand.ace
      joker = this.hand.joker
      discard = this.hand.discard
      hand = this.hand.hand
    }

    return html`
      <game-card
        id='deck'
        .isEmpty=${(this.gameDeck?.Size === 0)}
        .isFaceShowing=${this.gameDeck?.Size === 0}
        .cardText=${'Deal'}
        @click=${() => {
          if(isNil(this.gameDeck) || isNil(this.gameGrid) || isNil(this.gameHand)) {
            return
          }

          if (isNil(this.gameHand.peekHand()) && this.gameDeck.Size > 0) {
            drawHand(this.gameDeck, this.gameGrid, this.gameHand)
            this.grid = this.gameGrid.getRenderState()
            this.hand = this.gameHand.getRenderState()
            this.event = GameEvents.SELECT_DECK
          }
        }}
      >
      </game-card>

      <game-card
        id='hand'
        .isEmpty=${isNil(hand)}
        .cardText=${hand?.cardText}
        .isHighlighted=${hand?.isHighlighted}
        .isGameCard=${true}
        .suit=${hand?.suit}
        @click=${() => {
          if(isNil(this.gameDeck) || isNil(this.gameGrid) || isNil(this.gameHand)) {
            return
          }

          if (!isNil(this.gameHand.peekHand())) {
            selectHand(this.gameDeck, this.gameGrid, this.gameHand)
            this.grid = this.gameGrid.getRenderState()
            this.hand = this.gameHand.getRenderState()
            this.event = GameEvents.SELECT_HAND
          }
        }}
      >
      </game-card>

      <game-card
        id='aces'
        .isEmpty=${isNil(ace)}
        .cardText=${!isNil(ace) ? ace.cardText : 'Aces'}
        .isHighlighted=${ace?.isHighlighted}
        .isGameCard=${true}
        .suit=${ace?.suit}
        .rank=${ace?.rank}
        @click=${() => {
          if(isNil(this.gameDeck) || isNil(this.gameGrid) || isNil(this.gameHand)) {
            return
          }

          selectAce(this.gameDeck, this.gameGrid, this.gameHand)
          this.grid = this.gameGrid.getRenderState()
          this.hand = this.gameHand.getRenderState()
          this.event = GameEvents.SELECT_ACE
        }}
      >
      </game-card>

      <game-card
        id='jokers'
        .isEmpty=${isNil(joker)}
        .cardText=${!isNil(joker) ? joker?.cardText : 'Jokers' }
        .suit=${joker?.suit}
        .rank=${joker?.rank}
        .isHighlighted=${joker?.isHighlighted}
        @click=${() => {
          if(isNil(this.gameDeck) || isNil(this.gameGrid) || isNil(this.gameHand)) {
            return
          }

          selectJoker(this.gameDeck, this.gameGrid, this.gameHand)
          this.grid = this.gameGrid.getRenderState()
          this.hand = this.gameHand.getRenderState()
          this.event = GameEvents.SELECT_JOKER
        }}
      >
      </game-card>

      <game-card
        id='discard'
        .isEmpty=${isNil(discard)}
        .isFaceShowing=${isNil(discard)}
        .isGameCard=${true}
        .cardText=${isNil(discard) ? 'Discard' : '&nbsp;'}
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
