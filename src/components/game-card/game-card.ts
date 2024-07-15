import { LitElement, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import * as S from './game-card.style'
import { isNil } from 'lodash'

export class GameCard extends LitElement {
  static styles = [
    S.Card,
    // S.CardFace,
    // S.CardEmpty,
    // S.CardSelected,
    // S.CardBack,
    // S.CardHidden,
  ]

  static properties = {
    gridX: { type: Number },
    gridY: { type: Number },
    suit: { type: String },
    rank: { type: Number },
    cardText: { type: String },
    isGameCard: { type: Boolean },
    isFaceShowing: { type: Boolean },
    isHidden: { type: Boolean},
    isEmpty: { type: Boolean },
    isHighlighted: { type: Boolean },
    isDead: { type: Boolean },
    stackSize: { type: Number },
  }

  gridX: number
  gridY: number
  suit: string
  rank: number
  cardText: string | null
  isGameCard: boolean
  isFaceShowing: boolean
  isHidden: boolean
  isEmpty: boolean
  isHighlighted: boolean
  isDead: boolean
  stackSize: number

  constructor() {
    super()

    this.gridX = 0
    this.gridY = 0
    this.suit = ''
    this.rank = -1
    this.cardText = null
    this.isGameCard = true
    this.isFaceShowing = true
    this.isHidden = false
    this.isEmpty = true
    this.isHighlighted = false
    this.isDead = false
    this.stackSize = 0
  }

  private determineClass(): string {
    let classMap = ['card']

    if (!this.isFaceShowing || this.isDead) {
      classMap.push('back')
    }

    if (this.isEmpty) {
      classMap.push('empty')
    } else {
      classMap.push('face')
    }

    if (this.isHidden) {
      classMap.push('hidden')
    }

    return classMap.join(' ')
  }

  private determineCardText(): string {
    let cardText = '&nbsp;'
    if (!isNil(this.cardText) && !this.isDead) {
      cardText = this.cardText
    }

    return cardText
  }

  render() {
    const classMap = this.determineClass()
    const cardText = this.determineCardText()

    return html`
      <div
        class=${classMap}
        data-grid-x=${this.gridX}
        data-grid-y=${this.gridY}
        data-suit=${this.suit}
        data-rank=${this.rank}
        data-game-card=${this.isGameCard}
        data-is-face-showing=${this.isFaceShowing}
        data-is-empty=${this.isEmpty}
        data-is-highlighted=${this.isHighlighted}
        data-is-dead=${this.isDead}
        data-is-hidden=${this.hidden}
      >
        ${unsafeHTML(cardText)}
      </div>
    `
  }
}

customElements.define('game-card', GameCard)
