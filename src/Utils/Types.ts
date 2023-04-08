import { AxiosError } from 'axios';

export type HttpResponseError = AxiosError<{ message: string }>;
