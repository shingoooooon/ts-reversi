import express from 'express'
import { TurnService } from '../application/turnService'

export const turnRouter = express.Router()

const turnService = new TurnService()

interface turnGetResponseBody {
  turnCount: number,
  board: number[][],
  nextDisc: number | null,
  winnerDisc: number | null
}

turnRouter.get('/api/games/latest/turns/:turnCount', async (req, res: express.Response<turnGetResponseBody>) => {
  const turnCount = parseInt(req.params.turnCount)
  const output = await turnService.findLatestTurnCount(turnCount)

  const resBody = {
    turnCount: output.turnCount,
    board: output.board,
    nextDisc: output.nextDisc ?? null,
    winnerDisc:output.winnerDisc ?? null
  }

  res.json(resBody)
})

interface turnPostRequestBody {
  turnCount: number,
  move: {
    disc: number,
    x: number,
    y: number
  }
}

turnRouter.post('/api/games/latest/turns', async (req: express.Request<{}, {}, turnPostRequestBody>, res) => {
  const turnCount = req.body.turnCount
  const disc = req.body.move.disc
  const x = req.body.move.x
  const y = req.body.move.y

  await turnService.registerTurn(turnCount, disc, x, y)

  res.status(201).end()
})
