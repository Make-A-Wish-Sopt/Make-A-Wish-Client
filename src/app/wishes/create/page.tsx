import { Funnel, Step } from '@/components/Common/Funnel';
import BackButton from '@/components/Elements/Button/BackButton';
import Header from '@/components/Layout/Hedaer';
import MainLayout from '@/layouts/MainLayout';
import WishesCreatePageContainer from './components/container';
import { WishesCreateTitleText } from './components/content';
import dynamic from 'next/dynamic';
import WishesLinkForm from './components/link/WishesLinkForm';

const SelectPaymentMethod = dynamic(() => import('./components/select/SelectPaymentMethod'));
const AccountInfoInputForm = dynamic(
  () => import('./components/selectPayment/account/AccountInfoInputForm'),
);
const KakaopayCodeInputForm = dynamic(
  () => import('./components/selectPayment/kakaopay/KakaopayCodeInputForm'),
);
const WishesCreateSuccess = dynamic(() => import('./components/service'));

export default async function WishesCreatePage({
  searchParams,
}: {
  searchParams: { step: string; wishTitle: string };
}) {
  return (
    <>
      <MainLayout Header={<Header leftMenu={<BackButton routePath="/wishes" />} />} isPrivate>
        <WishesCreatePageContainer>
          <Funnel>
            <Step name="link">
              <WishesCreateTitleText>생일잔치 링크 생성하기</WishesCreateTitleText>
              <WishesLinkForm />
            </Step>

            <Step name="select">
              <WishesCreateTitleText>현금 입금 방식 선택하기</WishesCreateTitleText>
              <SelectPaymentMethod />
            </Step>

            <Step name="account">
              <WishesCreateTitleText>입금받을 계좌 입력하기</WishesCreateTitleText>
              <AccountInfoInputForm />
            </Step>

            <Step name="kakaopay">
              <WishesCreateTitleText>카카오톡 송금코드 가져오기</WishesCreateTitleText>
              <KakaopayCodeInputForm />
            </Step>

            <Step name="done">
              <WishesCreateSuccess />
            </Step>
          </Funnel>
        </WishesCreatePageContainer>
      </MainLayout>
    </>
  );
}
