import {
  Box,
  BoxProps,
  Modal as DefaultModal,
  ModalProps as DefaultModalProps,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import React, { useImperativeHandle, useState } from 'react';
import { Flex, PaperContainer } from '../Containers';

const StyledModal = styled(DefaultModal)(() => ({
  display: 'grid',
  placeItems: 'center',
}));

export interface ModalProps extends Omit<DefaultModalProps, 'children'> {
  paperProps?: BoxProps;
  title?: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, paperProps, children, ...props }) => {
  return (
    <StyledModal {...props}>
      <PaperContainer {...paperProps}>
        <Stack>
          {!!title && (
            <Flex
              sx={{
                py: 1,
                alignItems: 'center',
                borderBottom: '1px solid',
                borderBottomColor: 'divider',
              }}
            >
              <Typography variant='body2' sx={{ fontWeight: 500, fontSize: '1.2em' }}>
                {title}
              </Typography>
            </Flex>
          )}
          <Box>{children}</Box>
        </Stack>
      </PaperContainer>
    </StyledModal>
  );
};

export interface ModalImperativeHandles {
  open: () => void;
  close: () => void;
}
export const ImperativeModal = React.forwardRef<
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

  return <Modal open={isOpen} {...props} />;
});
