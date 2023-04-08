import {
  BoxProps,
  Modal as DefaultModal,
  ModalProps as DefaultModalProps,
  styled,
} from '@mui/material';
import React, { useImperativeHandle, useState } from 'react';
import { PaperContainer } from '../Containers';

const StyledModal = styled(DefaultModal)(() => ({
  display: 'grid',
  placeItems: 'center',
}));

interface ModalProps extends Omit<DefaultModalProps, 'children'> {
  paperProps?: BoxProps;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({ children, paperProps, ...props }) => {
  return (
    <StyledModal {...props}>
      <PaperContainer {...paperProps}>{children}</PaperContainer>
    </StyledModal>
  );
};

export interface ModalImperativeHandles {
  open: () => void;
  close: () => void;
}
export const Modal = React.forwardRef<
  ModalImperativeHandles,
  Omit<ModalProps, 'open'> & { open?: boolean }
>(({ open = false, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(!!open);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [],
  );

  return <ModalComponent open={isOpen} {...props} />;
});
