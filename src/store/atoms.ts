import { atom } from 'recoil';
import { ChronologyItem, Movement } from '@/types';

export const selectedWorkState = atom<ChronologyItem | null>({
  key: 'selectedWorkState',
  default: null,
});

export const selectedMovementState = atom<Movement | null>({
  key: 'selectedMovementState',
  default: null,
});
