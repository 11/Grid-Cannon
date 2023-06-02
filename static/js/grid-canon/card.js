export default class Card {
  get name() {
    return this._name
  }

  get suit() {
    return this._suit
  }

  get faceName() {
    switch (this._name) {
      case Card.NAMES.JACK:
        return 'J'
      case Card.NAMES.QUEEN:
        return 'Q'
      case Card.NAMES.KING:
        return 'K'
      case Card.NAMES.ACE:
        return 'A'
      case Card.NAMES.JOKER:
        return 'JOKER'
      default:
        return this.value
    }
  }

  get suitSymbol() {
    switch (this._suit) {
      case Card.SUITS.SPADE:
        return '\u2660'
      case Card.SUITS.CLUB:
        return '\u2663'
      case Card.SUITS.HEART:
        return '\u2665'
      case Card.SUITS.DIAMOND:
        return '\u2666'
      default:
        return ''
    }
  }

  get faceText () {
    return `${this.faceName} ${this.suitSymbol}`
  }

  get position() {
    return [
      this._gridX,
      this._gridY,
    ]
  }

  set position([x, y]) {
    this._gridX = x
    this._gridY = y
  }

  get value() {
    const nameToValue = {
      [Card.NAMES['JOKER']]: -1,
      [Card.NAMES['ACE']]:    0,
      [Card.NAMES['ONE']]:    1,
      [Card.NAMES['TWO']]:    2,
      [Card.NAMES['THREE']]:  3,
      [Card.NAMES['FOUR']]:   4,
      [Card.NAMES['FIVE']]:   5,
      [Card.NAMES['SIX']]:    6,
      [Card.NAMES['SEVEN']]:  7,
      [Card.NAMES['EIGHT']]:  8,
      [Card.NAMES['NINE']]:   9,
      [Card.NAMES['TEN']]:    10,
      [Card.NAMES['JACK']]:   11,
      [Card.NAMES['QUEEN']]:  12,
      [Card.NAMES['KING']]:   13,
    }

    return nameToValue[this._name]
  }

  get color() {
    switch(this.suit) {
      case Card.SUITS.SPADE:
      case Card.SUITS.CLUB:
        return 'BLACK'
      case Card.SUITS.DIAMOND:
      case Card.SUITS.HEART:
        return 'RED'
      default:
        return 'PURPLE'
    }
  }

  static get NAMES() {
    return {
      JOKER: 'JOKER',
      ACE: 'ACE',
      ONE: 'ONE',
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

  static get SUITS() {
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

  toString() {
    let name
    if (this._name === Card.NAMES.JOKER) {
      name = 'JR'
    } else if (this._name === Card.NAMES.TEN) {
      name = 'T'
    } else {
      name = this.value
    }

    const suit = this.suitSymbol
    return `${name}${suit}`
  }
}
