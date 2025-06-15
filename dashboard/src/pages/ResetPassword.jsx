import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  resetPassword,
  clearAllForgotResetPassErrors,
} from "@/store/slices/forgotResetPasswordSlice";
import { getUser } from "@/store/slices/userSlice";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleResetPassword = (password, confirmPassword) => {
    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    document.title = "Reset Password";
  }, []);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(getUser());
      // Optional: clear message from store here if needed
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotResetPassErrors());
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-balance text-muted-foreground">Set a new password</p>
          </div>

          {/* Form starts */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleResetPassword(password, confirmPassword);
            }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                className="resetPasswordbox"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                className="resetPasswordbox"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {!loading ? (
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            ) : (
              <SpecialLoadingButton content={"Resetting Your Password"} />
            )}
          </form>
          {/* Form ends */}
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
        <img
          className="w-80"
          src="https://cdn-icons-png.freepik.com/512/18841/18841806.png?ga=GA1.1.920210434.1747408412"
          alt="Reset"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
