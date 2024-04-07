import React, { useMemo } from 'react';
import { Spin as AntdSpin, SpinProps } from 'antd';

const Spin: React.FC<SpinProps> = (props: SpinProps): React.ReactElement => {
  const MemoizedSpin: React.ReactElement<SpinProps> = useMemo(() => {
    return <AntdSpin {...props} />;
  }, [props]);

  return MemoizedSpin;
};

export default Spin;
