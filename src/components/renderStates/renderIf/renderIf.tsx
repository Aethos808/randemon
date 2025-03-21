import type { ReactNode } from 'react';

type RenderIfProps = {
  condition: boolean;
  children: ReactNode;
};

export const RenderIf = (props: RenderIfProps) => {
  const { condition = false, children } = props;
  const isConditionMetAndHasChildren = condition && !!children;

  if (isConditionMetAndHasChildren) {
    return <>{children}</>;
  }

  return null;
};
