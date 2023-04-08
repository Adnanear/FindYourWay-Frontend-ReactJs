export const CLIENT_STATUS = ['Active', 'Inactive'] as const;
export type ClientStatus = typeof CLIENT_STATUS[number];

export interface Client {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  city: string;
  status: number;
}
