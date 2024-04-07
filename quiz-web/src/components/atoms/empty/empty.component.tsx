import React, { useMemo } from 'react';
import { Empty as AntdEmpty, EmptyProps } from 'antd';

/**
 * A component that displays an empty state, typically used when there is no data to show.
 * This component is a wrapper around the `Empty` component from Ant Design.
 *
 * @param {EmptyProps} props - The props for the `Empty` component, which include:
 *   - `image`: the custom image to use, if any.
 *   - `imageStyle`: the custom style to apply to the image, if any.
 *   - `description`: the description text to show below the image, if any.
 *   - `children`: any child components to render inside the `Empty` component.
 *
 * @returns {React.ReactElement} A memoized instance of the `Empty` component with the specified props.
 */

const Empty: React.FC<EmptyProps> = (props: EmptyProps): React.ReactElement => {
  const MemoizedEmpty: React.ReactElement<EmptyProps> = useMemo(() => {
    return <AntdEmpty {...props} />;
  }, [props]);

  return MemoizedEmpty;
};

export default Empty;
