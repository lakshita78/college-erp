import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch, useSelector } from "react-redux";
import { createNotice } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { CREATE_NOTICE, SET_ERRORS } from "../../../redux/actionTypes";

// New UI Components
import FormField from "../../ui/Form/FormField";
import Input from "../../ui/Form/Input";
import Select from "../../ui/Form/Select";
import Button from "../../ui/Form/Button";
import FormHeader from "../../ui/Form/FormHeader";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    date: "",
    noticeFor: "",
    topic: "",
    content: "",
    from: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue((prev) => ({ ...prev, date: "", noticeFor: "", topic: "", content: "", from: "" }));
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(createNotice(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.noticeCreated) {
      setLoading(false);
      if (store.admin.noticeCreated) {
        setValue({
          date: "",
          noticeFor: "",
          topic: "",
          content: "",
          from: "",
        });
        dispatch({ type: CREATE_NOTICE, payload: false });
        dispatch({ type: SET_ERRORS, payload: {} });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.noticeCreated, dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-4 sm:px-6">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-primary-600">
          <div className="p-2 bg-primary-500/10 rounded-xl">
            <EngineeringIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Notice</h1>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12">
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-8">
              <FormHeader title="Notice Details" />

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-6">
                  <FormField label="Date" required error={error.date}>
                    <Input
                      required
                      type="date"
                      value={value.date}
                      onChange={(e) => setValue({ ...value, date: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Topic" required error={error.topic}>
                    <Input
                      required
                      placeholder="Notice Topic"
                      value={value.topic}
                      onChange={(e) => setValue({ ...value, topic: e.target.value })}
                    />
                  </FormField>

                  <FormField label="To" required error={error.noticeFor}>
                    <Select
                      required
                      placeholder="Select Audience"
                      value={value.noticeFor}
                      onChange={(e) => setValue({ ...value, noticeFor: e.target.value })}
                      options={[
                        { label: "All", value: "all" },
                        { label: "Faculty", value: "faculty" },
                        { label: "Student", value: "student" }
                      ]}
                    />
                  </FormField>

                  <FormField label="From" required error={error.from}>
                    <Input
                      required
                      placeholder="Issuing Authority"
                      value={value.from}
                      onChange={(e) => setValue({ ...value, from: e.target.value })}
                    />
                  </FormField>
                </div>

                <div className="space-y-6">
                  <FormField label="Content" required error={error.content}>
                    <Input
                      required
                      type="textarea"
                      placeholder="Type notice content here..."
                      rows={10}
                      value={value.content}
                      onChange={(e) => setValue({ ...value, content: e.target.value })}
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
                    date: "", noticeFor: "", topic: "", content: "", from: "",
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
                Create Notice
              </Button>
            </div>

            <div className="flex justify-center mt-6">
              {(error.noticeError || error.backendError) && (
                <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl font-medium border border-rose-100 animate-shake text-sm">
                  {error.noticeError || error.backendError}
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



