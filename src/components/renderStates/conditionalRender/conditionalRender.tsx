type ConditionalRenderProps = {
  condition: boolean;
  renderIfTrue: React.ReactNode;
  renderIfFalse: React.ReactNode;
};

export const ConditionalRender = (props: ConditionalRenderProps) => {
  const { condition, renderIfTrue, renderIfFalse } = props;

  return <>{condition ? renderIfTrue : renderIfFalse}</>;
};
