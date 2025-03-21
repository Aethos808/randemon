import { Header } from '@/components/layout/Header';

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Header />
      <section>Randomize and Export Buttons</section>
      <section>Team Preview</section>
    </main>
  );
}
