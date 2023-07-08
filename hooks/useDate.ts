export function useDate(date: Date | null): string {
  // 선택한 날짜가 없을 시 현재 날짜로 설정
  if (!date) {
    date = new Date();
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
