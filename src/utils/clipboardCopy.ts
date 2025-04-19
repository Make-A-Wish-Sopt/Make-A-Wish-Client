import { toast } from 'sonner';

export default async function clipboardCopy(text: string, toastMessage?: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    if (toastMessage) {
      toast.success(toastMessage);
    } else {
      toast.success('클립보드 복사 성공!!');
    }
  } catch (error) {
    toast.error('클립보드 복사 실패ㅠㅠ');
  }
}
