import Game from './game.js'

export default class Card {
  get name() {
    return this._name
  }

  get suit() {
    return this._suit
  }

  get faceName() {
    switch (this._name) {
      case Card.Names.JACK:
        return 'J'
      case Card.Names.QUEEN:
        return 'Q'
      case Card.Names.KING:
        return 'K'
      case Card.Names.ACE:
        return 'A'
      case Card.Names.JOKER:
        return 'JOKER'
      default:
        return this.value
    }
  }

  get suitSymbol() {
    switch (this._suit) {
      case Card.Suits.SPADE:
        return '\u2660'
      case Card.Suits.CLUB:
        return '\u2663'
      case Card.Suits.HEART:
        return '\u2665'
      case Card.Suits.DIAMOND:
        return '\u2666'
      default:
        return ''
    }
  }

  get faceText() {
    return `${this.faceName} ${this.suitSymbol}`
  }

  get gridPosition() {
    return [
      this._gridX,
      this._gridY,
    ]
  }

  set gridPosition([x, y]) {
    this._gridX = x
    this._gridY = y
  }


  get value() {
    const nameToValue = {
      [Card.Names['JOKER']]:  0,
      [Card.Names['ACE']]:    1,
      [Card.Names['TWO']]:    2,
      [Card.Names['THREE']]:  3,
      [Card.Names['FOUR']]:   4,
      [Card.Names['FIVE']]:   5,
      [Card.Names['SIX']]:    6,
      [Card.Names['SEVEN']]:  7,
      [Card.Names['EIGHT']]:  8,
      [Card.Names['NINE']]:   9,
      [Card.Names['TEN']]:    10,
      [Card.Names['JACK']]:   11,
      [Card.Names['QUEEN']]:  12,
      [Card.Names['KING']]:   13,
    }

    return nameToValue[this._name]
  }

  get isSpot() {
    return this.value >= 2 && this.value <= 10
  }

  get isFace() {
    return this.value > 10
  }

  get isJoker() {
    return this.value === 0
  }

  get isAce() {
    return this.value === 1
  }

  get color() {
    switch(this.suit) {
      case Card.Suits.SPADE:
      case Card.Suits.CLUB:
        return 'BLACK'
      case Card.Suits.DIAMOND:
      case Card.Suits.HEART:
        return 'RED'
      default:
        return 'PURPLE'
    }
  }

  static get Names() {
    return {
      JOKER: 'JOKER',
      ACE: 'ACE',
      TWO: 'TWO',
      THREE: 'THREE',
      FOUR: 'FOUR',
      FIVE: 'FIVE',
      SIX: 'SIX',
      SEVEN: 'SEVEN',
      EIGHT: 'EIGHT',
      NINE: 'NINE',
      TEN: 'TEN',
      JACK: 'JACK',
      QUEEN: 'QUEEN',
      KING: 'KING',
    }
  }

  static get Suits() {
    return {
      SPADE: 'SPADE',
      CLUB: 'CLUB',
      HEART: 'HEART',
      DIAMOND: 'DIAMOND',
    }
  }

  constructor(name, suit, gridX, gridY) {
    this._name = name
    this._suit = suit
    this._gridX = gridX
    this._gridY = gridY
  }

  render(cardElement) {
    if (cardElement.classList.contains('hidden')) {
      return
    }

    cardElement.classList.remove('empty')
    cardElement.classList.add('face')

    cardElement.textContent = this.faceText
    cardElement.style.color = this.color

  }

  toString() {
    let name
    if (this._name === Card.Names.JOKER) {
      name = 'JR'
    } else if (this._name === Card.Names.TEN) {
      name = 'T'
    } else {
      name = this.value
    }

    const suit = this.suitSymbol
    return `${name}${suit}`
  }
}
