import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllUserErrors,
  resetProfile,
  updatePassword,
} from "@/store/slices/userSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";

const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [validationError, setValidationError] = useState(null);

  const { loading, error, message, isUpdated } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setValidationError("Please fill all fields.");
      // Clear Redux error so they don't overlap
      dispatch(clearAllUserErrors());
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setValidationError("Passwords do not match.");
      dispatch(clearAllUserErrors());
      return;
    }
    setValidationError(null);
    dispatch(updatePassword({ currentPassword, newPassword, confirmNewPassword }));
  };

  // Show validation error toast only once per validationError change
  useEffect(() => {
    if (validationError) {
      toast.error(validationError);
      // Clear redux error to avoid double toast
      dispatch(clearAllUserErrors());
    }
  }, [validationError, dispatch]);

  // Show redux error toast only if no validation error is active
  useEffect(() => {
    if (error && !validationError) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
  }, [error, validationError, dispatch]);

  useEffect(() => {
    if (isUpdated) {
      toast.success(message || "Password updated successfully");
      dispatch(resetProfile());
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  }, [isUpdated, message, dispatch]);

  return (
    <div className="w-full h-full">
      <div>
        <div className="grid w-full gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Update Password</h1>
            <p className="text-balance text-muted-foreground">
              Update Your Password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <Input
                id="confirmNewPassword"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            {!loading ? (
              <Button onClick={handleUpdatePassword} className="w-full">
                Update Password
              </Button>
            ) : (
              <SpecialLoadingButton content={"Updating Password"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
