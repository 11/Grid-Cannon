import Card from './card'
import type { CardAttributes } from './card'
import CardStack from './card-stack'

export interface HandRenderState {
  hand: CardAttributes | null
  joker: CardAttributes | null
  ace: CardAttributes | null
  discard: CardAttributes | null
}

export default class Hand {
  private jokers: CardStack
  private aces: CardStack
  private discards: CardStack
  private hand: Card | null

  public constructor() {
    this.jokers = new CardStack()
    this.aces = new CardStack()
    this.discards = new CardStack()
    this.hand = null
  }

  public setup(): void {
    this.jokers = new CardStack()
    this.aces = new CardStack()
    this.discards = new CardStack()
    this.hand = null
  }

  public pushJokers(...card: Card[]): void {
    this.jokers.push(...card)
  }

  public popJokers(): Card | null {
    return this.jokers.pop()
  }

  public peekJokers(): Card | null {
    return this.jokers.peek()
  }

  public pushAces(...card: Card[]): void {
    this.aces.push(...card)
  }

  public popAces(): Card | null {
    return this.aces.pop()
  }

  public peekAces(): Card | null {
    return this.aces.peek()
  }

  public pushDiscards(...card: Card[]): void {
    this.discards.push(...card)
  }

  public popDiscards(): Card | null {
    return this.discards.pop()
  }

  public peekDiscards(): Card | null {
    return this.discards.peek()
  }

  public pushHand(card: Card): void {
    this.hand = card
  }

  public popHand(): Card | null {
    const card = this.hand
    this.hand = null
    return card
  }

  public peekHand(): Card | null {
    return this.hand
  }

  getRenderState(): HandRenderState {
    return {
      hand: this.hand?.toJSON() ?? null,
      joker: this.jokers.peek()?.toJSON() ?? null,
      ace: this.aces.peek()?.toJSON() ?? null,
      discard: this.discards.peek()?.toJSON() ?? null,
    }
  }
}
