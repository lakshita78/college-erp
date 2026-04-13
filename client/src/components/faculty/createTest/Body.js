import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createTest } from "../../../redux/actions/facultyActions";
import Spinner from "../../../utils/Spinner";
import { ADD_TEST, SET_ERRORS } from "../../../redux/actionTypes";

// New UI Components
import FormField from "../../ui/Form/FormField";
import Input from "../../ui/Form/Input";
import Select from "../../ui/Form/Select";
import Button from "../../ui/Form/Button";
import FormHeader from "../../ui/Form/FormHeader";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    subjectCode: "",
    section: "",
    year: "",
    test: "",
    totalMarks: "",
    date: "",
    department: user.result.department,
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue((prev) => ({
        ...prev,
        subjectCode: "",
        section: "",
        year: "",
        test: "",
        totalMarks: "",
        date: "",
      }));
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(createTest(value));
  };

  useEffect(() => {
    if (store.errors || store.faculty.testAdded) {
      setLoading(false);
      if (store.faculty.testAdded) {
        setValue({
          subjectCode: "",
          section: "",
          year: "",
          test: "",
          totalMarks: "",
          date: "",
          department: user.result.department,
        });

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_TEST, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.faculty.testAdded, dispatch, user.result.department]);

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
          <h1 className="text-2xl font-bold text-gray-900">Create Test</h1>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12">
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-8">
              <FormHeader title="Test Configuration" />

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-6">
                  <FormField label="Test Name" required error={error.test}>
                    <Input
                      required
                      placeholder="e.g. Mid-term Examination"
                      value={value.test}
                      onChange={(e) => setValue({ ...value, test: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Subject Code" required error={error.subjectCode}>
                    <Input
                      required
                      placeholder="e.g. CS-101"
                      value={value.subjectCode}
                      onChange={(e) => setValue({ ...value, subjectCode: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Department">
                    <Input
                      value={user.result.department}
                      disabled
                      className="bg-gray-50 dark:bg-dark-800/50 cursor-not-allowed opacity-70"
                    />
                  </FormField>

                  <FormField label="Year" required error={error.year}>
                    <Select
                      required
                      placeholder="Select Academic Year"
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
                </div>

                <div className="space-y-6">
                  <FormField label="Total Marks" required error={error.totalMarks}>
                    <Input
                      required
                      type="number"
                      placeholder="e.g. 100"
                      value={value.totalMarks}
                      onChange={(e) => setValue({ ...value, totalMarks: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Date of Test" required error={error.date}>
                    <Input
                      required
                      type="date"
                      value={value.date}
                      onChange={(e) => setValue({ ...value, date: e.target.value })}
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
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={() => {
                  setValue({
                    subjectCode: "",
                    section: "",
                    year: "",
                    test: "",
                    totalMarks: "",
                    date: "",
                    department: user.result.department,
                  });
                  setError({});
                }}
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                loading={loading}
              >
                Create Test
              </Button>
            </div>

            <div className="flex justify-center mt-6">
              {(error.testError || error.backendError) && (
                <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl font-medium border border-rose-100 animate-shake text-sm">
                  {error.testError || error.backendError}
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



