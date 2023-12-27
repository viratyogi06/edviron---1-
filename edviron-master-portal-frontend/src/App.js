import React, { useState } from "react";
import "./App.css";
import LogInPage from "./pages/LogInPage/LogInPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadAndRender from "./components/LoadAndRender/LoadAndRender";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const get_user = async (token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(
    process.env.REACT_APP_BACKEND_URL + "/edviron-auth/get_user",
    requestOptions
  );
};
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URL + "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  const [user, set_user] = useState(null);
  return (
    <div className="app">
      <ApolloProvider client={client}>
        <LoadAndRender
          promise={async () => {
            const token = localStorage.getItem("token");

            if (token) {
              try {
                const res = await get_user(token);
                if (res.ok) {
                  await res.json().then((r) => {
                    set_user(r?.user);
                  });
                } else throw new Error("something wrong");
              } catch (err) {
                console.log(err);
              }
            }
          }}
        >
          <Routes>
            <Route
              path="*"
              element={<Dashboard user={user} set_user={set_user} />}
            />
            <Route
              path="/login"
              element={<LogInPage user={user} set_user={set_user} />}
            />
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </LoadAndRender>
      </ApolloProvider>
    </div>
  );
}

export default App;
