import Card from './card.js'
import CardStack from './card-stack.js'

export default class Deck {
  get deckHtml() {
    return document.querySelector('#deck')
  }

  get size() {
    return this._cards.size
  }

  get hasCardInDeck() {
    return this._cards.size > 0
  }

  constructor() {
    this._cards = new CardStack()
    this.newOrderedDeck()
  }

  bindGameEvents(drawHandEvent) {
    this.deckHtml.onclick = drawHandEvent.bind(window.game)
  }

  newOrderedDeck() {
    this._cards = new CardStack()
    for (const suit of Object.keys(Card.Suits)) {
      for (const face of Object.keys(Card.Names)) {
        if (face === Card.Names.JOKER) {
          continue
        }

        this._cards.push(new Card(face, suit, null, null))
      }
    }

    this._cards.push(new Card(Card.Names.JOKER, null, null, null))
    this._cards.push(new Card(Card.Names.JOKER, null, null, null))
  }

  shuffle() {
    this._cards.shuffle()
  }

  pop() {
    return this._cards.pop()
  }

  deal() {
    if (this.size === 0) {
      this.reset()
      this.shuffle()
    }

    return this._cards.pop()
  }

  render() {
    const deckHtml = this.deckHtml
    if (this.length === 0) {
      deckHtml.classList.add('empty')
      deckHtml.classList.remove('back')
    } else {
      deckHtml.classList.add('back')
      deckHtml.classList.remove('empty')
    }
  }

  toString() {
    return this._cards
      .map(card => card.abbreviation)
      .join('\n')
  }
}
