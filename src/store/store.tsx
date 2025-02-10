import { create } from "zustand";

export const useStoreNum = create((set) => ({
  count: 19,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));
