import { Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { ReactElement, useMemo } from 'react';

const Body = ({ children, ...props }: ParagraphProps): ReactElement => {
  const MemoizedBody: React.ReactElement<ParagraphProps> = useMemo(() => {
    return <Typography.Paragraph {...props}>{children}</Typography.Paragraph>;
  }, [children, props]);

  return MemoizedBody;
};

export default Body;
