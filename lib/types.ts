export interface Player {
  id: number
  name: string
  role: string
  status: "alive" | "dead"
}

export interface GameData {
  paladinLastProtected: string | null
  sorcererPotions: {
    revive: number
    kill: number
  }
  revealedRole: string | null
  protectedPlayer: string | null
  killedPlayer: string | null
}

export type ActionLog = string[]

export interface Action {
  role: string
  action: string
  target: string
}