import { MypageAuthButtons, MypageMenuButtons } from './client';
import { MypageUserName } from './server';

export default function MypageContainer() {
  return (
    <>
      <MypageUserName />
      <MypageMenuButtons />
      <MypageAuthButtons />
    </>
  );
}
