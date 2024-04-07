import { message } from 'antd';
import { useCallback } from 'react';

interface MessageProps {
  title: string;
  type: 'success' | 'info' | 'error' | 'warning' | 'none';
}

/**
 * A component that displays messages of different types.
 */
const MessageHandler = ({ title, type }: MessageProps) => {
  // Define a callback function that will return the appropriate message type.
  const showMessage = useCallback(() => {
    switch (type) {
      case 'success':
        message.success(title);
        break;
      case 'info':
        message.info(title);
        break;
      case 'error':
        message.error(title);
        break;
      case 'warning':
        message.warning(title);
        break;
      default:
        message.loading(title);
    }
  }, [title, type]);

  return showMessage();
};

export default MessageHandler;
