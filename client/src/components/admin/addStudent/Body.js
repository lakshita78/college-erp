import React, { useEffect, useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { addStudent } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_STUDENT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

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
      errorRef.current.scrollIntoView({ behavior: "smooth" });
      setValue({ ...value, email: "" });
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
  }, [store.errors, store.admin.studentAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

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
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Student Information
                </h2>
                <div className="h-px flex-1 bg-gray-100 ml-6" />
              </div>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Full Name
                  </label>
                  <input
                    placeholder="e.g. John Doe"
                    required
                    className="w-full px-5 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                    type="text"
                    value={value.name}
                    onChange={(e) => setValue({ ...value, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Email Address
                  </label>
                  <input
                    required
                    placeholder="example@gmail.com"
                    className="w-full px-5 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                    type="email"
                    value={value.email}
                    onChange={(e) => setValue({ ...value, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Date of Birth
                  </label>
                  <input
                    required
                    className="w-full px-5 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none leading-none"
                    type="date"
                    value={value.dob}
                    onChange={(e) => setValue({ ...value, dob: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Gender
                  </label>
                  <select
                    required
                    className="w-full px-5 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none appearance-none cursor-pointer"
                    value={value.gender}
                    onChange={(e) => setValue({ ...value, gender: e.target.value })}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Contact Number
                  </label>
                  <input
                    required
                    placeholder="+1234567890"
                    className="w-full px-5 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                    type="number"
                    value={value.contactNumber}
                    onChange={(e) => setValue({ ...value, contactNumber: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Student Avatar
                  </label>
                  <div className="w-full px-5 py-2.5 bg-white/50 border border-dashed border-gray-300 rounded-2xl hover:bg-white transition-colors">
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => setValue({ ...value, avatar: base64 })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Academic Details */}
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Academic Details
                </h2>
                <div className="h-px flex-1 bg-gray-100 ml-6" />
              </div>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Department
                  </label>
                  <select
                    required
                    className="w-full px-5 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none appearance-none cursor-pointer"
                    value={value.department}
                    onChange={(e) => setValue({ ...value, department: e.target.value })}>
                    <option value="">Select Department</option>
                    {departments?.map((dp, idx) => (
                      <option key={idx} value={dp.department}>
                        {dp.department}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Batch Year
                  </label>
                  <input
                    required
                    placeholder="2022-2026"
                    className="w-full px-5 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                    type="text"
                    value={value.batch}
                    onChange={(e) => setValue({ ...value, batch: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Academic Year
                  </label>
                  <select
                    required
                    className="w-full px-5 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none appearance-none cursor-pointer"
                    value={value.year}
                    onChange={(e) => setValue({ ...value, year: e.target.value })}>
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Section
                  </label>
                  <select
                    required
                    className="w-full px-5 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none appearance-none cursor-pointer"
                    value={value.section}
                    onChange={(e) => setValue({ ...value, section: e.target.value })}>
                    <option value="">Select Section</option>
                    <option value="1">Section 1</option>
                    <option value="2">Section 2</option>
                    <option value="3">Section 3</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section: Parent Information */}
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Parent Information
                </h2>
                <div className="h-px flex-1 bg-gray-100 ml-6" />
              </div>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Father's Name
                  </label>
                  <input
                    required
                    placeholder="Full Name"
                    className="w-full px-5 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                    type="text"
                    value={value.fatherName}
                    onChange={(e) => setValue({ ...value, fatherName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Father's Contact
                  </label>
                  <input
                    required
                    placeholder="Contact Number"
                    className="w-full px-5 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                    type="number"
                    value={value.fatherContactNumber}
                    onChange={(e) =>
                      setValue({ ...value, fatherContactNumber: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Mother's Name
                  </label>
                  <input
                    required
                    placeholder="Full Name"
                    className="w-full px-5 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                    type="text"
                    value={value.motherName}
                    onChange={(e) => setValue({ ...value, motherName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Mother's Contact
                  </label>
                  <input
                    required
                    placeholder="Contact Number"
                    className="w-full px-5 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                    type="number"
                    value={value.motherContactNumber}
                    onChange={(e) =>
                      setValue({ ...value, motherContactNumber: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setValue({
                    name: "", dob: "", email: "", department: "", contactNumber: "",
                    avatar: "", batch: "", gender: "", year: "", fatherName: "",
                    motherName: "", section: "", fatherContactNumber: "", motherContactNumber: "",
                  });
                  setError({});
                }}
                className="px-8 py-3 rounded-2xl text-gray-500 font-bold hover:bg-gray-100 transition-all">
                Clear Form
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 shadow-lg shadow-gray-200 disabled:opacity-50 transition-all">
                {loading ? "Saving..." : "Save Student"}
              </button>
            </div>

            <div ref={errorRef} className="flex justify-center mt-6">
              {(error.emailError || error.backendError) && (
                <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl font-medium border border-rose-100 animate-shake">
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



