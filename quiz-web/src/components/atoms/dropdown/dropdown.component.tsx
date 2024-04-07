import React, { useMemo } from 'react';
import { Dropdown as AntdDropdown, DropdownProps } from 'antd';

/**
 * Ant Design `Dropdown` component.
 *
 * @param {DropdownProps} props - Ant Design `Dropdown` props.
 * @returns {React.ReactElement} The `Dropdown` component.
 */

const Dropdown: React.FC<DropdownProps> = (
  props: DropdownProps
): React.ReactElement => {
  const MemoizedDropdown: React.ReactElement<DropdownProps> = useMemo(() => {
    return <AntdDropdown {...props} />;
  }, [props]);

  return MemoizedDropdown;
};

export default Dropdown;
