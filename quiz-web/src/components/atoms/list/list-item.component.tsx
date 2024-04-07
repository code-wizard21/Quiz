import React, { useMemo } from 'react';
import { List } from 'antd';
import { ListItemProps } from 'antd/lib/list';

/**
ListItem is a memoized Ant Design List.Item component that accepts all the props of Ant Design List.Item component.
@typedef {Object} ListItemProps Props for ListItem component. Also, supports all the props of Ant Design List.Item component.
@param {ListItemProps} props Props for ListItem component
@returns {React.ReactElement} A memoized Ant Design List.Item component with given props.
*/

const ListItem: React.FC<ListItemProps> = (
  props: ListItemProps
): React.ReactElement => {
  const MemoizedListItem: React.ReactElement<ListItemProps> = useMemo(() => {
    return <List.Item {...props} />;
  }, [props]);

  return MemoizedListItem;
};

export default ListItem;
