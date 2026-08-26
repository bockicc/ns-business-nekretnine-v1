export interface CapturedError {
  message: string;
  stack?: string;
  source: 'window.onerror' | 'unhandledrejection' | 'manual';
  href: string;
  userAgent: string;
  timestamp: number;
}

export type ErrorReportHandler = (error: CapturedError) => void;

export function captureError(
  error: unknown,
  source: CapturedError['source'] = 'manual',
): CapturedError {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'Nepoznata greška';
  return {
    message,
    stack: error instanceof Error ? error.stack : undefined,
    source,
    href: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    timestamp: Date.now(),
  };
}

export function attachGlobalErrorCapture(handler: ErrorReportHandler): () => void {
  if (typeof window === 'undefined') return () => {};

  const onError = (event: ErrorEvent): void => {
    handler(captureError(event.error ?? event.message, 'window.onerror'));
  };
  const onRejection = (event: PromiseRejectionEvent): void => {
    handler(captureError(event.reason, 'unhandledrejection'));
  };

  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onRejection);

  return () => {
    window.removeEventListener('error', onError);
    window.removeEventListener('unhandledrejection', onRejection);
  };
}
