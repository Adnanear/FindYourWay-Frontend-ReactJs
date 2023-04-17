import { Flex, PaperContainer } from '@/Components/Containers';
import { LoadingButton } from '@/Components/Controllers/LoadingButton';
import { Table } from '@/Components/DataGrid/Table';
import { ORDER_STATUS, Order } from '@/Entities/OrderEntities';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Box, Button, Chip, Stack, TextField, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useClients } from '../Clients/api/queries';
import { useServices } from '../Services/api/queries';
import { OrderModal } from './OrderModal';
import { useDeleteOrder, useOrders } from './api/queries';

export const Orders: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Partial<Order>>();
  const [focusedModal, setFocusedModal] = useState<'order'>();

  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: ordersData } = useOrders();
  const orders = useMemo(() => ordersData ?? [], [ordersData, searchQuery]);

  const { data: servicesData } = useServices();
  const services = useMemo(() => servicesData ?? [], [servicesData]);

  const { data: clientsData } = useClients();
  const clients = useMemo(() => clientsData ?? [], [clientsData]);

  const { mutate: deleteOrder, isLoading: isDeletingOrder } = useDeleteOrder();

  const handleRecordDelete = useCallback((row: Order) => {
    setSelectedOrder(row);
    deleteOrder(row.id);
  }, []);

  const handleRecordEdit = useCallback((row: Order) => {
    setSelectedOrder(row);
    setFocusedModal('order');
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedOrder(undefined);
    setFocusedModal(undefined);
  }, []);

  const handleRecordInsert = useCallback(() => {
    setSelectedOrder({});
    setFocusedModal('order');
  }, []);

  const renderRowActionButtons = useCallback(
    (row: Order) => {
      return (
        <>
          <LoadingButton buttonType='IconButton' onClick={() => handleRecordEdit(row)}>
            <EditIcon />
          </LoadingButton>
          <LoadingButton
            buttonType='IconButton'
            loading={isDeletingOrder && selectedOrder?.id === row.id}
            onClick={() => handleRecordDelete(row)}
          >
            <DeleteIcon />
          </LoadingButton>
        </>
      );
    },
    [isDeletingOrder, selectedOrder],
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
      <Typography variant='h1'>Orders</Typography>
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
          Add Order
        </Button>
      </Flex>
      <Box border='1px solid' borderColor='divider'>
        <Table
          data={orders}
          cells={{
            serviceId: 'Service',
            clientId: 'Client',
            status: 'Status',
          }}
          renderValues={{
            status: (status) => (
              <Chip
                label={ORDER_STATUS[status]}
                color={ORDER_STATUS[status] === 'Accepted' ? 'success' : 'info'}
              />
            ),
            clientId: (clientId) => clients.find((x) => x.id === clientId)?.name,
            serviceId: (serviceId) => services.find((x) => x.id === serviceId)?.name,
          }}
          actions={renderRowActionButtons}
        />

        {!!selectedOrder && (
          <OrderModal
            open={focusedModal === 'order'}
            order={selectedOrder}
            onClose={handleCloseModal}
            clients={clients}
            services={services}
          />
        )}
      </Box>
    </Stack>
  );
};
