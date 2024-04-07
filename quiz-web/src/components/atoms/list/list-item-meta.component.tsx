import React, { useMemo } from 'react';
import { List } from 'antd';
import { ListItemMetaProps } from 'antd/lib/list';

/**

A component that renders the meta information for a List.Item.
@param {ListItemMetaProps} props - The props for the component.
@returns {React.ReactElement} A memoized List.Item.Meta component.
* */

const ListItemMeta: React.FC<ListItemMetaProps> = (
  props: ListItemMetaProps
): React.ReactElement => {
  const MemoizedListItemMeta: React.ReactElement<ListItemMetaProps> =
    useMemo(() => {
      return <List.Item.Meta {...props} />;
    }, [props]);

  return MemoizedListItemMeta;
};

export default ListItemMeta;
