import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StoreState {
  accessToken: string;
  updateAccessToken: (token: string) => void;
  deleteAccessToken: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      accessToken: "",
      updateAccessToken: (token: string) => set({ accessToken: token }),
      deleteAccessToken: () => set({ accessToken: "" }),
    }),
    {
      name: "access-token",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useStore;
