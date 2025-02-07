import MainLayout from '@/layouts/MainLayout';
import TestComponent from './component';

export default async function TestPage() {
  return (
    <MainLayout>
      <h1 className="text-[56px] text-main_blue font-bitbit">안뇽하세요</h1>
      <TestComponent />
    </MainLayout>
  );
}
