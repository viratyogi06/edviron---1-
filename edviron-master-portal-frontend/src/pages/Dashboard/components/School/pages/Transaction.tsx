import React, { useState } from "react";
import BackButton from "../../../../../components/BackButton/BackButton";
import LoadAndRender from "../../../../../components/LoadAndRender/LoadAndRender";
import Table from "../../../../../components/Table/Table";
import Pagination from "../../../../../components/Pagination/Pagination";
const getTransactions = async (schoolId: any, page: any) => {
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
        `/api/transactions?school_id=${schoolId}&page=${page}`,
      requestOptions
    )
  ).json();
};
function Transaction({ school }: any) {
  const [transaction, set_transaction] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [totalPageNo, setTotalPageNo] = useState(null);

  console.log(transaction);

  return (
    <LoadAndRender
      reload_upon_change={[page]}
      promise={async () => {
        const res = await getTransactions(school[0]?._id, page);
        set_transaction(res?.transactions);
        setTotalPageNo(res?.total_pages);
      }}
    >
      <div className="w-full">
        <BackButton label="Transactions" />
        <div>
          {transaction.length && (
            <Table
              heading={"Transactions"}
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
                ...transaction?.map((t: any) => [
                  <div>{new Date(t?.createdAt).toDateString()}</div>,
                  <div>{t.student?.name}</div>,
                  <div className="truncate">{t?._id}</div>,
                  <div></div>,
                  <div>{t?.status}</div>,
                  <div>{t?.payment_mode}</div>,
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

export default Transaction;
