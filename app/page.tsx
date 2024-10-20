import WerewolfGame from '@/components/WerewolfGame';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Werewolf Game</h1>
      <WerewolfGame />
    </div>
  );
}