import { Zap } from "@/types/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StoreState {
  userId: string;
  accessToken: string;
  updateUserDetails: (userId: string, accessToken: string) => void;
  zaps: Zap[];
  deleteZap: (zapId: string) => void;
  deleteUserDetails: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      userId: "",
      accessToken: "",
      updateUserDetails: (userId, accessToken) => set({ userId, accessToken }),
      zaps: [],
      deleteZap: (zapId) =>
        set((state) => ({
          zaps: state.zaps.filter((zap) => zap.id !== zapId),
        })),
      deleteUserDetails: () => set({ userId: "", accessToken: "", zaps: [] }),
    }),
    {
      name: "userData",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useStore;
