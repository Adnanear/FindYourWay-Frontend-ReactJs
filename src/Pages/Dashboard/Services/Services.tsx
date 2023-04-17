import { Flex, PaperContainer } from '@/Components/Containers';
import { LoadingButton } from '@/Components/Controllers/LoadingButton';
import { Table } from '@/Components/DataGrid/Table';
import { Service } from '@/Entities/ServiceEntities';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Box, Button, Chip, Stack, TextField, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { ServiceModal } from './ServiceModal';
import { useDeleteService, useServices } from './api/queries';

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Partial<Service>>();
  const [focusedModal, setFocusedModal] = useState<'service'>();

  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: servicesData } = useServices();
  const services = useMemo(
    () =>
      (servicesData ?? []).filter((x) => x.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [servicesData, searchQuery],
  );

  const { mutate: deleteService, isLoading: isDeletingService } = useDeleteService();

  const handleRecordDelete = useCallback((row: Service) => {
    setSelectedService(row);
    deleteService(row.id);
  }, []);

  const handleRecordEdit = useCallback((row: Service) => {
    setSelectedService(row);
    setFocusedModal('service');
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedService(undefined);
    setFocusedModal(undefined);
  }, []);

  const handleRecordInsert = useCallback(() => {
    setSelectedService({});
    setFocusedModal('service');
  }, []);

  const renderRowActionButtons = useCallback(
    (row: Service) => {
      return (
        <>
          <LoadingButton buttonType='IconButton' onClick={() => handleRecordEdit(row)}>
            <EditIcon />
          </LoadingButton>
          <LoadingButton
            buttonType='IconButton'
            loading={isDeletingService && selectedService?.id === row.id}
            onClick={() => handleRecordDelete(row)}
          >
            <DeleteIcon />
          </LoadingButton>
        </>
      );
    },
    [isDeletingService, selectedService],
  );

  const handleSearchQueryChanged = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.currentTarget;
      setSearchQuery(value);
    },
    [],
  );

  return (
    <Stack component={PaperContainer} gap={1}>
      <Typography variant='h1'>Clients</Typography>
      <Flex justifyContent='flex-end' gap='inherit'>
        <TextField
          type='text'
          name='search'
          id='search'
          placeholder='Search...'
          InputProps={{ startAdornment: <SearchIcon /> }}
          sx={{ mr: 'auto' }}
          onChange={handleSearchQueryChanged}
        />
        <Button startIcon={<AddIcon />} onClick={handleRecordInsert}>
          Add service
        </Button>
      </Flex>
      <Box border='1px solid' borderColor='divider'>
        <Table
          data={services}
          cells={{
            name: 'Service',
            price: 'Price',
            available: 'Available',
          }}
          renderValues={{
            available: (available) => (
              <Chip
                label={available ? 'Available' : 'Unavailable'}
                color={available ? 'success' : 'error'}
              />
            ),
            price: (value) => (
              <>
                <span>{value.toFixed(2)}</span>
                <strong style={{ fontWeight: 500 }}> Dhs</strong>
              </>
            ),
          }}
          actions={renderRowActionButtons}
        />

        {!!selectedService && (
          <ServiceModal
            open={focusedModal === 'service'}
            service={selectedService}
            onClose={handleCloseModal}
          />
        )}
      </Box>
    </Stack>
  );
};
