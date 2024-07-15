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
  console.log('#dealGame')

  const deck = new Deck()
  const grid = new Grid()
  const hand = new Hand()

  const generateNewGridByDifficulty = () => {
    const gameDifficulty = new Set([4, 7])

    let spots, faces, aces, jokers
    do {
      spots = []
      faces = []
      aces = []
      jokers = []

      deck.buildNewOrderedDeck(true)
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
    hand.pushJokers(joker)
  }

  let ace
  while (ace = aces.pop()) {
    hand.pushAces(ace)
  }

  return {
    deck,
    grid,
    hand,
  }
}

export function drawHand(deck: Deck, grid: Grid, hand: Hand): void {
  console.log('#drawHand')

  grid.hidePlayablePositions()
  hand.peekHand()?.update({ isHighlighted: false })
  hand.peekJokers()?.update({ isHighlighted: false })
  hand.peekAces()?.update({ isHighlighted: false })

  const card = deck.pop()
  if (isNil(card)) {
    return
  }

  if (card.IsJoker) {
    hand.pushJokers(card)
  } else if (card.IsAce) {
    hand.pushAces(card)
  } else {
    hand.pushHand(card)
  }
}

export function selectHand(deck: Deck, grid: Grid, hand: Hand): void {
  console.log('#selectHand')

  const card = hand.peekHand()
  if (isNil(card)) {
    return
  }

  hand.peekAces()?.update({ isHighlighted: false })
  hand.peekJokers()?.update({ isHighlighted: false })

  if (card.IsFace) {
    const [pos] = grid.findValidGridPlacements(card)
    const gridX = parseInt(pos[0])
    const gridY = parseInt(pos[1])
    grid.push(gridX, gridY, card)
    hand.popHand()
  } else {
    card.update({ isHighlighted: true })
    grid.showPlayablePositions(card)
  }
}

export function selectAce(deck: Deck, grid: Grid, hand: Hand): void {
  console.log('#selectAce')

  const card = hand.peekAces()
  if (isNil(card)) {
    return
  }

  hand.peekHand()?.update({ isHighlighted: false })
  hand.peekJokers()?.update({ isHighlighted: false })

  card.update({ isHighlighted: true })
  grid.showPlayablePositions(card)
}

export function selectJoker(deck: Deck, grid: Grid, hand: Hand): void {
  console.log('#selecJoker')

  hand.peekHand()?.update({ isHighlighted: false })
  hand.peekAces()?.update({ isHighlighted: false })

  const card = hand.peekJokers()
  if (isNil(card)) {
    return
  }

  card.update({ isHighlighted: true })
  grid.showPlayablePositions(card)
}

export function selectGridPosition(gridX: number, gridY: number, deck: Deck, grid: Grid, hand: Hand): void {
  console.log('#selectGridPosition')
  const gridCard = grid.peek(gridX, gridY)

  let selectedCard = null
  const handCard = hand.peekHand()
  const aceCard = hand.peekAces()
  const jokerCard = hand.peekJokers()
  if (!isNil(handCard) && handCard.IsHighlighted) {
    selectedCard = handCard
    hand.popHand()
  } else if (!isNil(aceCard) && aceCard.IsHighlighted) {
    selectedCard = aceCard
    hand.popAces()
  } else if (!isNil(jokerCard) && jokerCard.IsHighlighted) {
    selectedCard = jokerCard
    hand.popJokers()
  }

  if (isNil(selectedCard)) {
    throw new Error('Selected card is null')
  }

  if (selectedCard.IsJoker) {
    const { aces, numbered } = grid.clear(gridX, gridY)
    deck.push(...numbered)
    hand.pushAces(...aces)

    hand.pushDiscards(selectedCard)
  } else if (
    selectedCard.IsAce
    || isNil(gridCard)
    || selectedCard.Rank >= gridCard.Rank
  ) {
    grid.push(gridX, gridY, selectedCard)
    grid.attack(gridX, gridY)
  }

  selectedCard.update({ isHighlighted: false })
  grid.hidePlayablePositions()
}
