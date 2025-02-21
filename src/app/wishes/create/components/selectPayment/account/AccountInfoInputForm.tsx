import InputForm from '@/components/UI/InputForm';
import AccountInfoInputContainer from './AccountInfoInputContainer';
import AccountInfoInput from './AccountInfoInput';
import AccountDisclaimerNotice from './AccountDisclaimerNotice';

export default function AccountInfoInputForm() {
  return (
    <AccountInfoInputContainer>
      <InputForm title="계좌번호 입력하기">
        <AccountInfoInput />
      </InputForm>

      <AccountDisclaimerNotice />
    </AccountInfoInputContainer>
  );
}
``
