export default class Grid {
  get htmlGrid() {
    return Array.from(document.querySelectorAll('.card'))
  }

  constructor(deck) {
    this.deck = deck
    this.grid = Array(25).fill(null)
    this.startPositions = [[1,1], [1,2], [1,3], [2,1], [2,3], [3,1], [3,2], [3,3]]

    this.setup()
  }

  setup() {
    let isValidSetup = false
    while (!isValidSetup) {
      this.deck.reset()
      this.deck.shuffle()

      // draw cards and divide into 2 piles - faces and playable cards
      let faces = []
      let playable = []
      while (playable.length <= 7) {
        const card = this.deck.top()
        if (card.value > 10) {
          faces.push(card)
        } else {
          playable.push(card)
        }
      }

      if (faces.length < 3) {
        continue
      }


      // insert playable cards into grid
      for (const [x,y] of this.startPositions) {
        const card = playable.shift()
        card.position = [x, y]

        this.insert(x, y, card)
      }

      // pick the proper position for each face card
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

      isValidSetup = true
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

    const playedCards = this.startPositions.map(([x, y]) => this.query(x,y))
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

  query(x, y) {
    const stride = (5 * x) + y
    return this.grid[stride]
  }

  remove(x, y) {
    const stride = (5 * x) + y
    const card = this.grid[stride]
    this.grid[stride] = null

    return card
  }

  insert(x, y, card) {
    const stride = (5 * x) + y
    this.grid[stride] = card
  }

  render() {
    const htmlGrid = this.htmlGrid

    for (let i = 0; i < this.grid.length; i++) {
      const card = this.grid[i]
      const cardDiv = htmlGrid[i]

      if (cardDiv.classList.contains('hidden')) {
        continue
      } else if (!card) {
        cardDiv.classList.add('empty')
        continue
      } else {
        cardDiv.classList.remove('empty')
      }

      cardDiv.textContent = card.faceText
      cardDiv.style.color = card.color
    }
  }

  log() {
    const cardAbbreviations = this.grid.map(card => {
      return (card === null)
        ? 'XX'
        : card.toString()
    })

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
