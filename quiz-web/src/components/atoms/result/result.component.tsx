import React, { useMemo } from 'react';
import { Result as AntdResult, ResultProps } from 'antd';

const Result: React.FC<ResultProps> = (
  props: ResultProps
): React.ReactElement => {
  const MemoizedResult: React.ReactElement<ResultProps> = useMemo(() => {
    return <AntdResult {...props} />;
  }, [props]);

  return MemoizedResult;
};

export default Result;
