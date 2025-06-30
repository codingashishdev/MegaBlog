import { React, useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((e) => console.log("user not logged in"))
      .finally(() => setLoading(false));
  }, []);

  // return (<><Landing/></>)
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full block">
        <Header />
        <main className="py-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
