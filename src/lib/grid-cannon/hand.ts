import { isNil } from 'lodash'
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
  private hand: CardStack

  public constructor() {
    this.jokers = new CardStack()
    this.aces = new CardStack()
    this.discards = new CardStack()
    this.hand = new CardStack
  }

  public setup(): void {
    this.jokers = new CardStack()
    this.aces = new CardStack()
    this.discards = new CardStack()
    this.hand = new CardStack()
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

  public jokersSize(): number {
    return this.jokers.Size
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

  public acesSize(): number {
    return this.aces.Size
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

  public discardsSize(): number {
    return this.discards.Size
  }

  public pushHand(card: Card): void {
    this.hand.push(card)
  }

  public popHand(): Card | null {
    return this.hand.pop()
  }

  public peekHand(): Card | null {
    return this.hand.peek()
  }

  public handSize(): number {
    return this.hand.Size
  }

  getRenderState(): HandRenderState {
    this.hand.peek()?.update({ stackSize: this.handSize() })
    const hand = this.hand.peek()?.toJSON() ?? null

    this.jokers.peek()?.update({ stackSize: this.jokersSize() })
    const joker = this.jokers.peek()?.toJSON() ?? null

    this.aces.peek()?.update({ stackSize: this.acesSize() })
    const ace = this.aces.peek()?.toJSON() ?? null

    this.discards.peek()?.update({ stackSize: this.discardsSize() })
    const discard = this.discards.peek()?.toJSON() ?? null

    return {
      hand,
      joker,
      ace,
      discard,
    }
  }
}
