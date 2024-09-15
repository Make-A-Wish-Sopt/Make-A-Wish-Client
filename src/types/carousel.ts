export type CakeItemType = {
  id: number;
  itemName: string;
  price: number;
  image: string;
};

export type CakeSelectItemType = {
  id: number;
  image: string;
};

export type CarouselType = CakeItemType | CakeSelectItemType;
