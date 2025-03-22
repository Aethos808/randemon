'use client';

import { Button } from '@/components/shadcn/ui/button';
import { useRouter } from 'next/navigation';
import { Dices } from 'lucide-react';

export function RegenerateButton() {
  const router = useRouter();

  const handleRegenerate = async () => {
    router.refresh();
  };

  return (
    <Button
      onClick={handleRegenerate}
      className="w-full md:w-auto px-8 py-6 text-lg font-semibold rounded-full"
      variant="default"
    >
      <Dices className="mr-2" />
      Randomize Team
    </Button>
  );
}
