import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <header className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Randémon</h1>
        <ThemeToggle />
      </header>
      <section>Randomize and Export Buttons</section>
      <section>Team Preview</section>
    </main>
  );
}
