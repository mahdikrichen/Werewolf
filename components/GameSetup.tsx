"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, UserMinus, Plus, Minus } from "lucide-react"
import { roles } from "@/lib/gameData"
import { Player } from "@/lib/types"

interface GameSetupProps {
  onStartGame: (players: Player[]) => void
}

export default function GameSetup({ onStartGame }: GameSetupProps) {
  const [playerCount, setPlayerCount] = useState(8)
  const [selectedRoles, setSelectedRoles] = useState<Record<string, number>>({})

  const handleRoleSelection = (role: typeof roles[number], increment: number) => {
    setSelectedRoles((prev) => {
      const current = prev[role.name] || 0
      const newCount = Math.max(0, Math.min(current + increment, role.max))
      return { ...prev, [role.name]: newCount }
    })
  }

  const startGame = () => {
    const totalRoles = Object.values(selectedRoles).reduce((a, b) => a + b, 0)
    const wolfCount = selectedRoles["Wolf"] || 0
    
    if (totalRoles !== playerCount || wolfCount < 1) {
      alert("Invalid setup. Please ensure the number of roles matches the player count and there is at least 1 wolf.")
      return
    }

    const gameRoles = Object.entries(selectedRoles).flatMap(([name, count]) => 
      Array(count).fill(name)
    )
    const shuffled = gameRoles.sort(() => Math.random() - 0.5)
    const newPlayers = shuffled.map((role, index) => ({
      id: index + 1,
      name: `Player ${index + 1}`,
      role: role,
      status: "alive"
    }))
    onStartGame(newPlayers)
  }

  return (
    <Card className="bg-gray-800 text-white">
      <CardHeader>
        <CardTitle>Game Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Player Count: {playerCount}</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                size="icon"
                onClick={() => setPlayerCount(Math.max(playerCount - 1, 5))}
              >
                <UserMinus className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                size="icon"
                onClick={() => setPlayerCount(Math.min(playerCount + 1, 20))}
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ScrollArea className="h-64 border rounded-md p-4">
            <div className="space-y-2">
              {roles.map((role) => (
                <div key={role.name} className="flex items-center justify-between">
                  <span className="flex items-center">
                    <role.icon className="h-4 w-4 mr-2 text-blue-400" />
                    {role.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      size="icon"
                      onClick={() => handleRoleSelection(role, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{selectedRoles[role.name] || 0}</span>
                    <Button
                      variant="outline"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      size="icon"
                      onClick={() => handleRoleSelection(role, 1)}
                      disabled={selectedRoles[role.name] >= role.max}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Button onClick={startGame} className="w-full bg-green-500 hover:bg-green-600 text-white" disabled={Object.values(selectedRoles).reduce((a, b) => a + b, 0) !== playerCount || (selectedRoles["Wolf"] || 0) < 1}>
            Start Game
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}