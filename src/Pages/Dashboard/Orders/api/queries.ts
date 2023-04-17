import { Order } from '@/Entities/OrderEntities';
import request from '@/Utils/Request';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ordersKeys } from './queryKeys';

const getOrders = async () => await request.get<Order[]>(`/api/orders`).then((res) => res.data);
export const useOrders = () =>
  useQuery({
    queryFn: async () => await getOrders(),
    queryKey: ordersKeys.orders(),
  });

const updateOrder = async (client: Order) =>
  await request.put<Order>(`/api/orders/${client.id}`, client).then((res) => res.data);
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: Parameters<typeof updateOrder>[0]) => await updateOrder(order),
    mutationKey: ordersKeys.orders(),
    onSuccess: () => {
      queryClient.invalidateQueries(ordersKeys.orders());
    },
  });
};

const deleteOrder = async (order: Order['id']) =>
  await request.delete<Order>(`/api/orders/${order}`).then((res) => res.data);
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: Parameters<typeof deleteOrder>[0]) => await deleteOrder(order),
    mutationKey: ordersKeys.orders(),
    onSuccess: () => {
      queryClient.invalidateQueries(ordersKeys.orders());
    },
  });
};

const createOrder = async (order: Order) =>
  await request.post<Order>(`/api/orders`, order).then((res) => res.data);
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: Parameters<typeof createOrder>[0]) => await createOrder(order),
    mutationKey: ordersKeys.orders(),
    onSuccess: () => {
      queryClient.invalidateQueries(ordersKeys.orders());
    },
  });
};
