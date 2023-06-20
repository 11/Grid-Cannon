import Game from './game.js'
import CardStack from './card-stack.js'

export default class Grid {
  get htmlGrid() {
    return Array.from(document.querySelectorAll('.game-grid > [data-game-card="true"]'))
  }

  constructor() {
    this._grid = Array.from(Array(25), () => new CardStack())

    this._startSpotPositions = [[1,1], [1,2], [1,3], [2,1], [2,3], [3,1], [3,2], [3,3]]
    this._spotPositions = [[1,1], [1,2], [1,3], [2,1], [2,2], [2,3], [3,1], [3,2], [3,3]]
    this._facePositions = [[0,1], [0,2], [0,3], [1,0], [1,4], [2,0], [2,4], [3,0], [3,4], [4,1], [4,2],[4,3]]
  }

  bindGameEvents(chooseGridPositionEvent) {
    this.htmlGrid.forEach(position => position.onclick = chooseGridPositionEvent.bind(window.game))
  }

  setup(difficulty) {
    this._clearScreen()

    const {
      faces,
      spots,
      jokers,
      aces,
    } = this._generateNewGridByDifficulty(difficulty)
    this._placeSpotCardsInGrid(spots)
    this._placeFaceCardsInGrid(faces)

    let joker
    while(joker = jokers.pop()) {
      window.game.controls.putJokers(joker)
    }

    let ace
    while (ace = aces.pop()) {
      window.game.controls.putAces(ace)
    }
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
    let jokers
    let aces
    do {
      faces = []
      spots = []
      jokers = []
      aces = []

      window.game.deck.newOrderedDeck()
      window.game.deck.shuffle()

      while (spots.length <= 7) {
        const card = window.game.deck.pop()
        if (card.isFace) {
          faces.push(card)
        } else if (card.isJoker) {
          jokers.push(card)
        } else if (card.isAce) {
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

  _placeSpotCardsInGrid(spots) {
    for (const [x,y] of this._startSpotPositions) {
      const card = spots.shift()
      card.gridPosition = [x, y]

      this.push(x, y, card)
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
          if (!this.peek(x, y)) {
            this.push(x, y, faceCard)
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

    const playedCards = this._startSpotPositions.map(([x, y]) => this.peek(x,y))
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
  }

  getCardHtmlFromGridPosition(x, y) {
    const stride = (5 * x) + y
    return this.htmlGrid.at(stride)
  }

  peek(x, y) {
    const stride = (5 * x) + y
    return this._grid.at(stride)?.peek()
  }

  pop(x, y) {
    const stride = (5 * x) + y
    const card = this._grid.at(stride)?.pop()
    card.gridPosition = [null, null]
    return card
  }

  clear(x, y) {
    const stride = (5 * x) + y
    return this._grid.at(stride)?.clear()
  }

  push(x, y, card) {
    const stride = (5 * x) + y
    card.gridPosition = [x, y]
    return this._grid.at(stride)?.push(card)
  }

  pushFace(x, y, face) {

  }

  pushJoker(x, y, joker) {

  }

  pushAce(x, y, ace) {

  }

  pushSpotAndAttack(x, y, card) {
    const stride = (5 * x) + y
    this._grid.at(stride)?.push(card)

    // TODO
  }

  findValidGridPlacements() {
    const card = window.game.turn.selectedCard
    if (card.isFace) {
      return [...this._facePositions]
        .filter(([x, y]) => !this.peek(x, y))
        .map(coordinates => coordinates.join(''))
    } else if (card.isJoker || card.isAce) {
      return [...this._spotPositions]
        .map(coordinates => coordinates.join(''))
    } else {
      return [...this._spotPositions]
        .filter(([x, y]) => !this.peek(x, y) || this.peek(x, y).value <= card.value)
        .map(coordinates => coordinates.join(''))
    }
  }

  render() {
    const htmlGrid = this.htmlGrid

    for (let i = 0; i < this._grid.length; i++) {
      const card = this._grid[i].peek()
      const cardDiv = htmlGrid[i]
      const x = parseInt(cardDiv.getAttribute('data-grid-x'))
      const y = parseInt(cardDiv.getAttribute('data-grid-y'))

      if (window.game.gameState.selectedCardValidPlacementPositions?.has(`${x}${y}`)) {
        cardDiv.classList.add('selected')
      } else {
        cardDiv.classList.remove('selected')
      }

      if (!card) {
        cardDiv.classList.add('empty')
        cardDiv.innerHTML = '&nbsp;'
        continue
      }

      card.render(cardDiv)
    }
  }

  printAsTable() {
    const cardAbbreviations = this._grid.map(stack => !stack.peek () ? 'XX' : stack.peek().toString())
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
