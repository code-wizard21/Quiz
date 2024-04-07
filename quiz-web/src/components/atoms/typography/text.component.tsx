import React, { ReactElement, useMemo } from 'react';
import { Typography } from 'antd';
import { TextProps as AntdTextProps } from 'antd/lib/typography/Text';
import { Tooltip } from '../tooltip';

export interface TextProps extends AntdTextProps {
  fullWidth?: boolean;
  skipFromBefore?: boolean;
  children: ReactElement | ReactElement[] | string ;
  visibleLength?: number;
  isLink?: boolean;
}

const Text: React.FC<TextProps> = ({
  fullWidth = true,
  skipFromBefore = false,
  visibleLength = 10,
  isLink = false,
  children,
  ...props
}: TextProps): React.ReactElement => {
  const memoizedText = useMemo(() => {
    let start: string = '';
    let suffix: string = '';

    if (
      fullWidth ||
      (typeof children === 'string' && children.length < visibleLength)
    ) {
      return (
        <Typography.Text className={isLink ? 'link' : ''} {...props}>
          {children}
        </Typography.Text>
      );
    }
    if (skipFromBefore && typeof children === 'string') {
      start = '...';
      suffix = children.slice(-visibleLength).trim();
    } else if (typeof children === 'string') {
      start = children.slice(0, visibleLength);
      suffix = '...';
    }

    return (
      <Tooltip title={children}>
        <Typography.Text
          className={isLink ? 'link' : ''}
          ellipsis={{ suffix }}
          {...props}
        >
          {start}
        </Typography.Text>
      </Tooltip>
    );
  }, [fullWidth, skipFromBefore, visibleLength, isLink, children, props]);

  return memoizedText;
};

export default Text;
