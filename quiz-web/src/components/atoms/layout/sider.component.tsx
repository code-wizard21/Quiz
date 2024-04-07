import React, { useMemo } from 'react';
import { Layout } from 'antd';

const { Sider } = Layout;

/**
 * A wrapper component for the `Sider` component from Ant Design.
 *
 * @component
 * @param {Object} props - Props for the component.
 * @param {Object} props.collapsible - Whether the Sider is collapsible.
 * @param {string} props.className - Additional CSS class name to apply to the component.
 * @param {ReactNode} props.children - The content to be rendered inside the Sider.
 * @returns {React.ReactElement} A memoized instance of the `Sider` component from Ant Design.
 */

// TODO: Need to resolve any here.
const AntdSider: React.FC<any> = (props: any): React.ReactElement => {
  const MemoizedSider: React.ReactElement<any> = useMemo(() => {
    return <Sider {...props} />;
  }, [props]);

  return MemoizedSider;
};

export default AntdSider;
