import React, { useMemo } from 'react';
import { Image as AntdImage, ImageProps } from 'antd';

/**
 * Ant Design `Image` component wrapped in a React functional component
 *
 * @param {ImageProps} props - Ant Design `Image` component props
 * @returns {React.ReactElement} A memoized Ant Design `Image` component
 */

const Image: React.FC<ImageProps> = (props: ImageProps): React.ReactElement => {
  const MemoizedImage: React.ReactElement<ImageProps> = useMemo(() => {
    return <AntdImage {...props} />;
  }, [props]);

  return MemoizedImage;
};

export default Image;
