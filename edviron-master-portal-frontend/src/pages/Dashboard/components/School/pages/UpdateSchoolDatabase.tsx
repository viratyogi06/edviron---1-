import React, { useState } from "react";
import Table from "../../../../../components/Table/Table";
import BackButton from "../../../../../components/BackButton/BackButton";
import { toast } from "react-toastify";
import Input from "../../../../../components/Input/Input";
import Modal from "../../../../../components/Modal/Modal";
import Form from "../../../../../components/Form/Form";

function UpdateSchoolDatabase({ schools }: any) {
  const [open, set_open] = useState(false);
  const [password, set_password] = useState<any>("");
  const [school, setSchool] = useState<any>({
    id: "",
    name: "",
  });
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

  async function handleLogin(schoolId: any, schoolName: any) {
    if (password.length > 0) {
      const res = await getToken(schoolId, password);
      if (res) {
        let token = res.token;

        if (token === undefined) {
          return toast.error(`Error While Creating Token For ${schoolName}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        set_open(false);
        return window.open(
          process.env.REACT_APP_SCHOOL_DASHBOARD_URL + "?token=" + token,
          "_blank"
        );
      }
    }

    return null;
  }

  return (
    <div>
      <BackButton label="School Database not Updated" />

      <div>
        <div className="grid grid-cols-6">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Modal title={"Verify Credentials"} open={open} setOpen={set_open}>
          <Form
            onSubmit={() => {
              handleLogin(school.id, school.name);
            }}
          >
            <Input
              type="password"
              name={"Password"}
              placeholder={"Enter Master Admin Password"}
              add_error={() => {}}
              onChange={(name: any, e: any) => {
                set_password(e.target.value);
              }}
              required
            />
            <div className="flex justify-center">
              <button
                disabled={!password.length}
                className="py-2 px-10 disabled:bg-green-300 bg-green-500 text-white rounded-lg"
              >
                Verify
              </button>
            </div>
          </Form>
        </Modal>
        <Table
          data={[
            [
              "School Name",
              "School City",
              "Last Updated",
              " School ID",
              "Action",
              "Status",
            ],
            ...schools.map((school: any) => [
              <div>{school.name}</div>,
              <div>{school?.address?.city}</div>,
              <div>{new Date(school?.updatedAt).toDateString()}</div>,
              <div></div>,
              <div>
                <button
                  onClick={() => {
                    setSchool({
                      id: school._id,
                      name: school.name,
                    });
                    set_open(true);
                  }}
                  className="bg-indigo-500 text-white px-4 py-1.5 rounded-lg"
                >
                  Login to School
                </button>
              </div>,
              <div>To do</div>,
            ]),
          ]}
        />
      </div>
    </div>
  );
}

export default UpdateSchoolDatabase;
