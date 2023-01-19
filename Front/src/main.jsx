import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Authentification from "../route/Authentification/Authentification";
import CreationCompte from "../route/CreationCompte/CreationCompte";
import Colocation from "../route/Colocation/Colocation";
import Compte from "../route/Compte/Compte";
import Service from "../route/Services/Services";
import Messagerie from "../route/Messagerie/Messagerie";
import Accueil from "../route/Accueil/Accueil";
import DetailsService from "../route/DetailsService/DetailsService";
import { UserProvider } from "../context/UserContext";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";

const router = createBrowserRouter([
  {
    element: <Root />,
    path: "/",
    children: [
      {
        element: <App />,
        loader: () => (!isLoggedIn ? <Navigate to={"/login"} /> : null),
        children: [
          {
            path: "/welcome",
            element: <Accueil />,
          },
          {
            path: "/messagerie",
            element: <Messagerie />,
          },
          {
            path: "/colocation",
            element: <Colocation />,
            children : [
              {
                path: ":idService",
                element: <DetailsService />,
              },
            ]
          },
          {
            path: "/compte",
            element: <Compte />,
          },
          {
            path: "/service",
            element: <Service />,
          },
          
        ],
      },
      {
        element: <Auth />,
        loader: () => (isLoggedIn ? <Navigate to={"/welcome"} /> : null),
        children: [
          {
            path: "/login",
            element: <Authentification />,
          },
          {
            path: "/create-account",
            element: <CreationCompte />,
          },
        ],
      },
      {
        path: "",
        element: <Navigate to={"welcome"} />,
      },
    ],
  },
]);

function Root() {
  return (
    <UserProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </UserProvider>
  );
}

function App() {
  const { userToken } = useContext(AuthContext);
  return !userToken ? (
    <Navigate to={"/login"} />
  ) : (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function Auth() {
  const { userToken } = useContext(AuthContext);

  return userToken ? <Navigate to={"/welcome"} /> : <Outlet />;
}

function isLoggedIn() {
  return true;
}

document.addEventListener("DOMContentLoaded", function (event) {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
