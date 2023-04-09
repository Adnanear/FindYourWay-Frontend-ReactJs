import { STORAGE_PREFIX } from '@/Utils/Constants';
import { create } from 'zustand';

const targetKey = `${STORAGE_PREFIX}_token`;
const storedToken = localStorage.getItem(targetKey);

interface StoreInterface {
  token: string | null;
  setToken: (token: StoreInterface['token'], cb?: () => void) => void;
}

const defaultValues = {
  token: storedToken,
};

export const useUserStore = create<StoreInterface>((set) => ({
  ...defaultValues,

  setToken: (token: StoreInterface['token'], cb?: () => void) => {
    localStorage.setItem(targetKey, String(token));
    cb?.();

    return set((state) => ({ ...state, token }));
  },
}));
