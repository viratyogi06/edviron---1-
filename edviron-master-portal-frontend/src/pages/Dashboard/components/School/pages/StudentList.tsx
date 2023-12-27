import React, { useState } from "react";
import BackButton from "../../../../../components/BackButton/BackButton";
import Table from "../../../../../components/Table/Table";
import LoadAndRender from "../../../../../components/LoadAndRender/LoadAndRender";
import Pagination from "../../../../../components/Pagination/Pagination";
const getStudents = async (schoolId: any, page: any) => {
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
        `/api/students?school_id=${schoolId}&page=${page}`,
      requestOptions
    )
  ).json();
};
function StudentList({ school }: any) {
  const [page, setPage] = useState(1);
  const [students, set_students] = useState<any>([]);
  const [totalPageNo, setTotalPageNo] = useState(null);

  return (
    <LoadAndRender
      reload_upon_change={[page]}
      promise={async () => {
        const res = await getStudents(school[0]?._id, page);
        setTotalPageNo(res?.total_pages);
        set_students(res.students);
      }}
    >
      <div className="w-full">
        <BackButton label="student List" />
        <div>
          <Table
            data={[
              [
                "Student Details",
                "School Name",
                "Parents Details",
                "Plan Details",
                "Collected Fee",
                "Due",
              ],
              ...students?.map((t: any) => [
                <div>{t?.name}</div>,
                <div>{school[0]?.name}</div>,
                <div>{t?.father_name}</div>,
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
        </div>
      </div>
    </LoadAndRender>
  );
}

export default StudentList;
