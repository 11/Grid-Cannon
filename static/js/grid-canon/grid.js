import Game from './game.js'
import Card from './card.js'
import Controls from './controls.js'

export default class Grid {
  get htmlGrid() {
    return Array.from(document.querySelectorAll('.game-grid > [data-game-card="true"]'))
  }

  constructor() {
    this._grid = Array.from(Array(25), () => [])

    this._startSpotPositions = [[1,1], [1,2], [1,3], [2,1], [2,3], [3,1], [3,2], [3,3]]
    this._spotPositions = [[1,1], [1,2], [1,3], [2,1], [2,2], [2,3], [3,1], [3,2], [3,3]]
    this._facePositions = [[0,1], [0,2], [0,3], [1,0], [1,4], [2,0], [2,4], [3,0], [3,4], [4,1], [4,2],[4,3]]
  }

  setup(difficulty) {
    this._clearScreen()

    const { faces, spots } = this._generateNewGridByDifficulty(difficulty)
    this._placeSpotCardsInGrid(spots)
    this._placeFaceCardsInGrid(faces)
  }

  _clearScreen() {
    const htmlGrid = this.htmlGrid

    for (let i = 0; i < this._grid.length; i++) {
      const card = this._grid[i]
      const cardDiv = htmlGrid[i]
      if (cardDiv.classList.contains('hidden')) {
        continue
      } else if (!card) {
        cardDiv.classList.add('empty')
      }

      cardDiv.textContent = ''
      cardDiv.style.color = ''
    }
  }

  _generateNewGridByDifficulty(difficulty) {
    const difficultyToAmountFaceCardsMap = {
      [Game.Difficulties.EASY]: new Set([3,4]),
      [Game.Difficulties.INTERMEDIATE]: new Set([5,6]),
      [Game.Difficulties.HARD]: new Set([7, 12]),
    }
    const gameDifficulty = difficultyToAmountFaceCardsMap[difficulty]

    let faces
    let spots
    do {
      faces = []
      spots = []

      window.game.deck.newOrderedDeck()
      window.game.deck.shuffle()

      while (spots.length <= 7) {
        const card = window.game.deck.pop()
        if (card.value > 10) {
          faces.push(card)
        } else {
          spots.push(card)
        }
      }
    } while(!gameDifficulty.has(faces.length))

    return {
      faces,
      spots,
    }
  }

  _placeSpotCardsInGrid(spots) {
    for (const [x,y] of this._startSpotPositions) {
      const card = spots.shift()
      card.gridPosition = [x, y]

      this.insert(x, y, card)
    }
  }

  _placeFaceCardsInGrid(faces) {
    for (const faceCard of faces) {
      const mostSimilarCards = this._orderByMostSimilarCard(faceCard)
      let isFaceCardInserted = false

      for (let i = 0; i < mostSimilarCards.length && !isFaceCardInserted; i++) {
        const card = mostSimilarCards[i]
        const [x, y] = card.gridPosition

        const adjacentTiles = this._getAdjacentFaceTiles(x, y)

        for (const [x, y] of adjacentTiles) {
          if (!this.query(x, y)) {
            this.insert(x, y, faceCard)
            isFaceCardInserted = true
            break
          }
        }
      }
    }
  }

  _orderByMostSimilarCard(faceCard) {
    const byValueDiff = (a, b) => b.value - a.value
    const isSameSuit = (card) => card.suit === faceCard.suit
    const isSameColor = (card) => card.color === faceCard.color
    const difference = (a, b) => {
      let sa = new Set([...a])
      let sb = new Set([...b])

      const resultA = a.filter((entry) => !sb.has(entry))
      const resultB = b.filter((entry) => !sa.has(entry))
      return [...resultA, ...resultB]
    }

    const playedCards = this._startSpotPositions.map(([x, y]) => this.query(x,y))
    const orderBySuitAndValue = [...playedCards].filter(isSameSuit).sort(byValueDiff)
    const orderByColorAndValue = [...playedCards].filter(isSameColor).sort(byValueDiff)
    const orderByValue = [...playedCards].sort(byValueDiff)

    return [
      ...orderBySuitAndValue,
      ...difference(orderBySuitAndValue, orderByColorAndValue),
      ...difference(orderByColorAndValue, orderByValue),
    ]
  }

  _getAdjacentFaceTiles(x, y) {
    const coordinate = `${x}${y}`
    switch (coordinate) {
      case '11':
        return [[0,1], [1,0]]
      case '12':
        return [[0,2]]
      case '13':
        return [[0,3], [1,4]]
      case '21':
        return [[2,0]]
      case '23':
        return [[2,4]]
      case '31':
        return [[3,0], [4,1]]
      case '32':
        return [[4,2]]
      case '33':
        return [[4,3], [3,4]]
    }
  }

  findValidTilePlacements(card) {
    if (card.isFaceCard) {
      return [...this._facePositions].filter(([x, y]) => !this.query(x, y))
    } else if (card.isJoker) {
      return [...this._spotPositions]
    } else {
      return [...this._spotPositions].filter(([x, y]) => {
        return !this.query(x, y) || this.query(x, y).value <= card.value
      })
    }
  }

  getCardFromHtmlGrid(x, y) {
    const htmlGrid = this.htmlGrid
    const stride = (5 * x) + y
    return htmlGrid[stride]
  }

  query(x, y) {
    const stride = (5 * x) + y
    return this._grid[stride].at(0)
  }

  insert(x, y, card) {
    const stride = (5 * x) + y
    if (card.isAce) {
      // TODO: create function to put card stack at bottom of deck
    }

    this._grid[stride].unshift(card)
  }

  render() {
    const htmlGrid = this.htmlGrid

    for (let i = 0; i < this._grid.length; i++) {
      const card = this._grid[i]?.at(0)
      const cardDiv = htmlGrid[i]

      if (cardDiv.classList.contains('hidden')) {
        continue
      } if (!card) {
        cardDiv.classList.add('empty')

        cardDiv.innerHTML = '&nbsp;'
      } else {
        cardDiv.classList.remove('empty')
        cardDiv.classList.add('face')

        cardDiv.textContent = card.faceText
        cardDiv.style.color = card.color
      }
    }
  }

  printAsTable() {
    const cardAbbreviations = this._grid.map(card => !card ? 'XX' : card.toString())
    for (let i = 0; i < 5; i++) {
      console.log([
        cardAbbreviations.shift(),
        cardAbbreviations.shift(),
        cardAbbreviations.shift(),
        cardAbbreviations.shift(),
        cardAbbreviations.shift(),
      ])
    }
  }
}
