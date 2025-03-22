import Image from 'next/image';
import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';
import { CardWithTitle } from '@/components/layout/CardWithTitle/CardWithTitle';

type Move = {
  name: string;
  type: string;
};

export type Moves = Move[] & { length: 4 };

type PokemonCardProps = {
  name: string;
  type: string[];
  ability: string;
  moves: Moves;
  pokemonImage: string;
  itemImage: string;
  item: string;
};

export const PokemonCard = (props: PokemonCardProps) => {
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
              className="flex justify-self-center w-20 h-20 object-contain"
              priority
            />
          </div>
          <div className="absolute bottom-0 right-0 flex flex-col items-center">
            <div className="relative w-8 h-8">
              <Image src={itemImage} alt={item} width={30} height={30} className="w-auto h-auto" />
            </div>
            <div className="text-sm">{item}</div>
          </div>
        </div>
        <div className="flex gap-2">
          {type.map((t) => (
            <Badge key={t} style={{ backgroundColor: `var(--type-${t.toLowerCase()})` }}>
              {t}
            </Badge>
          ))}
        </div>
        <div>
          <span className="font-semibold">Ability: </span>
          {ability}
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
