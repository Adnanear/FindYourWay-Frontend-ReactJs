import { Service } from '@/Entities/ServiceEntities';
import request from '@/Utils/Request';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { servicesKeys } from './queryKeys';

const getServices = async () =>
  await request.get<Service[]>(`/api/services`).then((res) => res.data);
export const useServices = () =>
  useQuery({
    queryFn: async () => await getServices(),
    queryKey: servicesKeys.services(),
  });

const updateService = async (service: Service) =>
  await request.put<Service>(`/api/services/${service.id}`, service).then((res) => res.data);
export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (service: Parameters<typeof updateService>[0]) =>
      await updateService(service),
    mutationKey: servicesKeys.services(),
    onSuccess: () => {
      queryClient.invalidateQueries(servicesKeys.services());
    },
  });
};

const deleteService = async (service: Service['id']) =>
  await request.delete<Service>(`/api/services/${service}`).then((res) => res.data);
export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (client: Parameters<typeof deleteService>[0]) => await deleteService(client),
    mutationKey: servicesKeys.services(),
    onSuccess: () => {
      queryClient.invalidateQueries(servicesKeys.services());
    },
  });
};

const createService = async (service: Service) =>
  await request.post<Service>(`/api/services`, service).then((res) => res.data);
export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (service: Parameters<typeof createService>[0]) =>
      await createService(service),
    mutationKey: servicesKeys.services(),
    onSuccess: () => {
      queryClient.invalidateQueries(servicesKeys.services());
    },
  });
};
