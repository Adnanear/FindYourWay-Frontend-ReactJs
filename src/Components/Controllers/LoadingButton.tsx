import {
  Button,
  ButtonProps,
  CircularProgress,
  IconButton,
  IconButtonProps,
  styled,
} from '@mui/material';
import { useCallback } from 'react';

const StyledButton = styled(Button)(() => ({
  '.MuiCircularProgress-root': {
    width: '1em !important',
    height: '1em !important',
    color: 'currentColor',
  },
}));

const StyledIconButton = styled(IconButton)(() => ({
  '.MuiCircularProgress-root': {
    width: '1em !important',
    height: '1em !important',
    color: 'currentColor',
  },
}));

type Types = 'IconButton' | 'Button';
type ConditionalExtend<T extends Types> = Omit<
  T extends 'IconButton' ? IconButtonProps : ButtonProps,
  'color'
>;

interface LoadingButtonProps {
  loading?: boolean;
  buttonType?: Types;
  color?: ButtonProps['color'];
}

export const LoadingButton = <T extends Types>({
  loading = false,
  children,
  buttonType = 'Button',
  ...props
}: LoadingButtonProps & ConditionalExtend<T>) => {
  const disabled = Boolean(loading || props.disabled);

  const renderIcon = useCallback(() => {
    if (!buttonType) return children;

    switch (buttonType) {
      case 'Button':
        return loading ? (
          <CircularProgress variant='indeterminate' />
        ) : (
          (props as ButtonProps).startIcon
        );

      case 'IconButton':
        return loading ? <CircularProgress variant='indeterminate' /> : children;

      default:
        return children;
    }
  }, [loading, props]);

  return buttonType === 'Button' ? (
    <StyledButton disabled={disabled} startIcon={renderIcon()} {...props}>
      {children}
    </StyledButton>
  ) : (
    <StyledIconButton disabled={disabled} {...props}>
      {renderIcon()}
    </StyledIconButton>
  );
};
