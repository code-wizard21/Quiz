import React, { useMemo } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

/**
 * AntdContent is a wrapper for the main content of the page.
 * It is designed to be used in conjunction with other layout components from Ant Design.
 * @param {Object} props - The props object of the component.
 * @param {string} [props.className] - Additional class name for the component.
 * @param {React.ReactNode} [props.children] - The child elements to render inside the component.
 * @param {Object} [props.style] - The style object to apply to the component.
 * @returns {React.ReactElement} The AntdContent component.
 */

// TODO: Need to resolve any here.
const AntdContent: React.FC<any> = (props: any): React.ReactElement => {
  const MemoizedContent: React.ReactElement<any> = useMemo(() => {
    return <Content {...props} />;
  }, [props]);

  return MemoizedContent;
};

export default AntdContent;
