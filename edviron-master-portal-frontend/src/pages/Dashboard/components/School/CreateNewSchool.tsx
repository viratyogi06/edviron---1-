import React, { useState } from "react";
import BackButton from "../../../../components/BackButton/BackButton";
import Form from "../../../../components/Form/Form";
import Input from "../../../../components/Input/Input";
import Date from "../../../../components/Date/Date";
import { useNavigate } from "react-router-dom";
import { getSchool } from "../../Dashboard";
import { preventNegativeValues } from "../../../../helper/preventNegativeValues";
import { preventPasteNegative } from "../../../../helper/preventPasteNegative";
import { toast } from "react-toastify";
const update_school = (data: any, school_id: any) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(data);
    var requestOptions: RequestInit = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `/api/update-school?school_id=${school_id}`,
      requestOptions
    );
    if (res.ok) {
      const data = await res.json();
      resolve(data);
    } else {
      reject(new Error("something wrong!!!"));
    }
  });
};

function CreateNewSchool() {
  const [school_id, set_school_id] = useState(null);

  const navigate = useNavigate();

  const createSuperAdmin = async (data: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var raw = JSON.stringify({
      phone_number: data.phone_number,
      name: data.name,
      email_id: data.email_id,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/create-super-admin",
      requestOptions
    );
    if (res.ok) {
      return await res.json();
    }
    throw new Error((await res.json()).message);
  };
  return (
    <div className="shadow p-4 rounded-lg">
      <BackButton
        to="/"
        label={!school_id ? "Create Super Admin" : "Create New School"}
      />
      <div className="pl-6">
        {!school_id ? (
          <Form
            onSubmit={async (data: any) => {
              // set_super_admin(
              //   await createSuperAdmin({
              //     name: data["Name"],
              //     email_id: data["Email ID"],
              //     phone_number: data["Mobile Number"]
              //   })
              // )
              try {
                const res = await createSuperAdmin({
                  name: data["Name"],
                  email_id: data["Email ID"],
                  phone_number: data["Mobile Number"],
                });
                set_school_id(res.school_id);
                toast.success("admin created!");
              } catch (err: any) {
                toast.error(err.message);
              }
            }}
          >
            <Input
              add_error={() => {}}
              name="Name"
              placeholder="enter admin name"
              type="text"
              required
            />
            <Input
              add_error={() => {}}
              name="Email ID"
              type="email"
              placeholder="enter email ID"
              required
            />
            <Input
              name="Mobile Number"
              type="number"
              maxLength={10}
              onKeyDown={preventNegativeValues}
              onKeyPaste={preventPasteNegative}
              min={0}
              placeholder="enter number"
              required
            />

            <div className="flex justify-end items-center my-5">
              <button className="bg-[#6F6AF8] disabled:bg-violet-400 rounded-lg text-white px-4 py-2">
                Create & Next
              </button>
            </div>
          </Form>
        ) : (
          <Form
            onSubmit={(data: any) => {
              const createSchoolObj = {
                name: data["School Name"],
                address: data["Address"],
                city: data["city"],
                state: data["State"],
                pincode: data["Pincode"],
                school_type: data["School Type"],
                date_of_establishment: data["Date Of Registration"],
                fee_collection_date: data["Fee Collection Date"],
                late_fee_grace_period: data["Late Fee Grace Period"],
                account_number: data["Account Number"],
                ifsc: data["Ifsc Code"],
                account_holder: data["Account Holder Name"],
                primary_contact_number: data["Contact Number"],
                primary_email_id: data["Email ID"],
              };
              update_school(createSchoolObj, school_id)
                .then(async (res: any) => {
                  await getSchool();
                  navigate("/school_profile");
                })
                .catch((err) => console.log(err));
            }}
            className="grid grid-cols-2 gap-x-6"
          >
            <div className="col-span-2">
              <h1 className="text-2xl font-semibold text-[#6F6AF8] mt-5 mb-6">
                Basic Details
              </h1>
            </div>
            <Input
              add_error={() => {}}
              name="School Name"
              placeholder="enter school name"
              type="text"
              required
            />
            {/* <Input add_error={() => {}} type="email" name="School Email ID" placeholder="enter school email ID" required /> */}
            <Input
              add_error={() => {}}
              name="Address"
              type="text"
              placeholder="enter address"
              required
            />
            <Input
              add_error={() => {}}
              type="text"
              name="city"
              placeholder="enter city"
              required
            />
            <Input
              add_error={() => {}}
              type="text"
              name="State"
              placeholder="enter state"
              required
            />

            <Input
              add_error={() => {}}
              name="Pincode"
              type="number"
              placeholder="enter pincode"
              maxLength={6}
              onKeyDown={preventNegativeValues}
              onKeyPaste={preventPasteNegative}
              min={0}
              required
            />
            <Input
              add_error={() => {}}
              type="text"
              name="School Type"
              placeholder="enter school type"
              required
            />
            <Input
              add_error={() => {}}
              type="date"
              name="Date Of Registration"
              required
            />

            <Input
              add_error={() => {}}
              type="text"
              name="Fee Collection Date"
              placeholder="enter doe"
              required
            />
            <Input
              add_error={() => {}}
              type="number"
              name="Late Fee Grace Period"
              placeholder="enter doe"
              onKeyDown={preventNegativeValues}
              onKeyPaste={preventPasteNegative}
              min={0}
              required
            />
            <div className="col-span-2">
              <h1 className="text-2xl font-semibold text-[#6F6AF8] mt-5 mb-6">
                Primary Contact Details
              </h1>
            </div>
            <Input
              add_error={() => {}}
              type="number"
              name="Contact Number"
              placeholder="Enter contatct number"
              maxLength={10}
              onKeyDown={preventNegativeValues}
              onKeyPaste={preventPasteNegative}
              min={0}
              required
            />
            <Input
              add_error={() => {}}
              name="Email ID"
              type="email"
              placeholder="Enter email id"
              required
            />
            <div className="col-span-2">
              <h1 className="text-2xl font-semibold text-[#6F6AF8] mt-5 mb-6">
                Bank Details
              </h1>
            </div>
            <Input
              add_error={() => {}}
              name="Account Holder Name"
              placeholder="Enter  name"
              required
              type="text"
            />
            <Input
              add_error={() => {}}
              type="number"
              name="Account Number"
              placeholder="Enter number"
              onKeyDown={preventNegativeValues}
              onKeyPaste={preventPasteNegative}
              min={0}
              required
            />
            <Input
              add_error={() => {}}
              name="Ifsc Code"
              type="text"
              placeholder="Enter Ifsc Code"
              required
            />

            <div className="flex justify-end items-center my-5 px-8">
              {/* <button className="bg-[#DADBFC] rounded-lg text-white px-4 py-2">Reset All</button> */}
              <button className="bg-[#6F6AF8] rounded-lg text-white px-4 py-2">
                Save
              </button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

export default CreateNewSchool;
