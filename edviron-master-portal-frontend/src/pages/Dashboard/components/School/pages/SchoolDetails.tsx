import React, { useContext, useState } from "react";
import editIcon from "../../../assets/editiconschool.svg";
import DisplayCard from "../../../../../components/DisplayCard";
import school_icon from "../../../asserts/school.svg";
import collection_icon from "../../../asserts/amount_credited.svg";
import disbursed_icon from "../../../asserts/amount_debited.svg";

import FeeCollectionBreakDown from "./FeeCollectionBreakDown";
import LoadAndRender from "../../../../../components/LoadAndRender/LoadAndRender";
import Table from "../../../../../components/Table/Table";
import { Link } from "react-router-dom";

const getFeeCollection = async (schoolId: any) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await (
    await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/api/payment-mode-wise?school_id=${schoolId}`,
      requestOptions
    )
  ).json();
};
const getTransactions = async (schoolId: any) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await (
    await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/api/transactions?school_id=${schoolId}&page=${1}`,
      requestOptions
    )
  ).json();
};

const SchoolDetails = ({ school }: any) => {
  const [fee_collection, set_fee_collection] = useState<any>([]);
  const [transaction, set_transaction] = useState<any>([]);

  // console.log(transaction?.transactions);

  return (
    <LoadAndRender
      promise={async () => {
        set_fee_collection(await getFeeCollection(school[0]?._id));
        set_transaction(await getTransactions(school[0]?._id));
      }}
    >
      <div className="mt-8 w-full">
        <div className="flex justify-between  items-center">
          <div className="text-xl font-medium text-[#1E1B59]">
            School Basic Details
            <i className="fa-solid fa-arrow-right ml-2 text-xl transform -rotate-45"></i>
          </div>

          <Link
            to={`/school_profile/${school[0]?._id}/edit`}
            state={{
              school,
            }}
          >
            <i className="fa-regular fa-edit mr-2 text-[#959595] text-[24px]"></i>
          </Link>
        </div>
        <div className=" p-4 w-full mt-6 flex  shadow rounded-md items-center text-center">
          <div className="w-full grid  grid-cols-4 gap-2">
            <div className="text-left border-r-[0.3px] border-gray">
              <div className=" items-center flex  text-violet-500  ">
                <div className=" text-left px-4 space-y-3">
                  <div className="text-base text-[#959595]">School Name</div>
                  <div className="text-xl ">{school[0].name}</div>
                </div>
              </div>
            </div>
            <div className="  p-2 border-r-[0.3px] border-gray space-y-3">
              <div className="text-base text-[#959595]">School Type</div>
              <div className="text-base text-[#1E1B59]">
                {school[0]?.school_type}
              </div>
            </div>

            <div className="p-2 border-r-[0.3px] border-gray space-y-3">
              <div className=" text-base text-[#959595]">City</div>
              <div className="text-base text-[#1E1B59]">
                {school[0]?.address?.city}
              </div>
            </div>
            <div className="p-2 space-y-3">
              <div className=" text-base text-[#959595]">phone_number</div>
              <div className="text-base text-[#1E1B59] ">
                {school[0]?.phone_number}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-8 mt-6">
          <DisplayCard
            icon={school_icon}
            to={`/school_profile/${school[0]?._id}/student-list`}
            label="No. of Students"
            value={school[0]?.student_count}
          />
          <DisplayCard
            icon={collection_icon}
            to={`/school_profile/${school[0]?._id}/transaction`}
            label="School Fee Collection"
            value={`₹${school[0]?.amount_collected?.toLocaleString("hi")}`}
          />
          <DisplayCard
            icon={disbursed_icon}
            color={"text-red-400"}
            to="/school_profile"
            label="Have to pay back to school"
            value={`₹${school[0]?.amount_collected?.toLocaleString("hi")}`}
          />
        </div>
        <div className="mt-4">
          <h2 className="text-[#1E1B59] mb-4 text-[20px] font-medium">
            Fee collection Breakdown
          </h2>
          <div className="flex items-center gap-x-8 w-full">
            {fee_collection?.map((fee: any) => {
              return <FeeCollectionBreakDown fee_collection={fee} />;
            })}
          </div>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-6">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          {transaction.transactions && (
            <Table
              heading={
                <Link to="transaction">
                  <h2 className="text-[#1E1B59] mb-4 text-[20px] font-medium">
                    Transactions
                    <i className="fa-solid fa-arrow-right ml-2 text-xl transform -rotate-45"></i>
                  </h2>
                </Link>
              }
              className="hidden"
              data={[
                [
                  "date",
                  "Student Details",
                  "Transaction ID",
                  "Applied Fee",
                  "Paid",
                  "Mode",
                ],
                ...transaction?.transactions?.map((t: any) => [
                  <div>{new Date(t?.createdAt).toDateString()}</div>,
                  <div>{t.student?.name}</div>,
                  <div className="truncate">{t?._id}</div>,
                  <div></div>,
                  <div>{t?.status}</div>,
                  <div>{t?.payment_mode}</div>,
                ]),
              ]}
            />
          )}
        </div>
      </div>
    </LoadAndRender>
  );
};

export default SchoolDetails;
