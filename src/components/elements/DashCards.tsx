"use client";
import { moneyFormat, moneyFormat2 } from "@/utilities/helpers";
import { HiOutlineHand } from "react-icons/hi";

type CardsType = {
  title: string;
  amount?: number | undefined;
};

const DashCards = ({ title, amount }: CardsType) => {
  return (
    <div className="border rounded-lg p-6 flex flex-col gap-3 bg-gradient-to-tr from-purple-950 via-fuchsia-900 to-purple-800">
      <div className="flex justify-between text-white">
        <h2>{title}</h2>
        <HiOutlineHand className="text-xl" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-lg text-white font-semibold">
          {moneyFormat2(amount ?? 0)}
        </p>
      </div>
    </div>
  );
};
export default DashCards;
