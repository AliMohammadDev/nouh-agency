import "../i18n";
import { RouterProvider } from "react-router";
import { router } from "../utils/router";

export default function App() {
  return <RouterProvider router={router} />;
}
