import { roles, turnOrder } from "@/lib/gameData"

interface RoleMapProps {
  currentRole: string
  isNight: boolean
}

export default function RoleMap({ currentRole, isNight }: RoleMapProps) {
  const getNextRole = (role: string) => {
    const index = turnOrder.indexOf(role)
    return index === turnOrder.length - 1 ? turnOrder[0] : turnOrder[index + 1]
  }

  return (
    <div className="flex justify-around items-center my-4">
      {turnOrder.map((role) => {
        const roleData = roles.find(r => r.name === role)
        const isActive = isNight && role === currentRole
        const isNext = isNight && getNextRole(currentRole) === role

        return (
          <div key={role} className={`flex flex-col items-center ${isActive ? 'animate-pulse' : ''}`}>
            <roleData.icon className={`h-8 w-8 ${isActive ? 'text-yellow-400' : isNext ? 'text-blue-400' : 'text-gray-400'}`} />
            <span className={`text-sm mt-1 ${isActive ? 'text-yellow-400' : isNext ? 'text-blue-400' : 'text-gray-400'}`}>{role}</span>
          </div>
        )
      })}
    </div>
  )
}