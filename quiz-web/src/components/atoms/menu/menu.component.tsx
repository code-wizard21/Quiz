import React, { useMemo } from 'react';
import { Menu as AntdMenu, MenuProps } from 'antd';

/**
Antd Menu component with memoization for performance optimization
@component
@param {MenuProps} props - Antd Menu props
@returns {React.ReactElement} - Memoized Antd Menu component
*/

const Menu: React.FC<MenuProps> = (props: MenuProps): React.ReactElement => {
  const MemoizedMenu: React.ReactElement<MenuProps> = useMemo(() => {
    return <AntdMenu {...props} />;
  }, [props]);

  return MemoizedMenu;
};

export default Menu;
