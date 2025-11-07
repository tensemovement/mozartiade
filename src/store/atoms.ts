import { atom } from 'recoil';
import { ChronologyItem } from '@/types';

export const selectedItemState = atom<ChronologyItem | null>({
  key: 'selectedItemState',
  default: null,
});
