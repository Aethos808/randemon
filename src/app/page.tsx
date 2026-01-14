import { Header } from '@/components/ui/Header';
import { PokemonCard } from '@/components/ui/PokemonCard';
import { RegenerateButton } from '@/components/ui/RegenerateButton';
import { VersionText } from '@/components/ui/VersionText';
import { ExportButton } from '@/components/ui/ExportButton';
import { generateRandomTeam } from '@/services/team';

export default async function Home() {
  const randomPokemon = await generateRandomTeam();

  return (
    <main className="flex flex-col gap-y-4 row-start-2 items-center sm:items-start">
      <VersionText />
      <Header />
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <RegenerateButton />
        <ExportButton pokemon={randomPokemon} />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {randomPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} {...pokemon} />
        ))}
      </section>
    </main>
  );
}
