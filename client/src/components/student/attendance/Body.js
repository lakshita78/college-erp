import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";

// New UI Components
import FormHeader from "../../ui/Form/FormHeader";

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const attendance = useSelector((state) => state.student.attendance.result);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const subjects = useSelector((state) => state.admin.subjects.result);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (subjects?.length !== 0) setLoading(false);
  }, [subjects]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-4 sm:px-6">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-primary-600">
          <div className="p-2 bg-primary-500/10 rounded-xl">
            <MenuBookIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Report</h1>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12 min-h-[30rem]">
          <div className="space-y-8">
            <FormHeader title="Subject Wise Attendance" />
            
            <div className="min-h-[300px] flex flex-col justify-center">
              {loading && (
                <div className="flex justify-center">
                  <Spinner message="Fetching Records..." height={50} width={150} color="#111111" messageColor="blue" />
                </div>
              )}

              {error.noSubjectError && (
                <div className="text-center p-8 bg-rose-50 rounded-3xl border border-rose-100">
                  <p className="text-rose-500 font-bold text-lg">
                    {error.noSubjectError}
                  </p>
                </div>
              )}

              {!loading && Object.keys(error).length === 0 && attendance?.length > 0 && (
                <div className="overflow-hidden bg-white/50 rounded-3xl border border-gray-100 shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Sr no.</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Subject Code</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Subject Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Attended</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Total</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Percentage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {attendance.map((res, idx) => (
                        <tr key={idx} className="hover:bg-white/80 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-600 text-center font-medium">{idx + 1}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 font-mono tracking-wider">{res.subjectCode}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 font-medium">{res.subjectName}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-center font-bold text-primary-600">{res.attended}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 text-center">{res.total}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                              parseFloat(res.percentage) < 75 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                            }`}>
                              {res.percentage}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {!loading && Object.keys(error).length === 0 && (!attendance || attendance.length === 0) && (
                <div className="text-center p-12 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200">
                  <div className="p-4 bg-white rounded-2xl w-fit mx-auto shadow-sm mb-4">
                    <MenuBookIcon className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-400 font-medium">No attendance records found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;



