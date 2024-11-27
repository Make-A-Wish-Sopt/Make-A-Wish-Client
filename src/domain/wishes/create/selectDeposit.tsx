import Box from '@/components/Common/Box';
import Button from '@/components/Common/Button';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import InputForm from '@/components/UI/InputForm';
import SelectBox from '@/components/UI/SelectBox';
import { useRouters } from '@/hooks/common/useRouters';
import useToggle from '@/hooks/common/useToggle';

export default function SelectDeposit() {
  const { state: selectAccount, changeState: changeSelectAccount } = useToggle();

  const { handleRouter, handleBack } = useRouters();

  function handleNextStep() {
    if (selectAccount) {
      handleRouter('/wishes/create?step=account');
    } else {
      handleRouter('/wishes/create?step=kakaopay');
    }
  }

  return (
    <>
      <InputForm title="입금 방식 선택하기">
        <div className="flex flex-col gap-12">
          <Box
            onClick={() => {
              changeSelectAccount(false);
            }}
          >
            <SelectBox selectState={!selectAccount} text={'카카오 송금하기로 받기'} />
          </Box>

          <Box
            onClick={() => {
              changeSelectAccount(true);
            }}
          >
            <SelectBox selectState={selectAccount} text={'은행 계좌로 받기'} />
          </Box>
        </div>
      </InputForm>

      <FixedBottomButtonWrapper>
        <div className="flex justify-between gap-10">
          <Button bgColor="gray4" fontColor="white" onClick={handleBack}>
            이전
          </Button>

          <Button onClick={handleNextStep}>다음</Button>
        </div>
      </FixedBottomButtonWrapper>
    </>
  );
}
