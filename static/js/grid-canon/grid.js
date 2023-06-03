import Game from './game.js'

export default class Grid {
  get htmlGrid() {
    return Array.from(document.querySelectorAll('.game-grid > .card'))
  }

  constructor(deck) {
    this._deck = deck
    this._grid = Array(25).fill(null)

    this._startSpotPositionss = [[1,1], [1,2], [1,3], [2,1], [2,3], [3,1], [3,2], [3,3]]
    this._spotPosition = [[1,1], [1,2], [1,3], [2,1], [2,2], [2,3], [3,1], [3,2], [3,3]]
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

      this._deck.newOrderedDeck()
      this._deck.shuffle()

      while (spots.length <= 7) {
        const card = this._deck.pop()
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
    for (const [x,y] of this._startSpotPositionss) {
      const card = spots.shift()
      card.position = [x, y]

      this.insert(x, y, card)
    }
  }

  _placeFaceCardsInGrid(faces) {
    for (const faceCard of faces) {
      const mostSimilarCards = this._orderByMostSimilarCard(faceCard)
      let isFaceCardInserted = false

      for (let i = 0; i < mostSimilarCards.length && !isFaceCardInserted; i++) {
        const card = mostSimilarCards[i]
        const [x, y] = card.position

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

    const playedCards = this._startSpotPositionss.map(([x, y]) => this.query(x,y))
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
    } else {
      return [...this._spotPosition].filter(([x, y]) => {
        return !this.query(x, y) || this.query(x, y).value < card.value
      })
    }
  }

  query(x, y) {
    const stride = (5 * x) + y
    return this._grid[stride]
  }

  queryHtmlGrid(x, y) {
    const htmlGrid = this.htmlGrid
    const stride = (5 * x) + y
    return htmlGrid[stride]
  }

  remove(x, y) {
    const stride = (5 * x) + y
    const card = this._grid[stride]
    this._grid[stride] = null

    return card
  }

  insert(x, y, card) {
    const stride = (5 * x) + y
    if (this.query(x, y)) {
      const oldCard = this.remove(x, y)
      this._deck.discard(oldCard)
    }

    this._grid[stride] = card
  }

  render() {
    const htmlGrid = this.htmlGrid

    for (let i = 0; i < this._grid.length; i++) {
      const card = this._grid[i]
      const cardDiv = htmlGrid[i]

      if (cardDiv.classList.contains('hidden')) {
        continue
      } else if (!card) {
        cardDiv.classList.add('empty')

        continue
      } else {
        cardDiv.classList.remove('empty')
        cardDiv.classList.add('face')
      }

      cardDiv.textContent = card.faceText
      cardDiv.style.color = card.color
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
