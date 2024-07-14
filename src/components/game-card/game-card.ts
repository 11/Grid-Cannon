import { LitElement, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import * as S from './game-card.style'
import { isNil } from 'lodash'

export class GameCard extends LitElement {
  static styles = [
    S.Card,
    S.CardFace,
    S.CardEmpty,
    S.CardSelected,
    S.CardBack,
    S.CardHidden,
  ]

  static properties = {
    gridX: { type: Number },
    gridY: { type: Number },
    isGameCard: { type: Boolean },
    isFaceShowing: { type: Boolean },
    isHidden: { type: Boolean},
    isEmpty: { type: Boolean },
    suit: { type: String },
    rank: { type: Number },
    cardText: { type: String },
  }

  gridX: number
  gridY: number
  isGameCard: boolean
  isFaceShowing: boolean
  isHidden: boolean
  isEmpty: boolean
  suit: string
  rank: number
  cardText: string | null

  constructor() {
    super()

    this.gridX = 0
    this.gridY = 0
    this.isGameCard = true
    this.isFaceShowing = true
    this.isHidden = false
    this.isEmpty = true
    this.suit = ''
    this.rank = -1
    this.cardText = null
  }

  private determineClass(): string {
    let classMap = ['card']

    if (!this.isFaceShowing) {
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

    if (!isNil(this.cardText)) {
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
        data-game-card=${this.isGameCard}
        data-game-is-face-showing=${this.isFaceShowing}
        data-is-empty=${this.isEmpty}
        data-suit=${this.suit}
        data-rank=${this.rank}
      >
        ${unsafeHTML(cardText)}
      </div>
    `
  }
}

customElements.define('game-card', GameCard)
