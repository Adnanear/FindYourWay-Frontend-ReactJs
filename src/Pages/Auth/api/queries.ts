import { User } from '@/Entities/UserEntities';
import request from '@/Utils/Request';
import { useMutation } from 'react-query';

const signin = async (user: Pick<User, 'email' | 'password'>) =>
  await request.post<User>(`/api/auth/signin`, user).then((res) => res.data);
export const useSignin = () =>
  useMutation({
    mutationFn: async (user: Parameters<typeof signin>[0]) => await signin(user),
  });

const signup = async (user: Pick<User, 'email' | 'password'> & { password2: User['password'] }) =>
  await request.post<User>(`/api/auth/signup`, user).then((res) => res.data);
export const useSignup = () =>
  useMutation({
    mutationFn: async (user: Parameters<typeof signup>[0]) => await signup(user),
  });
