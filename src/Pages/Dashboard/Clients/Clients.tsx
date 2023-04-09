import { Flex, PaperContainer } from '@/Components/Containers';
import { LoadingButton } from '@/Components/Controllers/LoadingButton';
import { Table } from '@/Components/DataGrid/Table';
import { CLIENT_STATUS, Client } from '@/Entities/ClientEntities';
import { formatPhoneNumber } from '@/Utils/Helpers';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { ClientModal } from './ClientModal';
import { useClients, useDeleteClient } from './api/queries';

export const Clients: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<Partial<Client>>();
  const [focusedModal, setFocusedModal] = useState<'client'>();

  const { data: clientsData } = useClients();
  const clients = useMemo(() => clientsData ?? [], [clientsData]);

  const { mutate: deleteClient, isLoading: isDeletingClient } = useDeleteClient();

  const handleRecordDelete = useCallback((row: Client) => {
    setSelectedClient(row);
    deleteClient(row.id);
  }, []);

  const handleRecordEdit = useCallback((row: Client) => {
    setSelectedClient(row);
    setFocusedModal('client');
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedClient(undefined);
    setFocusedModal(undefined);
  }, []);

  const handleRecordInsert = useCallback(() => {
    setSelectedClient({});
    setFocusedModal('client');
  }, []);

  const renderRowActionButtons = useCallback(
    (row: Client) => {
      return (
        <>
          <LoadingButton buttonType='IconButton' onClick={() => handleRecordEdit(row)}>
            <EditIcon />
          </LoadingButton>
          <LoadingButton
            buttonType='IconButton'
            loading={isDeletingClient && selectedClient?.id === row.id}
            onClick={() => handleRecordDelete(row)}
          >
            <DeleteIcon />
          </LoadingButton>
        </>
      );
    },
    [isDeletingClient, selectedClient],
  );

  return (
    <Stack component={PaperContainer} gap={1}>
      <Typography variant='h1'>Clients</Typography>
      <Flex justifyContent='flex-end' gap='inherit'>
        <Button startIcon={<AddIcon />} onClick={handleRecordInsert}>
          Add client
        </Button>
      </Flex>
      <Box border='1px solid' borderColor='divider'>
        <Table
          data={clients}
          cells={{
            name: 'Fullname',
            phoneNumber: 'Phone',
            status: 'Status',
            city: 'Location',
          }}
          renderValues={{
            phoneNumber: (p) => formatPhoneNumber(p),
            status: (status) => (
              <Chip
                label={CLIENT_STATUS[status]}
                color={CLIENT_STATUS[status] === 'Active' ? 'success' : 'error'}
              />
            ),
            city: (_, row) => row.address.concat(', ', row.city),
          }}
          actions={renderRowActionButtons}
        />

        {selectedClient && (
          <ClientModal
            open={focusedModal === 'client'}
            client={selectedClient}
            onClose={handleCloseModal}
          />
        )}
      </Box>
    </Stack>
  );
};
