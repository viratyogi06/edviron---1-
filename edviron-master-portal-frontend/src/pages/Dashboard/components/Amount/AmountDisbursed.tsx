import React from "react";
import Table from "../../../../components/Table/Table";
import BackButton from "../../../../components/BackButton/BackButton";

function AmountDisbursed() {
  return (
    <div>
      <BackButton label="Amount Disbursed" />
      <div>
        <div className="grid grid-cols-5">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <Table
          data={[
            [
              "Data",
              "School Name",
              "Transaction ID",
              "Student Details",
              "Amount",
            ],
            ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a: any) => [
              <div>24-4-2004</div>,
              <div>Public School</div>,
              <div>64987564847955</div>,
              <div>Sani</div>,
              <div>5465</div>,
            ]),
          ]}
        />
      </div>
    </div>
  );
}

export default AmountDisbursed;
