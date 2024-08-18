import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StoreState {
  userId: string;
  accessToken: string;
  updateUserDetails: (userId: string, accessToken: string) => void;
  deleteUserDetails: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      userId: "",
      accessToken: "",
      updateUserDetails: (userId, accessToken) => set({ userId, accessToken }),
      deleteUserDetails: () => set({ userId: "", accessToken: "" }),
    }),
    {
      name: "userData",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useStore;
