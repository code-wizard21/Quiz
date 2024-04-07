import React, { useMemo } from 'react';
import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';

const { Option } = AntdSelect;

export interface OptionProps {
  key: string | number;
  value: string | number;
  label: string;
  className?: string;
}

export interface SelectProps extends AntdSelectProps {
  options: OptionProps[];
}

const Select: React.FC<SelectProps> = ({
  options,
  ...props
}: SelectProps): React.ReactElement => {
  const MemoizedSelect: React.ReactElement<SelectProps> = useMemo(() => {
    return (
      <AntdSelect {...props}>
        {(options || []).map((option: OptionProps) => {
          return (
            <Option
              className={option.className}
              value={option.value}
              key={option.key}
            >
              {option.label}
            </Option>
          );
        })}
      </AntdSelect>
    );
  }, [options, props]);

  return MemoizedSelect;
};

export default Select;
