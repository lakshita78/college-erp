import React, { useEffect, useState } from "react";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { updateFaculty } from "../../../../redux/actions/facultyActions";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../utils/Spinner";
import { SET_ERRORS } from "../../../../redux/actionTypes";

// New UI Components
import FormField from "../../../ui/Form/FormField";
import Input from "../../../ui/Form/Input";
import Select from "../../../ui/Form/Select";
import Button from "../../../ui/Form/Button";
import FormHeader from "../../../ui/Form/FormHeader";

const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    name: "",
    dob: "",
    email: user.result.email,
    department: "",
    contactNumber: "",
    avatar: "",
    designation: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    if (
      value.name === "" &&
      value.dob === "" &&
      value.department === "" &&
      value.contactNumber === "" &&
      value.avatar === "" &&
      value.designation === ""
    ) {
      alert("Enter atleast one value");
      setLoading(false);
    } else {
      dispatch(updateFaculty(value));
      alert("Kindly login again to see updates");
    }
  };

  useEffect(() => {
    if (store.errors || store.faculty.updatedFaculty) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [store.errors, store.faculty.updatedFaculty]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-4 sm:px-6">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-primary-600">
            <div className="p-2 bg-primary-500/10 rounded-xl">
              <SecurityUpdateIcon className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Update Profile</h1>
          </div>

          <Button
            variant="ghost"
            onClick={() => navigate("/faculty/update/password")}
            className="flex items-center gap-2"
          >
            <VisibilityOffIcon className="w-4 h-4" />
            <span>Update Password</span>
          </Button>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12">
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-8">
              <FormHeader title="Personal & Professional Details" />

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-6">
                  <FormField label="Full Name" error={error.name}>
                    <Input
                      placeholder={user.result?.name || "Enter your name"}
                      value={value.name}
                      onChange={(e) => setValue({ ...value, name: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Date of Birth" error={error.dob}>
                    <Input
                      placeholder={user.result?.dob || "DD/MM/YYYY"}
                      value={value.dob}
                      onChange={(e) => setValue({ ...value, dob: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Email Address">
                    <Input
                      placeholder={user.result?.email}
                      value={user.result?.email}
                      disabled
                      className="bg-gray-50 dark:bg-dark-800/50 cursor-not-allowed opacity-70"
                    />
                  </FormField>

                  <FormField label="Designation" error={error.designation}>
                    <Input
                      placeholder={user.result?.designation || "e.g. Associate Professor"}
                      value={value.designation}
                      onChange={(e) => setValue({ ...value, designation: e.target.value })}
                    />
                  </FormField>
                </div>

                <div className="space-y-6">
                  <FormField label="Department" error={error.department}>
                    <Select
                      placeholder="Select Department"
                      value={value.department}
                      onChange={(e) => setValue({ ...value, department: e.target.value })}
                      options={departments?.map(dp => ({ label: dp.department, value: dp.department }))}
                    />
                  </FormField>

                  <FormField label="Contact Number" error={error.contactNumber}>
                    <Input
                      placeholder={user.result?.contactNumber || "Enter contact number"}
                      value={value.contactNumber}
                      onChange={(e) => setValue({ ...value, contactNumber: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Profile Picture" error={error.avatar}>
                    <div className="relative group p-4 border-2 border-dashed border-gray-200 rounded-2xl hover:border-primary-500 transition-colors">
                      <div className="flex flex-col items-center gap-2">
                        <FileBase
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) => setValue({ ...value, avatar: base64 })}
                        />
                        {value.avatar && (
                          <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border-2 border-primary-500/20 shadow-sm">
                            <img src={value.avatar} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <p className="text-xs text-gray-400">Click to upload image</p>
                      </div>
                    </div>
                  </FormField>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={() => navigate("/faculty/profile")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
              >
                Save Changes
              </Button>
            </div>

            <div className="flex justify-center mt-6">
              {error.backendError && (
                <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl font-medium border border-rose-100 animate-shake text-sm">
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



