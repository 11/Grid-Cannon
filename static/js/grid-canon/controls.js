export default class Controls {
  get handHtml() {
    return document.querySelector('#hand')
  }

  get jokersHtml() {
    return document.querySelector('#jokers')
  }

  get acesHtml() {
    return document.querySelector('#aces')
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

  get hasJokers() {
    return this._jokers.length > 0
  }

  get hasAces() {
    return this._aces.length > 0
  }

  get hasDiscards() {
    return this._discards.length > 0
  }

  constructor() {
    this._hand = null
    this._jokers = []
    this._aces = []
    this._discards = []
  }

  setup() {
    this._clearScreen()
  }

  putInHand(card) {
    if (!card) {
      return
    }

    this._hand = card
  }

  putInJokers(card) {
    if (!card) {
      return card
    }

    this._jokers.push(card)
  }

  putInAces(card) {
    if (!card) {
      return card
    }

    this._aces.push(card)
  }

  putInDiscards(card) {
    if (!card) {
      return
    }

    this._discards.push(card)
  }

  pullFromHand() {
    if (!this.hasCardInHand) {
      return null
    }
    const card = this._hand
    this._hand = null

    return card
  }

  pullFromJokers() {
    if (!this.hasJokers) {
      return null
    }

    return this._jokers.shift()
  }

  pullFromAces() {
    if (!this.hasAces) {
      return null
    }

    return this._aces.shift()
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
