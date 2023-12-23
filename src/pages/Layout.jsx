// put in header - own component
// put in side panel - own component
// style in layout
import router from "../Routes";
import { RouterProvider } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <RouterProvider router={router} />
      <div className="top-bar"></div>
    </div>
  );
}
