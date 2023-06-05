import Deck from './deck.js'
import Card from './card.js'
import Grid from './grid.js'
import Controls from './controls.js'

export default class Game {
  get deck() {
    return this._deck
  }

  get grid() {
    return this._grid
  }

  get controls() {
    return this._controls
  }

  get turn() {
    return this._turn
  }

  static get Difficulties() {
    return {
      EASY: 0,
      INTERMEDIATE: 1,
      HARD: 2,
    }
  }

  static get GameState() {
    return {
      CHOOSE_CARD_FORM_HAND: 0,
      CHOOSE_GRID_POSITION: 1,
      WIN: 2,
      LOSE: 3,
    }
  }

  static get GameEvents() {
    return {
      NIL: -1,
      SELECT_HAND_EVENT: 0,
      SELECT_ACE_EVENT: 1,
      SELECT_JOKER_EVENT: 2,
      SELECT_DRAW_CARD: 3,
      CHOOSE_GRID_POSITION_EVENT: 4,
    }
  }

  constructor() {
    this._deck = null
    this._grid = null
    this._controls = null
    this._turn = {
      lastGameState: Game.GameState.CHOOSE_CARD_FROM_HAND,
      lastGameEvent: Game.GameEvents.NIL,
      selectedCard: null,
      selectedCardValidPlacementPositions: null,
    }
  }

  startEasy() {
    this._start(Game.Difficulties.EASY)
  }

  startIntermediate() {
    this._start(Game.Difficulties.INTERMEDIATE)
  }

  startHard() {
    this._start(Game.Difficulties.HARD)
  }

  _start(difficulty) {
    this._deck = new Deck()
    this._grid = new Grid()
    this._controls = new Controls()

    this._deck.bindGameEvents(this.drawHandEvent)
    this._controls.bindGameEvents(this.selectHandEvent, this.selectAceEvent, this.selectJokerEvent)
    this._grid.bindGameEvents(this.chooseGridPositionEvent)

    this._grid.setup(difficulty)
    this._controls.setup()

    this._render()
  }

  _render() {
    this._grid.render()
    this._deck.render()
    this._controls.render()
  }

  selectHandEvent(e) {
    if (this._turn.lastGameState !== Game.GameState.CHOOSE_CARD_FROM_HAND) {
      return
    }

    if (!this._controls.hasCardInHand) {
      this.drawHandEvent()
    }

    this._turn.selectedCard = this._controls.peekHand()
    this._turn.selectedCardValidPlacementPositions = new Set(this._grid.findValidGridPlacements(this._turn.selectedCard))
    this._turn.lastGameEvent = Game.GameEvents.SELECT_HAND_EVENT

    this._render()
  }

  selectAceEvent(e) {
    if (this._turn.lastGameState !== Game.GameState.CHOOSE_CARD_FROM_HAND) {
      return
    }

    if (!this._controls.hasAce) {
      return
    }

    this._turn.selectedCard = this._controls.peekAces()
    this._turn.selectedCardValidPlacementPositions = new Set(this._grid.findValidGridPlacements(this._turn.selectedCard))
    this._turn.lastGameEvent = Game.GameEvents.SELECT_ACE_EVENT

    this._render()
  }

  selectJokerEvent(e) {
    if (this._turn.lastGameState !== Game.GameState.CHOOSE_CARD_FROM_HAND) {
      return
    }

    if (!this._controls.hasJokers) {
      return
    }

    this._turn.selectedCard = this._controls.peekJokers()
    this._turn.selectedCardValidPlacementPositions = new Set(this._grid.findValidGridPlacements(this._turn.selectedCard))
    this._turn.lastGameEvent = Game.GameEvents.SELECT_JOKER_EVENT

    this._render()
  }

  drawHandEvent() {
    if (this._turn.lastGameState !== Game.GameState.CHOOSE_CARD_FROM_HAND) {
      return
    }

    if (this._controls.cardInHand?.isFace) {
      return
    }

    this._controls.putDiscards(this._controls.cardInHand)

    const dealtCard = this._deck.deal()
    if (dealtCard.isJoker) {
      this._controls.putJokers(dealtCard)
    } else if (dealtCard.isAce) {
      this._controls.putAces(dealtCard)
    } else {
      this._controls.putInHand(dealtCard)
    }

    this._turn.lastGameEvent = Game.GameEvents.SELECT_DRAW_CARD

    this._render()
  }

  chooseGridPositionEvent(e) {
    if (this._turn.lastGameState !== Game.GameState.CHOOSE_CARD_FROM_HAND) {
      return
    } else {
      this._turn.lastGameState = Game.GameState.CHOOSE_GRID_POSITION
    }

    const x = parseInt(e.target.getAttribute('data-grid-x'))
    const y = parseInt(e.target.getAttribute('data-grid-y'))
    const card = this._controls.popHand()
    if (card.isFace) {
      this._grid.pushFace(x, y, card)
    } else if (card.isJoker) {
      this._grid.pushJoker(x, y, card)
    } else if (card.isAce) {
      this._grid.pushAce(x, y, card)
    } else {
      this._grid.pushSpotAndAttack(x, y, card)
    }

    this._turn.selectedCard = null
    this._turn.selectedCardValidPlacementPositions = null
  }
}
