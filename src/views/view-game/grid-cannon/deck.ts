import Card, { CardFaces, CardSuits } from './card.js'
import CardStack from './card-stack.js'

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

  public pop(): Card | null {
    return this.cards.pop()
  }

  public push(...cards: Card[]): boolean {
    this.cards.push(...cards)
    return true
  }
}
