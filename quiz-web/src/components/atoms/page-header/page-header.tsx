import {
  PageHeader as AntdPageHeader,
  PageHeaderProps,
} from '@ant-design/pro-layout';
import React from 'react';

const PageHeader: React.FC<PageHeaderProps> = (props: PageHeaderProps) => (
  <AntdPageHeader {...props} />
);

export default PageHeader;
