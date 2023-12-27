import React, { useContext, useState } from "react";
import BackButton from "../../../../components/BackButton/BackButton";
import Table from "../../../../components/Table/Table";
import { useMutation, useQuery } from "@apollo/client";
import { ASSIGN_ONBORDER_TO_LEED, FETCH_LEEDS, GET_LEEDS } from "./Querries";
import Modal from "../../../../components/Modal/Modal";
import { dashboardContext } from "../../Dashboard";
import Select from "../../../../components/Select/Select";

const AssignOnboarder = ({ setShowOnboarder, leed_id }: any) => {
  const { onboarders } = useContext(dashboardContext);
  const [assignOnboder] = useMutation(ASSIGN_ONBORDER_TO_LEED, {
    refetchQueries: [{ query: GET_LEEDS }],
  });
  const [onborder, set_onborder] = useState({
    name: onboarders.onboarders[0].name,
    id: onboarders.onboarders[0]._id,
  });

  return (
    <div
      className={`z-50 absolute  top-0 px-2 right-72 w-80 h-fit bg-[#F8FAFB] rounded-lg  shadow`}
      onMouseLeave={() => setShowOnboarder(false)}
    >
      <div className="px-4 pt-4 mb-2 flex items-center justify-between">
        <div>Assign Onboarder </div>
      </div>
      <hr />
      <Select
        setSelected={set_onborder}
        selected={onborder}
        options={onboarders?.onboarders.map((v: any) => {
          return { name: v.name, id: v?._id };
        })}
      />
      <div className="mt-6 mb-3 mr-4 text-right">
        <button
          onClick={async () => {
            const res = assignOnboder({
              variables: {
                leed_id: leed_id,
                onboarder_id: onborder.id,
              },
            });
            setShowOnboarder(false);
          }}
          className="w-[108px] py-1 px-2 rounded-lg bg-[#6F6AF8] text-white"
        >
          Update
        </button>
      </div>
    </div>
  );
};

const Onboarder = ({ data }: any) => {
  const [showOnboarder, setShowOnboarder] = useState(false);

  return (
    <div
      className="relative text-center cursor-pointer"
      onClick={() => setShowOnboarder(true)}
    >
      <i className="fa-solid fa-ellipsis-vertical"></i>
      {showOnboarder ? (
        <AssignOnboarder
          leed_id={data?._id}
          setShowOnboarder={setShowOnboarder}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

function ManageLeed() {
  const { data, loading, error } = useQuery(GET_LEEDS);
  const [leedData, setLeedData] = React.useState<any>({});
  const [show, setShow] = React.useState(false);
  const { onboarders } = useContext(dashboardContext);
  const [refreshLeeds, { data: RESULT, loading: LOAD, error: ERROR }] =
    useMutation(FETCH_LEEDS, {
      refetchQueries: [{ query: GET_LEEDS }],
    });
  return (
    <div>
      <BackButton label="Manage Leeds" />
      <Modal open={show} setOpen={setShow} title={"Leed Data"}>
        <ul className="max-h-[30rem] overflow-y-scroll h-full">
          {Object.keys(leedData).map((leed: any, i: number) => (
            <li key={i}>
              <span className="font-bold mr-5">{leed} </span> : {leedData[leed]}
            </li>
          ))}
        </ul>
      </Modal>
      {data ? (
        <Table
          heading={
            <div>
              <button
                onClick={() => {
                  refreshLeeds();
                }}
                className="py-1 min-w-[200px] px-2 float-right font-normal rounded-lg bg-[#6F6AF8] text-white"
              >
                {LOAD ? (
                  <i className="fa-solid animate-spin text-white fa-spinner"></i>
                ) : (
                  "Refresh Leeds"
                )}
              </button>
            </div>
          }
          data={[
            ["Name", "City", "Onborder", "Status", "Action"],
            ...data?.leeds.map((d: any, i: number) => [
              <div
                className="text-center text-violet-500 cursor-pointer"
                onClick={() => {
                  setLeedData(JSON.parse(d.data));
                  setShow(true);
                }}
              >
                {JSON.parse(d.data)?.FirstName}
              </div>,
              <div className="text-center">
                {JSON.parse(d.data)?.Account_City}
              </div>,
              <div className="text-center">
                {onboarders.onboarders.filter(
                  (v: any) => v._id === d.school.onboarder_id
                )[0]?.name || "-"}
              </div>,
              <div>{d.status || "-"}</div>,
              <Onboarder data={d} />,
            ]),
          ]}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ManageLeed;
