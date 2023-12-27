import React, { useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";

import { dashboardContext } from "../../pages/Dashboard/Dashboard";

const Table = ({
  data,
  heading,
  footer,
  description,
  actions,
  className,
  csv_name,
}: any) => {
  const [csv_link, set_csv_link] = React.useState("");
  const refs: any = useRef<any>([]);
  const { user } = useContext(dashboardContext);

  useEffect(() => {
    // console.log({ refs });
    let csvContent =
      "data:text/csv;charset=utf-8," +
      (data[0].join(",") +
        "\n" +
        refs?.current
          .map((r?: any) =>
            r
              ? [].slice.call(r?.children).map((c: any) => {
                  return JSON.stringify(c?.innerText).replace("\u20b9", "");
                })
              : ""
          )
          .map((e: any) => (e ? e.join(",") : ""))
          .join("\n"));
    var encodedUri = encodeURI(csvContent);
    set_csv_link(encodedUri);
  }, [data]);
  enum Access {
    SUPER = "super",
    ALL_ACCESS = "all_access",
    MANAGEMENT = "management",
    STAFF = "staff",
  }

  // const []
  return (
    <div className="flex flex-col w-full">
      <div className="table w-full shadow p-5 rounded-lg my-2 text-[#1e1b59]">
        <div className=" flex  w-full">
          <div className="w-full">
            <div className="text-lg font-semibold mx-5 mt-3 mb-2">
              {heading}
            </div>

            <div className="text-sm text-gray-500 mx-5 mb-3">{description}</div>
          </div>
          <div className={"ml-auto flex-none " + className}>
            {user &&
              (user.access === Access.SUPER ||
                user.access === Access.ALL_ACCESS) && (
                <a
                  download={typeof heading !== "string" ? csv_name : heading}
                  href={csv_link}
                  className="focus:outline-none outline-none"
                >
                  <button className="ml-auto bg-[#6F6AF8] text-white px-5 py-2 rounded-lg mt-2">
                    Download CSV
                  </button>
                </a>
              )}

            {actions}
          </div>
        </div>
        <div
          ref={(e) => (refs.current[0] = e)}
          className={`grid grid-cols-${data[0].length} grid-header p-3 font-semibold m-5 bg-[#ECEDFB] rounded-t-lg text-violet-900`}
        >
          {data[0].map((item: any) => {
            return <div className="text-center">{item}</div>;
          })}
        </div>
        {data.slice(1).map((row: any, key: any) => {
          return (
            <div
              ref={(e) => (refs.current[key] = e)}
              className={`grid grid-cols-${data[0].length} grid-body items-center p-3 mx-5 my-2 odd:bg-[#ECEDFB] even:bg-white odd:border-none even:border border-[#ECEDFB] rounded-lg`}
            >
              {row.map((item: any) => {
                return <div className="text-center  relative">{item}</div>;
              })}
            </div>
          );
        })}
        {footer}
      </div>
    </div>
  );
};

export default Table;
