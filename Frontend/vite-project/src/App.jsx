import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {

  const token = localStorage.getItem("token");

  return token ? <Home /> : <Login />;
}