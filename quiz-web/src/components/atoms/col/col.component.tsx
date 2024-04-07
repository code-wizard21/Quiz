import React, { useMemo } from 'react';
import { Col as AntdCol, ColProps } from 'antd';

/**
 * A responsive column component for Ant Design.
 *
 * @param {ColProps} props - The props for the component.
 * @returns {React.ReactElement} A memoized instance of the component.
 */

const Col: React.FC<ColProps> = (props: ColProps): React.ReactElement => {
  const MemoizedCol: React.ReactElement<ColProps> = useMemo(() => {
    return <AntdCol {...props} />;
  }, [props]);

  return MemoizedCol;
};
export default Col;
