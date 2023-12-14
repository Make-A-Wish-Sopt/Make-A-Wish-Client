import CakesContainer from '@/components/cakes';
import Layout from '@/components/layout';

export default function CakesPage() {
  return (
    <Layout layoutKey="header">
      <CakesContainer />
    </Layout>
  );
}
