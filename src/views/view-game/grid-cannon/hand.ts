import { isNil } from 'lodash'
import Card from './card'
import type { CardAttributes } from './card'
import CardStack from './card-stack'
import Deck from './deck'

export interface HandRenderState {
  hand: CardAttributes | null
  joker: CardAttributes | null
  ace: CardAttributes | null
}

export default class Hand {
  private jokers: CardStack
  private aces: CardStack
  private hand: Card | null

  public constructor() {
    this.jokers = new CardStack()
    this.aces = new CardStack()
    this.hand = null
  }

  public setup(): void {
    this.jokers = new CardStack()
    this.aces = new CardStack()
    this.hand = null
  }

  public putJoker(card: Card): void {
    this.jokers.push(card)
  }

  public popJoker(): Card | null {
    return this.jokers.pop()
  }

  public putAce(card: Card): void {
    this.aces.push(card)
  }

  public popAce(): Card | null {
    return this.aces.pop()
  }

  public drawCard(deck: Deck): void {
    const dealtCard = deck.pop()
    if (isNil(dealtCard)) {
      return
    }

    this.hand = dealtCard
  }

  public popCard(): Card | null {
    if (isNil(this.hand)) {
      return null
    }

    const card = this.hand
    this.hand = null
    return card
  }

  getRenderState(): HandRenderState {
    return {
      hand: this.hand?.toJSON() ?? null,
      joker: this.jokers.peek()?.toJSON() ?? null,
      ace: this.aces.peek()?.toJSON() ?? null,
    }
  }
}
