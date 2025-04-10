import { toast } from 'sonner';

export default async function clipboardCopy(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    toast.error('클립보드 복사 실패ㅠㅠ');
  }
}
