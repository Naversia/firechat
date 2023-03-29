import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext ";
import { useContext, useEffect, useState } from "react";
import UserService from "./services/users.service";

function App() {
  const { currentUser } = useContext(AuthContext);
  const userService = new UserService();
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   userService.get().then((data) => {
  //     setUsers(data);
  //   });
  // }, []);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div>
      {/* {users.map((u) => (
        <p>{u.email}</p>
      ))} */}
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
