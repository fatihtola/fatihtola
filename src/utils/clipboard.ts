/**
 * Safely copy text to clipboard inside iframe environments without throwing uncaught SecurityErrors.
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // Try standard Clipboard API if available and document has focus
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('navigator.clipboard.writeText failed, attempting execCommand fallback', err);
  }

  // Fallback: temporary textarea + execCommand
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Copy fallback also failed', err);
    return false;
  }
}
