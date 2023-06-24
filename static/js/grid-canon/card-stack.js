export default class CardStack {
  get size() {
    return this._stack.length
  }

  constructor() {
    this._stack = []
  }

  peek() {
    const top = this._stack.at(-1)
    if (!top) {
      return null
    }

    return top
  }

  pop() {
    if (this._stack.length === 0) {
      return null
    }

    return this._stack.pop()
  }

  push(item) {
    this._stack.push(item)
  }

  clear() {
    const result = []

    let item
    while (item = this._stack.pop()) {
      result.push(item)
    }

    return result
  }

  contains(item) {
    for (let i = 0; i < this._stack.length; i++) {
      const current = this._stack[i]
      if (current === item) {
        return true
      }
    }

    return false
  }

  rotate(idx) {
    // a cut is the same as rotating an array. split the deck into 2 halvse and rotate
    const bottom = this._stack.splice(idx)
    this._stack.unshift(...bottom)
  }

  /**
   * a cut of a stack is the same as rotating a stack at halfway point, but includes some randomness so it's non-determinsitc
   */
  cut() {
    if (this.size < 2) {
      return
    }

    // the cut range is + or - 6 indicies away from the middle of the deck if there are more that 6 cards in the deck
    // otherwise, if there are between 2 - 5, make the delta 0 cards
    const half = (this._stack.length / 2) - 1
    const delta = this.size < 6
      ? 0
      : 6

    // randomly select a card within is this range
    const min = Math.ceil(half - delta)
    const max = Math.ceil(half + delta)
    const cutIndex = Math.floor(Math.random() * (max - min) + min)

    // // a cut is the same as rotating an array. split the deck into 2 halvse and rotate
    this.rotate(cutIndex)
  }

  // TODO: Make sure riffle works with odd numbered deck
  _riffle() {
    const half = (this._stack.length / 2)
    const cutPile = this._stack.splice(half)
    for (let i = 0; i < half; i++) {
      this._stack.splice(i*2, 0, cutPile.shift())
    }
  }

  shuffle() {
    for (let i = 0; i < 100; i++) {
      this.cut()
      this._riffle()
    }
  }

  toArray() {
    return [...this._stack]
  }
}
