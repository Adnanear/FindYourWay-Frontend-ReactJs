import { AxiosError } from 'axios';

export type HttpResponseError = AxiosError<{
  status: number;
  title: string;
  traceId: string;
  type: string;
  errors: Record<string, unknown[]>;
}>;
