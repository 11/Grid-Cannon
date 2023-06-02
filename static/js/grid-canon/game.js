import Deck from './deck.js'
import Card from './card.js'
import Grid from './grid.js'

export default class Game {
  static get Difficulties() {
    return {
      EASY: 0,
      INTERMEDIATE: 1,
      HARD: 2,
    }
  }

  constructor() {
    this.deck = null
    this.grid = null

    this.newGame = false
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
    this.deck = new Deck()
    this.grid = new Grid(this.deck)
    this.grid.setup(difficulty)

    this._loop()
  }

  _update() {

  }

  _render() {
    this.grid.render()
  }

  _loop() {
    this._update()
    this._render()
  }
}
