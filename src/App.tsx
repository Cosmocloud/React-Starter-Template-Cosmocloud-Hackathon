import { useEffect } from "react";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import VerifyUser from "@/pages/verify-user";
import ProtectedRoutes from "@/pages/protected";
import { Route, Routes } from "react-router";
import { initiateAmplify } from "@/service/amplify";

export default function App() {
  useEffect(() => {
    initiateAmplify();
  }, []);
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-user" element={<VerifyUser />} />
      <Route path="*" element={<ProtectedRoutes />} />
    </Routes>
  );
}
