import toast, { Toast, Toaster } from 'react-hot-toast';

/**
 * 공통 알림 서비스
 * 프로젝트 디자인 시스템(Deep Black, Wine, Gold)에 맞춘 토스트 알림
 */

// 프로젝트 색상 테마
const COLORS = {
  primary: '#1a1a1a',      // Deep Black
  secondary: '#6B1B3D',    // Deep Wine/Burgundy
  accent: '#D4A574',       // Warm Gold
  success: '#10b981',      // Green
  error: '#ef4444',        // Red
  warning: '#f59e0b',      // Amber
  info: '#3b82f6',         // Blue
  cream: '#fdfaf6',
  ivory: '#faf3ea',
};

// 공통 토스트 스타일
const baseStyle = {
  borderRadius: '12px',
  background: '#ffffff',
  color: COLORS.primary,
  padding: '16px 20px',
  fontSize: '14px',
  fontWeight: '500',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  maxWidth: '500px',
  border: '1px solid rgba(0, 0, 0, 0.05)',
};

// 아이콘 스타일
const iconStyle = {
  width: '20px',
  height: '20px',
  marginRight: '12px',
};

/**
 * 성공 알림
 */
export const notifySuccess = (message: string, duration = 4000) => {
  return toast.success(message, {
    duration,
    style: {
      ...baseStyle,
      borderLeft: `4px solid ${COLORS.success}`,
    },
    iconTheme: {
      primary: COLORS.success,
      secondary: '#ffffff',
    },
  });
};

/**
 * 에러 알림
 */
export const notifyError = (message: string, duration = 5000) => {
  return toast.error(message, {
    duration,
    style: {
      ...baseStyle,
      borderLeft: `4px solid ${COLORS.error}`,
    },
    iconTheme: {
      primary: COLORS.error,
      secondary: '#ffffff',
    },
  });
};

/**
 * 경고 알림
 */
export const notifyWarning = (message: string, duration = 4000) => {
  return toast(message, {
    duration,
    icon: '⚠️',
    style: {
      ...baseStyle,
      borderLeft: `4px solid ${COLORS.warning}`,
    },
  });
};

/**
 * 정보 알림
 */
export const notifyInfo = (message: string, duration = 4000) => {
  return toast(message, {
    duration,
    icon: 'ℹ️',
    style: {
      ...baseStyle,
      borderLeft: `4px solid ${COLORS.info}`,
    },
  });
};

/**
 * 로딩 알림
 */
export const notifyLoading = (message: string) => {
  return toast.loading(message, {
    style: {
      ...baseStyle,
      borderLeft: `4px solid ${COLORS.accent}`,
    },
  });
};

/**
 * 로딩 알림 업데이트 (성공)
 */
export const updateLoadingSuccess = (toastId: string, message: string) => {
  toast.success(message, {
    id: toastId,
    style: {
      ...baseStyle,
      borderLeft: `4px solid ${COLORS.success}`,
    },
  });
};

/**
 * 로딩 알림 업데이트 (에러)
 */
export const updateLoadingError = (toastId: string, message: string) => {
  toast.error(message, {
    id: toastId,
    style: {
      ...baseStyle,
      borderLeft: `4px solid ${COLORS.error}`,
    },
  });
};

/**
 * 프로미스 기반 알림
 * 비동기 작업의 로딩, 성공, 실패 상태를 자동으로 처리
 */
export const notifyPromise = <T,>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error: string;
  }
) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    },
    {
      style: baseStyle,
      success: {
        style: {
          ...baseStyle,
          borderLeft: `4px solid ${COLORS.success}`,
        },
        iconTheme: {
          primary: COLORS.success,
          secondary: '#ffffff',
        },
      },
      error: {
        style: {
          ...baseStyle,
          borderLeft: `4px solid ${COLORS.error}`,
        },
        iconTheme: {
          primary: COLORS.error,
          secondary: '#ffffff',
        },
      },
      loading: {
        style: {
          ...baseStyle,
          borderLeft: `4px solid ${COLORS.accent}`,
        },
      },
    }
  );
};

/**
 * 커스텀 알림 (프로젝트 컬러 테마)
 */
export const notifyCustom = (
  message: string,
  options?: {
    icon?: string;
    color?: 'primary' | 'secondary' | 'accent';
    duration?: number;
  }
) => {
  const { icon = '✨', color = 'secondary', duration = 4000 } = options || {};

  return toast(message, {
    duration,
    icon,
    style: {
      ...baseStyle,
      borderLeft: `4px solid ${COLORS[color]}`,
    },
  });
};

/**
 * 모든 알림 제거
 */
export const dismissAllNotifications = () => {
  toast.dismiss();
};

/**
 * 특정 알림 제거
 */
export const dismissNotification = (toastId: string) => {
  toast.dismiss(toastId);
};

// 기본 export
export default {
  success: notifySuccess,
  error: notifyError,
  warning: notifyWarning,
  info: notifyInfo,
  loading: notifyLoading,
  promise: notifyPromise,
  custom: notifyCustom,
  dismiss: dismissNotification,
  dismissAll: dismissAllNotifications,
};
