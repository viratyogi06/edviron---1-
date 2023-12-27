import React, { useState } from "react";
import BackButton from "../../../../../components/BackButton/BackButton";
import Table from "../../../../../components/Table/Table";
import Modal from "../../../../../components/Modal/Modal";
const EditDelete = ({ setEditStatus, portalUserId, setStatusChange }: any) => {
  return (
    <div className="z-50 absolute -top-3 -left-5  w-36 rounded-lg shadow bg-[#F8FAFB]">
      <div
        onClick={() => {
          setStatusChange(true);
        }}
        className="py-2 px-2 hover:bg-slate-200 rounded-t-lg "
      >
        Edit
      </div>
    </div>
  );
};

const SignedStatus = ({ data, setData, setStatusChange }: any) => {
  const [optionToggle, setOptionToggle] = useState(false);
  return (
    <>
      <div
        className="ml-3 cursor-pointer"
        onClick={() => {
          setOptionToggle(!optionToggle);
          setData(data);
        }}
        onMouseLeave={() => setOptionToggle(false)}
      >
        {"signed"}
        <i className="fa-solid ml-2 fa-pen"></i>
        {optionToggle && (
          <EditDelete setEditStatus={""} setStatusChange={setStatusChange} />
        )}
      </div>
    </>
  );
};

const ChangeStatus = ({ setStatusChange, id, set_fee_heads, data }: any) => {
  return (
    <>
      {/* <div className='h-2/5 z-10 absolute  transition duration-300 ease-out top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-1/2 bg-[#F8FAFB] rounded-2xl'> */}

      <div className="w-11/12 m-auto text-center">
        <div className="mt-10">Are you sure you want to change Status?</div>
        <div className="mt-10 mb-10 grid grid-cols-2 gap-4">
          <button
            onClick={() => setStatusChange(false)}
            className="py-1 px-4 rounded-md bg-white text-red-400 border-2 border-red-200 outline-none"
          >
            Cancel
          </button>
          <button className="py-2 px-4 rounded-md bg-red-400 text-white outline-none">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
function MouDocumentUnsigned() {
  const [isData, setData] = useState(false);
  const [optionToggle, setOptionToggle] = useState(false);
  const [isStatusChange, setStatusChange] = React.useState(false);
  const data = [
    {
      school_detail: "Madagascar",
      city: "up",
      handover_by: "Mario",
      handover_to: "7000547831",
      status: "",
    },
    {
      school_detail: "Peru",
      city: "south",
      handover_by: "Gene",
      handover_to: "3262381481",
      status: "",
    },
    {
      school_detail: "Tajikistan",
      city: "design",
      handover_by: "Violet",
      handover_to: "7958707349",
      status: "",
    },
    {
      school_detail: "French Southern Territories",
      city: "came",
      handover_by: "Craig",
      handover_to: "9501765890",
      status: "",
    },
    {
      school_detail: "Bolivia",
      city: "able",
      handover_by: "Susan",
      handover_to: "4704608723",
      status: "",
    },
    {
      school_detail: "Seychelles",
      city: "course",
      handover_by: "Christina",
      handover_to: "3525415050",
      status: "",
    },
    {
      school_detail: "South Korea",
      city: "certainly",
      handover_by: "Lou",
      handover_to: "6207980357",
      status: "",
    },
    {
      school_detail: "Macedonia",
      city: "tightly",
      handover_by: "Lilly",
      handover_to: "2867856076",
      status: "",
    },
    {
      school_detail: "Congo - Kinshasa",
      city: "key",
      handover_by: "Lewis",
      handover_to: "3135295587",
      status: "",
    },
    {
      school_detail: "Curaçao",
      city: "cross",
      handover_by: "Maria",
      handover_to: "3650406064",
      status: "",
    },
  ];
  return (
    <div>
      <BackButton label={"MOU Document Handover List"} />
      <Modal open={isStatusChange} setOpen={setStatusChange}>
        <ChangeStatus data={isData} setStatusChange={setStatusChange} />
      </Modal>
      <Table
        data={[
          [
            "School Detail",
            "City",
            "Handover By",
            "Handover To",
            "Status",
            "Upload",
          ],
          ...data.map((a: any) => [
            <div>{a.school_detail}</div>,
            <div>{a.city}</div>,
            <div>{a.handover_by}</div>,
            <div>{a.handover_to}</div>,

            <SignedStatus
              data={a}
              setData={setData}
              setStatusChange={setStatusChange}
            />,
            <div>
              <button className="bg-indigo-500 text-white px-4 py-1.5 rounded-lg">
                Upload
              </button>
            </div>,
          ]),
        ]}
      />
    </div>
  );
}

export default MouDocumentUnsigned;
