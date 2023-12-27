import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../../../../components/Modal/Modal";
import Input from "../../../../../components/Input/Input";
import { useMutation } from "@apollo/client";
import { SEND_CREDENTIALS_TO_SUPER_ADMIN } from "../Querries";

function SchoolCard(props: any) {
  const [open, set_open] = useState(false);
  const [password, set_password] = useState(null);
  const [sendCredentialsToOnboarder, { loading }] = useMutation(
    SEND_CREDENTIALS_TO_SUPER_ADMIN
  );
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
        <div className="space-x-4">
          <button
            onClick={() => {
              sendCredentialsToOnboarder({
                variables: {
                  school_id: props?.school._id,
                },
              });
            }}
            className="bg-indigo-500 text-white px-4 py-1.5 rounded-lg"
          >
            {loading ? "Sending Email..." : "Send credentials"}
          </button>
          <button
            onClick={(e) => set_open(true)}
            className="max-w-56 bg-slate-400 py-2 px-4 rounded-lg text-white"
          >
            Login to school
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="text-lg font-medium text-[#959595] text-opacity-80 ">
            Amount Collected
          </div>
          <div className="mt-2 text-xl text-[#2EB418] text-opacity-80 font-normal">
            ₹{props.school?.amount_collected?.toLocaleString("hi")}
          </div>
        </div>

        <div className="border-l-2 border-[#1E1B59] space-y-4 px-4">
          <div className="text-lg font-medium text-[#959595] text-opacity-80 ">
            Amount Debited
          </div>
          <div className="mt-2 text-xl text-[#1E1B59] text-opacity-80 font-normal">
            ₹{0?.toLocaleString("hi")}
          </div>
        </div>
        <div className="lg:border-l-2 border-[#1E1B59] space-y-4 lg:px-4">
          <div className="text-lg font-medium text-[#959595] text-opacity-80 ">
            Sales POC
          </div>
          <div className="mt-2 text-xl text-[#1E1B59] text-opacity-80 font-normal">
            ₹{0?.toLocaleString("hi")}
          </div>
        </div>
        <div className=" border-[#1E1B59] space-y-4">
          <div className="text-lg font-medium text-[#959595] text-opacity-80 ">
            Lead From
          </div>
          <div className="mt-2 text-xl text-[#1E1B59] text-opacity-80 font-normal">
            ₹{0?.toLocaleString("hi")}
          </div>
        </div>
        <div className="lg:border-l-2 border-[#1E1B59] space-y-4 lg:px-4">
          <div className="text-lg font-medium text-[#959595] text-opacity-80 ">
            Onboarding POC
          </div>
          <div className="mt-2 text-xl text-[#1E1B59] text-opacity-80 font-normal">
            ₹{0?.toLocaleString("hi")}
          </div>
        </div>

        <div className="lg:border-l-2 space-y-4 border-[#1E1B59] lg:px-4">
          <div className="text-lg font-medium text-[#959595] text-opacity-80 ">
            Amount left to be Debited
          </div>
          <div className="mt-2 text-xl text-[#FC4343] text-opacity-90 font-normal">
            ₹{props.school?.amount_collected?.toLocaleString("hi")}
          </div>
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

export default SchoolCard;
