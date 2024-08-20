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
import {
  handleSendConfirmationCode,
  handleSignUpConfirmation,
  handleUserSignIn,
} from "@/service/amplify";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

export default function VerifyUser() {
  const location = useLocation();
  const loginData: { username: string; password: string } = location.state;
  const [isCodeSent, setIsCodeSent] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    otp: "",
    username: "",
  });

  /**
   * handleCodeVerify :
   *  - if code verification is complete.it will login user to homepage
   *  - if login is not successful it will redirect user to login screen
   */

  const handleCodeVerify = async () => {
    try {
      const data = await handleSignUpConfirmation({
        username: loginData.username,
        confirmationCode: formData.otp,
      });
      if (data?.isSignUpComplete) {
        const signinData = await handleUserSignIn({
          username: loginData.username,
          password: loginData.password,
        });
        if (signinData?.isSignedIn) {
          navigate("/");
        } else navigate("/login");
      }
    } catch (err) {
      if (err instanceof Error)
        toast.error("Invalid OTP, Please enter correct OTP");
    }
  };

  /**
   * handleResendCode :
   *  - it will resend the confirmation code to user's email after 10 seconds
   */
  const handleResendCode = () => {
    handleSendConfirmationCode(loginData.username);
    setIsCodeSent(true);
    setTimeout(() => {
      setIsCodeSent(false);
    }, 10 * 1000);
  };

  /**
   * if login data is not available from navigate-state after login or signup, it will then redirect user to signup screen
   */
  useEffect(() => {
    if (!loginData) {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Confirm your Email</CardTitle>
          <CardDescription>
            Enter OTP received on your email to verify your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="otp">One time password (OTP) </Label>
                {isCodeSent && (
                  <span className="text-sm text-gray-500 ml-auto">
                    Code sent
                  </span>
                )}
                {!isCodeSent && (
                  <Button
                    variant="link"
                    className="ml-auto text-gray-500 text-sm"
                    onClick={handleResendCode}
                  >
                    Resend OTP
                  </Button>
                )}
              </div>
              <Input
                name="otp"
                placeholder="Enter your One Time Password"
                type="password"
                required
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleCodeVerify}>
              Verify user
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
