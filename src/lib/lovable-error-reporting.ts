import { attachGlobalErrorCapture, captureError } from './error-capture';
import type { CapturedError } from './error-capture';

const LOVABLE_ERROR_ENDPOINT = 'https://lovable.dev/api/cli/error-reports';

export async function reportToLovable(error: CapturedError): Promise<void> {
  if (typeof fetch !== 'function') return;
  try {
    await fetch(LOVABLE_ERROR_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        source: error.source,
        href: error.href,
        userAgent: error.userAgent,
        timestamp: error.timestamp,
        project: 'ns-business-nekretnine',
      }),
      keepalive: true,
    });
  } catch {
    return;
  }
}

export function initLovableErrorReporting(): () => void {
  if (typeof window === 'undefined') return () => {};
  return attachGlobalErrorCapture((error) => {
    void reportToLovable(captureError(error, error.source));
  });
}
