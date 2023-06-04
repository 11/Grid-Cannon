export default class Controls {
  get deckHtml() {
    return document.querySelector('#deck')
  }

  get handHtml() {
    return document.querySelector('#hand')
  }

  get discardHtml() {
    return document.querySelector('#discard')
  }

  get cardInHand() {
    return this._cardInHand
  }

  set cardInHand(card) {
    this._cardInHand = card
  }

  constructor(deck, grid) {
    this._deck = deck
    this._grid = grid

    this._cardInHand = null
  }

  setup() {
    this._clearScreen()
  }

  _clearScreen() {
    const deckHtml = this.deckHtml
    deckHtml.classList.remove('back')
    deckHtml.classList.add('empty')
    deckHtml.style.color = ''

    const handHtml = this.handHtml
    handHtml.classList.remove('back')
    handHtml.classList.add('empty')
    handHtml.textContent = ''
    handHtml.style.color = ''

    const discardHtml = this.discardHtml
    discardHtml.classList.remove('back')
    discardHtml.classList.add('empty')
    discardHtml.textContent = ''
    discardHtml.style.color = ''
  }

  _renderDeck() {
    const deckHtml = this.deckHtml
    if (this._deck.length === 0) {
      deckHtml.classList.add('empty')
      deckHtml.classList.remove('back')
    } else {
      deckHtml.classList.add('back')
      deckHtml.classList.remove('empty')
    }
  }

  _renderHand() {
    const handHtml = this.handHtml
    if (!this._cardInHand) {
      handHtml.classList.remove('face')
      handHtml.textContent = ''
      handHtml.style.color = ''
    } else {
      handHtml.classList.add('face')
      handHtml.textContent = this._cardInHand.faceText
      handHtml.style.color = this._cardInHand.color
    }
  }

  _renderDiscard() {
    const discardHtml = this.discardHtml
    const discard = this._deck.peekDiscardPile()
    if (!discard) {
      discardHtml.classList.add('empty')
      discardHtml.classList.remove('face')
    } else {
      discardHtml.classList.add('face')
      discardHtml.classList.remove('empty')

      discardHtml.textContent = discard.faceText
      discardHtml.style.color = discard.color
    }
  }

  pullCardFromHand() {
    const card = this._cardInHand
    this._cardInHand = null

    return card
  }

  render() {
    this._renderDeck()
    this._renderHand()
    this._renderDiscard()
  }
}

