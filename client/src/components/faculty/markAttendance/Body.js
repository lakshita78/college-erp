import React, { useEffect, useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudent,
  markAttendance,
} from "../../../redux/actions/facultyActions";
import Spinner from "../../../utils/Spinner";
import { ATTENDANCE_MARKED, SET_ERRORS } from "../../../redux/actionTypes";
import { getSubject } from "../../../redux/actions/adminActions";

// New UI Components
import FormField from "../../ui/Form/FormField";
import Select from "../../ui/Form/Select";
import Button from "../../ui/Form/Button";
import FormHeader from "../../ui/Form/FormHeader";

const Body = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.admin.allDepartment);
  const subjects = useSelector((state) => state.admin.subjects.result);

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [subjectName, setSubjectName] = useState("");
  const [checkedValue, setCheckedValue] = useState([]);

  const [value, setValue] = useState({
    department: "",
    year: "",
    section: "",
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
    dispatch(getStudent(value));
    dispatch(getSubject({ department: value.department, year: value.year }));
  };
  const students = useSelector((state) => state.admin.students.result);

  const uploadAttendance = (e) => {
    setError({});
    setLoading(true);
    dispatch(
      markAttendance(
        checkedValue,
        subjectName,
        value.department,
        value.year,
        value.section
      )
    );
  };

  useEffect(() => {
    if (store.errors || store.faculty.attendanceUploaded) {
      setLoading(false);
      if (store.faculty.attendanceUploaded) {
        setValue({ department: "", year: "", section: "" });
        setSearch(false);
        setSubjectName("");
        setCheckedValue([]);
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ATTENDANCE_MARKED, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.faculty.attendanceUploaded, dispatch]);

  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [students]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-4 sm:px-6">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-primary-600">
          <div className="p-2 bg-primary-500/10 rounded-xl">
            <BoyIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Mark Attendance</h1>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Filter Section */}
            <div className="space-y-8">
              <FormHeader title="Filter Students" />
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

                <Button type="submit" loading={loading && !search} className="w-full">
                  Search Students
                </Button>
              </form>
            </div>

            {/* Attendance Section */}
            <div className="lg:col-span-2 space-y-8">
              <FormHeader title="Student List" />
              
              <div className="min-h-[300px] flex flex-col justify-center">
                {loading && !search && (
                  <div className="flex justify-center">
                    <Spinner message="Fetching Students..." height={50} width={150} color="#111111" messageColor="blue" />
                  </div>
                )}

                {(error.noStudentError || error.backendError) && (
                  <div className="text-center p-8 bg-rose-50 rounded-3xl border border-rose-100">
                    <p className="text-rose-500 font-bold text-lg">
                      {error.noStudentError || error.backendError}
                    </p>
                  </div>
                )}

                {!loading && search && students?.length === 0 && !error.noStudentError && (
                  <div className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-gray-500 font-medium">No students found for this criteria.</p>
                  </div>
                )}

                {search && !loading && students?.length > 0 && (
                  <div className="space-y-6">
                    <div className="overflow-hidden bg-white/50 rounded-3xl border border-gray-100 shadow-sm">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                          <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Present</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Sr no.</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Username</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {students.map((stu, idx) => (
                            <tr key={idx} className="hover:bg-white/80 transition-colors">
                              <td className="px-6 py-4 text-center">
                                <input
                                  type="checkbox"
                                  value={stu._id}
                                  onChange={handleInputChange}
                                  checked={checkedValue.includes(stu._id)}
                                  className="w-5 h-5 rounded-lg border-gray-300 text-primary-600 focus:ring-primary-500 transition-all cursor-pointer"
                                />
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600 text-center font-medium">{idx + 1}</td>
                              <td className="px-6 py-4 text-sm font-semibold text-gray-900">{stu.name}</td>
                              <td className="px-6 py-4 text-sm text-gray-600 font-mono italic">{stu.username}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-primary-50/50 p-6 rounded-[2rem] border border-primary-100/50 mt-8">
                      <div className="flex-1 w-full sm:w-auto">
                        <FormField label="Select Subject">
                          <Select
                            required
                            placeholder="Pick Subject"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                            options={subjects?.map(s => ({ label: s.subjectName, value: s.subjectName }))}
                          />
                        </FormField>
                      </div>
                      
                      <div className="flex items-center gap-4 w-full sm:w-auto pt-6">
                        <div className="text-sm font-medium text-primary-700 bg-primary-100 px-4 py-2 rounded-full hidden sm:block">
                          {checkedValue.length} Selected
                        </div>
                        <Button
                          onClick={uploadAttendance}
                          loading={loading}
                          disabled={!subjectName || checkedValue.length === 0}
                          className="flex-1 sm:flex-initial"
                        >
                          Mark Attendance
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {!search && !loading && (
                  <div className="text-center p-12 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200">
                    <div className="p-4 bg-white rounded-2xl w-fit mx-auto shadow-sm mb-4">
                      <BoyIcon className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-400 font-medium">Select criteria to fetch student list</p>
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



