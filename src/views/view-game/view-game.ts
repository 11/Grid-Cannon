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
    S.ScoreBanner,
    S.GameOverBanner,
  ]

  static properties = {
    grid: { type: Array },
    hand: { type: Object },
    event: { type: String },
    score: { type: Number },
  }

  grid: Array<CardAttributes | null>
  hand: HandRenderState | null
  event: GameEvents
  score: number

  gameDeck: Deck | null
  gameGrid: Grid | null
  gameHand: Hand | null

  constructor() {
    super()

    this.grid = []
    this.hand = null
    this.event = GameEvents.SELECT_DECK
    this.score = 0



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

  private listDestroyedRoyals(): string[] {
    const result: string[] = []
    Array.from(Grid.ROYAL_POSITIONS).forEach(pos => {
      const gridX = parseInt(pos[0])
      const gridY = parseInt(pos[1])

      const royal = this.gameGrid?.peek(gridX, gridY)
      if (isNil(royal)) {
        return null
      }

      if (royal.IsDead) {
        result.push(royal.CardText)
      }
    })

    return result
  }

  private renderGrid() {
    return html`
      ${this.grid.map((cardAttr: CardAttributes | null, index: number) => {
        const gridX = Math.floor(index / GRID_SIZE_X)
        const gridY = Math.floor(index % GRID_SIZE_Y)

        if (Grid.HIDDEN_POSITIONS.has(`${gridX}${gridY}`)) {
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

        const isGameCard = !Grid.ROYAL_POSITIONS.has(`${gridX}${gridY}`)
        const isEmptyCardHighlightable = isNil(cardAttr)
          && !isNil(this.gameHand?.peekHand())
          && !this.gameHand?.peekHand()?.IsFace
          && (this.event === GameEvents.SELECT_ACE || this.event === GameEvents.SELECT_JOKER || this.event === GameEvents.SELECT_HAND)
          && isGameCard

        return html`
          <game-card
            .gridX=${gridX}
            .gridY=${gridY}
            .rank=${cardAttr?.rank}
            .suit=${cardAttr?.suit}
            .cardText=${cardAttr?.cardText}
            .isGameCard=${isGameCard}
            .isHidden=${false}
            .isEmpty=${isNil(cardAttr)}
            .isDead=${cardAttr?.isDead}
            .isHighlighted=${isEmptyCardHighlightable || cardAttr?.isHighlighted}
            .isFaceCard=${cardAttr?.isFace}
            .stackSize=${cardAttr?.stackSize}
            @click=${() => {

              if(!isGameCard || isNil(this.gameDeck) || isNil(this.gameGrid) || isNil(this.gameHand)) {
                return
              }

              if (
                this.event === GameEvents.SELECT_HAND
                || this.event === GameEvents.SELECT_ACE
                || this.event === GameEvents.SELECT_JOKER
              ) {
                const score = selectGridPosition(gridX, gridY, this.gameDeck, this.gameGrid, this.gameHand)
                this.score += score
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

  private renderHand() {
    let ace = null
    let joker = null
    let hand = null
    let discard = null
    if (!isNil(this.hand)) {
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
        .stackSize=${this.gameDeck?.Size}
        .cardText=${'Deal'}
        @click=${() => {
          if(isNil(this.gameDeck) || isNil(this.gameGrid) || isNil(this.gameHand)) {
            return
          }

          if (this.gameDeck.Size > 0) {
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
        .stackSize=${hand?.stackSize}
        @click=${() => {
          if(isNil(this.gameDeck) || isNil(this.gameGrid) || isNil(this.gameHand)) {
            return
          }

          selectHand(this.gameDeck, this.gameGrid, this.gameHand)
          this.grid = this.gameGrid.getRenderState()
          this.hand = this.gameHand.getRenderState()
          this.event = GameEvents.SELECT_HAND
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
        .stackSize=${this.gameHand?.acesSize()}
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
        .stackSize=${this.gameHand?.jokersSize()}
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
        .stackSize=${this.gameHand?.discardsSize()}
      >
      </game-card>
    `
  }

  private renderScoreBanner() {
    return html`
      <div class='score-banner'>
        Score: ${this.score}
      </div>
    `
  }

  private renderGameOverBanner(isWin: boolean) {
    const destroyedRoyals = this.listDestroyedRoyals()

    return html`
      <div class='game-over-banner-container'>
        <div class='game-over-banner'>
          <div class='title'>You ${isWin ? 'won!' : 'lost'}</div>
          <div class='score'>Score: ${this.score}</div>
          <div class='destroyed'>
            Royals destroyed (${destroyedRoyals.length}/12):<br>
            <div style='text-align: center; padding-top: .5rem;'>${destroyedRoyals.join(', ')}</div>
          </div>

          <div class='menu'>
            <div
              class='button primary'
              @click=${() => {
                const text = `Grid cannon\nScore: ${this.score}\nDestroyed (${destroyedRoyals.length}/12): ${destroyedRoyals.join(', ')}`
                navigator.clipboard.writeText(text)
              }}
            >
              Share result
            </div>

            <a class='button secondary' href='/'> New game</a>
          </div>
        <div>
      <div>
    `
  }

  render() {
    const isWin = this.gameGrid?.IsAllRoyalsDead ?? false
    const isLost = this.gameHand?.handSize() === 3
      && this.gameHand?.acesSize() === 0
      && this.gameHand?.jokersSize() === 0
      && !isNil(this.gameHand?.peekHand())
      && !this.gameGrid?.hasPlayablePosition(this.gameHand?.peekHand())

    console.log('isWin', isWin)
    console.log('isLost', isLost)

    return html`
      <section class='grid-cannon'>
        <div class='grid-container'>
          ${this.renderScoreBanner()}
          <div class='game-grid'>
            ${this.renderGrid()}
            ${this.renderHand()}
          </div>
        </div>
      </section>
      ${isWin || isLost ? this.renderGameOverBanner(isWin): null}
    `
  }
}

customElements.define('view-game', ViewGame)
