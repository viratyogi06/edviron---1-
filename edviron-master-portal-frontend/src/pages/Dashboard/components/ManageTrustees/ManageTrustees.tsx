import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import Form from "../../../../components/Form/Form";
import Input from "../../../../components/Input/Input";
import { preventNegativeValues } from "../../../../helper/preventNegativeValues";
import { preventPasteNegative } from "../../../../helper/preventPasteNegative";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_TRUSTEE,
  DELETE_TRUSTEE,
  EDIT_TRUSTEE,
  GET_TRUSTEES,
} from "./Querries";
import { dashboardContext } from "../../Dashboard";
const EditDelete = ({
  setShowUpdateModal,
  trustee,
  setShowPasswordUpdateModal,
  setDeleteTrustee,
}: any) => {
  return (
    <div className="z-10 absolute   bottom-0 -left-[5rem] rounded-lg shadow bg-[#F8FAFB]">
      <div
        onClick={() => {
          setShowUpdateModal(true);
        }}
        className="py-2 px-2 hover:bg-slate-200 rounded-t-lg cursor-pointer"
      >
        Edit
      </div>
      <hr />
      <div
        onClick={() => {
          setShowPasswordUpdateModal(true);
        }}
        className="py-2 w-full px-4 hover:bg-slate-200 rounded-t-lg cursor-pointer"
      >
        Change Password
      </div>
      <hr />
      <div
        onClick={() => {
        setDeleteTrustee(true);
        }}
        className="py-2 px-2 text-red-400 hover:bg-slate-200  rounded-b-lg cursor-pointer"
      >
        Delete
      </div>
    </div>
  );
};

function OnboardTrustee({
  trustee,
  setShowUpdateModal,
  showUpdateModal,
  setTrustee,
  setShowPasswordUpdateModal,
  setDeleteTrustee,
}: any) {
  const [optionToggle, setOptionToggle] = useState(false);

  return (
    <div
      onMouseLeave={() => setOptionToggle(false)}
      className="grid grid-cols-4 text-center grid-body items-center p-3 my-2 odd:bg-[#ECEDFB] even:bg-white odd:border-none even:border border-[#ECEDFB] rounded-lg"
    >
      <div>{trustee.name}</div>
      <div className="lowercase">{trustee.email}</div>
      <div>{trustee.phone_number}</div>
      <div>{trustee.school_limit}</div>
      <div className="relative">
        <i
          className="fa-solid fa-ellipsis-vertical ml-auto cursor-pointer p-2"
          onClick={() => {
            setTrustee(trustee);
            setOptionToggle(!optionToggle);
          }}
        ></i>
        {optionToggle && (
          <EditDelete
            setShowPasswordUpdateModal={setShowPasswordUpdateModal}
            setShowUpdateModal={setShowUpdateModal}
            showUpdateModal={showUpdateModal}
            setDeleteUser={setDeleteTrustee}
          />
        )}
      </div>
    </div>
  );
}

function ManageTrustee() {
  const [showModal, setShowModal] = React.useState(false);
  const [trustee, setTrustee] = useState<any>(null);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [showPasswordUpdateModal, setShowPasswordUpdateModal] =
    React.useState(false);

  //const { data, loading, error } = useQuery(GET_TRUSTEES);
  const [createTrustee, { data: result, loading: LOAD, error: _ERROR }] =
    useMutation(CREATE_TRUSTEE, {
      refetchQueries: [{ query: GET_TRUSTEES }],
    });
  const [editTrustee, { loading }] = useMutation(EDIT_TRUSTEE, {
    refetchQueries: [{ query: GET_TRUSTEES }],
  });
  const [deleteTrustee] = useMutation(DELETE_TRUSTEE, {
    refetchQueries: [{ query: GET_TRUSTEES }],
  });
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [password_error, setPassword_error] = React.useState("");
  const { trustees } = useContext(dashboardContext);

  useEffect(() => {
    if (password !== confirmPassword) {
      setPassword_error("Password Does Not Match");
    } else {
      setPassword_error("");
    }
  }, [password, confirmPassword]);
  return (
    <div>
      <Modal
        className="max-w-lg w-full"
        open={showModal}
        setOpen={setShowModal}
        title="Create Trustee"
      >
        <Form
          onSubmit={async (data: any) => {
            const trustee = {
              name: data["Name"],
              email: data["Email"],
              phone_number: data["Phone Number"],
              school_limit: data["School Limit"],
              password,
              confirmPassword,
            };

            const res = createTrustee({
              variables: {
                name: data["Name"],
                email: data["Email"],
                phone_number: data["Phone Number"],
                school_limit: data["School Limit"],
                password: password,
              },
            });
            setShowModal(false);
          }}
        >
          <Input
            type="name"
            placeholder="Enter Name"
            name="Name"
            add_error={() => {}}
            required
          />
          <Input
            type="email"
            name="Email"
            placeholder="Enter Email"
            add_error={() => {}}
            required
          />
          <Input
            type="number"
            name="Phone Number"
            add_error={() => {}}
            placeholder="Enter Phone no"
            onKeyDown={preventNegativeValues}
            onPaste={preventPasteNegative}
            min={0}
            maxLength={10}
            required
          />
          <Input
            type="number"
            name="School Limit"
            add_error={() => {}}
            placeholder="Enter School Limit"
            onKeyDown={preventNegativeValues}
            onPaste={preventPasteNegative}
            min={0}
            maxLength={3}
            required
          />
          <Input
            type="password"
            name="Password"
            add_error={() => {}}
            onChange={(v: any) => {
              setPassword(v);
            }}
            placeholder="Enter Password"
            onKeyDown={preventNegativeValues}
            onPaste={preventPasteNegative}
            min={0}
            required
          />
          <Input
            type="password"
            name="Confirm Password"
            add_error={() => {}}
            onChange={(v: any) => {
              setConfirmPassword(v);
            }}
            placeholder="Enter Confirm Password"
            onKeyDown={preventNegativeValues}
            onPaste={preventPasteNegative}
            min={0}
            required
          />
          <div>
            {password_error && (
              <p className="text-center text-red-500 font-normal">
                {password_error}
              </p>
            )}
          </div>
          <div className="mt-2 mb-2 text-center">
            <button
              disabled={password !== confirmPassword}
              className="py-2 px-16 max-w-[15rem] w-full rounded-lg disabled:bg-blue-300 bg-[#6F6AF8] text-white"
            >
              Create
            </button>
          </div>
        </Form>
      </Modal>
      <Modal
        className="max-w-lg w-full"
        open={showUpdateModal}
        setOpen={setShowUpdateModal}
        title="Update User"
      >
        {trustee && (
          <Form
            onSubmit={async (data: any) => {
              const res = editTrustee({
                variables: {
                  _id: trustee?._id,
                  name: data["Name"] || trustee?.name,
                  email: data["Email"] || trustee?.email,
                  phone_number: data["Phone Number"] || trustee?.phone_number,
                  school_mimit: data["Phone Number"] || trustee?.phone_number,
                },
              });
              setShowUpdateModal(false);
            }}
          >
            <Input
              type="name"
              value={trustee?.name}
              placeholder="Enter Name"
              name="Name"
              add_error={() => {}}
              required
            />
            <Input
              type="email"
              name="Email"
              value={trustee?.email}
              placeholder="Enter Email"
              add_error={() => {}}
              required
            />
            <Input
              type="number"
              name="Phone Number"
              value={trustee?.phone_number}
              add_error={() => {}}
              placeholder="Enter Phone no"
              onKeyDown={preventNegativeValues}
              onPaste={preventPasteNegative}
              min={0}
              maxLength={10}
              required
            />

            <div className="mt-2 mb-2 text-center">
              <button className="py-2 px-16 max-w-[15rem] w-full rounded-lg disabled:bg-blue-300 bg-[#6F6AF8] text-white">
                update
              </button>
            </div>
          </Form>
        )}
      </Modal>
      <Modal
        className="max-w-lg w-full"
        open={showPasswordUpdateModal}
        setOpen={setShowPasswordUpdateModal}
        title="Update User Password"
      >
        {trustee && (
          <Form
            onSubmit={async (data: any) => {
              const res = editTrustee({
                variables: {
                  _id: trustee?._id,
                  password: data["Password"],
                },
              });
              setShowPasswordUpdateModal(false);
            }}
          >
            <Input
              type="password"
              name="Password"
              add_error={() => {}}
              onChange={(v: any) => {
                setPassword(v);
              }}
              placeholder="Enter Password"
              onKeyDown={preventNegativeValues}
              onPaste={preventPasteNegative}
              min={0}
              required
            />
            <Input
              type="password"
              name="Confirm Password"
              add_error={() => {}}
              onChange={(v: any) => {
                setConfirmPassword(v);
              }}
              placeholder="Enter Confirm Password"
              onKeyDown={preventNegativeValues}
              onPaste={preventPasteNegative}
              min={0}
              required
            />
            <div>
              {password_error && (
                <p className="text-center text-red-500 font-normal">
                  {password_error}
                </p>
              )}
            </div>

            <div className="mt-2 mb-2 text-center">
              <button
                disabled={password !== confirmPassword}
                className="py-2 px-16 max-w-[15rem] w-full rounded-lg disabled:bg-blue-300 bg-[#6F6AF8] text-white"
              >
                update
              </button>
            </div>
          </Form>
        )}
      </Modal>
      <Modal
        className="max-w-lg w-full"
        open={deleteUser}
        setOpen={setDeleteUser}
      >
        {trustee && (
          <>
            <div className="text-base font-semibold leading-6 text-gray-900 text-center">
              Delete
            </div>

            <div className="w-11/12 m-auto text-center">
              <div className="mt-10">
                Are you sure you want to delete this member?
              </div>
              <div className="mt-10 mb-10 grid grid-cols-2 gap-4">
                <button
                  onClick={() => setDeleteUser(false)}
                  className="py-1 px-4 rounded-md bg-white text-red-400 border-2 border-red-200 outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteTrustee({
                      variables: {
                        id: trustee?._id,
                      },
                    });
                    setDeleteUser(false);
                  }}
                  className="py-2 px-4 rounded-md hover:bg-red-400 bg-red-300 text-white outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
      <button
        onClick={() => setShowModal(!showModal)}
        className="px-4 py-2 mb-5 bg-[#6F6AF8] rounded-md text-white float-right"
      >
        create new Trustee
      </button>
      <div className="w-full mt-20">
        <div>
          <div className="mt-10 w-full">
            <div className="table w-full shadow p-8 rounded-lg my-2 text-[#1e1b59]">
              <div className="grid grid-cols-4 grid-header p-3 font-semibold  bg-[#ECEDFB] rounded-t-lg text-violet-900">
                <div className="text-center">name</div>
                <div className="text-center">email</div>
                <div className="text-center">phone number</div>
                <div className="text-center">school limit</div>
                <div className="text-center">action</div>
              </div>
              {trustees?.trustees?.map((trustee: any, i: number) => (
                <OnboardTrustee
                  trustee={trustee}
                  setTrustee={setTrustee}
                  setDeleteUser={setDeleteUser}
                  setShowModal={setShowModal}
                  setShowUpdateModal={setShowUpdateModal}
                  setShowPasswordUpdateModal={setShowPasswordUpdateModal}
                  showUpdateModal={showUpdateModal}
                  key={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTrustee;
