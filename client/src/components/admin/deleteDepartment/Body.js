import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDepartment,
  getAllDepartment,
} from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import { DELETE_DEPARTMENT, SET_ERRORS } from "../../../redux/actionTypes";
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
  const faculties = useSelector((state) => state.admin.faculties.result);

  useEffect(() => {
    if (store.admin.departmentDeleted) {
      setLoading(false);
      setDepartment("");
      dispatch(getAllDepartment());
      dispatch({ type: DELETE_DEPARTMENT, payload: false });
    }
  }, [store.admin.departmentDeleted]);
  useEffect(() => {
    if (faculties?.length !== 0) {
      setLoading(false);
    }
  }, [faculties]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <EngineeringIcon />
          <h1>All Faculty</h1>
        </div>
        <div className=" bg-white/70 backdrop-blur-md flex flex-col lg:flex-row rounded-3xl shadow-infix p-10 gap-10">
          <form
            className="flex flex-col space-y-4 lg:w-80 flex-shrink-0"
            onSubmit={handleSubmit}>
            <label htmlFor="department">Department</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              {departments?.map((dp, idx) => (
                <MenuItem key={idx} value={dp.department}>
                  {dp.department}
                </MenuItem>
              ))}
            </Select>
            <button
              className={`${classes.adminFormSubmitButton} w-56`}
              type="submit">
              Delete
            </button>
          </form>
          <div className="flex-1 overflow-x-hidden">
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Deleting"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.noFacultyError || error.backendError) && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noFacultyError || error.backendError}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;



