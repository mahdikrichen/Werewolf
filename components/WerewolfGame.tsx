"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import GameSetup from "./GameSetup"
import GameProgress from "./GameProgress"
import { Player, GameData, ActionLog } from "@/lib/types"

export default function WerewolfGame() {
  const [gameState, setGameState] = useState<"setup" | "playing" | "ended">("setup")
  const [players, setPlayers] = useState<Player[]>([])
  const [actionLog, setActionLog] = useState<ActionLog>([])
  const [gameData, setGameData] = useState<GameData>({
    paladinLastProtected: null,
    sorcererPotions: { revive: 1, kill: 1 },
    revealedRole: null,
    protectedPlayer: null,
    killedPlayer: null,
  })

  const startGame = (newPlayers: Player[]) => {
    setPlayers(newPlayers)
    setGameState("playing")
    setActionLog(["Game started", "Night falls"])
  }

  const restartGame = () => {
    setGameState("setup")
    setPlayers([])
    setActionLog([])
    setGameData({
      paladinLastProtected: null,
      sorcererPotions: { revive: 1, kill: 1 },
      revealedRole: null,
      protectedPlayer: null,
      killedPlayer: null,
    })
  }

  return (
    <div className="w-full max-w-md">
      {gameState === "setup" ? (
        <GameSetup onStartGame={startGame} />
      ) : (
        <GameProgress
          players={players}
          setPlayers={setPlayers}
          actionLog={actionLog}
          setActionLog={setActionLog}
          gameData={gameData}
          setGameData={setGameData}
          gameState={gameState}
          setGameState={setGameState}
        />
      )}
      {gameState === "ended" && (
        <div className="mt-4 text-2xl font-bold text-center">
          {actionLog[0]}
        </div>
      )}
      <Button onClick={restartGame} className="mt-4 bg-orange-500 hover:bg-orange-600 text-white w-full">
        <RotateCcw className="mr-2 h-4 w-4" /> Restart Game
      </Button>
    </div>
  )
}