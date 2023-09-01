import { getEditWishesInfo } from '@/api/mypage/mypageAPI';
import { QUERY_KEY } from '@/constant/queryKey';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import useInput from '../common/useInput';
import { getDate } from '@/utils/common/getDate';
import useUploadItemInfo from '../wishes/useUploadItemInfo';
import { LIMIT_TEXT } from '@/constant/limitText';
import { useGetItemInfo } from '../queries/wishes/useGetItemInfo';

export default function useInitEditWishesInfo() {
  const { data, isSuccess: isGetEditWishesInfoSuccess } = useQuery(
    QUERY_KEY.USER,
    getEditWishesInfo,
  );

  const wishesStatus = data?.status;

  const [title, handleChangeTitle, setTitle] = useInput('', LIMIT_TEXT[20]);
  const [initial, handleChangeInitial, setInitial] = useInput('', LIMIT_TEXT[15]);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [name, handleChangeName, setName] = useInput('');
  const [bankName, setBankName] = useState('');
  const [account, handleChangeAccount, setAccount] = useInput('');
  const [phone, handleChangePhone, setPhone] = useInput('');

  const {
    linkURL,
    handleChangeLinkURL,
    changeLinkURL,
    imageURL,
    changeImageURL,
    price,
    changePrice,
  } = useGetItemInfo();

  const { preSignedImageURL, setPreSignedImageURL, uploadImageFile } = useUploadItemInfo();
  const [isLinkLoadType, setIsLinkLoadType] = useState(true); //false : 링크 불러오기 true : 직접 불러오기
  const [selfInputPrice, handleChangeSelfInputPrice, setSelfInputPrice] = useInput(
    '',
    LIMIT_TEXT[15],
  );
  const [hint, handleChangeHint, setHint] = useInput('', LIMIT_TEXT.DESCRIPTION);

  useEffect(() => {
    if (data) {
      setStartDate(data?.startDate);
      setEndDate(data?.endDate);
      setPhone(data?.phone);
      setTitle(data?.title);
      setHint(data?.hint);
      setInitial(data?.initial);
      changeLinkURL(data?.imageUrl);
      setPreSignedImageURL(data?.imageUrl);
      setSelfInputPrice(data?.price);
      changeImageURL(data?.imageUrl);
      changePrice(data?.price);
      setName(data?.accountInfo?.name);
      setBankName(data?.accountInfo?.bank);
      setAccount(data?.accountInfo?.account);
    }
  }, [data]);

  useEffect(() => {
    setEndDate(getDate(startDate, 7));
  }, [startDate]);

  const changeBankName = (input: string) => {
    setBankName(input);
  };

  const changeStartDate = (value: Date) => {
    setStartDate(value);
  };

  const handleLoadTypeToggle = (state: boolean) => {
    setIsLinkLoadType(state);
  };

  return {
    title: {
      title,
      handleChangeTitle,
    },
    initial: {
      initial,
      handleChangeInitial,
    },
    startDate: {
      startDate,
      changeStartDate,
    },
    endDate,
    bankInfo: {
      name,
      handleChangeName,
      bankName,
      changeBankName,
      account,
      handleChangeAccount,
    },

    phone: {
      phone,
      handleChangePhone,
    },
    hint: {
      hint,
      handleChangeHint,
    },
    itemLink: {
      linkURL,
      handleChangeLinkURL,
      imageURL,
      changeImageURL,
      price,
      changePrice,
    },
    image: {
      preSignedImageURL,
      uploadImageFile,
    },

    isLinkLoadType: {
      isLinkLoadType,
      handleLoadTypeToggle,
    },

    selfInputPrice: {
      selfInputPrice,
      handleChangeSelfInputPrice,
    },
    price: data?.price,

    wishesStatus,

    isGetEditWishesInfoSuccess,

    data,
  };
}
