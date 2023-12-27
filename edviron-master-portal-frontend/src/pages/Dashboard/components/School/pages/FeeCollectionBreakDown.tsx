import React from "react";
import { Link } from "react-router-dom";

function FeeCollectionBreakDown({ fee_collection }: any) {
  return (
    <>
      {fee_collection?.amount > 0 ? (
        <Link
          to={"transaction-mode-wise"}
          state={{ mode: fee_collection.payment_mode }}
          className="w-full"
        >
          <div className="bg-white shadow border flex flex-col justify-between px-6 py-4 h-32 w-full rounded-lg">
            <div className="flex justify-between w-full items-center">
              <p className="text-[#1E1B59E5] text-opacity-90 font-medium text-2xl">
                ₹{fee_collection?.amount.toLocaleString("hi")}
              </p>
              <i className="fa-solid text-2xl text-[#959595] fa-chevron-right"></i>
            </div>
            <p className="text-lg capitalize text-[#959595] font-medium">
              {fee_collection?.payment_mode.toLowerCase()}
            </p>
          </div>
        </Link>
      ) : (
        <div className="bg-white shadow border flex flex-col justify-between px-6 py-4 h-32 w-full rounded-lg">
          <div className="flex justify-between w-full items-center">
            <p className="text-[#1E1B59E5] text-opacity-90 font-medium text-2xl">
              ₹{fee_collection?.amount.toLocaleString("hi")}
            </p>
            <i className="fa-solid text-2xl text-[#959595] fa-chevron-right"></i>
          </div>
          <p className="text-lg capitalize text-[#959595] font-medium">
            {fee_collection?.payment_mode.toLowerCase()}
          </p>
        </div>
      )}
    </>
  );
}

export default FeeCollectionBreakDown;
