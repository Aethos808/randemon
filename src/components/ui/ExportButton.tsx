'use client';

import { Button } from '@/components/shadcn/ui/button';
import { useState } from 'react';
import { ExportDialog } from '@/components/ui/ExportDialog';
import type { PokemonCardProps } from '@/components/ui/PokemonCard';
import { ClipboardCopy } from 'lucide-react';

type ExportButtonProps = {
  pokemon: PokemonCardProps[];
};

export function ExportButton({ pokemon }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="w-full md:w-auto px-8 py-6 text-lg font-semibold rounded-full cursor-pointer"
        variant="outline"
      >
        <ClipboardCopy />
        Export Team
      </Button>
      <ExportDialog isOpen={isOpen} onClose={handleClose} pokemon={pokemon} />
    </>
  );
}
