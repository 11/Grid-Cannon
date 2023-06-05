import CardStack from './card-stack.js'

export default class Controls {
  get handHtml() {
    return document.querySelector('#hand')
  }

  get acesHtml() {
    return document.querySelector('#aces')
  }

  get jokersHtml() {
    return document.querySelector('#jokers')
  }

  get discardHtml() {
    return document.querySelector('#discard')
  }

  get cardInHand() {
    return this._hand
  }

  get hasCardInHand() {
    return this._hand !== null
  }

  get hasAces() {
    return this._aces.size > 0
  }

  get hasJokers() {
    return this._jokers.size > 0
  }

  get hasDiscards() {
    return this._discards.size > 0
  }

  constructor() {
    this._hand = null
    this._jokers = new CardStack()
    this._aces = new CardStack()
    this._discards = new CardStack()
  }

  setup() {
    this._clearScreen()
  }

  bindGameEvents(selectHandEvent, selectAceEvent, selectJokerEvent) {
    this.handHtml.onclick = selectHandEvent.bind(window.game)
    this.acesHtml.onclick = selectAceEvent.bind(window.game)
    this.jokersHtml.onclick = selectJokerEvent.bind(window.game)
  }

  _clearScreen() {
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

  putInHand(card) {
    if (!card) {
      return
    }

    this._hand = card
  }

  putJokers(card) {
    if (!card) {
      return card
    }

    this._jokers.push(card)
  }

  putAces(card) {
    if (!card) {
      return card
    }

    this._aces.push(card)
  }

  putDiscards(card) {
    if (!card) {
      return
    }

    this._discards.push(card)
  }

  peekHand() {
    return this._hand
  }

  peekAces() {
    return this._aces.peek()
  }

  peekJokers() {
    return this._jokers.peek()
  }

  popHand() {
    if (!this.hasCardInHand) {
      return null
    }

    const card = this._hand
    this._hand = null

    return card
  }

  popAces() {
    return this._aces.pop()
  }

  popJokers() {
    return this._jokers.pop()
  }

  _renderHand() {
    const handHtml = this.handHtml
    if (!this._hand) {
      handHtml.classList.remove('face')
      handHtml.textContent = ''
      handHtml.style.color = ''
    } else {
      handHtml.classList.add('face')
      handHtml.textContent = this._hand.faceText
      handHtml.style.color = this._hand.color
    }
  }

  _renderJokers() {
    const jokersHtml = this.jokersHtml
    if (!this.hasJokers) {
      jokersHtml.classList.remove('face')
    } else {
      jokersHtml.classList.add('face')
      jokersHtml.textContent = this._jokers.at(-1).faceText
      jokersHtml.style.color = this._jokers.at(-1).color
    }
  }

  _renderAces() {
    const acesHtml = this.acesHtml
    if (!this.hasAces) {
      acesHtml.classList.remove('face')
    } else {
      acesHtml.classList.add('face')
      acesHtml.textContent = this._aces.at(-1).faceText
      acesHtml.style.color = this._aces.at(-1).color
    }
  }

  _renderDiscard() {
    const discardHtml = this.discardHtml
    if (!this.hasDiscards) {
      discardHtml.classList.add('empty')
      discardHtml.classList.remove('face')
    } else {
      discardHtml.classList.add('face')
      discardHtml.classList.remove('empty')

      discardHtml.textContent = this._discards.at(-1).faceText
      discardHtml.style.color = this._discards.at(-1).color
    }
  }

  render() {
    this._renderHand()
    this._renderJokers()
    this._renderAces()
    this._renderDiscard()
  }
}
