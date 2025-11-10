'use client';

import { useRecoilValue } from 'recoil';
import { selectedItemState } from '@/store/atoms';
import SidePanel from './SidePanel';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const selectedItem = useRecoilValue(selectedItemState);

  return (
    <>
      {/* Main Content Wrapper - shrinks width when panel opens */}
      <div
        className={`${selectedItem ? 'md:w-[66.666667%]' : 'md:w-full'}`}
        style={{
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {children}
      </div>

      {/* Side Panel */}
      <SidePanel />
    </>
  );
}
