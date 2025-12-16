"use client";
import { moneyFormat, moneyFormat2 } from "@/utilities/helpers";
import { ReactNode } from "react";
import { HiOutlineHand } from "react-icons/hi";

type CardsType = {
  title: string;
  amount?: number | undefined;
  icon?: ReactNode;
  bg_color?: string;
};

const DashCards = ({ title, amount, icon, bg_color }: CardsType) => {
  return (
    <div className="border rounded-lg p-6 flex flex-col gap-3 bg-gradient-to-tr from-purple-950 via-fuchsia-900 to-purple-800">
      <div className="flex justify-between items-center text-white">
        <h2 className="text-sm md:text-base font-medium">{title}</h2>
        <div
          className={`p-1 md:p-2 rounded-full bg-${bg_color}`}
          style={{ backgroundColor: bg_color }}
        >
          {icon}
        </div>
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
