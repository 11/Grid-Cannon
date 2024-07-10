import { isNil } from 'lodash'
import Card from './card'

/* NOTES:
 * - The Goal of the `CardStack` class' goal is to make it easier to interact with each pile
 *   of cards in the `Grid` and `deck`
 *
 * FYI:
 * - The top of the stack is the nth element in the list
 * - The bottom of the stack is the 0th element of the list
 * - The `placeAtBottomOfStack` method technically makes `CardStack` break the traditional
 *   mental model of a stack data structure, but it's needed in certain edge cases - specifically
 *   in the `Deck` class.
 */
export default class CardStack {
  get size() {
    return this.stack.length
  }

  private stack: Card[] = []

  public constructor() {
    this.stack = []
  }

  public peek(): Card | null {
    const top = this.stack.at(-1)
    if (isNil(top)) {
      return null
    }

    return top
  }

  public pop(): Card | null {
    if (this.stack.length === 0) {
      return null
    }

    const card = this.stack.pop()
    if (isNil(card)) {
      return null
    }

    return card
  }

  public push(card: Card): boolean {
    if (!card) {
      return false
    }

    this.stack.push(card)
    return true
  }

  public placeAtBottom(...cards: Card[]): boolean {
    if (!cards) {
      return false
    }

    this.stack.concat(cards)
    return true
  }

  public clear(): Card[] {
    const result = []

    let item
    while (item = this.stack.pop()) {
      result.push(item)
    }

    return result
  }

  public contains(item) {
    for (let i = 0; i < this.stack.length; i++) {
      const current = this.stack[i]
      if (current === item) {
        return true
      }
    }

    return false
  }

  public rotate(index: number): boolean {
    // a cut is the same as rotating an array. split the deck into 2 halvse and rotate
    const bottom = this.stack.splice(index)
    this.stack.unshift(...bottom)

    return true
  }

  /**
   * a cut is the same algorithm as rotating a list, but in the context of a card game, the cut
   * is usually near the halfway point of a stack of cards. to ensure that each playthrough is
   * non-deterministic, we make the array rotation happens on a random index that is near the halfway
   * point in the card stack
   */
  public cut(): boolean {
    if (this.size < 2) {
      return false
    }

    // the cut range is + or - 6 indicies away from the middle of the deck when there are more
    // that 6 cards in the deck. otherwise, if there are between 2 - 5, make the delta 0 cards
    const half = (this.stack.length / 2) - 1
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
  public riffle(): boolean {
    const half = (this.stack.length / 2)
    const cutPile = this.stack.splice(half)
    for (let i = 0; i < half; i++) {
      const cut = cutPile.shift()
      if (!isNil(cut)) {
        this.stack.splice(i*2, 0, cut)
      }
    }

    return true
  }

  public shuffle(): boolean{
    for (let i = 0; i < 100; i++) {
      this.cut()
      this.riffle()
    }

    return true
  }

  public toArray(): Card[] {
    return [...this.stack]
  }
}
