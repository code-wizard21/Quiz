import React, { useMemo } from 'react';
import { List as AntdList, ListProps } from 'antd';

/**

A memoized wrapper for the Ant Design List component.
@template T - The type of the list items.
@param {ListProps<T>} props - The props for the List component.
@returns {React.ReactElement} A memoized List component.
* */

// TODO: Need to resolve any here.
const List: React.FC<any> = (props: ListProps<any>): React.ReactElement => {
  const MemoizedList: React.ReactElement<any> = useMemo(() => {
    return <AntdList {...props} />;
  }, [props]);

  return MemoizedList;
};

export default List;
