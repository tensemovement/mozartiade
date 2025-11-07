'use client';

import { useRecoilValue } from 'recoil';
import { selectedItemState } from '@/store/atoms';
import SidePanel from './SidePanel';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const selectedItem = useRecoilValue(selectedItemState);

  return (
    <>
      {/* Main Content Wrapper - shrinks width when panel opens */}
      <div className={`transition-all duration-300 ${selectedItem ? 'md:w-[66.666667%]' : 'md:w-full'}`}>
        {children}
      </div>

      {/* Side Panel */}
      <SidePanel />
    </>
  );
}
