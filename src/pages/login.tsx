import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currentSession, handleUserSignIn } from "@/service/amplify";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  /***
   *  This use effect fetch current session in initial render.
   *  If userSession is not undefined, it redirect user to 'Homepage"
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await currentSession();
        if (!!data?.tokens?.accessToken.payload.sub) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  /**
   * while logging in if user is not verified
   * - it will redirect user to "verifyUser" page
   * - else to home page
   */
  const handleOnSubmit = async () => {
    try {
      const data = await handleUserSignIn({
        username: formData.username,
        password: formData.password,
      });
      if (data?.isSignedIn) {
        navigate("/");
        toast.success("Logged in successfully");
      }
      if (data?.nextStep.signInStep === "CONFIRM_SIGN_UP") {
        navigate("/verify-user", {
          state: { username: formData.username, password: formData.password },
        });
      }
    } catch (err) {
      if (err instanceof Error) toast.error("Invalid username or password");
    }
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleOnSubmit}>
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
