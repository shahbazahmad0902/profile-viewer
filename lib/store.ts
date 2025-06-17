import { create } from "zustand";

export const useToastStore = create((set) => ({
  showToast: false,
  setShowToast: (value: boolean) => set({ showToast: value })
}));