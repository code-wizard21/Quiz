import React, { useMemo } from 'react';
import { Layout as AntdLayout } from 'antd';

/**
 * Ant Design's Layout component.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - The class name for the component.
 * @param {React.ReactNode} [props.children] - The children to render inside the layout.
 * @returns {React.ReactElement} The Layout component.
 */

// TODO: Need to resolve any here.
const Layout: React.FC<any> = (props: any): React.ReactElement => {
  const MemoizedLayout: React.ReactElement<any> = useMemo(() => {
    return <AntdLayout {...props} />;
  }, [props]);

  return MemoizedLayout;
};

export default Layout;
