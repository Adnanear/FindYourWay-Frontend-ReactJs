import { Flex } from '@/Components/Containers';
import { LoadingButton } from '@/Components/Controllers/LoadingButton';
import { Modal } from '@/Components/Modals/Modal';
import { Service } from '@/Entities/ServiceEntities';
import { createYupResolver } from '@/Utils/YupResolver';
import { FormControl, FormHelperText, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateService, useUpdateService } from './api/queries';

const resolver = createYupResolver((yup) =>
  yup.object({
    id: yup.number().optional().default(0),
    name: yup.string().required(),
    price: yup.number().min(0).max(1_000_000).required(),
    available: yup.boolean().required(),
    description: yup.string().optional(),
  }),
);

interface ServiceModalProps {
  open: boolean;
  service?: Partial<Service>;
  onClose?: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ open = false, service, onClose }) => {
  const mode = useMemo(() => (!!service?.id ? 'update' : 'insert'), [service]);
  const [isOpen, setIsOpen] = useState<boolean>(!!open);

  const { mutate: updateService, isLoading: isUpdating } = useUpdateService();
  const { mutate: insertService, isLoading: isInserting } = useCreateService();

  const handleCloseEditModal = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const { control, handleSubmit } = useForm<Service>({
    mode: 'onChange',
    resolver,
    defaultValues: {
      ...service,
    },
  });

  const onSubmit = useCallback(
    (data: Service) => {
      if (mode === 'update')
        return updateService(data, {
          onSuccess: () => {
            handleCloseEditModal();
          },
        });

      return insertService(data, {
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
              <FormLabel htmlFor={field.name}>Service Name</FormLabel>
              <TextField type='text' id={field.name} {...field} error={!!error} />
              {!!error && (
                <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name='available'
          render={({ field, fieldState: { error } }) => (
            <FormControl sx={{ flexBasis: '35%' }}>
              <FormLabel htmlFor={field.name}>Status</FormLabel>
              <Select id={field.name} {...field}>
                <MenuItem value={'false'}>Unavailable</MenuItem>
                <MenuItem value={'true'}>Available</MenuItem>
              </Select>
              {!!error && (
                <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='price'
          render={({ field, fieldState: { error } }) => (
            <FormControl sx={{ flexBasis: '100%' }}>
              <FormLabel htmlFor={field.name}>Price</FormLabel>
              <TextField id={field.name} {...field} error={!!error} />
              {!!error && (
                <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='description'
          render={({ field, fieldState: { error } }) => (
            <FormControl sx={{ flexBasis: '100%' }}>
              <FormLabel htmlFor={field.name}>Description</FormLabel>
              <TextField id={field.name} {...field} error={!!error} multiline rows={3} />
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
