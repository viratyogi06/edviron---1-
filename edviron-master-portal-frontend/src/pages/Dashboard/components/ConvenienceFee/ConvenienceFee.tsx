import React, { useState, useEffect, useContext } from "react";
import { dashboardContext } from "../../Dashboard";
import BackButton from "../../../../components/BackButton/BackButton";
import Table from "../../../../components/Table/Table";
import editIcon from "../../asserts/editiconschool.svg";
import Modal from "../../../../components/Modal/Modal";
import Input from "../../../../components/Input/Input";
import { getSchool } from "../../Dashboard";
import Select from "../../../../components/Select/Select";

export enum FeeFrequency {
  MONTHLY = "MONTHLY",
  ANNUALLY = "ANNUALLY",
}

export enum ConvenienceFeeFrequency {
  ONE_TIME = "ONE_TIME",
  INSTALLMENT = "INSTALLMENT",
}

const updateConvenienceFee = async (
  convenience_fee: any,
  school_id: any,
  fee_frequency: any,
  convenience_fee_frequency: any
) => {
  console.log(convenience_fee);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  let raw = JSON.stringify({
    convenience_fee: convenience_fee,
    fee_frequency,
    convenience_fee_frequency,
  });
  var requestOptions: RequestInit = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return await (
    await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/api/school/convenience-fee?school_id=${school_id}&convenience_fee=${convenience_fee}`,
      requestOptions
    )
  ).json();
};
const ConvenienceFee = () => {
  const { schools, set_schools } = useContext(dashboardContext);
  const [school_id, set_school_id] = useState<any>("");
  const [open_modal, set_modal] = useState(false);
  const [convenience_fee, set_convenience_fee] = useState(0);
  const [fee_frequency, set_fee_frequency] = useState({
    name: FeeFrequency.MONTHLY,
  });
  const [convenience_fee_frequency, set_convenience_fee_frequency] = useState({
    name: ConvenienceFeeFrequency.INSTALLMENT,
  });
  async function handleSubmit() {
    const res = await updateConvenienceFee(
      convenience_fee,
      school_id,
      fee_frequency?.name,
      convenience_fee_frequency.name
    );
    if (res) {
      set_modal(false);
      set_schools(await getSchool());
    }
  }
  return (
    <div>
      <div>
        <div className="flex  items-center">
          <BackButton to={".."} />
          <div className="  text-2xl font-semibold text-violet-500">
            Convenience Fee
          </div>
        </div>
        <div className=" grid grid-cols-9">
          <div></div>
          <div></div>

          <div></div>
          <div></div>
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
              "City",
              "Chain",
              "Students",
              "Fee Frequency",
              "Average Fee",
              "Convenience Fee",
              "Convenience Fee Frequency",
              "Action",
            ],
            ...schools.map((s: any) => [
              s.name,
              s?.address?.city,
              s?.chain,
              s?.student_count,
              s?.fee_frequency,
              s?.average_fee,
              s?.convenience_fee,
              s?.convenience_fee_frequency,
              <div className=" flex justify-center cursor-pointer">
                <img
                  onClick={() => {
                    set_modal(true);
                    set_school_id(s?._id);
                  }}
                  src={editIcon}
                  alt="edit"
                />
              </div>,
            ]),
          ]}
        />
        <Modal
          title={"Set Convenience Fee"}
          open={open_modal}
          setOpen={set_modal}
        >
          <div>
            <Input
              onChange={(n: any, v: any) => {
                set_convenience_fee(v);
              }}
              name={"Convenience Fee"}
              add_error={() => {}}
              type="number"
              placeholder={"Enter Fee"}
            />

            <Select
              options={[FeeFrequency.MONTHLY, FeeFrequency.ANNUALLY].map(
                (c: any) => {
                  return { name: c };
                }
              )}
              setSelected={set_fee_frequency}
              selected={fee_frequency}
              label="Fee Frequency"
            />
            <Select
              options={[
                ConvenienceFeeFrequency.INSTALLMENT,
                ConvenienceFeeFrequency.ONE_TIME,
              ].map((c: any) => {
                return { name: c };
              })}
              setSelected={set_convenience_fee_frequency}
              selected={convenience_fee_frequency}
              label="Convenience Fee Frequency"
            />

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="mt-2 py-2 px-4 bg-violet-500 rounded-md text-white font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ConvenienceFee;
