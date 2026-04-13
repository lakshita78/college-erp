import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addDepartment } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { ADD_DEPARTMENT, SET_ERRORS } from "../../../redux/actionTypes";

// New UI Components
import FormField from "../../ui/Form/FormField";
import Input from "../../ui/Form/Input";
import Button from "../../ui/Form/Button";
import FormHeader from "../../ui/Form/FormHeader";

const Body = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const store = useSelector((state) => state);
  const [error, setError] = useState({});

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addDepartment({ department }));
  };

  useEffect(() => {
    if (store.errors || store.admin.departmentAdded) {
      setLoading(false);
      if (store.admin.departmentAdded) {
        setDepartment("");
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_DEPARTMENT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.departmentAdded, dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  return (
    <div className="animate-fade-in max-w-3xl mx-auto px-4 sm:px-6">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-primary-600">
          <div className="p-2 bg-primary-500/10 rounded-xl">
            <AddIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Add Department</h1>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12">
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-8">
              <FormHeader title="Department Details" />

              <div className="grid gap-6">
                <FormField label="Department Name" required error={error.departmentError}>
                  <Input
                    placeholder="e.g. Computer Science & Engineering"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </FormField>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={() => {
                  setDepartment("");
                  setError({});
                }}
              >
                Clear
              </Button>
              <Button
                type="submit"
                loading={loading}
              >
                Add Department
              </Button>
            </div>

            <div className="flex justify-center mt-6">
              {(error.departmentError || error.backendError) && !error.departmentError && (
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



