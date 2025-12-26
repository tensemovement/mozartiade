'use client';

import { useAppStore } from '@/store/store';
import WorkPanel from './WorkPanel';
import MovementPanel from './MovementPanel';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const selectedWork = useAppStore((state) => state.selectedWork);
  const selectedMovement = useAppStore((state) => state.selectedMovement);

  // 어느 패널이라도 열려있으면 true
  const isPanelOpen = selectedWork !== null || selectedMovement !== null;

  return (
    <>
      {/* Main Content Wrapper - shrinks width when panel opens */}
      <div
        className={`${isPanelOpen ? 'md:w-[66.666667%]' : 'md:w-full'}`}
        style={{
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {children}
      </div>

      {/* Work Panel (작품 패널) */}
      <WorkPanel />

      {/* Movement Panel (악장 패널) */}
      <MovementPanel />
    </>
  );
}
