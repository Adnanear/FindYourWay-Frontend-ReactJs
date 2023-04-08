import { Button, ButtonProps, CircularProgress, styled } from '@mui/material';
import React, { useCallback } from 'react';

const StyledButton = styled(Button)(() => ({
  '.MuiCircularProgress-root': {
    width: '1em !important',
    height: '1em !important',
    color: 'currentColor',
  },
}));

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  startIcon,
  children,
  ...props
}) => {
  const disabled = Boolean(loading || props.disabled);

  const renderIcon = useCallback(() => {
    return loading ? <CircularProgress variant='indeterminate' /> : startIcon;
  }, [loading, startIcon]);

  return (
    <StyledButton disabled={disabled} startIcon={renderIcon()} {...props}>
      {children}
    </StyledButton>
  );
};
