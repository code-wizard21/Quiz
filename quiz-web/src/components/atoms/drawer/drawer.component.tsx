import { Drawer as AntdDrawer, DrawerProps } from 'antd';
import React from 'react';

/**
 * Ant Design `Drawer` component.
 *
 * See [Ant Design Drawer](https://ant.design/components/drawer/) for more information.
 */

const Drawer: React.FC<DrawerProps> = (
  props: DrawerProps
): React.ReactElement => <AntdDrawer {...props} />;

export default Drawer;
