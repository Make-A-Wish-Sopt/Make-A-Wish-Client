import InputForm from '@/components/UI/InputForm';
import KakaoPayCodeInputContainer from './KakaoayCodeInputContainer';
import KakaoPayCodeInput from './KakaopayCodeInput';
import KakaopayCodeDisclaimerNotice from './KakaopayCodeDisclaimerNotice';

export default function KakaopayCodeInputForm() {
  return (
    <KakaoPayCodeInputContainer>
      <InputForm title="송금코드 링크 붙여넣기">
        <KakaoPayCodeInput />
      </InputForm>

      <KakaopayCodeDisclaimerNotice />
    </KakaoPayCodeInputContainer>
  );
}
