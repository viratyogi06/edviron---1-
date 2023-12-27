import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import LoadAndRender from "../../../../components/LoadAndRender/LoadAndRender";
import SchoolCard from "./pages/SchoolsCard";
import SinglesSchoolCard from "./pages/SinglesSchoolCard";
import { dashboardContext } from "../../Dashboard";
import { getSchool } from "../../Dashboard";
import TransactionModeWise from "./pages/TransactionModeWise";
import Transaction from "./pages/Transaction";
import StudentList from "./pages/StudentList";
import EditSchoolDetails from "./pages/EditSchoolDetails";
// export const getSchool = async () => {
//   var myHeaders = new Headers()
//   myHeaders.append("Content-Type", "application/json")
//   myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"))

//   var requestOptions: RequestInit = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow"
//   }
//   return await (await fetch(process.env.REACT_APP_BACKEND_URL + "/api/school/all-schools", requestOptions)).json()
// }
function SchoolProfile() {
  // const [get_school, set_get_school] = React.useState([])
  const { schools, set_schools } = useContext(dashboardContext);

  return (
    <LoadAndRender
      promise={async () => {
        set_schools(await getSchool());
      }}
    >
      <div className="flex flex-col flex-1 w-full bg-white ">
        <Routes>
          <Route
            path="/"
            element={schools?.map((school: any) => (
              <SchoolCard key={school._id} school={school} />
            ))}
          />
          <Route
            path="/:id/*"
            element={<SinglesSchoolCard schools={schools} />}
          />
          <Route path="/:id/edit*" element={<EditSchoolDetails />} />
          <Route
            path="/:id/transaction/*"
            element={<Transaction school={schools} />}
          />
          <Route
            path="/:id/transaction-mode-wise/*"
            element={<TransactionModeWise school={schools} />}
          />
          <Route
            path="/:id/student-list/*"
            element={<StudentList school={schools} />}
          />
        </Routes>
      </div>
    </LoadAndRender>
  );
}

export default SchoolProfile;
