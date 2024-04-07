import React from 'react';
import { Modal as AntdModal, ModalProps } from 'antd';

// In the case of the Modal component, it is a stateful component that renders an Ant Design Modal component.
// Since it does not have any expensive calculations or computations, it is not necessary to use useMemo or
// useCallback hooks in this component.
const Modal: React.FC<ModalProps> = (props: ModalProps): React.ReactElement => (
  <AntdModal {...props} />
);

export default Modal;
