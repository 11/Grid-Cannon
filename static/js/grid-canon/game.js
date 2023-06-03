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

  get currentGameEvent() {
    return this._currentGameEvent
  }

  set currentGameEvent(gameEvent) {
    this._currentGameEvent = gameEvent
  }

  static get Difficulties() {
    return {
      EASY: 0,
      INTERMEDIATE: 1,
      HARD: 2,
    }
  }

  static get GameEvents() {
    return {
      DRAW_HAND: 1,
      SHOW_VALID_TILES: 2,
      CHOOSE_TILE: 3,
      WIN: 4,
      LOSE: 5,
    }
  }

  constructor() {
    this._deck = null
    this._grid = null
    this._controls = null

    this._currentGameEvent = Game.GameEvents.DRAW_HAND
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

    this._grid = new Grid(this._deck)
    this._grid.setup(difficulty)

    this._controls = new Controls(this._deck, this._grid)
    this._controls.setup()

    this._render()
  }

  _render() {
    this._grid.render()
    this._controls.render()
  }

  drawHandEvent(e) {
    switch (window.game.currentGameEvent) {
      case Game.GameEvents.DRAW_HAND: {
        this._deck.discard(this._controls.cardInHand)
        this._controls.cardInHand = this._deck.deal()
        window.game.currentGameEvent = Game.GameEvents.SHOW_VALID_TILES
        break
      }

      case Game.GameEvents.SHOW_VALID_TILES: {
        // TODO
        break
      }
    }

    this._render()
  }

  showValidTilesEvent(e) {
    switch (window.game.currentGameEvent) {
      case Game.GameEvents.SHOW_VALID_TILES: {
        const validGridTiles = this.grid.findValidTilePlacements(this.controls.cardInHand)
        validGridTiles
          .map(([x, y]) => this.grid.queryHtmlGrid(x, y))
          .forEach(cardDiv => {
            cardDiv.classList.add('selected')
            cardDiv.onclick = this.chooseTileEvent.bind(this)
          })

        window.game.currentGameEvent = Game.GameEvents.CHOOSE_TILE
        break
      }
    }

    this._render()
  }

  chooseTileEvent(e) {
    switch (window.game.currentGameEvent) {
      case Game.GameEvents.CHOOSE_TILE: {
        const card = this.controls.pullCardFromHand()
        const x = parseInt(e.target.getAttribute('data-grid-x'))
        const y = parseInt(e.target.getAttribute('data-grid-y'))
        this.grid.insert(x, y, card)

        this.grid.htmlGrid.forEach(cardDiv =>  {
          cardDiv.classList.remove('selected')
          cardDiv.onclick = null
        })

        window.game.currentGameEvent = Game.GameEvents.DRAW_HAND
        break
      }
    }

    this._render()
  }
}
