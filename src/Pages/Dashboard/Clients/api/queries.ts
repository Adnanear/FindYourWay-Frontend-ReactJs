import { Client } from '@/Entities/ClientEntities';
import request from '@/Utils/Request';
import { useMutation, useQuery } from 'react-query';
import { overviewKeys } from './queryKeys';

const getClients = async () => await request.get<Client[]>(`/api/clients`).then((res) => res.data);
export const useClients = () =>
  useQuery({
    queryFn: async () => await getClients(),
    queryKey: overviewKeys.clients(),
  });

const updateClient = async (client: Client) =>
  await request.put<Client>(`/api/clients`, client).then((res) => res.data);
export const useUpdateClient = () =>
  useMutation({
    mutationFn: async (client: Parameters<typeof updateClient>[0]) => await updateClient(client),
    mutationKey: overviewKeys.clients(),
  });

const deleteClient = async (client: Client['id']) =>
  await request
    .delete<Client>(`/api/clients`, {
      params: {
        id: client,
      },
    })
    .then((res) => res.data);
export const useDeleteClient = () =>
  useMutation({
    mutationFn: async (client: Parameters<typeof deleteClient>[0]) => await deleteClient(client),
    mutationKey: overviewKeys.clients(),
  });

const createClient = async (client: Client) =>
  await request.post<Client>(`/api/clients`, client).then((res) => res.data);
export const useCreateClient = () =>
  useMutation({
    mutationFn: async (client: Parameters<typeof createClient>[0]) => await createClient(client),
    mutationKey: overviewKeys.clients(),
  });
