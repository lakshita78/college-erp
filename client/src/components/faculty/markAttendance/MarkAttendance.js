import React, { useEffect } from "react";
import Body from "./Body";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useDispatch } from "react-redux";
import {
  getAllDepartment,
  getAllSubject,
} from "../../../redux/actions/adminActions";

import Layout from "../../ui/Layout/Layout";

const MarkAttendance = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDepartment());
  }, [dispatch]);

  return (
    <Layout userRole="faculty">
      <Body />
    </Layout>
  );
};

export default MarkAttendance;
