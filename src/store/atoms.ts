import { atom } from 'recoil';
import { ChronologyItem, Movement } from '@/types';

export const selectedItemState = atom<ChronologyItem | null>({
  key: 'selectedItemState',
  default: null,
});

export const selectedMovementState = atom<Movement | null>({
  key: 'selectedMovementState',
  default: null,
});
