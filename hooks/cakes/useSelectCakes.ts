import { CAKE_LIST } from "@/constant/cakeList";
import { CakeListType } from "@/types/cakes/cakeListType";
import { useState } from "react";

export default function useSelectCakes() {
  const [selectedCake, setSelectedCake] = useState<CakeListType>(CAKE_LIST[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectCake = (index: number) => {
    setSelectedCake(CAKE_LIST[index]);
    setSelectedIndex(index);
  };

  return {selectedCake,selectedIndex,selectCake}
}
