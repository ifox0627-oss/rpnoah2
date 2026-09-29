import standaloneHtmlRaw from '../../standalone.html?raw';

/**
 * Downloads the standalone single-file HTML directly from browser memory (Blob).
 * This completely bypasses any Cloud Run / Google authentication cookies or server requests.
 */
export function downloadStandaloneHtml() {
  try {
    const blob = new Blob([standaloneHtmlRaw], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    return true;
  } catch (err) {
    console.error('Failed to trigger in-memory download:', err);
    return false;
  }
}

/**
 * Copies the raw HTML string directly to the clipboard so the user can paste it anywhere.
 */
export async function copyStandaloneHtml(): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(standaloneHtmlRaw);
      return true;
    }
    throw new Error('Clipboard API unavailable');
  } catch {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = standaloneHtmlRaw;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (e) {
      console.error('Failed to copy to clipboard:', e);
      return false;
    }
  }
}

export { standaloneHtmlRaw };
