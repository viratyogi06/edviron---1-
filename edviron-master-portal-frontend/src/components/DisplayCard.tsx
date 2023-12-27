import React from "react";
import { Link } from "react-router-dom";
import extendIcon from "../assets/extend.svg";
const DisplayCard = ({
  icon,
  value,
  label,
  denominator,
  to,
  width,
  color,
}: {
  icon: string;
  value: string;
  label: string;
  denominator?: string;
  to?: string;
  width?: string;
  color?: string;
}) => {
  const className = `flex justify-between shadow my-2 text-[#1E1B59] rounded-[8px] ${width}`;

  const toRender = (
    <div className="m-4 flex flex-col w-full">
      <div className="flex justify-between items-center w-full">
        <img src={icon} className="h-6" alt="" />
        <div className="pt-[18px] pr-[18px] text-blue-800 text-xl font-thin cursor-pointer">
          <img src={extendIcon} alt="" />
        </div>
      </div>
      <div className={`text-2xl text-green-400 font-semibold ${color}`}>
        {value}
        {denominator && (
          <span className="text-[#1E1B59] font-medium text-3xl">
            {"/" + denominator}
          </span>
        )}
      </div>

      <div className="mt-auto text-sm text-grey-400 font-normal">{label}</div>
    </div>
  );
  if (to) {
    return (
      <Link to={to} className={className}>
        {toRender}
      </Link>
    );
  } else {
    return <div className={className}>{toRender}</div>;
  }
};

export default DisplayCard;
