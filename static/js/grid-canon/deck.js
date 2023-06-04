import Card from './card.js'

export default class Deck {
  get deckHtml() {
    return document.querySelector('#deck')
  }

  get length() {
    return this._cards.length
  }

  constructor() {
    this._cards = []
    this._used = []
    this.newOrderedDeck()
  }

  newOrderedDeck() {
    this._cards = []
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

  cut() {
    // the cut range is + or - 6 indicies away from the middle of the deck
    const half = (this._cards.length / 2) - 1
    const delta = 6

    // randomly select a card within is this range
    const min = Math.ceil(half - delta)
    const max = Math.ceil(half + delta)
    const cutIndex = Math.floor(Math.random() * (max - min) + min)

    // a cut is the same as rotating an array. split the deck into 2 halvse and rotate
    const cutPile = this._cards.splice(cutIndex)
    this._cards.unshift(...cutPile)
  }

  // TODO: Make sure riffle works with odd numbered deck
  riffle() {
    const half = (this._cards.length / 2)
    const cutPile = this._cards.splice(half)

    for (let i = 0; i < half; i++) {
      this._cards.splice(i*2, 0, cutPile.shift())
    }
  }

  shuffle() {
    for (let i = 0; i < 100; i++) {
      this.cut()
      this.riffle()
    }
  }

  pop() {
    if (this._cards.length === 0) {
      return null
    }

    return this._cards.shift()
  }

  deal() {
    if (this._cards.length === 0) {
      this.reset()
      this.shuffle()
    }

    return this._cards.shift()
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
