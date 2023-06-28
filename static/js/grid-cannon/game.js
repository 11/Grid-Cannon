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

  get gameState() {
    return this._gameState
  }

  static get Difficulties() {
    return {
      EASY: 0,
      INTERMEDIATE: 1,
      HARD: 2,
    }
  }

  constructor() {
    this._deck = null
    this._grid = null
    this._controls = null
    this._gameState = {
      selectedCard: null,
      selectedCardValidPlacementPositions: null,
      turnCount: 0,
    }

    this._debug = true
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

    const gameBoard = document.querySelector('.grid-cannon')
    gameBoard.classList.remove('hidden')

    const gameMenu = document.querySelector('.start-screen')
    gameMenu.classList.add('hidden')

    this._render()
  }

  _render() {
    this._deck.render()
    this._controls.render()
    this._grid.render()
  }

  drawHandEvent() {
    // DEBUG
    if (this._debug) {
      console.log('Game#drawHandEvent', this._gameState)
    }

    if (this._controls.cardInHand) {
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

    this._render()
  }

  selectHandEvent(e) {
    if (this._debug) {
      console.log('Game#selectHandEvent', this._gameState)
    }

    if (!this._controls.hasCardInHand) {
      this.drawHandEvent()
    }

    if (this._controls.peekHand().isFace) {
      const faceCard = this._controls.popHand()
      this._grid.placeFaceCardsInGrid([faceCard])
    } else {
      this._gameState.selectedCard = this._controls.peekHand()
      this._gameState.selectedCardValidPlacementPositions = new Set(this._grid.findValidGridPlacements(this._gameState.selectedCard))
    }

    this._render()
  }

  selectAceEvent(e) {
    if (this._debug) {
      console.log('Game#selectAceEvent', this._gameState)
    }

    if (!this._controls.hasAce) {
      return
    }

    this._gameState.selectedCard = this._controls.peekAces()
    this._gameState.selectedCardValidPlacementPositions = new Set(this._grid.findValidGridPlacements(this._gameState.selectedCard))

    this._render()
  }

  selectJokerEvent(e) {
    if (this._debug) {
      console.log('Game#selectJokerEvent', this._gameState)
    }

    if (!this._controls.hasJoker) {
      return
    }

    this._gameState.selectedCard = this._controls.peekJokers()
    this._gameState.selectedCardValidPlacementPositions = new Set(this._grid.findValidGridPlacements(this._gameState.selectedCard))

    this._render()
  }

  chooseGridPositionEvent(e) {
    if (this._debug) {
      console.log('Game#chooseGridPositionEvent', this._gameState)
    }

    if (!this._gameState.selectedCard) {
      return
    }

    const x = parseInt(e.target.getAttribute('data-grid-x'))
    const y = parseInt(e.target.getAttribute('data-grid-y'))
    if (this._gameState.selectedCard.isFace) {
      const card = this._controls.peekHand()

      if (this._grid.push(x, y, card)) {
        this._controls.popHand()
      }
    } else if (this._gameState.selectedCard.isJoker) {
      const card = this._controls.peekJokers()
      if (this._grid.push(x, y, card)) {
        this._controls.popJokers()
      }
    } else if (this._gameState.selectedCard.isAce) {
      const card = this._controls.peekAces()
      if (this._grid.push(x, y, card)) {
        this._controls.popAces()
      }
    } else if (this._gameState.selectedCard.isSpot) {
      const card = this._controls.peekHand()
      if (card.value < this._grid.peek(x, y)?.value) {
        return
      }

      this._controls.popHand()
      this._grid.push(x, y, card)
      this._grid.attack(x, y)
    }

    this._gameState.selectedCard = null
    this._gameState.selectedCardValidPlacementPositions = null
    this._gameState.turnCount += 1

    this._render()
  }
}
