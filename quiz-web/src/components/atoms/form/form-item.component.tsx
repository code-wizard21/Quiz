import React, { useMemo } from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';

/**
 * A component that wraps the antd Form.Item component with useMemo for better performance.
 * @param {FormItemProps} props - The props for the Form.Item component.
 * @returns {React.ReactElement} A memoized Form.Item component.
 */
const FormItem: React.FC<FormItemProps> = (
  props: FormItemProps
): React.ReactElement => {
  const MemoizedFormItem: React.ReactElement<FormItemProps> = useMemo(() => {
    return <Form.Item {...props} />;
  }, [props]);

  return MemoizedFormItem;
};
export default FormItem;
