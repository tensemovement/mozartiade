interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  message = '불러오는 중...',
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-20'
  };

  return (
    <div className={`text-center ${paddingClasses[size]} ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-b-2 border-primary-600 mx-auto mb-4`}></div>
      {message && <p className="text-gray-500">{message}</p>}
    </div>
  );
}
