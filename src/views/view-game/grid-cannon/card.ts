export enum CardFaces {
  JOKER = 'JOKER',
  ACE = 'ACE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
  SIX = 'SIX',
  SEVEN = 'SEVEN',
  EIGHT = 'EIGHT',
  NINE = 'NINE',
  TEN = 'TEN',
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
}

export enum CardSuits {
  SPADE = 'SPADE',
  CLUB = 'CLUB',
  HEART = 'HEART',
  DIAMOND = 'DIAMOND',
}

export const CardSuitToSymbolMap = {
  [CardSuits.SPADE]: '\u2660',
  [CardSuits.CLUB]: '\u2663',
  [CardSuits.HEART]: '\u2665',
  [CardSuits.DIAMOND]: '\u2666',
}

export const CardFaceToRankMap = {
  [CardFaces.JOKER]: 0,
  [CardFaces.ACE]: 1,
  [CardFaces.TWO]: 2,
  [CardFaces.THREE]: 3,
  [CardFaces.FOUR]: 4,
  [CardFaces.FIVE]: 5,
  [CardFaces.SIX]: 6,
  [CardFaces.SEVEN]: 7,
  [CardFaces.EIGHT]: 8,
  [CardFaces.NINE]: 9,
  [CardFaces.TEN]: 10,
  [CardFaces.JACK]: 11,
  [CardFaces.QUEEN]: 12,
  [CardFaces.KING]: 13,
}

export const CardFaceToAbbreviationMap = {
  [CardFaces.JOKER]: 'JOKER',
  [CardFaces.ACE]: 'A',
  [CardFaces.TWO]: '2',
  [CardFaces.THREE]: '3',
  [CardFaces.FOUR]: '4',
  [CardFaces.FIVE]: '5',
  [CardFaces.SIX]: '6',
  [CardFaces.SEVEN]: '7',
  [CardFaces.EIGHT]: '8',
  [CardFaces.NINE]: '9',
  [CardFaces.TEN]: '10',
  [CardFaces.JACK]: 'J',
  [CardFaces.QUEEN]: 'Q',
  [CardFaces.KING]: 'K',
}

export type CardColors = 'RED' | 'BLACK'
export const CardColorMap: Record<string, CardColors> = {
  [CardSuits.SPADE]: 'BLACK',
  [CardSuits.CLUB]: 'BLACK',
  [CardSuits.HEART]: 'RED',
  [CardSuits.DIAMOND]: 'RED',
}

export interface CardData {
  name: CardFaces
  abbreviation: string
  suit: CardSuits
  symbol: string,
  rank: number,
  value: number,
  color: CardColors,
  gridX: number,
  griY: number,
  isNumber: boolean,
  isFace: boolean,
  isJoker: boolean,
  isAce: boolean,
  cardText: string,
  killed: boolean,
  upsideDown: boolean,
}

export default class Card {
  /**
   * JOKER
   * ACE
   * ...
   * TEN
   * JACK
   * QUEEN
   * KING
   */
  private name: CardFaces

  /**
   * JOKER => JOKER
   * ACE => A
   * TWO => 2
   * ...
   * TEN => 10
   * JACK => J
   * QUEEN => Q
   * KING => K
   */
  private abbreviation: string

  /**
   * SPADE
   * HEART
   * CLUB
   * DIAMOND
   */
  private suit: CardSuits

  /**
   * Unicode symbols for card suits:
   * ♠ ♥ ♦ ♣
   */
  private symbol: string

  /**
   * JOKER => 0
   * ACE => 1
   * TWO => 2
   * TEN => 10
   * JACK => 11
   * QUEEN => 12
   * KING => 13
   */
  private rank: number

  /**
   * During the the game, some card's values can increase. `value` keeps track
   * of the flucuating values in throughout the game
   */
  private value: number

  /**
   * Suit color
   */
  private color: CardColors

  /**
   * If a face card has been killed
   */
  private killed: boolean

  /**
   * Stores if front or back of card should be rendered
   */
  private upsideDown: boolean

  /**
   * Grid position
   */
  private gridX: number
  private gridY: number

  constructor(name: CardFaces, suit: CardSuits, gridX: number, gridY: number) {
    this.name = name
    this.suit = suit
    this.gridX = gridX
    this.gridY = gridY

    this.abbreviation = CardFaceToAbbreviationMap[this.name]
    this.color = CardColorMap[this.suit]
    this.symbol = CardSuitToSymbolMap[this.suit]
    this.rank = CardFaceToRankMap[this.name]
    this.value = this.rank
    this.killed = false
    this.upsideDown = true
  }

  get isNumber(): boolean {
    return this.rank >= 2 && this.rank <= 10
  }

  get isFace() {
    return this.rank > 10
  }

  get isJoker() {
    return this.rank === 0
  }

  get isAce() {
    return this.rank === 1
  }

  get cardText() {
    return `${this.name} ${this.symbol}`
  }

  public kill() {
    if (this.isFace) {
      this.killed = true
    }
  }

  public update(card: CardData) {
    // these are the only values that will update as the game is played
    this.value = card.value
    this.gridX = card.gridX
    this.gridY = card.griY
    this.killed = card.killed
    this.upsideDown = card.upsideDown
  }

  public toJSON(): CardData {
    return {
      name: this.name,
      abbreviation: this.abbreviation,
      suit: this.suit,
      symbol: this.symbol,
      rank: this.rank,
      value: this.value,
      color: this.color,
      gridX: this.gridX,
      griY: this.gridY,
      isNumber: this.isNumber,
      isFace: this.isFace,
      isJoker: this.isJoker,
      isAce: this.isAce,
      cardText: this.cardText,
      killed: this.killed,
      upsideDown: this.upsideDown,
    }
  }
}
