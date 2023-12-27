import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DisplayCard from "../../../../components/DisplayCard";
import AmountCreated from "../../../../assets/amount_credited.svg";
import collection_icon from "../../asserts/amount_credited.svg";
import disbursed_icon from "../../asserts/amount_debited.svg";
import school_icon from "../../asserts/school.svg";
import { dashboardContext } from "../../Dashboard";
function Overview() {
  const { schools } = useContext(dashboardContext);
  const { total_collection } = useContext(dashboardContext);
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <Link
          to="/create_school"
          className="px-4 py-2 bg-[#6F6AF8] rounded-md text-white float-right"
        >
          create new school
        </Link>
      </div>
      <div className="flex gap-x-4">
        <DisplayCard
          width="max-w-md w-full"
          icon={school_icon}
          to="/school_profile"
          label="No. of Schools Onboarded"
          value={schools?.length}
        />

        {/* <DisplayCard
          icon=">"
          to="/school_profile"
          label="No. of Schools Onboarded"
          value="102"
        />
        <DisplayCard
          icon=">"
          to="/school_profile"
          label="No. of Schools Onboarded"
          value="102"
        /> */}
      </div>
      <div className="flex gap-x-4">
        <DisplayCard
          width="w-2/5"
          icon={collection_icon}
          to="/amount-collected"
          label="Amount collected"
          value={`₹${total_collection?.total_collection?.toLocaleString("hi")}`}
        />
        <DisplayCard
          width="w-2/5"
          icon={disbursed_icon}
          to="/amount-disbursed"
          label="Amount disbursed"
          value={`₹${(
            total_collection?.total_collection -
            total_collection?.total_collection
          )?.toLocaleString("hi")}`}
        />
        <DisplayCard
          width="w-2/5"
          icon={disbursed_icon}
          to="/school_profile"
          label="Amount Left To Be disbursed"
          value={`₹${total_collection?.total_collection?.toLocaleString("hi")}`}
        />
      </div>
      <div className="flex gap-x-4 max-w-sm">
        <DisplayCard
          width="w-full"
          icon={collection_icon}
          to="/security-deposite"
          label="Have to Collect Security Deposit Amount"
          value={"21"}
        />
      </div>
    </div>
  );
}

export default Overview;
