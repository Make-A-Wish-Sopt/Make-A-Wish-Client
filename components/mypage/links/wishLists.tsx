import LinksBox from './linksBox';
import { WishLinksType } from '@/types/links/wishLinksType';
import { convertDateFormat } from '@/hooks/common/useDate';
import router from 'next/router';

interface WishListsProps {
  linksData: WishLinksType[];
  selectedLinks: number[];
  handleCheckbox: (wishId: number) => void;
}

export default function WishLists(props: WishListsProps) {
  const { linksData, selectedLinks, handleCheckbox } = props;

  const handleMovePage = (wishId: number) => {
    router.push(`/mypage/links/${wishId}`);
  };

  return (
    <>
      {linksData.map((link) => (
        <LinksBox
          key={link.wishId}
          handleMovePage={() => handleMovePage(link.wishId)}
          handleCheckbox={() => handleCheckbox(link.wishId)}
          title={link.title}
          date={`${convertDateFormat(link.startAt)} ~ ${convertDateFormat(link.endAt)}`}
          isChecked={selectedLinks.includes(link.wishId)}
        />
      ))}
    </>
  );
}
