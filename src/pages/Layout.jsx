import router from "../Routes";
import { RouterProvider } from "react-router-dom";
import Logo from "./images/logo-small.png";

export default function Layout() {
  return (
    <div>
      <RouterProvider router={router} />
      <div className="top-bar">
        <img src={Logo}></img>
      </div>
    </div>
  );
}
