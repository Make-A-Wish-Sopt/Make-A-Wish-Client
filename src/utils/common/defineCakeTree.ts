import {
  CakeTreeDataType,
  defaultCakeTreeDataArray,
  defaultCakeTreeDataObject,
} from '@/constant/model/cakesTreeData';

export function defineCakeTree(receivedCakeList?: CakeTreeDataType[]) {
  if (!receivedCakeList) return defaultCakeTreeDataArray;

  const defaulCakeList = defaultCakeTreeDataArray.map((cake) => {
    cake.name = '선물주운영자';
    return cake;
  });

  if (receivedCakeList.length === 0) return defaulCakeList;

  const convertReceivedCakeData = receivedCakeList
    .map((cake) => {
      const matchCakesData = defaultCakeTreeDataObject[cake.cakeId];

      if (matchCakesData) {
        return {
          ...matchCakesData,
          name: cake.name,
          presentId: cake.presentId,
          cakeImg: defaultCakeTreeDataObject[cake.cakeId].cakeImg,
          isAdminMessage: false,
        };
      }
      return null;
    })
    .filter(Boolean);

  return [...convertReceivedCakeData, ...defaulCakeList];
}
