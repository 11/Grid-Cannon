import Deck from './deck.js'
import Card from './card.js'
import Grid from './grid.js'
import Controls from './controls.js'

export default class Game {
  get controls() {
    return this._controls
  }

  get grid() {
    return this._grid
  }

  get controls() {
    return this._controls
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

    this._controls = new Controls(this._deck)
    this._controls.setup()

    this._render()
  }

  _render() {
    this._grid.render()
    this._controls.render()
  }

  nextHandEvent() {
    this.controls.nextHand()
    this._render()
  }
}
