import { Flex, PaperContainer } from '@/Components/Containers';
import { Table } from '@/Components/DataGrid/Table';
import { CLIENT_STATUS, Client } from '@/Entities/ClientEntities';
import { formatPhoneNumber } from '@/Utils/Helpers';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, Button, Chip, IconButton, Stack, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useClients } from './api/queries';

export const Clients: React.FC = () => {
  const { data: clientsData } = useClients();
  const clients = useMemo(() => clientsData ?? [], [clientsData]);

  const handleRecordEdit = useCallback((row: Client) => {
    console.log('Edit requested', row);
  }, []);

  const handleRecordDelete = useCallback((row: Client) => {
    console.log('Delete requested', row);
  }, []);

  const renderRowActionButtons = useCallback((row: Client) => {
    return (
      <>
        <IconButton onClick={() => handleRecordEdit(row)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleRecordDelete(row)}>
          <DeleteIcon />
        </IconButton>
      </>
    );
  }, []);

  return (
    <Stack component={PaperContainer} gap={1}>
      <Typography variant='h1'>Clients</Typography>
      <Flex justifyContent='flex-end' gap='inherit'>
        <Button startIcon={<AddIcon />}>Add client</Button>
      </Flex>
      <Box border='1px solid' borderColor='divider'>
        <Table
          data={clients}
          cells={{
            name: 'Fullname',
            phoneNumber: 'Phone',
            status: 'Status',
          }}
          renderValues={{
            phoneNumber: (p) => formatPhoneNumber(p),
            status: (status) => (
              <Chip
                label={CLIENT_STATUS[status]}
                color={CLIENT_STATUS[status] === 'Active' ? 'success' : 'error'}
              />
            ),
          }}
          actions={renderRowActionButtons}
        />
      </Box>
    </Stack>
  );
};
