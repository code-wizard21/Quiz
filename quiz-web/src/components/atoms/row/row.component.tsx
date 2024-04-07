import { Row as AntdRow, RowProps } from 'antd';
import React, { useMemo } from 'react';

const Row: React.FC<RowProps> = (props: RowProps): React.ReactElement => {
  const MemoizedRow: React.ReactElement<RowProps> = useMemo(() => {
    return <AntdRow {...props} />;
  }, [props]);

  return MemoizedRow;
};

export default Row;
