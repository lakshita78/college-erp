import React, { useEffect, useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import { getStudent, uploadMark } from "../../../redux/actions/facultyActions";
import Spinner from "../../../utils/Spinner";
import { MARKS_UPLOADED, SET_ERRORS } from "../../../redux/actionTypes";
import { getTest } from "../../../redux/actions/facultyActions";

// New UI Components
import FormField from "../../ui/Form/FormField";
import Input from "../../ui/Form/Input";
import Select from "../../ui/Form/Select";
import Button from "../../ui/Form/Button";
import FormHeader from "../../ui/Form/FormHeader";

const Body = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const tests = store.faculty.tests.result;
  const [marks, setMarks] = useState([]);

  const [value, setValue] = useState({
    department: user.result.department,
    year: "",
    section: "",
    test: "",
  });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleInputChange = (value, _id) => {
    const newMarks = [...marks];
    let index = newMarks.findIndex((m) => m._id === _id);
    if (index === -1) {
      newMarks.push({ _id, value });
    } else {
      newMarks[index].value = value;
    }
    setMarks(newMarks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getStudent(value));
  };
  const students = useSelector((state) => state.admin.students.result);

  const uploadMarks = (e) => {
    setError({});
    setLoading(true);
    dispatch(
      uploadMark(marks, value.department, value.section, value.year, value.test)
    );
  };

  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [students]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  useEffect(() => {
    if (store.errors || store.faculty.marksUploaded) {
      setLoading(false);
      if (store.faculty.marksUploaded) {
        setValue({ department: user.result.department, year: "", test: "", section: "" });
        setSearch(false);
        setMarks([]);
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: MARKS_UPLOADED, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.faculty.marksUploaded, dispatch, user.result.department]);

  useEffect(() => {
    if (value.year !== "" && value.section !== "") {
      dispatch(getTest(value));
    }
  }, [value.year, value.section, dispatch, value]);

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-4 sm:px-6">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-primary-600">
          <div className="p-2 bg-primary-500/10 rounded-xl">
            <BoyIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Upload Marks</h1>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Filter Section */}
            <div className="space-y-8">
              <FormHeader title="Filter Students" />
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField label="Department">
                  <Input value={user.result.department} disabled className="bg-gray-50 opacity-70 cursor-not-allowed" />
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

                <FormField label="Test" required error={error.test}>
                  <Select
                    required
                    placeholder="Select Test"
                    value={value.test}
                    onChange={(e) => setValue({ ...value, test: e.target.value })}
                    options={tests?.map(t => ({ label: t.test, value: t.test }))}
                  />
                </FormField>

                <Button type="submit" loading={loading && !search} className="w-full">
                  Search Students
                </Button>
              </form>
            </div>

            {/* Marks Upload Section */}
            <div className="lg:col-span-2 space-y-8">
              <FormHeader title="Student List" />
              
              <div className="min-h-[300px] flex flex-col justify-center">
                {loading && !search && (
                  <div className="flex justify-center">
                    <Spinner message="Fetching Students..." height={50} width={150} color="#111111" messageColor="blue" />
                  </div>
                )}

                {(error.noStudentError || error.backendError || error.examError) && (
                  <div className="text-center p-8 bg-rose-50 rounded-3xl border border-rose-100">
                    <p className="text-rose-500 font-bold text-lg">
                      {error.noStudentError || error.backendError || error.examError}
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
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Sr no.</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Section</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Marks</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {students.map((stu, idx) => (
                            <tr key={idx} className="hover:bg-white/80 transition-colors">
                              <td className="px-6 py-4 text-sm text-gray-600 text-center font-medium">{idx + 1}</td>
                              <td className="px-6 py-4 flex flex-col">
                                <span className="text-sm font-semibold text-gray-900">{stu.name}</span>
                                <span className="text-[10px] text-gray-400 font-mono italic">{stu.username}</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600 text-center">{stu.section}</td>
                              <td className="px-6 py-4 text-center">
                                <input
                                  type="text"
                                  placeholder="00"
                                  onChange={(e) => handleInputChange(e.target.value, stu._id)}
                                  className="w-16 h-10 text-center bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-bold text-gray-900"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button
                        onClick={uploadMarks}
                        loading={loading}
                        disabled={marks.length === 0}
                      >
                        Upload Marks ({marks.length})
                      </Button>
                    </div>
                  </div>
                )}

                {!search && !loading && (
                  <div className="text-center p-12 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200">
                    <div className="p-4 bg-white rounded-2xl w-fit mx-auto shadow-sm mb-4">
                      <BoyIcon className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-400 font-medium">Select criteria to Begin uploading marks</p>
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



