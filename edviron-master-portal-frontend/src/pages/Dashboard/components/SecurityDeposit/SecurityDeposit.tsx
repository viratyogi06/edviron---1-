import React from "react";
import Table from "../../../../components/Table/Table";
import BackButton from "../../../../components/BackButton/BackButton";
import { Link } from "react-router-dom";

function SecurityDeposit() {
  const data = [
    {
      school_detail: "Madagascar",
      city: "up",
      principal_name: "Mario",
      principal_number: "7000547831",
      action: "sent",
    },
    {
      school_detail: "Peru",
      city: "south",
      principal_name: "Gene",
      principal_number: "3262381481",
      action: "sent",
    },
    {
      school_detail: "Tajikistan",
      city: "design",
      principal_name: "Violet",
      principal_number: "7958707349",
      action: "sent",
    },
    {
      school_detail: "French Southern Territories",
      city: "came",
      principal_name: "Craig",
      principal_number: "9501765890",
      action: "sent",
    },
    {
      school_detail: "Bolivia",
      city: "able",
      principal_name: "Susan",
      principal_number: "4704608723",
      action: "sent",
    },
    {
      school_detail: "Seychelles",
      city: "course",
      principal_name: "Christina",
      principal_number: "3525415050",
      action: "sent",
    },
    {
      school_detail: "South Korea",
      city: "certainly",
      principal_name: "Lou",
      principal_number: "6207980357",
      action: "sent",
    },
    {
      school_detail: "Macedonia",
      city: "tightly",
      principal_name: "Lilly",
      principal_number: "2867856076",
      action: "sent",
    },
    {
      school_detail: "Congo - Kinshasa",
      city: "key",
      principal_name: "Lewis",
      principal_number: "3135295587",
      action: "sent",
    },
    {
      school_detail: "Curaçao",
      city: "cross",
      principal_name: "Maria",
      principal_number: "3650406064",
      action: "sent",
    },
  ];

  return (
    <div>
      <BackButton label="Security Deposit Collected" />

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
              "School Detail",
              "City",
              "Principal Name",
              "Principal Number",
              "Action",
            ],
            ...data.map((a: any) => [
              <div>{a.school_detail}</div>,
              <div>{a.city}</div>,
              <div>{a.principal_name}</div>,
              <div>{a.principal_number}</div>,
              <div>
                <button className="bg-indigo-500 text-white px-4 py-1.5 rounded-lg">
                  collect
                </button>
              </div>,
            ]),
          ]}
        />
      </div>
    </div>
  );
}

export default SecurityDeposit;
