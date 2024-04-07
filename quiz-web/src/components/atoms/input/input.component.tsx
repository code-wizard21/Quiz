import React, { useMemo } from 'react';
import { Input as AntdInput, InputProps } from 'antd';

/**
 * A customized Antd Input component.
 * @param {InputProps} props - Props for the Input component.
 * @returns {React.ReactElement} - A memoized Input component.
 */

const Input: React.FC<InputProps> = (props: InputProps): React.ReactElement => {
  const MemoizedInput: React.ReactElement<InputProps> = useMemo(() => {
    return <AntdInput {...props} />;
  }, [props]);

  return MemoizedInput;
};

export default Input;
