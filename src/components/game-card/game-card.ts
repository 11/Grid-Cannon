import { LitElement, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import * as S from './game-card.style'
import { isNil } from 'lodash'
import * as device from '@/lib/device'
import Grid from '@/lib/grid-cannon/grid'

export class GameCard extends LitElement {
  static styles = [
    S.Card,
    S.CardArmor,
    S.CardText,
    S.CardStat,
  ]

  static properties = {
    gridX: { type: Number },
    gridY: { type: Number },
    suit: { type: String },
    rank: { type: Number },
    cardText: { type: String },
    stackSize: { type: Number },
    isGameCard: { type: Boolean },
    isHandCard: { type: Boolean },
    isFaceShowing: { type: Boolean },
    isHidden: { type: Boolean},
    isEmpty: { type: Boolean },
    isHighlighted: { type: Boolean },
    isDead: { type: Boolean },
    isFace: { type: Boolean },
  }

  gridX: number
  gridY: number
  suit: string
  rank: number
  cardText: string | null
  stackSize: number
  isGameCard: boolean
  isHandCard: boolean
  isFaceShowing: boolean
  isHidden: boolean
  isEmpty: boolean
  isHighlighted: boolean
  isDead: boolean
  isFace: boolean

  constructor() {
    super()

    this.gridX = 0
    this.gridY = 0
    this.suit = ''
    this.rank = -1
    this.cardText = null
    this.stackSize = 0
    this.isGameCard = false
    this.isHandCard = false
    this.isFaceShowing = true
    this.isHidden = false
    this.isEmpty = true
    this.isHighlighted = false
    this.isDead = false
    this.isFace = false
  }

  private renderCardText() {
    let cardText = '&nbsp;'
    if (!isNil(this.cardText) && !this.isDead) {
      cardText = this.cardText
    }

    // display abbreviated card text on mobile
    if (window.innerWidth <= device.PHONE_WIDTH) {
      switch (cardText) {
        case 'Aces':
          // cardText = 'A A'
          break
        case 'Jokers':
          // cardText = '$ $'
          break
        case 'JOKER':
          cardText = 'J $'
          break
        case 'Discard':
          cardText = 'Used'
          break
      }
    }

    return html`
      <div class='card-text'>${unsafeHTML(cardText)}</div>
    `
  }


  private renderCardArmor() {
    if (!this.isFace) {
      return html`<div class='card-armor'>&nbsp;</div>`
    }

    return html`
      <div class='card-armor'></div>
    `
  }

  renderCardStat() {
    if (this.isHidden || this.isEmpty || this.isDead  || Grid.ROYAL_POSITIONS.has(`${this.gridX}${this.gridY}`)) {
      return html`
        <div class='card-stat'>&nbsp;</div>
    `
    }

    return html`
      <div
        class='card-stat'
        data-is-face-showing=${this.isFaceShowing}
      >
        x${this.stackSize}
      </div>
    `
  }

  render() {
    return html`
      <div
        class='card'
        data-grid-x=${this.gridX}
        data-grid-y=${this.gridY}
        data-suit=${this.suit}
        data-rank=${this.rank}
        data-is-game-card=${this.isGameCard}
        data-is-hand-card=${this.isHandCard}
        data-is-face-showing=${this.isFaceShowing}
        data-is-empty=${this.isEmpty}
        data-is-highlighted=${this.isHighlighted}
        data-is-dead=${this.isDead}
        data-is-hidden=${this.isHidden}
        data-is-face=${this.isFace}
      >
        ${this.renderCardArmor()}
        ${this.renderCardText()}
        ${this.renderCardStat()}
      </div>
    `
  }
}

customElements.define('game-card', GameCard)
