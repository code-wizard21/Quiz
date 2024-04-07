import React, { useMemo } from 'react';
import { Button as AntdButton, ButtonProps } from 'antd';
// import styles from './button.module.scss';

/**
 * A customizable button component based on Ant Design's Button component.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.type] - The type of the button. One of 'default', 'primary', 'ghost', 'dashed', 'link', or 'text'.
 * @param {string} [props.htmlType='button'] - The type of the button, used for the HTML 'type' attribute.
 * @param {string} [props.shape] - The shape of the button. One of 'circle', 'round', or undefined (default).
 * @param {boolean} [props.disabled] - Whether the button is disabled or not.
 * @param {boolean} [props.loading] - Whether the button is in a loading state or not.
 * @param {string} [props.size] - The size of the button. One of 'large', 'middle', 'small', or undefined (default).
 * @param {React.ReactNode} [props.icon] - The icon to display on the button.
 * @param {React.ReactNode} [props.children] - The content to display inside the button.
 * @param {function} [props.onClick] - The function to call when the button is clicked.
 * @param {function} [props.onBlur] - The function to call when the button loses focus.
 * @param {function} [props.onFocus] - The function to call when the button gains focus.
 *
 * @returns {React.ReactElement} A memoized AntdButton component.
 */

// To extend existing AntD props with custom props
// interface IButtonProps extends ButtonProps {
//   testID?: string;
// }

const Button: React.FC<ButtonProps> = ({
  type,
  // testID,
  htmlType = 'button',
  ...props
}: ButtonProps): React.ReactElement => {
  const MemoizedButton: React.ReactElement<ButtonProps> = useMemo(() => {
    return (
      <AntdButton
        // className={styles[componentClassPrefix]}
        type={type}
        htmlType={htmlType}
        {...props}
      />
    );
  }, [props, type, htmlType]);

  return MemoizedButton;
};
export default Button;
