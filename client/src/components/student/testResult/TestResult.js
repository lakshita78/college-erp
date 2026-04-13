import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTestResult } from "../../../redux/actions/studentActions";

import Layout from "../../ui/Layout/Layout";
import Body from "./Body";

const TestResult = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getTestResult(
        user.result.department,
        user.result.year,
        user.result.section
      )
    );
  }, [dispatch]);

  return (
    <Layout userRole="student">
      <Body />
    </Layout>
  );
};

export default TestResult;
