import { STORAGE_PREFIX } from '@/Utils/Constants';
import { create } from 'zustand';

const targetKey = `${STORAGE_PREFIX}_token`;
const storedToken = localStorage.getItem(targetKey);

interface StoreInterface {
  token: string | null;
  setToken: (token: StoreInterface['token']) => void;
}

const defaultValues = {
  token: storedToken,
};

export const useUserStore = create<StoreInterface>((set) => ({
  ...defaultValues,

  setToken: (token: StoreInterface['token']) => {
    localStorage.setItem(targetKey, String(token));
    return set((state) => ({ ...state, token }));
  },
}));
