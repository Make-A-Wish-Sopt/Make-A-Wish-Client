import { colors } from '@/styles/styles';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Loading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <ClipLoader color={colors.main_blue} />
        <h1 className="font-bitbit text-[24px] text-main_blue mt-24 mb-30">로딩중...</h1>
      </div>
    </>
  );
}

export function LoadingDot() {
  return (
    <div className="flex space-x-2 justify-center items-center  ">
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
    </div>
  );
}
