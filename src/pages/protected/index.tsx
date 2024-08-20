import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { signOut } from "aws-amplify/auth";
import { currentSession } from "@/service/amplify";
import { Route, Routes, useNavigate } from "react-router";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await currentSession();
        if (!data?.tokens?.accessToken.payload.sub) {
          navigate("/login");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  async function handleSignOut() {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error while signing out");
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1>You are in the homepage</h1>
            <Button onClick={() => handleSignOut()}>Sign out</Button>
          </div>
        }
      />
    </Routes>
  );
}
