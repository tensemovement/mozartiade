import { create } from 'zustand';
import { ChronologyItem, Movement } from '@/types';

interface AppState {
  selectedWork: ChronologyItem | null;
  selectedMovement: Movement | null;
  setSelectedWork: (work: ChronologyItem | null) => void;
  setSelectedMovement: (movement: Movement | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedWork: null,
  selectedMovement: null,
  setSelectedWork: (work) => set({ selectedWork: work }),
  setSelectedMovement: (movement) => set({ selectedMovement: movement }),
}));