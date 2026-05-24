import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminRoute from "./components/AdminRoute";

export default function App() {

  const token = localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        {!token ? (

          <Route path="*" element={<Login />} />

        ) : (

          <>
            <Route path="/" element={<Home />} />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
          </>

        )}

      </Routes>

    </BrowserRouter>

  );
}