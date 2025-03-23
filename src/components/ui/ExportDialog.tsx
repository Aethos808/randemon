import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/shadcn/ui/dialog';
import { Button } from '@/components/shadcn/ui/button';
import { Copy } from 'lucide-react';
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
  const exportText = pokemon.map((p, index) => `${formatPokemon(p)}${index !== 5 ? '\n\n' : ''}`).join('');

  const handleCopy = () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(exportText).catch((err) => {
          console.error('Failed to copy text:', err);
          fallbackCopyToClipboard();
        });
      } else {
        fallbackCopyToClipboard();
      }
    } catch (err) {
      console.error('Failed to copy text:', err);
      fallbackCopyToClipboard();
    }
  };

  const fallbackCopyToClipboard = () => {
    const textArea = document.createElement('textarea');
    textArea.value = exportText;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      textArea.remove();
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      textArea.remove();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Export Team</DialogTitle>
        </DialogHeader>
        <DialogDescription>Created for [Gen 9] Anything Goes. May work with other formats.</DialogDescription>
        <div className="relative mt-4 rounded-md border p-4">
          <Button onClick={handleCopy} variant="outline" size="icon" className="absolute right-2 top-2 cursor-pointer">
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy to clipboard</span>
          </Button>
          <pre className="whitespace-pre-wrap break-all font-mono text-sm overflow-x-auto p-2">{exportText}</pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}
