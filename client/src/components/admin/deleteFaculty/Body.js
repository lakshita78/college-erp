import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteFaculty, getFaculty } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { DELETE_FACULTY, SET_ERRORS } from "../../../redux/actionTypes";

// New UI Components
import FormField from "../../ui/Form/FormField";
import Select from "../../ui/Form/Select";
import Button from "../../ui/Form/Button";
import FormHeader from "../../ui/Form/FormHeader";

const Body = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.admin.allDepartment);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [checkedValue, setCheckedValue] = useState([]);

  const [value, setValue] = useState({
    department: "",
  });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleInputChange = (e) => {
    const tempCheck = [...checkedValue];
    if (e.target.checked) {
      tempCheck.push(e.target.value);
    } else {
      const index = tempCheck.indexOf(e.target.value);
      if (index > -1) tempCheck.splice(index, 1);
    }
    setCheckedValue(tempCheck);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getFaculty(value));
  };
  const faculties = useSelector((state) => state.admin.faculties.result);

  const dltFaculty = (e) => {
    setError({});
    setLoading(true);
    dispatch(deleteFaculty(checkedValue));
  };

  useEffect(() => {
    if (store.admin.facultyDeleted) {
      setLoading(false);
      setValue({ department: "" });
      setCheckedValue([]);
      setSearch(false);
      dispatch({ type: DELETE_FACULTY, payload: false });
    }
  }, [store.admin.facultyDeleted, dispatch]);

  useEffect(() => {
    if (faculties?.length !== 0) setLoading(false);
  }, [faculties]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-4 sm:px-6">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-rose-600">
          <div className="p-2 bg-rose-500/10 rounded-xl">
            <DeleteIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Delete Faculty</h1>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Search Section */}
            <div className="space-y-8">
              <FormHeader title="Filter Faculty" />
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField label="Department" required error={error.department}>
                  <Select
                    required
                    placeholder="Select Department"
                    value={value.department}
                    onChange={(e) => setValue({ ...value, department: e.target.value })}
                    options={departments?.map(dp => ({ label: dp.department, value: dp.department }))}
                  />
                </FormField>
                <Button type="submit" loading={loading && !search} className="w-full">
                  Search Faculty
                </Button>
              </form>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-8">
              <FormHeader title="Faculty List" />
              
              <div className="min-h-[300px] flex flex-col justify-center">
                {loading && (
                  <div className="flex justify-center">
                    <Spinner message="Fetching Faculty..." height={50} width={150} color="#111111" messageColor="blue" />
                  </div>
                )}

                {(error.noFacultyError || error.backendError) && (
                  <div className="text-center p-8 bg-rose-50 rounded-3xl border border-rose-100">
                    <p className="text-rose-500 font-bold text-lg">
                      {error.noFacultyError || error.backendError}
                    </p>
                  </div>
                )}

                {!loading && search && faculties?.length === 0 && !error.noFacultyError && (
                  <div className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-gray-500 font-medium">No faculty members found in this department.</p>
                  </div>
                )}

                {search && !loading && faculties?.length > 0 && (
                  <div className="space-y-6">
                    <div className="overflow-hidden bg-white/50 rounded-3xl border border-gray-100 shadow-sm">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                          <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Select</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Username</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Email</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {faculties.map((adm, idx) => (
                            <tr key={idx} className="hover:bg-white/80 transition-colors">
                              <td className="px-6 py-4 text-center">
                                <input
                                  type="checkbox"
                                  value={adm._id}
                                  onChange={handleInputChange}
                                  checked={checkedValue.includes(adm._id)}
                                  className="w-5 h-5 rounded-lg border-gray-300 text-rose-600 focus:ring-rose-500 transition-all cursor-pointer"
                                />
                              </td>
                              <td className="px-6 py-4 text-sm font-semibold text-gray-900">{adm.name}</td>
                              <td className="px-6 py-4 text-sm text-gray-600 font-mono">{adm.username}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{adm.email}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button
                        variant="danger"
                        onClick={dltFaculty}
                        loading={loading}
                        disabled={checkedValue.length === 0}
                      >
                        Delete Selected ({checkedValue.length})
                      </Button>
                    </div>
                  </div>
                )}

                {!search && !loading && (
                  <div className="text-center p-12 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200">
                    <div className="p-4 bg-white rounded-2xl w-fit mx-auto shadow-sm mb-4">
                      <DeleteIcon className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-400 font-medium">Select a department to view faculty members</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;



