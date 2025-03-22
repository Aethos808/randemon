import { cn } from '@/lib/utils/utils';

type TitleProps = {
  title: string;
  className?: string;
};

export const Title = (props: TitleProps) => {
  const { title, className } = props;

  return <h1 className={cn('font-semibold', className)}>{title}</h1>;
};
