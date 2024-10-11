import WishesSharePageStateContainer from './client';
import { CenteredContent } from './server';

export default function WishesSharePageContainer() {
  return (
    <WishesSharePageStateContainer>
      <CenteredContent />
    </WishesSharePageStateContainer>
  );
}
