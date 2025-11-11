import { atom } from 'recoil';
import { ChronologyItem, Aria } from '@/types';

export const selectedItemState = atom<ChronologyItem | null>({
  key: 'selectedItemState',
  default: null,
});

export const selectedMovementState = atom<Aria | null>({
  key: 'selectedMovementState',
  default: null,
});
