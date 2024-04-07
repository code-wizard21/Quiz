import React, { useMemo } from 'react';
import { Divider as AntdDivider, DividerProps } from 'antd';

/**
 * Ant Design divider component wrapped in a React functional component.
 *
 * @param {DividerProps} props - Props for the Divider component.
 * @returns {React.ReactElement} - A memoized React element for the Divider component.
 *
 * @see https://ant.design/components/divider/
 */

const Divider: React.FC<DividerProps> = (
  props: DividerProps
): React.ReactElement => {
  const MemoizedDivider: React.ReactElement<DividerProps> = useMemo(() => {
    return <AntdDivider {...props} />;
  }, [props]);

  return MemoizedDivider;
};

export default Divider;
