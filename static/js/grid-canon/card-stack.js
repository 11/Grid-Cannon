/* NOTES:
 * - The Goal of the `CardStack` class' goal is to make it easier to interact with each pile
 *   of cards in the `Grid` and `deck`
 *
 * FYI:
 * - The top of the stack is the nth element in the list
 * - The bottom of the stack is the 1st element of the list
 * - The `placeAtBottomOfStack` method technically makes `CardStack` break the traditional
 *   mental model of a stack data structure, but it's needed in certain edge cases - specifically
 *   in the `Deck` class.
 */
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

  push(card) {
    if (!card) {
      return false
    }

    this._stack.push(card)
    return true
  }

  placeAtBottom(...cards) {
    if (!card) {
      return false
    }

    this._stack.concat(cards)
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

    return true
  }

  /**
   * a cut is the same algorithm as rotating a list, but in the context of a card game, the cut
   * is usually near the halfway point of a stack of cards. to ensure that each playthrough is
   * non-deterministic, we make the array rotation happens on a random index that is near the halfway
   * point in the card stack
   */
  cut() {
    if (this.size < 2) {
      return false
    }

    // the cut range is + or - 6 indicies away from the middle of the deck when there are more
    // that 6 cards in the deck. otherwise, if there are between 2 - 5, make the delta 0 cards
    const half = (this._stack.length / 2) - 1
    const delta = this.size < 6
      ? 0
      : 6

    // randomly select a card within is this range
    const min = Math.ceil(half - delta)
    const max = Math.ceil(half + delta)
    const cutIndex = Math.floor(Math.random() * (max - min) + min)

    // a cut is the same as rotating an array. split the deck into 2 halves and rotate
    this.rotate(cutIndex)

    return true
  }

  // TODO: Make sure riffle works with odd and evenly sized decks
  _riffle() {
    const half = (this._stack.length / 2)
    const cutPile = this._stack.splice(half)
    for (let i = 0; i < half; i++) {
      this._stack.splice(i*2, 0, cutPile.shift())
    }

    return true
  }

  shuffle() {
    for (let i = 0; i < 100; i++) {
      this.cut()
      this._riffle()
    }

    return true
  }

  toArray() {
    return [...this._stack]
  }
}
