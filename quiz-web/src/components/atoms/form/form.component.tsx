import { Form as AntdForm, FormProps as AntdFormProps } from 'antd';
import React, { useMemo } from 'react';

export interface FormProps extends AntdFormProps {
  children?: React.ReactNode;
}
/**
 * A memoized wrapper around the Ant Design Form component.
 *
 * @param props - The props for the component.
 * @returns A memoized Form component.
 */
const Form: React.FC<FormProps> = (props: FormProps): React.ReactElement => {
  const MemoizedForm: React.ReactElement<FormProps> = useMemo(() => {
    return <AntdForm {...props}>{props.children}</AntdForm>;
  }, [props]);

  return MemoizedForm;
};

export default Form;
