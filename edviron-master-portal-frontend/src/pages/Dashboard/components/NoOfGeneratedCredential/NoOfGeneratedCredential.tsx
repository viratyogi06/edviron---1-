import React from "react";
import BackButton from "../../../../components/BackButton/BackButton";
import Table from "../../../../components/Table/Table";
import { Link } from "react-router-dom";

function NoOfGeneratedCredential() {
  const data = [
    {
      school_name: "Madagascar",
      city: "up",
      credentials_created_date: "3/11/2054",
      profile_completed: "24",
      action: "sent",
    },
    {
      school_name: "Peru",
      city: "south",
      credentials_created_date: "3/25/2073",
      profile_completed: "100",
      action: "sent",
    },
    {
      school_name: "Tajikistan",
      city: "design",
      credentials_created_date: "5/24/2069",
      profile_completed: "80",
      action: "sent",
    },
    {
      school_name: "French Southern Territories",
      city: "came",
      credentials_created_date: "4/15/2025",
      profile_completed: "85",
      action: "sent",
    },
    {
      school_name: "Bolivia",
      city: "able",
      credentials_created_date: "5/11/2098",
      profile_completed: "55",
      action: "sent",
    },
    {
      school_name: "Seychelles",
      city: "course",
      credentials_created_date: "2/19/2071",
      profile_completed: "80",
      action: "sent",
    },
    {
      school_name: "South Korea",
      city: "certainly",
      credentials_created_date: "9/18/2073",
      profile_completed: "97",
      action: "sent",
    },
    {
      school_name: "Macedonia",
      city: "tightly",
      credentials_created_date: "9/9/2080",
      profile_completed: "29",
      action: "sent",
    },
    {
      school_name: "Congo - Kinshasa",
      city: "key",
      credentials_created_date: "9/18/2086",
      profile_completed: "42",
      action: "sent",
    },
    {
      school_name: "Curaçao",
      city: "cross",
      credentials_created_date: "4/25/2108",
      profile_completed: "100",
      action: "sent",
    },
  ];
  return (
    <div>
      <BackButton label="No of Credentials Generated" />
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
              "School Name",
              "School City",
              "Credentials created date",
              "Sales POC",
              "Profile Completed",
              "Action",
            ],
            ...data.map((a: any) => [
              <div>{a.school_name}</div>,
              <div>{a.city}</div>,
              <div>{a.credentials_created_date}</div>,
              <div>Lorem, ipsum.</div>,
              <div className="flex items-center justify-center w-full">
                <div
                  className={"h-2  w-32 mr-2 border rounded-lg border-gray-300"}
                >
                  <div
                    className={
                      "rounded-lg h-full " +
                      (a.profile_completed >= 30 && a.profile_completed <= 59
                        ? "bg-orange-400"
                        : a.profile_completed >= 60 &&
                          a.profile_completed <= 100
                        ? "bg-green-400"
                        : "bg-red-400")
                    }
                    style={{ width: `${a.profile_completed}%` }}
                  ></div>
                </div>
                {a.profile_completed}%
              </div>,
              <div>
                {a.profile_completed <= 99 ? (
                  <button className="bg-indigo-500 text-white px-4 py-1.5 rounded-lg">
                    Complete Profile
                  </button>
                ) : (
                  <Link
                    to="/no-of-credentials-not-sent"
                    className="bg-green-500 text-white px-4 py-1.5 rounded-lg"
                  >
                    send credentials
                  </Link>
                )}
              </div>,
            ]),
          ]}
        />
      </div>
    </div>
  );
}

export default NoOfGeneratedCredential;
