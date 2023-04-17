import { Flex } from '@/Components/Containers';
import { LoadingButton } from '@/Components/Controllers/LoadingButton';
import { Modal } from '@/Components/Modals/Modal';
import { Client } from '@/Entities/ClientEntities';
import { ORDER_STATUS, Order } from '@/Entities/OrderEntities';
import { Service } from '@/Entities/ServiceEntities';
import { createYupResolver } from '@/Utils/YupResolver';
import { FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateOrder, useUpdateOrder } from './api/queries';

const resolver = createYupResolver((yup) =>
  yup.object({
    id: yup.number().optional().default(0),
    clientId: yup.number().required(),
    serviceId: yup.number().required(),
    status: yup.number().min(0).max(ORDER_STATUS.length).required(),
  }),
);

interface OrderModalProps {
  open: boolean;
  clients: Client[];
  services: Service[];
  order?: Partial<Order>;
  onClose?: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  open = false,
  clients,
  services,
  order,
  onClose,
}) => {
  const mode = useMemo(() => (!!order?.id ? 'update' : 'insert'), [order]);
  const [isOpen, setIsOpen] = useState<boolean>(!!open);

  const { mutate: updateOrder, isLoading: isUpdating } = useUpdateOrder();
  const { mutate: insertOrder, isLoading: isInserting } = useCreateOrder();

  const handleCloseEditModal = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const { control, handleSubmit } = useForm<Order>({
    mode: 'onChange',
    resolver,
    defaultValues: {
      ...order,
    },
  });

  const onSubmit = useCallback(
    (data: Order) => {
      if (mode === 'update')
        return updateOrder(data, {
          onSuccess: () => {
            handleCloseEditModal();
          },
        });

      return insertOrder(data, {
        onSuccess: () => {
          handleCloseEditModal();
        },
      });
    },
    [mode],
  );

  return (
    <Modal
      open={isOpen}
      title={mode === 'insert' ? 'Create Order' : 'Edit Order'}
      paperProps={{
        sx: {
          width: 'clamp(20rem, 50vw, 25rem)',
          px: 2,
          py: 1,
        },
      }}
    >
      <Flex
        component='form'
        id='edit-Order-form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{ flexWrap: 'wrap', pt: 1.5, gap: 1 }}
      >
        <Controller
          control={control}
          name='clientId'
          render={({ field, fieldState: { error } }) => (
            <FormControl sx={{ flex: 1 }}>
              <FormLabel htmlFor={field.name}>Client</FormLabel>
              <Select id={field.name} {...field}>
                {clients.map((x) => (
                  <MenuItem key={x.id} value={x.id}>
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
              {!!error && (
                <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='status'
          render={({ field, fieldState: { error } }) => (
            <FormControl sx={{ flexBasis: '35%' }}>
              <FormLabel htmlFor={field.name}>Status</FormLabel>
              <Select id={field.name} {...field}>
                {ORDER_STATUS.map((x, idx) => (
                  <MenuItem key={x} value={idx}>
                    {x}
                  </MenuItem>
                ))}
              </Select>
              {!!error && (
                <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='serviceId'
          render={({ field, fieldState: { error } }) => (
            <FormControl sx={{ flexBasis: '100%' }}>
              <FormLabel htmlFor={field.name}>Service</FormLabel>
              <Select id={field.name} {...field}>
                {services.map((x) => (
                  <MenuItem key={x.id} value={x.id}>
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
              {!!error && (
                <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Flex justifyContent='flex-end' gap='inherit' flexBasis='100%' mt={1}>
          <LoadingButton color='inherit' variant='text' onClick={handleCloseEditModal}>
            Cancel
          </LoadingButton>
          {mode === 'update' ? (
            <LoadingButton type='submit' loading={isUpdating}>
              Save
            </LoadingButton>
          ) : (
            <LoadingButton type='submit' loading={isInserting}>
              Create
            </LoadingButton>
          )}
        </Flex>
      </Flex>
    </Modal>
  );
};
