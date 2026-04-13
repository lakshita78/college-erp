import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { addAdmin } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { ADD_ADMIN, SET_ERRORS } from "../../../redux/actionTypes";

// New UI Components
import FormField from "../../ui/Form/FormField";
import Input from "../../ui/Form/Input";
import Select from "../../ui/Form/Select";
import Button from "../../ui/Form/Button";
import FormHeader from "../../ui/Form/FormHeader";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    name: "",
    dob: "",
    email: "",
    department: "",
    contactNumber: "",
    avatar: "",
    joiningYear: Date().split(" ")[3],
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue((prev) => ({ ...prev, email: "" }));
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addAdmin(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.adminAdded) {
      setLoading(false);
      if (store.admin.adminAdded) {
        setValue({
          name: "",
          dob: "",
          email: "",
          department: "",
          contactNumber: "",
          avatar: "",
          joiningYear: Date().split(" ")[3],
          password: "",
          username: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_ADMIN, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.adminAdded, dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-4 sm:px-6">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-primary-600">
          <div className="p-2 bg-primary-500/10 rounded-xl">
            <EngineeringIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Add Admin</h1>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12">
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-8">
              <FormHeader title="Admin Information" />

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <FormField label="Full Name" required error={error.name}>
                  <Input
                    placeholder="Full Name"
                    required
                    value={value.name}
                    onChange={(e) => setValue({ ...value, name: e.target.value })}
                  />
                </FormField>

                <FormField label="Email Address" required error={error.email}>
                  <Input
                    required
                    placeholder="Email"
                    type="email"
                    value={value.email}
                    onChange={(e) => setValue({ ...value, email: e.target.value })}
                  />
                </FormField>

                <FormField label="Date of Birth" required error={error.dob}>
                  <Input
                    required
                    type="date"
                    value={value.dob}
                    onChange={(e) => setValue({ ...value, dob: e.target.value })}
                  />
                </FormField>

                <FormField label="Department" required error={error.department}>
                  <Select
                    required
                    placeholder="Select Department"
                    value={value.department}
                    onChange={(e) => setValue({ ...value, department: e.target.value })}
                    options={departments?.map(dp => ({ label: dp.department, value: dp.department }))}
                  />
                </FormField>

                <FormField label="Contact Number" required error={error.contactNumber}>
                  <Input
                    required
                    placeholder="Contact Number"
                    type="number"
                    value={value.contactNumber}
                    onChange={(e) => setValue({ ...value, contactNumber: e.target.value })}
                  />
                </FormField>

                <FormField label="Admin Avatar">
                  <div className="w-full px-5 py-2.5 bg-white/50 border border-dashed border-gray-300 rounded-2xl hover:bg-white transition-colors text-sm">
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => setValue({ ...value, avatar: base64 })}
                    />
                  </div>
                </FormField>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={() => {
                  setValue({
                    name: "", dob: "", email: "", department: "", contactNumber: "",
                    avatar: "", joiningYear: Date().split(" ")[3], password: "", username: "",
                  });
                  setError({});
                }}
              >
                Clear Form
              </Button>
              <Button
                type="submit"
                loading={loading}
              >
                Save Admin
              </Button>
            </div>

            <div className="flex justify-center mt-6">
              {(error.emailError || error.backendError) && (
                <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl font-medium border border-rose-100 animate-shake text-sm">
                  {error.emailError || error.backendError}
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



