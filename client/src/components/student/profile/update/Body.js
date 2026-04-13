import React, { useEffect, useState } from "react";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "../../../../redux/actions/studentActions";
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
    batch: "",
    year: "",
    motherName: "",
    fatherName: "",
    fatherContactNumber: "",
    section: "",
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
      value.batch === "" &&
      value.year === "" &&
      value.motherName === "" &&
      value.fatherName === "" &&
      value.fatherContactNumber === "" &&
      value.section === ""
    ) {
      alert("Enter atleast one value");
      setLoading(false);
    } else {
      dispatch(updateStudent(value));
      alert("Kindly login again to see updates");
    }
  };

  useEffect(() => {
    if (store.errors || store.student.updatedStudent) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [store.errors, store.student.updatedStudent]);

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
            onClick={() => navigate("/student/update/password")}
            className="flex items-center gap-2"
          >
            <VisibilityOffIcon className="w-4 h-4" />
            <span>Update Password</span>
          </Button>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12">
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-12">
              {/* Personal Details Section */}
              <div className="space-y-8">
                <FormHeader title="Personal Details" />
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
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
                      className="bg-gray-50 cursor-not-allowed opacity-70"
                    />
                  </FormField>

                  <FormField label="Contact Number" error={error.contactNumber}>
                    <Input
                      placeholder={user.result?.contactNumber || "Enter contact number"}
                      value={value.contactNumber}
                      onChange={(e) => setValue({ ...value, contactNumber: e.target.value })}
                    />
                  </FormField>
                </div>
              </div>

              {/* Academic Details Section */}
              <div className="space-y-8">
                <FormHeader title="Academic Details" />
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                  <FormField label="Department" error={error.department}>
                    <Select
                      placeholder="Select Department"
                      value={value.department}
                      onChange={(e) => setValue({ ...value, department: e.target.value })}
                      options={departments?.map(dp => ({ label: dp.department, value: dp.department }))}
                    />
                  </FormField>

                  <FormField label="Batch" error={error.batch}>
                    <Input
                      placeholder={user.result?.batch || "e.g. 2020-2024"}
                      value={value.batch}
                      onChange={(e) => setValue({ ...value, batch: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Year" error={error.year}>
                    <Select
                      placeholder="Select Year"
                      value={value.year}
                      onChange={(e) => setValue({ ...value, year: e.target.value })}
                      options={[
                        { label: "1st Year", value: "1" },
                        { label: "2nd Year", value: "2" },
                        { label: "3rd Year", value: "3" },
                        { label: "4th Year", value: "4" }
                      ]}
                    />
                  </FormField>

                  <FormField label="Section" error={error.section}>
                    <Select
                      placeholder="Select Section"
                      value={value.section}
                      onChange={(e) => setValue({ ...value, section: e.target.value })}
                      options={[
                        { label: "Section 1", value: "1" },
                        { label: "Section 2", value: "2" },
                        { label: "Section 3", value: "3" }
                      ]}
                    />
                  </FormField>
                </div>
              </div>

              {/* Family Details Section */}
              <div className="space-y-8">
                <FormHeader title="Family Details" />
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                  <FormField label="Father's Name" error={error.fatherName}>
                    <Input
                      placeholder={user.result?.fatherName || "Enter father's name"}
                      value={value.fatherName}
                      onChange={(e) => setValue({ ...value, fatherName: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Mother's Name" error={error.motherName}>
                    <Input
                      placeholder={user.result?.motherName || "Enter mother's name"}
                      value={value.motherName}
                      onChange={(e) => setValue({ ...value, motherName: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Father's Contact Number" error={error.fatherContactNumber}>
                    <Input
                      placeholder={user.result?.fatherContactNumber || "Enter father's contact number"}
                      value={value.fatherContactNumber}
                      onChange={(e) => setValue({ ...value, fatherContactNumber: e.target.value })}
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
                onClick={() => navigate("/student/profile")}
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



