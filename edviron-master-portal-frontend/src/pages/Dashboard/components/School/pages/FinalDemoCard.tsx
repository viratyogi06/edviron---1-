import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../../../../components/Modal/Modal";
import Input from "../../../../../components/Input/Input";
// import RadioInput from "../../../../../components/RadioInput/RadioInput";

const RadioInput = ({ status, setStatusValue }: any) => {
  return (
    <div className="flex gap-x-3 my-2 items-center">
      <input
        type="radio"
        name="status"
        value={status.status}
        id={status.status}
        onChange={(e) => setStatusValue(e.target.value)}
        className="cursor-pointer"
      />
      <label className="cursor-pointer" htmlFor={status.status}>
        {status.status}
      </label>
    </div>
  );
};

function FinalDemoCard(props: any) {
  const [open, set_open] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [statusValue, setStatusValue] = useState("");
  const [password, set_password] = useState(null);
  const status = [
    {
      id: 1,
      status: "Demo not scheduled",
    },
    {
      id: 2,
      status: "Demo scheduled",
    },
    {
      id: 3,
      status: "Demo done",
    },
  ];
  const getToken = async (id: any, password: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await (
      await fetch(
        process.env.REACT_APP_BACKEND_URL +
          `/school-auth/gen-token?school_id=${id}&password=${password}`,
        requestOptions
      )
    ).json();
  };

  async function handleLogin() {
    const res = await getToken(props.school._id, password);
    if (res) {
      let token = res.token;
      console.log(res);
      if (token === undefined) {
        return toast.error(
          `Error While Creating Token For ${props.school?.name}`,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
      set_open(false);
      return window.open(
        process.env.REACT_APP_SCHOOL_DASHBOARD_URL + "?token=" + token,
        "_blank"
      );
    }
    return null;
  }

  return (
    <div className="shadow capitalize w-full flex flex-col gap-y-4 p-4  mt-4 rounded-lg">
      <div className="flex justify-between  w-full items-center p-2">
        <div>
          <Link to={`/school_profile/${props.school._id}`}>
            <h2 className="text-2xl text-[#6F6AF8]">{props.school?.name}</h2>
          </Link>
        </div>
      </div>
      <div className="grid lg:grid-cols-5 grid-cols-2 gap-4">
        <div className=" border-[#1E1B59] space-y-2 lg:px-4">
          <div className="text-base font-medium text-[#959595] text-opacity-80 ">
            School City
          </div>
          <div className="mt-2 text-[1rem] text-[#1E1B59] text-opacity-80 font-normal">
            {props.school?.address?.city}
          </div>
        </div>

        <div className="border-l-2 space-y-2 border-[#1E1B59] px-4">
          <div className="text-base font-medium text-[#959595] text-opacity-80 ">
            School ID
          </div>
          <div className="mt-2 text-[1rem] text-[#FC4343] text-opacity-90 font-normal"></div>
        </div>
        <div className="lg:border-l-2 relative space-y-2 border-[#1E1B59] lg:px-4">
          <div className="text-base flex gap-x-2 font-medium text-[#959595] text-opacity-80 ">
            Status
            <i
              onClick={() => setOpenStatusModal(!openStatusModal)}
              className="fa-solid ml-2 text-violet-500 cursor-pointer fa-pen"
            ></i>
          </div>
          <div className="mt-2 text-[1rem] text-[#FC4343] text-opacity-90 font-normal">
            Demo not scheduled
          </div>
          {openStatusModal && (
            <div className="absolute top-0 border z-20 -left-52 rounded-lg w-[18rem] bg-gray-50 shadow-lg">
              <div className="border-b text-center py-3">
                <h3>Change Schedule Status</h3>
              </div>
              <div className=" p-4 space-y-2 ">
                {status.map((status: any) => {
                  return (
                    <RadioInput
                      key={status.id}
                      setStatusValue={setStatusValue}
                      status={status}
                    />
                  );
                })}
              </div>
              <div className="p-4 w-full flex justify-end">
                <button className="px-4 py-1.5 bg-violet-500 text-white rounded-lg">
                  update
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="border-l-2 space-y-2 border-[#1E1B59] px-4">
          <div className="text-base font-medium text-[#959595] text-opacity-80 ">
            POC Demo
          </div>
          <div className="mt-2 text-[1rem]  text-opacity-90 font-normal"></div>
        </div>
        <div className="lg:border-l-2 space-y-2 border-[#1E1B59] lg:px-4">
          <div className="text-base font-medium text-[#959595] text-opacity-80 ">
            Comment
          </div>
          <div className="mt-2 text-[1rem]  text-opacity-90 font-normal"></div>
        </div>
      </div>
      <Modal title={"Verify Credentials"} open={open} setOpen={set_open}>
        <Input
          type="password"
          name={"Password"}
          placeholder={"Enter Master Admin Password"}
          add_error={() => {}}
          onChange={(name: any, e: any) => {
            set_password(e);
          }}
        />
        <div className="flex justify-center">
          <button
            onClick={handleLogin}
            className="py-2 px-10 bg-green-500 text-white rounded-lg"
          >
            Verify
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default FinalDemoCard;
