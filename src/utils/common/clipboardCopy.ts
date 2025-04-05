export async function clipboardCopy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {}
}
