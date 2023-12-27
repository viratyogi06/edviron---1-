// import Background from '../assets/background.jpg';

import "./LogInPage.css"
import Input from "../../components/Input/Input"

import { Navigate, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import Form from "../../components/Form/Form"
import Logo from "../../assets/logo.svg"
import { toast } from "react-toastify"
// const get_user = async (token: string) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", "Bearer " + token);

//   var requestOptions: RequestInit = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };
//   const { user, school } = await (
//     await fetch(
//       process.env.REACT_APP_BACKEND_URL + "/school-auth/get_user",
//       requestOptions
//     )
//   ).json();
//   return { ...user, school };
// };

// async function gen_otp(phone_number: string) {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify({ phone_number: phone_number });

//   var requestOptions: RequestInit = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   return await fetch(
//     process.env.REACT_APP_BACKEND_URL + "/school-auth/gen_otp",
//     requestOptions
//   );
// }

// async function verify_otp(otp: string, token: string) {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify({ token: token, otp: otp + "" });

//   var requestOptions: RequestInit = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   return await fetch(
//     process.env.REACT_APP_BACKEND_URL + "/school-auth/verify_otp",
//     requestOptions
//   );
// }

const logIn = async (data: any) => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  var raw = JSON.stringify({
    email: data.email,
    password: data.password
  })

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  }

  return await (await fetch(process.env.REACT_APP_BACKEND_URL + "/edviron-auth/login", requestOptions)).json()
}

const add_error = (name: string, error: string, errors: any, set_errors: any) => {
  set_errors({ ...errors, [name]: error })
}

function LogInPage({ user, set_user }: { user: Map<String, String>; set_user: any }) {
  const [token, set_token] = useState("")
  const navigate = useNavigate()
  // console.log({ user })
  if (user) return <Navigate to="/"></Navigate>

  return (
    <div className="login-page min-h-screen flex w-full">
      <div className="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow sm:justify-center md:flex-none md:px-28">
        <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
          <div className="flex flex-col">
            <a aria-label="Home" href="/">
              <div className="logo">
                <img src={Logo} alt="logo" />
              </div>
            </a>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">Sign in to your account</h2>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-y-0">
            <Form
              onSubmit={async (data: any) => {
                const logInUser = {
                  email: data["Email"],
                  password: data["Password"]
                }
                const res = await logIn(logInUser)
                if (res.statusCode === 401) {
                  return toast.error(`${res.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                  })
                }
                localStorage.setItem("token", res.accessToken)
                set_user(true)
                navigate("/")
              }}
            >
              {/* Email ID */}
              <Input name="Email" placeholder="enter email" add_error={{}} type={"text"} required />
              <Input name="Password" placeholder="enter password" add_error={{}} type={"password"} required />

              {/* Sign In Button */}
              <div>
                <button className=" my-2 group inline-flex items-center justify-center rounded-full py-3 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full">Login</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogInPage
