import { Link, Navigate } from "react-router-dom";
import LoadAndRender from "../../components/LoadAndRender/LoadAndRender";
import { createContext, useState } from "react";
import React from "react";
import { Sidebar, SidebarItem } from "../Dashboard/components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import SchoolsCard from "./components/School/pages/SchoolsCard";
import CreateNewSchool from "./components/School/CreateNewSchool";
import Overview from "./components/Overview/Overview";
import SchoolProfile from "./components/School/SchoolProfile";
import NoOfGeneratedCredential from "./components/NoOfGeneratedCredential/NoOfGeneratedCredential";
import NoOfNotGeneratedCredential from "./components/NoOfGeneratedCredential/NoOfNotGeneratedCredential";
import AmountCollected from "./components/Amount/AmountCollected";
import AmountDisbursed from "./components/Amount/AmountDisbursed";
import SecurityDeposite from "./components/Overview/SecurityDeposite";
import ConvenienceFee from "./components/ConvenienceFee/ConvenienceFee";
import SchoolOnboard from "./components/School/SchoolOnboard";
import MouDocumentUnsigned from "./components/School/pages/MouDocumentUnsigned";
import SecurityDeposit from "./components/SecurityDeposit/SecurityDeposit";
import CredentialsSendList from "./components/NoOfGeneratedCredential/CredentialsSendList";
import UpdateSchoolDatabase from "./components/School/pages/UpdateSchoolDatabase";
import FinalDemoLeft from "./components/School/pages/FinalDemoLeft";
import ManageOnboarder from "./components/ManageOnboarders/ManageOnboarder";
import ManageLeed from "./components/ManageLeed/ManageLeed";
import { useQuery } from "@apollo/client";
import { GET_ONBOARDERS } from "./components/ManageOnboarders/Querries";

export const dashboardContext = createContext<any>(null);

export const getSchool = async () => {
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
      process.env.REACT_APP_BACKEND_URL + "/api/school/all-schools",
      requestOptions
    )
  ).json();
};
export const getTotalCollection = async () => {
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
        "/api/fee-collection/total-collection",
      requestOptions
    )
  ).json();
};

function Dashboard({ user, set_user }: any) {
  //eslint-disable-next-line
  const [schools, set_schools] = useState<any>();
  const [total_collection, set_total_collection] = useState<any>();
  const { data: onboarders, loading, error } = useQuery(GET_ONBOARDERS);
  // console.log({ user })
  if (!user) return <Navigate to="/login"></Navigate>;

  return (
    <dashboardContext.Provider
      value={{
        schools,
        total_collection,
        set_schools,
        onboarders,
      }}
    >
      <LoadAndRender
        promise={async () => {
          set_schools(await getSchool());
          set_total_collection(await getTotalCollection());
        }}
      >
        <div className="dashboard capitalize flex w-full">
          <div className="h-full relative">
            <Sidebar>
              <SidebarItem name="Dashboard" to="/" />
              <SidebarItem name="School Onboarding" to="/school" />
              <SidebarItem name="Lending" to="/lending" />
              <SidebarItem name="Convenience Fees" to="/convenience-fees" />
              <SidebarItem name="Manage Onboarders" to="/manage-onboarders" />
              <SidebarItem name="Manage Leeds" to="/manage-leeds" />

              <SidebarItem
                className="mt-auto"
                icon={<i className="fa-solid fa-right-from-bracket"></i>}
                name="Log Out"
                onTap={() => {
                  localStorage.removeItem("token");
                  set_user(null);
                }}
              />
            </Sidebar>
          </div>

          <div className="flex flex-col flex-1 py-8 px-4 w-full bg-white ">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/create_school/*" element={<CreateNewSchool />} />
              <Route
                path="/no-of-generated-credentials/*"
                element={<NoOfGeneratedCredential />}
              />
              <Route
                path="/no-of-credentials-not-sent/*"
                element={<NoOfNotGeneratedCredential />}
              />
              <Route
                path="/credentials-send-list/*"
                element={<CredentialsSendList />}
              />
              <Route
                path="/mou-doucment-unsigned/*"
                element={<MouDocumentUnsigned />}
              />
              <Route
                path="/security-deposit-collected/*"
                element={<SecurityDeposit />}
              />
              <Route
                path="/school-database-not-updated/*"
                element={<UpdateSchoolDatabase schools={schools} />}
              />
              <Route
                path="/final-demo-left/*"
                element={<FinalDemoLeft schools={schools} />}
              />

              <Route path="/amount-collected/*" element={<AmountCollected />} />
              <Route path="/amount-disbursed/*" element={<AmountDisbursed />} />
              <Route
                path="/security-deposite/*"
                element={<SecurityDeposite />}
              />
              <Route path="/school/*" element={<SchoolOnboard />} />
              <Route path="/school_profile/*" element={<SchoolProfile />} />
              <Route path="/convenience-fees" element={<ConvenienceFee />} />
              <Route path="/manage-onboarders" element={<ManageOnboarder />} />
              <Route path="/manage-leeds" element={<ManageLeed />} />
            </Routes>
          </div>
        </div>
      </LoadAndRender>
    </dashboardContext.Provider>
  );
}

export default Dashboard;
