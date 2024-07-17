import { isNil } from 'lodash'
import Card from './card'
import Deck from './deck'
import Grid from './grid'
import Hand from './hand'
import { GameEvents } from '@/views/view-game/view-game'

export interface GameData {
  deck: Deck
  grid: Grid
  hand: Hand
}

function checkIsLose(deck: Deck, grid: Grid, hand: Hand): boolean {
  const canDrawCard = hand.handSize() < 3 && deck.Size > 0
  const canPlayHand = grid.hasPlayablePosition(hand.peekHand())
  const hasJokers = hand.jokersSize() > 0
  const hasAces = hand.acesSize() > 0

  return !canDrawCard && !canPlayHand && !hasJokers && !hasAces
}

function checkIsWin(grid: Grid): boolean {
  return grid.IsAllRoyalsDead
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

export function drawHand(deck: Deck, grid: Grid, hand: Hand): GameEvents {
  console.log('#drawHand')

  // clear highlights
  grid.hidePlayablePositions()
  hand.peekHand()?.update({ isHighlighted: false })
  hand.peekJokers()?.update({ isHighlighted: false })
  hand.peekAces()?.update({ isHighlighted: false })

  // if there are no royals to kill on grid,
  // flip through deck until next card is a royal
  if (grid.IsAllPlayedRoyalsDead) {
    deck.flipToNextRoyal()
  }

  // if the hand stack has less than 3 cards, you can draw again
  // or the top card in the hand stack is a royal - royal card must be played
  if (hand.handSize() === 3 || hand.peekHand()?.IsFace) {
    return GameEvents.SELECT_DECK
  }

  const card = deck.pop()
  if (isNil(card)) {
    return GameEvents.SELECT_DECK
  }

  if (card.IsJoker) {
    hand.pushJokers(card)
  } else if (card.IsAce) {
    hand.pushAces(card)
  } else {
    hand.pushHand(card)
  }

  const isLose = checkIsLose(deck, grid, hand)
  const isWin = checkIsWin(grid)
  if (isWin) {
    return GameEvents.WIN
  } else if (isLose) {
    return GameEvents.LOSE
  }

  return GameEvents.SELECT_DECK
}

export function selectHand(deck: Deck, grid: Grid, hand: Hand): GameEvents {
  console.log('#selectHand')

  grid.hidePlayablePositions()
  hand.peekHand()?.update({ isHighlighted: false })
  hand.peekJokers()?.update({ isHighlighted: false })
  hand.peekAces()?.update({ isHighlighted: false })

  const card = hand.peekHand()
  if (isNil(card)) {
    return GameEvents.SELECT_DECK
  }

  hand.peekAces()?.update({ isHighlighted: false })
  hand.peekJokers()?.update({ isHighlighted: false })

  if (card.IsFace) {
    const [pos] = grid.findValidGridPlacements(card)
    const gridX = parseInt(pos[0])
    const gridY = parseInt(pos[1])
    grid.push(gridX, gridY, card)
    hand.popHand()
    return GameEvents.SELECT_DECK
  } else {
    card.update({ isHighlighted: true })
    grid.showPlayablePositions(card)
  }

  const isLose = checkIsLose(deck, grid, hand)
  const isWin = checkIsWin(grid)
  if (isWin) {
    return GameEvents.WIN
  } else if (isLose) {
    return GameEvents.LOSE
  }

  return GameEvents.SELECT_HAND
}

export function selectAce(deck: Deck, grid: Grid, hand: Hand): GameEvents {
  console.log('#selectAce')

  const card = hand.peekAces()
  if (isNil(card)) {
    return GameEvents.SELECT_DECK
  }

  hand.peekHand()?.update({ isHighlighted: false })
  hand.peekJokers()?.update({ isHighlighted: false })

  card.update({ isHighlighted: true })
  grid.showPlayablePositions(card)

  const isLose = checkIsLose(deck, grid, hand)
  const isWin = checkIsWin(grid)
  if (isWin) {
    return GameEvents.WIN
  } else if (isLose) {
    return GameEvents.LOSE
  }

  return GameEvents.SELECT_JOKER
}

export function selectJoker(deck: Deck, grid: Grid, hand: Hand): GameEvents {
  console.log('#selecJoker')

  hand.peekHand()?.update({ isHighlighted: false })
  hand.peekAces()?.update({ isHighlighted: false })

  const card = hand.peekJokers()
  if (isNil(card)) {
    return GameEvents.SELECT_DECK
  }

  card.update({ isHighlighted: true })
  grid.showPlayablePositions(card)

  const isLose = checkIsLose(deck, grid, hand)
  const isWin = checkIsWin(grid)
  if (isWin) {
    return GameEvents.WIN
  } else if (isLose) {
    return GameEvents.LOSE
  }

  return GameEvents.SELECT_JOKER
}

// return -1 when there is an error
export function selectGridPosition(gridX: number, gridY: number, deck: Deck, grid: Grid, hand: Hand): { event: GameEvents, score: number } {
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

  let score = 0
  let event = GameEvents.SELECT_GRID_POSITION
  if (selectedCard.IsJoker && !isNil(gridCard)) {
    const { aces, numbered } = grid.clear(gridX, gridY)
    deck.push(...numbered)
    hand.pushDiscards(...aces)
    hand.pushDiscards(selectedCard)
  } else if ( selectedCard.IsAce || (isNil(gridCard) && !selectedCard.IsJoker) || (!isNil(gridCard) && selectedCard.Rank >= gridCard.Rank)) {
    grid.push(gridX, gridY, selectedCard)
    score = grid.attack(gridX, gridY)
  } else if ((selectedCard.isNumber && !isNil(gridCard) && selectedCard.Rank < gridCard.Rank)) {
    hand.pushHand(selectedCard)
    event = GameEvents.SELECT_DECK
  } else if (selectedCard.IsJoker && isNil(gridCard)) {
    hand.pushJokers(selectedCard)
  }

  selectedCard.update({ isHighlighted: false })
  grid.hidePlayablePositions()

  const isLose = checkIsLose(deck, grid, hand)
  const isWin = checkIsWin(grid)
  if (isWin) {
    return {
      event: GameEvents.WIN,
      score,
    }
  } else if (isLose) {
    return {
      event: GameEvents.LOSE,
      score,
    }
  }

  return {
    event,
    score
  }
}
