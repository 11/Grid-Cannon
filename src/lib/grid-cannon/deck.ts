import { isNil } from 'lodash'
import Card, { CardFaces, CardSuits } from './card'
import CardStack from './card-stack'

export default class Deck {
  get Size() {
    return this.cards.Size
  }

  private cards: CardStack

  public constructor() {
    this.cards = new CardStack()
    this.buildNewOrderedDeck()
  }

  public buildNewOrderedDeck(reset: boolean = false): void {
    if (reset) {
      this.cards = new CardStack()
    }

    for (const suit of Object.values(CardSuits)) {
      if (suit === CardSuits.NULL) {
        continue
      }

      for (const name of Object.values(CardFaces)) {
        if (name === CardFaces.JOKER) {
          continue
        }

        const card = new Card(name, suit)
        this.cards.push(card)
      }
    }

    const joker1 = new Card(CardFaces.JOKER, CardSuits.NULL)
    const joker2 = new Card(CardFaces.JOKER, CardSuits.NULL)
    this.cards.push(joker1, joker2)
  }

  public deal(): Card | null {
    if (this.Size === 0) {
      // this.reset()
      this.cards.shuffle()
    }

    return this.cards.pop()
  }

  public shuffle(): void {
    this.cards.shuffle()
  }

  public peek(): Card | null {
    return this.cards.peek()
  }

  public pop(): Card | null {
    return this.cards.pop()
  }

  public push(...cards: Card[]): boolean {
    this.cards.placeAtBottom(...cards)
    return true
  }

  public flipToNextRoyal(): boolean {
    // flip through the deck until we find a face card
    // or run out of cards
    let tempPile: Card[] = []
    let card
    while (card = this.peek()) {
      if (isNil(card)) {
        break
      }

      if (card.IsFace) {
        break
      } else {
        this.pop()
        tempPile.push(card)
      }
    }

    // if there are no more cards in thd deck, then we failed to find a royal
    if (this.Size === 0) {
      return false
    }

    // put cards back in at the bottom of the deck and return true
    this.push(...tempPile)
    return true
  }
}
