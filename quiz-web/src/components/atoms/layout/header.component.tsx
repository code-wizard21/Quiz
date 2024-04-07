import React, { useMemo } from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

/**
 * A wrapper for the Ant Design `Header` component that provides memoization of the props.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @returns {React.ReactElement} - A memoized `Header` component.
 */

// TODO: Need to resolve any here.
const AntdHeader: React.FC<any> = (props: any): React.ReactElement => {
  const MemoizedHeader: React.ReactElement<any> = useMemo(() => {
    return <Header {...props} />;
  }, [props]);

  return MemoizedHeader;
};

export default AntdHeader;
