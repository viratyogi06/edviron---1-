import React, { useContext } from "react";
import DisplayCard from "../../../../components/DisplayCard";
import { dashboardContext } from "../../Dashboard";
import userIcon from "../../../../assets/user.svg";
import { Link } from "react-router-dom";
function SchoolOnboard() {
  const { schools } = useContext(dashboardContext);
  return (
    <>
      <div className="w-full">
        <Link
          to="/create_school"
          className="px-4 py-2 bg-[#6F6AF8] rounded-md text-white float-right"
        >
          create new school
        </Link>
      </div>
      <div className="flex mt-5 max-w-5xl w-full flex-col space-y-2">
        <div className="flex items-center gap-x-6">
          <DisplayCard
            width="max-w-md w-full"
            icon={userIcon}
            to="/no-of-generated-credentials"
            label="No. of Generated Credentials"
            value={schools?.length}
          />
          <DisplayCard
            width="max-w-md w-full"
            icon={userIcon}
            to="/no-of-credentials-not-sent"
            label="No. of credentials not sent"
            value={schools?.length}
          />
          <DisplayCard
            width="max-w-md w-full"
            icon={""}
            to="/mou-doucment-unsigned"
            label="MOU Document Unsigned"
            value={schools?.length}
          />
        </div>
        <div className="flex items-center gap-x-6">
          <DisplayCard
            width="max-w-lg w-full"
            icon={""}
            to="/security-deposit-collected/"
            label="Security Deposit Collected"
            value={schools?.length}
          />
          <DisplayCard
            width="max-w-lg w-full"
            icon={""}
            to="/school-database-not-updated/"
            label="School Database not Updated"
            value={schools?.length}
          />
        </div>
        <div className="flex mt-5 items-center gap-x-6">
          <DisplayCard
            width="max-w-xl w-full"
            icon={""}
            to="/final-demo-left/"
            label="Final Demo left"
            value={schools?.length}
          />
        </div>
      </div>
    </>
  );
}

export default SchoolOnboard;
