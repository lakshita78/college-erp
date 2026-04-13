import React, { useEffect, useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { addStudent } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { ADD_STUDENT, SET_ERRORS } from "../../../redux/actionTypes";

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
  const errorRef = useRef();

  const [value, setValue] = useState({
    name: "",
    dob: "",
    email: "",
    department: "",
    contactNumber: "",
    avatar: "",
    batch: "",
    gender: "",
    year: "",
    fatherName: "",
    motherName: "",
    section: "",
    fatherContactNumber: "",
    motherContactNumber: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      if (errorRef.current) {
        errorRef.current.scrollIntoView({ behavior: "smooth" });
      }
      setValue((prev) => ({ ...prev, email: "" }));
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(value));
    setError({});
    setLoading(true);
  };

  useEffect(() => {
    if (store.errors || store.admin.studentAdded) {
      setLoading(false);
      if (store.admin.studentAdded) {
        setValue({
          name: "",
          dob: "",
          email: "",
          department: "",
          contactNumber: "",
          avatar: "",
          batch: "",
          gender: "",
          year: "",
          fatherName: "",
          motherName: "",
          section: "",
          fatherContactNumber: "",
          motherContactNumber: "",
        });

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_STUDENT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.studentAdded, dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-4 sm:px-6">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-primary-600">
          <div className="p-2 bg-primary-500/10 rounded-xl">
            <AddIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Add Student</h1>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12">
          <form className="space-y-12" onSubmit={handleSubmit}>
            {/* Section: Student Information */}
            <div className="space-y-8">
              <FormHeader title="Student Information" />

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <FormField label="Full Name" required error={error.name}>
                  <Input
                    placeholder="e.g. John Doe"
                    required
                    value={value.name}
                    onChange={(e) => setValue({ ...value, name: e.target.value })}
                  />
                </FormField>

                <FormField label="Email Address" required error={error.email}>
                  <Input
                    required
                    placeholder="example@gmail.com"
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

                <FormField label="Gender" required error={error.gender}>
                  <Select
                    required
                    placeholder="Select Gender"
                    value={value.gender}
                    onChange={(e) => setValue({ ...value, gender: e.target.value })}
                    options={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                      { label: "Other", value: "Other" }
                    ]}
                  />
                </FormField>

                <FormField label="Contact Number" required error={error.contactNumber}>
                  <Input
                    required
                    placeholder="+91 XXXXXXXXXX"
                    type="number"
                    value={value.contactNumber}
                    onChange={(e) => setValue({ ...value, contactNumber: e.target.value })}
                  />
                </FormField>

                <FormField label="Student Avatar">
                  <div className="w-full px-5 py-2.5 bg-white/50 border border-dashed border-gray-300 rounded-2xl hover:bg-white transition-colors">
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => setValue({ ...value, avatar: base64 })}
                    />
                  </div>
                </FormField>
              </div>
            </div>

            {/* Section: Academic Details */}
            <div className="space-y-8">
              <FormHeader title="Academic Details" />

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <FormField label="Department" required error={error.department}>
                  <Select
                    required
                    placeholder="Select Department"
                    value={value.department}
                    onChange={(e) => setValue({ ...value, department: e.target.value })}
                    options={departments?.map(dp => ({ label: dp.department, value: dp.department }))}
                  />
                </FormField>

                <FormField label="Batch Year" required error={error.batch}>
                  <Input
                    required
                    placeholder="e.g. 2022-2026"
                    value={value.batch}
                    onChange={(e) => setValue({ ...value, batch: e.target.value })}
                  />
                </FormField>

                <FormField label="Academic Year" required error={error.year}>
                  <Select
                    required
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

                <FormField label="Section" required error={error.section}>
                  <Select
                    required
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

            {/* Section: Parent Information */}
            <div className="space-y-8">
              <FormHeader title="Parent Information" />

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <FormField label="Father's Name" required error={error.fatherName}>
                  <Input
                    required
                    placeholder="Full Name"
                    value={value.fatherName}
                    onChange={(e) => setValue({ ...value, fatherName: e.target.value })}
                  />
                </FormField>

                <FormField label="Father's Contact" required error={error.fatherContactNumber}>
                  <Input
                    required
                    placeholder="Contact Number"
                    type="number"
                    value={value.fatherContactNumber}
                    onChange={(e) => setValue({ ...value, fatherContactNumber: e.target.value })}
                  />
                </FormField>

                <FormField label="Mother's Name" required error={error.motherName}>
                  <Input
                    required
                    placeholder="Full Name"
                    value={value.motherName}
                    onChange={(e) => setValue({ ...value, motherName: e.target.value })}
                  />
                </FormField>

                <FormField label="Mother's Contact" required error={error.motherContactNumber}>
                  <Input
                    required
                    placeholder="Contact Number"
                    type="number"
                    value={value.motherContactNumber}
                    onChange={(e) => setValue({ ...value, motherContactNumber: e.target.value })}
                  />
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
                    avatar: "", batch: "", gender: "", year: "", fatherName: "",
                    motherName: "", section: "", fatherContactNumber: "", motherContactNumber: "",
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
                Save Student
              </Button>
            </div>

            <div ref={errorRef} className="flex justify-center mt-6">
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



