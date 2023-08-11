import LinksBox from './linksBox';
import { WishLinksType } from '@/types/links/wishLinksType';
import { convertDateFormat } from '@/hooks/useDate';
import router from 'next/router';

//
const WISH_LIST = [
  { wishId: 1, title: "화정이의 앙큼 벌스데이", startAt: "2023-07-01T00:00", endAt: "2023-07-23T00:00" },
  { wishId: 2, title: "화정이의 앙큼 벌스데이", startAt: "2023-07-01T00:00", endAt: "2023-07-23T00:00" },
  { wishId: 3, title: "화정이의 앙큼 벌스데이", startAt: "2023-07-01T00:00", endAt: "2023-07-23T00:00" },
  { wishId: 4, title: "화정이의 앙큼 벌스데이", startAt: "2023-07-01T00:00", endAt: "2023-07-23T00:00" },
  { wishId: 5, title: "화정이의 앙큼 벌스데이", startAt: "2023-07-01T00:00", endAt: "2023-07-23T00:00" },
  { wishId: 6, title: "화정이의 앙큼 벌스데이", startAt: "2023-07-01T00:00", endAt: "2023-07-23T00:00" },
];

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
      {/*  */}
      {WISH_LIST.map((link) => (
        <LinksBox
          key={link.wishId}
          handleMovePage={() => handleMovePage(link.wishId)}
          handleCheckbox={() => handleCheckbox(link.wishId)}
          title={link.title}
          date={`${convertDateFormat(link.startAt)}~${convertDateFormat(link.endAt)}`}
          isChecked={selectedLinks.includes(link.wishId)}
        />
      ))}
      {linksData.map((link) => (
        <LinksBox
          key={link.wishId}
          handleMovePage={() => handleMovePage(link.wishId)}
          handleCheckbox={() => handleCheckbox(link.wishId)}
          title={link.title}
          date={`${convertDateFormat(link.startAt)}~${convertDateFormat(link.endAt)}`}
          isChecked={selectedLinks.includes(link.wishId)}
        />
      ))}
    </>
  );
}
