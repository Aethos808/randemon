import { Card } from '@/components/shadcn/ui/card';
import { Title } from '@/components/layout/title/Title';

type CardWithTitleProps = {
  title: string;
  children: React.ReactNode;
};

export const CardWithTitle = (props: CardWithTitleProps) => {
  const { title, children } = props;

  return (
    <Card className="p-6 space-y-2">
      <Title title={title} />
      {children}
    </Card>
  );
};
