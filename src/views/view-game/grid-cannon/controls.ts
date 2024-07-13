import { isNil } from 'lodash'
import Card from './card'
import Deck from './deck'
import Grid from './grid'
import Hand from './hand'

export interface GameData {
  deck: Deck
  grid: Grid
  hand: Hand
}

export function dealGame(): GameData {
  const deck = new Deck()
  const grid = new Grid()
  const hand = new Hand()

  const generateNewGridByDifficulty = () => {
    const gameDifficulty = new Set([3, 7])

    let spots, faces, aces, jokers
    do {
      spots = []
      faces = []
      aces = []
      jokers = []

      deck.buildNewOrderedDeck()
      deck.shuffle()

      while (spots.length <= 7) {
        const card = deck.pop()
        if (isNil(card)) {
          throw new Error('Failed to pop card from deck while setting up game')
        }

        if (card.IsFace) {
          faces.push(card)
        } else if (card.IsJoker) {
          jokers.push(card)
        } else if (card.IsAce) {
          aces.push(card)
        } else {
          spots.push(card)
        }
      }
    } while(!gameDifficulty.has(faces.length))

    return {
      faces,
      spots,
      jokers,
      aces,
    }
  }

  const placeNumberedCardsInGrid = (numberedCards: Card[]) => {
    for (const [gridX, gridY] of grid.startNumberPositions) {
      const card = numberedCards.shift()
      if (isNil(card)) {
        throw new Error('No numbered cards when setting up grid')
      }

      card.update({
        gridX,
        gridY,
      })

      grid.push(gridX, gridY, card)
    }
  }

  const {
    faces,
    spots,
    jokers,
    aces,
  } = generateNewGridByDifficulty()
  placeNumberedCardsInGrid(spots)

  let faceCard
  while (faceCard = faces.pop()) {
    const positionsRankedByCardAttributes = grid.findValidGridPlacements(faceCard)
    const bestPosition = positionsRankedByCardAttributes[0]
    const [xStr, yStr] = bestPosition
    grid.push(parseInt(xStr), parseInt(yStr), faceCard)
  }

  let joker
  while(joker = jokers.pop()) {
    hand.putJoker(joker)
  }

  let ace
  while (ace = aces.pop()) {
    hand.putAce(ace)
  }

  return {
    deck,
    grid,
    hand,
  }
}
