import React, { ReactElement, useMemo } from 'react';
import { TitleProps as AntdHeadingProps } from 'antd/lib/typography/Title';
import { Typography } from 'antd';

export interface HeadingProps extends AntdHeadingProps {
  children: string | ReactElement;
}

const Heading = ({ level, children, ...props }: HeadingProps): ReactElement => {
  const MemoizedHeading: React.ReactElement<HeadingProps> = useMemo(() => {
    return (
      <Typography.Title level={level} {...props}>
        {children}
      </Typography.Title>
    );
  }, [level, children, props]);

  return MemoizedHeading;
};

export default Heading;
