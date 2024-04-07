import React, { useMemo } from 'react';
import { Card as AntdCard, CardProps } from 'antd';

/**
 * A customized Card component based on Ant Design's Card component.
 *
 * @component
 * @param {CardProps} props - Props for the component.
 * @return {React.ReactElement} A React component that represents the Card.
 * */

const Card: React.FC<CardProps> = (props: CardProps): React.ReactElement => {
  const MemoizedCard: React.ReactElement<CardProps> = useMemo(() => {
    return <AntdCard {...props} />;
  }, [props]);

  return MemoizedCard;
};

export default Card;
