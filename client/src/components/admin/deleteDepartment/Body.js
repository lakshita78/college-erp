import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDepartment,
  getAllDepartment,
} from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { DELETE_DEPARTMENT, SET_ERRORS } from "../../../redux/actionTypes";

// New UI Components
import FormField from "../../ui/Form/FormField";
import Select from "../../ui/Form/Select";
import Button from "../../ui/Form/Button";
import FormHeader from "../../ui/Form/FormHeader";

const Body = () => {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const departments = useSelector((state) => state.admin.allDepartment);

  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    dispatch(deleteDepartment({ department }));
  };

  useEffect(() => {
    if (store.admin.departmentDeleted) {
      setLoading(false);
      setDepartment("");
      dispatch(getAllDepartment());
      dispatch({ type: DELETE_DEPARTMENT, payload: false });
    }
  }, [store.admin.departmentDeleted, dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  return (
    <div className="animate-fade-in max-w-3xl mx-auto px-4 sm:px-6">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-rose-600">
          <div className="p-2 bg-rose-500/10 rounded-xl">
            <DeleteIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Delete Department</h1>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12">
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-8">
              <FormHeader title="Select Department" />

              <div className="grid gap-6">
                <FormField label="Department Name" required error={error.departmentError}>
                  <Select
                    required
                    placeholder="Choose department to delete"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
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
                  setDepartment("");
                  setError({});
                }}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="danger"
                loading={loading}
              >
                Delete Department
              </Button>
            </div>

            <div className="flex justify-center mt-6">
              {(error.noFacultyError || error.backendError) && (
                <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl font-medium border border-rose-100 animate-shake text-sm">
                  {error.noFacultyError || error.backendError}
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



