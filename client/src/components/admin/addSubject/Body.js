import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addSubject } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { ADD_SUBJECT, SET_ERRORS } from "../../../redux/actionTypes";

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
    subjectName: "",
    subjectCode: "",
    year: "",
    totalLectures: "",
    department: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue((prev) => ({
        ...prev,
        subjectName: "",
        subjectCode: "",
        year: "",
        totalLectures: "",
        department: "",
      }));
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addSubject(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.subjectAdded) {
      setLoading(false);
      if (store.admin.subjectAdded) {
        setValue({
          subjectName: "",
          subjectCode: "",
          year: "",
          totalLectures: "",
          department: "",
        });

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_SUBJECT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.subjectAdded, dispatch]);

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
          <h1 className="text-2xl font-bold text-gray-900">Add Subject</h1>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12">
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-8">
              <FormHeader title="Subject Details" />

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <FormField label="Subject Name" required error={error.subjectName}>
                  <Input
                    placeholder="e.g. Data Structures"
                    required
                    value={value.subjectName}
                    onChange={(e) => setValue({ ...value, subjectName: e.target.value })}
                  />
                </FormField>

                <FormField label="Subject Code" required error={error.subjectCode}>
                  <Input
                    required
                    placeholder="e.g. CS101"
                    value={value.subjectCode}
                    onChange={(e) => setValue({ ...value, subjectCode: e.target.value })}
                  />
                </FormField>

                <FormField label="Year" required error={error.year}>
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

                <FormField label="Total Lectures" required error={error.totalLectures}>
                  <Input
                    required
                    placeholder="Total Lectures"
                    type="number"
                    value={value.totalLectures}
                    onChange={(e) => setValue({ ...value, totalLectures: e.target.value })}
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
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={() => {
                  setValue({
                    subjectName: "", subjectCode: "", year: "", totalLectures: "", department: "",
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
                Save Subject
              </Button>
            </div>

            <div className="flex justify-center mt-6">
              {(error.subjectError || error.backendError) && (
                <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl font-medium border border-rose-100 animate-shake text-sm">
                  {error.subjectError || error.backendError}
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



