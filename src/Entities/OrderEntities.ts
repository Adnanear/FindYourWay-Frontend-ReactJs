import { Client } from './ClientEntities';
import { Service } from './ServiceEntities';

export const ORDER_STATUS = ['Idle', 'Pending', 'Accepted', 'Declined'] as const;

export interface Order {
  id: number;
  clientId: Client['id'];
  serviceId: Service['id'];
  status: number;
}
