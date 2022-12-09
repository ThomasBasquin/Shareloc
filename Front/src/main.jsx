import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Authentification from "../route/Authentification";
import Colocation from "../route/Colocation";
import Compte from "../route/Compte";
import Service from "../route/Service";
import Accueil from "../route/Accueil";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Authentification />,
  },
  {
    path: "/welcome",
    element: <Accueil />,
  },
  {
    path: "/colocation",
    element: <Colocation />,
  },
  {
    path: "/compte",
    element: <Compte />,
  },
  {
    path: "/service",
    element: <Service />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },

]);

function Name() {
  let { name } = useParams();
  if (name === "pierre") {
    throw { message: "Je ne vous permets pas!" };
  }
  return <span> dear {name}</span>;
}

document.addEventListener("DOMContentLoaded", function (event) {
  //@ts-ignore
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
