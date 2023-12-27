import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../../../../../components/BackButton/BackButton";
import LoadAndRender from "../../../../../components/LoadAndRender/LoadAndRender";
import Pagination from "../../../../../components/Pagination/Pagination";
import Table from "../../../../../components/Table/Table";
const getFeeCollection = async (schoolId: any, mode: any, page: any) => {
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
        `/api/transactions/${mode}?school_id=${schoolId}&page=${page}`,
      requestOptions
    )
  ).json();
};
function TransactionModeWise({ school }: any) {
  const [page, setPage] = useState(1);
  const [fee_collection, set_fee_collection] = useState<any>([]);
  const [totalPageNo, setTotalPageNo] = useState(null);
  const location = useLocation();
  console.log(fee_collection);

  return (
    <LoadAndRender
      reload_upon_change={[page]}
      promise={async () => {
        const res = await getFeeCollection(
          school[0]?._id,
          location?.state?.mode,
          page
        );
        setTotalPageNo(res?.total_pages);
        set_fee_collection(res.res);
      }}
    >
      <div className="w-full">
        <BackButton label="Transactions" />
        <div>
          {fee_collection.length && (
            <Table
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
                ...fee_collection?.map((t: any) => [
                  <div>{new Date(t?.createdAt).toDateString()}</div>,
                  <div>{t.student[0]?.name}</div>,
                  <div className="truncate">{t?._id}</div>,
                  <div></div>,

                  <div>{t?.transaction[0]?.status}</div>,
                  <div>{t?.transaction[0]?.payment_mode}</div>,
                ]),
              ]}
              footer={
                totalPageNo && (
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalPageNo={totalPageNo}
                  />
                )
              }
            />
          )}
        </div>
      </div>
    </LoadAndRender>
  );
}

export default TransactionModeWise;
