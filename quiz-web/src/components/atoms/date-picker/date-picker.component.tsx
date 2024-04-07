import React, { useMemo } from 'react';
import { DatePicker as AntdDatePicker, DatePickerProps } from 'antd';

/**
 * A date picker component based on Ant Design's DatePicker.
 * @param {DatePickerProps} props - Props for the DatePicker component.
 * @returns {React.ReactElement} A memoized instance of the DatePicker component.
 * */

const DatePicker: React.FC<DatePickerProps> = (
  props: DatePickerProps
): React.ReactElement => {
  const MemoizedDatePicker: React.ReactElement<DatePickerProps> =
    useMemo(() => {
      return <AntdDatePicker data-test-id="date-picker" {...props} />;
    }, [props]);

  return MemoizedDatePicker;
};

export default DatePicker;
