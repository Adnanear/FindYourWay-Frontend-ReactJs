import { Flex } from '@/Components/Containers';
import { LoadingButton } from '@/Components/Controllers/LoadingButton';
import { Modal } from '@/Components/Modals/Modal';
import { CLIENT_STATUS, Client } from '@/Entities/ClientEntities';
import { createYupResolver } from '@/Utils/YupResolver';
import { FormControl, FormHelperText, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateClient, useUpdateClient } from './api/queries';

const resolver = createYupResolver((yup) =>
  yup.object({
    id: yup.number().optional().default(0),
    name: yup.string().required(),
    status: yup.number().required(),
    city: yup.string().optional(),
    address: yup.string().optional(),
    phoneNumber: yup.string().optional(),
  }),
);

interface ClientModalProps {
  open: boolean;
  client?: Partial<Client>;
  onClose?: () => void;
}

export const ClientModal: React.FC<ClientModalProps> = ({ open = false, client, onClose }) => {
  const mode = useMemo(() => (!!client?.id ? 'update' : 'insert'), [client]);
  const [isOpen, setIsOpen] = useState<boolean>(!!open);

  const { mutate: updateClient, isLoading: isUpdating } = useUpdateClient();
  const { mutate: insertClient, isLoading: isInserting } = useCreateClient();

  const handleCloseEditModal = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const { control, handleSubmit } = useForm<Client>({
    mode: 'onChange',
    resolver,
    defaultValues: {
      ...client,
    },
  });

  const onSubmit = useCallback(
    (data: Client) => {
      if (mode === 'update')
        return updateClient(data, {
          onSuccess: () => {
            handleCloseEditModal();
          },
        });

      return insertClient(data, {
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
      title={mode === 'insert' ? 'Create client' : 'Edit client'}
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
        id='edit-client-form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{ flexWrap: 'wrap', pt: 1.5, gap: 1 }}
      >
        <Controller
          control={control}
          name='name'
          render={({ field, fieldState: { error } }) => (
            <FormControl sx={{ flex: 1 }}>
              <FormLabel htmlFor={field.name}>Client Name</FormLabel>
              <TextField type='text' id={field.name} {...field} error={!!error} />
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
                {CLIENT_STATUS.map((x, idx) => (
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
          name='city'
          render={({ field, fieldState: { error } }) => (
            <FormControl sx={{ flexBasis: '100%' }}>
              <FormLabel htmlFor={field.name}>City</FormLabel>
              <TextField id={field.name} {...field} error={!!error} />
              {!!error && (
                <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='address'
          render={({ field, fieldState: { error } }) => (
            <FormControl sx={{ flexBasis: '100%' }}>
              <FormLabel htmlFor={field.name}>Address</FormLabel>
              <TextField id={field.name} {...field} error={!!error} />
              {!!error && (
                <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='phoneNumber'
          render={({ field, fieldState: { error } }) => (
            <FormControl sx={{ flexBasis: '100%' }}>
              <FormLabel htmlFor={field.name}>Phone number</FormLabel>
              <TextField id={field.name} {...field} error={!!error} />
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
