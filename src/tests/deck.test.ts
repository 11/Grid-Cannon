import { describe, it, expect } from '@jest/globals'
import Deck from '../lib/grid-cannon/deck'

describe('Deck', () => {
  it('New deck should have 54 cards', () => {
    const deck = new Deck()
    expect(deck.Size).toBe(54)
  })

  it('Shuffling the deck with even amount should not lose cards', () => {
    for (let i = 0; i < 100; i++) {
      const deck = new Deck()
      deck.shuffle()
      expect(deck.Size).toBe(54)
    }
  })

  // it('Shuffling the deck with odd amount should not lose cards', () => {
  //   const deck = new Deck()
  //   expect(deck.Size).toBe(54)
  // })
})
