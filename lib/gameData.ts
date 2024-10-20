import { UserPlus, Dog, Shield, Hand, Eye, Crosshair } from "lucide-react"

export const roles = [
  { name: "Villager", type: "villager", max: Infinity, icon: UserPlus },
  { name: "Wolf", type: "wolf", max: Infinity, icon: Dog },
  { name: "Paladin", type: "special", max: 1, icon: Shield },
  { name: "Sorcerer", type: "special", max: 1, icon: Hand },
  { name: "Fortune Teller", type: "special", max: 1, icon: Eye },
  { name: "Hunter", type: "special", max: 1, icon: Crosshair },
] as const

export const turnOrder = ["Paladin", "Sorcerer", "Fortune Teller", "Wolf"]