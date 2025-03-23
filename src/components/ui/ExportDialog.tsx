import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/shadcn/ui/dialog';
import type { PokemonCardProps } from './PokemonCard';

function formatPokemon(pokemon: PokemonCardProps) {
  return `${pokemon.name} @ ${pokemon.item}
Ability: ${pokemon.ability}
EVs: 1 HP
Bashful Nature
- ${pokemon.moves[0].name}
- ${pokemon.moves[1].name}
- ${pokemon.moves[2].name}
- ${pokemon.moves[3].name}`;
}

type ExportDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  pokemon: PokemonCardProps[];
};

export function ExportDialog({ isOpen, onClose, pokemon }: ExportDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Export Team</DialogTitle>
        </DialogHeader>
        <DialogDescription>You can import this text into Showdown to build a team!</DialogDescription>
        <DialogDescription>
          {pokemon.map((p, index) => (
            <span key={p.name} className="whitespace-pre-wrap font-mono block">
              {`${formatPokemon(p)} + ${index != 5 ? '\n\n' : ''}`}
            </span>
          ))}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
