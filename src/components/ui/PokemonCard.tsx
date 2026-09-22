import { FileQuestion } from 'lucide-react';
import Image from 'next/image';

import { CardWithTitle } from '@/components/layout/CardWithTitle/CardWithTitle';
import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';
import type { Pokemon } from '@/types/pokemon';

export const PokemonCard = (props: Pokemon) => {
  const { name, type, ability, moves, pokemonImage, itemImage, item } = props;

  return (
    <CardWithTitle title={name}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center relative">
          <div className="relative h-30">
            <Image
              src={pokemonImage}
              alt={name}
              width={100}
              height={100}
              className="flex justify-self-center w-30 h-30 object-contain"
              priority
              unoptimized
            />
          </div>
          <div className="absolute bottom-0 right-0 flex flex-col items-center"></div>
        </div>
        <div className="flex gap-2">
          {type.map((t) => (
            <Badge key={t} style={{ backgroundColor: `var(--type-${t.toLowerCase()})` }}>
              {t}
            </Badge>
          ))}
        </div>
        <div className="flex flex-col md:flex-row md:justify-between gap-4 w-full">
          <div className="flex items-center">
            <span className="font-semibold">Ability: </span>
            <span className="ml-1">{ability}</span>
          </div>

          <div className="flex flex-col md:items-center">
            <div className="relative">
              {itemImage ? (
                <Image src={itemImage} alt={item} width={30} height={30} className="w-7 h-7" />
              ) : (
                <FileQuestion />
              )}
            </div>
            <div className="text-sm">{item}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-semibold">Moves:</div>
          <div className="grid grid-cols-2 gap-2">
            {moves.map((move) => (
              <Button
                key={move.name}
                variant={'outline'}
                style={{ backgroundColor: `var(--type-${move.type.toLowerCase()})` }}
              >
                {move.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </CardWithTitle>
  );
};
