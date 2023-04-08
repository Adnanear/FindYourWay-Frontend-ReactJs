import { Table } from '@/Components/DataGrid/Table';
import { formatPhoneNumber } from '@/Utils/Helpers';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import React, { useCallback } from 'react';

const data = [
  { id: 1, name: 'Adnane Aref', status: 'active', phone: '212643923326' },
  { id: 2, name: 'Souad Elgunaoui', status: 'inactive', phone: '212643923326' },
] as const;
type RecordType = typeof data[number];

export const Overview: React.FC = () => {
  const handleRecordEdit = useCallback((row: RecordType) => {
    console.log('Edit requested', row);
  }, []);

  const handleRecordDelete = useCallback((row: RecordType) => {
    console.log('Delete requested', row);
  }, []);

  const renderRowActionButtons = useCallback((row: RecordType) => {
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
    <Stack gap={1}>
      <Typography variant='h1'>Overview</Typography>
      <Table
        data={data}
        cells={{
          name: 'Fullname',
          phone: 'Phone',
          status: 'Status',
        }}
        renderValues={{
          phone: (p) => formatPhoneNumber(p),
          status: (status) => (
            <Chip label={status} color={status === 'active' ? 'success' : 'error'} />
          ),
        }}
        actions={renderRowActionButtons}
      />
    </Stack>
  );
};
