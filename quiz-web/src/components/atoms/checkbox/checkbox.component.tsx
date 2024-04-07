import React, { useMemo } from 'react';
import { Checkbox as AntdCheckbox, CheckboxProps } from 'antd';

const Checkbox: React.FC<CheckboxProps> = (
  props: CheckboxProps
): React.ReactElement => {
  const MemoizedAvatar: React.ReactElement<CheckboxProps> = useMemo(() => {
    return <AntdCheckbox {...props} />;
  }, [props]);

  return MemoizedAvatar;
};

export default Checkbox;
