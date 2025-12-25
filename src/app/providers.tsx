"use client";

import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const RecoilRoot = dynamic(
  () => import("recoil").then((mod) => mod.RecoilRoot),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RecoilRoot>
        {children}
        {/* 프로젝트 디자인 시스템에 맞춘 토스트 알림 */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerStyle={{
            top: 100,
          }}
          toastOptions={{
            // 기본 설정
            duration: 4000,
            // 성공 알림 스타일
            success: {
              style: {
                background: '#ffffff',
                color: '#1a1a1a',
                borderLeft: '4px solid #10b981',
                padding: '16px 20px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
              },
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            // 에러 알림 스타일
            error: {
              style: {
                background: '#ffffff',
                color: '#1a1a1a',
                borderLeft: '4px solid #ef4444',
                padding: '16px 20px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
              },
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
            // 로딩 알림 스타일
            loading: {
              style: {
                background: '#ffffff',
                color: '#1a1a1a',
                borderLeft: '4px solid #D4A574',
                padding: '16px 20px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
              },
            },
          }}
        />
      </RecoilRoot>
    </SessionProvider>
  );
}
