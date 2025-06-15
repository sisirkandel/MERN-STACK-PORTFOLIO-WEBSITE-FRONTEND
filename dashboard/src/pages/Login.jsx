import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAllUserErrors, login } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isAuthenticated, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // prevents default form submission behavior
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    document.title = "Admin Login";
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-8">
          <div className="grid gap-8 text-center">
            <h1 className="text-5xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and password to login
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-6">
            <div className="grid gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center justify-between m-2">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/password/forgot"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            {loading ? (
              <SpecialLoadingButton content={"Logging In"} />
            ) : (
              <Button
                type="submit"
                className="w-full cursor-pointer"
              >
                Login
              </Button>
            )}
          </form>
        </div>
      </div>
      <div className="hidden lg:flex justify-center items-center bg-muted">
        <img
          className="w-70 h-70"
          src="https://cdn-icons-png.flaticon.com/512/1804/1804408.png"
          alt="login"
        />
      </div>
    </div>
  );
};

export default Login;
