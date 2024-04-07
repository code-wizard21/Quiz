import { Tooltip as AntdTooltip, TooltipProps } from 'antd';
import React, { useMemo } from 'react';

const Tooltip: React.FC<TooltipProps> = (
  props: TooltipProps
): React.ReactElement => {
  const MemoizedTooltip: React.ReactElement<TooltipProps> = useMemo(() => {
    return <AntdTooltip {...props} />;
  }, [props]);

  return MemoizedTooltip;
};

export default Tooltip;
