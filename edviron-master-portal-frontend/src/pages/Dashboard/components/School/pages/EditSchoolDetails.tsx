import React, { useEffect, useState, useContext } from "react";
import Input from "../../../../../components/Input/Input";
import Select from "../../../../../components/Select/Select";
import { useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SCHOOL_LOGO_UPLOAD } from "../Querries";

const EditSchoolDetails = () => {
  const location = useLocation();
  const school = location.state.school[0];
  const [loading, setLoading] = useState(false);
  console.log(school);

  const [name, setName] = useState(school?.name || "");
  const [logo, setLogo] = useState(school?.logo_url || "");

  const [state, setState] = useState(school?.address?.state || "");
  const [type, setType] = useState(school?.school_type || "");

  const [students, setStudents] = useState(school?.student_count || "");
  const [edviron_Reg_Number, setEdviron_Reg_Number] = useState(
    school?.edviron_id || ""
  );

  const [street, setStreet] = useState(school?.address?.street || "");
  const [city, setCity] = useState(school?.address?.city || "City");
  const [pin, setPin] = useState(school?.address?.pin || "154154");
  const [phone_number, setPhoneNumber] = useState(school?.phone_number || "");
  const [email, setEmail] = useState(school?.email_id || "");

  const [account_holder, setAccountHolder] = useState(
    school?.bank_details?.account_holder_name || ""
  );
  const [account_number, setAccountNumber] = useState(
    school?.bank_details?.account_number || ""
  );
  const [ifsc, set_ifsc] = useState(
    school?.bank_details?.account_ifse_code || ""
  );
  const [fee_collection_date, set_fee_collection_date] = useState(
    school?.fee_collection_date || ""
  );
  const [selectedImage, setSelectedImage] = useState<any>("");
  //const [isUploading, setIsUploading] = useState(false);
  const [uploadSchoolLogo, { loading: isUploading, error }] =
    useMutation(SCHOOL_LOGO_UPLOAD);
  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
  const maxSize = 2 * 1024 * 1024;
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const file = e.target.files[0];
      if (!validFileTypes.find((type) => type === file.type)) {
        console.log("File must be in JPG/PNG format");
        return;
      }
      if (file.size > maxSize) {
        console.log("file size is larger than maxSize");
      }

      //setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e?.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };
  //console.log(data.uploadSchoolLogo);
  const update_school = (data: any) => {
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify(data);
      var requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      let res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/school/update",
        requestOptions
      );
      if (res.ok) {
        const data = await res.json();
        setLoading(false);
        window.location.replace(`/school_profile/${school?._id}`);
        resolve(data);
      } else {
        const message = await res.json();
        if (message.statusCode === 401) {
          setLoading(false);
          localStorage.removeItem("token");
          window.location.reload();
        }
        reject(new Error("something wrong!"));
      }
    });
  };
  return (
    <>
      <div className="text-2xl  text-violet-600">Edit Details</div>
      <div className="my-3 h-[1px] w-full bg-[#6F6AF8]"></div>
      <div className="w-28 p-1 h-28 flex-none flex justify-center items-center overflow-hidden rounded-full bg-gray-200">
        {isUploading ? (
          <i className="fa-solid fa-spinner text-4xl animate-spin"></i>
        ) : (
          <>
            {logo ? (
              <img
                src={logo}
                alt=""
                className="w-full h-full object-fill rounded-full"
              />
            ) : (
              <i className="fa-solid fa-school-flag text-5xl"></i>
            )}{" "}
          </>
        )}
      </div>
      <div className="w-full ">
        <div className="mt-6 flex items-center">
          <div className="w-[15%]">School Name</div>
          <div className="w-full flex justify-between items-center">
            <div className="w-1/3 ">
              <Input
                type="text"
                add_error={() => {}}
                value={name}
                onChange={(k: string, v: string) => setName(v)}
              />
            </div>

            <div className="text-right">School Type</div>
            <div className="w-1/3">
              <Input
                type="text"
                add_error={() => {}}
                value={type}
                onChange={(k: string, v: string) => setType(v)}
              />
            </div>
          </div>
        </div>

        <div className=" mt-6 flex items-center">
          <div className="w-[15%]">Edviron Id</div>
          <div className="w-full flex justify-between items-center">
            <div className="w-1/3">
              <Input
                type="text"
                add_error={() => {}}
                value={edviron_Reg_Number}
                onChange={(k: string, v: string) => setEdviron_Reg_Number(v)}
                disabled
              />
            </div>
            <div className="text-right">Date of Registration</div>
            <div className="w-1/3">
              <Input
                type="text"
                value={new Date(school?.createdAt).toDateString()}
                add_error={() => {}}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <div className="w-[15%]">Street</div>
          <div className="w-full flex justify-between items-center">
            <div className="w-1/3">
              <Input
                type="text"
                add_error={() => {}}
                value={street}
                onChange={(k: string, v: string) => setStreet(v)}
              />
            </div>
            <div className="text-right">City</div>
            <div className="w-1/3">
              <Input
                type="text"
                add_error={() => {}}
                value={city}
                onChange={(k: string, v: string) => setCity(v)}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <div className="w-[15%]">State</div>
          <div className="w-full flex justify-between items-center">
            <div className="w-1/3">
              <Input
                type="text"
                add_error={() => {}}
                value={state}
                onChange={(k: string, v: string) => setState(v)}
              />
            </div>
            <div className="text-right">Pincode</div>
            <div className="w-1/3">
              <Input
                type="text"
                add_error={() => {}}
                value={pin}
                onChange={(k: string, v: string) => setState(v)}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <div className="w-[15%]">Fee Collection Date</div>
          <div className="w-full flex justify-between items-center">
            <div className="w-1/3">
              <Select
                selected={{ name: fee_collection_date }}
                setSelected={(v: any) => set_fee_collection_date(v.name)}
                options={[
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                ].map((d) => {
                  return { name: d };
                })}
              />
            </div>
            <div className="text-right">Upload School Logo</div>
            <div className="w-1/3">
              <div className="flex items-end flex-col">
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  id="formFileSm"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {selectedImage && (
                  <button
                    onClick={async () => {
                      const res = uploadSchoolLogo({
                        variables: {
                          image_data: selectedImage,
                          school_id: school?._id,
                        },
                      });
                      if ((await res)?.data?.uploadSchoolLogo) {
                        update_school({
                          school_id: school?._id,
                          name,
                          logo_url: (await res)?.data?.uploadSchoolLogo,
                          state,
                          school_type: type,
                          students,
                          address: {
                            street: street,
                            city: city,
                            state: state,
                            pin: pin,
                          },
                          phone_number,
                          email_id: email,
                          fee_collection_date,
                          bank_details: {
                            account_holder_name: account_holder,
                            account_number: account_number,
                            account_ifse_code: ifsc,
                          },
                        });
                      }
                    }}
                    className="mt-2 capitalize  py-1 px-4 max-w-[7rem] w-full rounded-md bg-[#6F6AF8] text-white"
                  >
                    {isUploading ? (
                      <i className="fa-solid fa-spinner text-xl animate-spin"></i>
                    ) : (
                      "Upload"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 font-semibold text-2xl text-violet-600">
          Primary Contact
        </div>

        <div className="mt-6 flex items-center">
          <div className="w-[15%]">Contact Number</div>
          <div className="w-full flex justify-between items-center">
            <div className="w-1/3">
              <Input
                type="text"
                add_error={() => {}}
                value={phone_number}
                onChange={(k: string, v: string) => setPhoneNumber(v)}
              />
            </div>
            <div className="text-right">Email Address</div>
            <div className="w-1/3">
              <Input
                type="text"
                add_error={() => {}}
                value={email}
                onChange={(k: string, v: string) => setEmail(v)}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 font-semibold text-2xl text-violet-600">
          Bank Details
        </div>

        <div className="mt-6 flex items-center">
          <div className="w-[15%]">Account Holder Name</div>
          <div className="w-full flex justify-between items-center">
            <div className="w-1/3">
              <Input
                type="text"
                add_error={() => {}}
                value={account_holder}
                onChange={(k: string, v: string) => setAccountHolder(v)}
              />
            </div>
            <div className="text-right">Accout Number</div>
            <div className="w-1/3">
              <Input
                type="text"
                add_error={() => {}}
                value={account_number}
                onChange={(k: string, v: string) => setAccountNumber(v)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <div className="w-[15%]">Accoutn IFSC Code</div>
          <div className="w-full flex justify-between items-center">
            <div className="w-1/3">
              <Input
                type="text"
                add_error={() => {}}
                value={ifsc}
                onChange={(k: string, v: string) => set_ifsc(v)}
              />
            </div>
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={async () => {
              const res = update_school({
                school_id: school?._id,
                name,
                state,
                school_type: type,
                students,
                address: {
                  street: street,
                  city: city,
                  state: state,
                  pin: pin,
                },
                phone_number,
                email_id: email,
                fee_collection_date,
                bank_details: {
                  account_holder_name: account_holder,
                  account_number: account_number,
                  account_ifse_code: ifsc,
                },
              });
            }}
            className="mt-6 py-2 px-4 max-w-[15rem] w-full rounded-md bg-[#6F6AF8] text-white"
          >
            {loading ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              "Update School Profile"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditSchoolDetails;
