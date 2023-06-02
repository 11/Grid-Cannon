import Card from './card.js'

export default class Deck {
  get length() {
    return this.card.length
  }

  constructor() {
    this.cards = []
    this.create()
  }

  create() {
    this.cards = []
    for (const suit of Object.keys(Card.SUITS)) {
      for (const face of Object.keys(Card.NAMES)) {
        if (face === Card.NAMES.JOKER) {
          continue
        }

        this.cards.push(new Card(face, suit, null, null))
      }
    }

    this.cards.push(new Card(Card.NAMES.JOKER, null, null, null))
    this.cards.push(new Card(Card.NAMES.JOKER, null, null, null))
  }

  reset() {
    this.create()
  }

  top() {
    return this.cards.shift()
  }

  cut() {
    // the cut range is + or - 6 indicies away from the middle of the deck
    const half = (this.cards.length / 2) - 1
    const delta = 6

    // randomly select a card within is this range
    const min = Math.ceil(half - delta)
    const max = Math.ceil(half + delta)
    const cutIndex = Math.floor(Math.random() * (max - min) + min)

    // a cut is the same as rotating an array. split the deck into 2 halvse and rotate
    const cutPile = this.cards.splice(cutIndex)
    this.cards.unshift(...cutPile)
  }

  riffle() {
    const half = (this.cards.length / 2)
    const cutPile = this.cards.splice(half)

    for (let i = 0; i < half; i++) {
      this.cards.splice(i*2, 0, cutPile.shift())
    }
  }

  shuffle() {
    for (let i = 0; i < 100; i++) {
      this.cut()
      this.riffle()
    }
  }

  toString() {
    return this.cards
      .map(card => card.abbreviation)
      .join('\n')
  }
}
