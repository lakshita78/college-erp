import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../../../../utils/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminUpdatePassword } from "../../../../../redux/actions/adminActions";

// New UI Components
import FormField from "../../../../ui/Form/FormField";
import Input from "../../../../ui/Form/Input";
import Button from "../../../../ui/Form/Button";
import FormHeader from "../../../../ui/Form/FormHeader";

const Body = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const update = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(
      adminUpdatePassword(
        {
          newPassword: newPassword,
          confirmPassword: confirmPassword,
          email: user.result.email,
        },
        navigate
      )
    );
  };

  useEffect(() => {
    if (store.errors) {
      setLoading(false);
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [store.errors]);

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 sm:px-6">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-primary-600">
          <div className="p-2 bg-primary-500/10 rounded-xl">
            <VisibilityOffIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Security</h1>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12">
          <form className="space-y-10" onSubmit={update}>
            <div className="space-y-6">
              <FormHeader title="Update Password" />

              <div className="space-y-6">
                <FormField 
                  label="New Password" 
                  required 
                  error={error.newPassword}
                >
                  <div className="relative group">
                    <Input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      {showPassword ? <VisibilityIcon className="w-5 h-5" /> : <VisibilityOffIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </FormField>

                <FormField 
                  label="Confirm Password" 
                  required 
                  error={error.confirmPassword || error.mismatchError}
                >
                  <div className="relative group">
                    <Input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      {showPassword ? <VisibilityIcon className="w-5 h-5" /> : <VisibilityOffIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </FormField>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/profile")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
              >
                Update Password
              </Button>
            </div>

            <div className="flex justify-center mt-6">
              {error.backendError && (
                <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl font-medium border border-rose-100 animate-shake text-sm w-full text-center">
                  {error.backendError}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;



