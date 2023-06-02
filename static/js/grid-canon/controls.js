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

  constructor(deck) {
    this._deck = deck
    this._cardInHand = null
  }

  setup() {
    this._clearScreen()
  }

  _clearScreen() {
    const deckHtml = this.deckHtml
    deckHtml.classList.remove('back')
    deckHtml.classList.add('empty')
    deckHtml.textContent = ''
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

  nextHand() {
    this._deck.discard(this._cardInHand)
    this._cardInHand = this._deck.deal()
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
      handHtml.classList.add('empty')
      handHtml.classList.remove('face')
    } else {
      handHtml.classList.add('face')
      handHtml.classList.remove('empty')

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

  render() {
    this._renderDeck()
    this._renderHand()
    this._renderDiscard()
  }
}
