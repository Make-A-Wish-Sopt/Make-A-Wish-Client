import { colors } from '@/styles/styles';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Loading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh]">
        {/* <svg
          className="animate-spin h-5 w-5 mr-3 ..."
          viewBox="0 0 24 24"
          fill={colors.main_blue}
        /> */}
        <ClipLoader color={colors.main_blue} />
        <h1 className="font-bitbit text-[24px] text-main_blue mt-24 mb-30">로딩중...</h1>
      </div>
    </>
  );
}
