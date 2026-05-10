import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {

  const token = localStorage.getItem("token");

 return (
  <>
    {token ? <Home /> : <Login />}

    <ToastContainer />
  </>
);
}