import React from "react";
import { Link } from "react-router-dom";
import extendIcon from "../assets/extend.svg";

const DisplayCardSmall = ({
  count,
  countOf,
  to,
}: {
  count: number;
  countOf: string;
  to: string;
}) => {
  return (
    <Link
      className="flex justify-between shadow w-1/2 text-[#1E1B59] rounded-[8px]"
      to={to}
    >
      <div className="p-[16px] flex flex-col">
        <div className="text-[30px] font-bold">{count}</div>
        <div className="text-[16px] text-grey-400 font-normal">{countOf}</div>
      </div>
      <div className="pt-[18px] pr-[18px] text-blue-800 text-2xl font-thin cursor-pointer">
        <img src={extendIcon} alt="" />
      </div>
    </Link>
  );
};

export default DisplayCardSmall;
