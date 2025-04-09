export interface PresentFormDataType {
  name: string;
  message: string;
  cakeId: number;
  giftMenuId?: number;
}

export interface WishesLinkDataType {
  imageUrl: string;
  title: string;
  hint: string;
  startDate: Date;
  endDate: Date;
  wantsGift: boolean;
}
