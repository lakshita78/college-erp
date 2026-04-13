import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSubject } from "../../../redux/actions/studentActions";

import Layout from "../../ui/Layout/Layout";
import Body from "./Body";

const SubjectList = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubject(user.result.department, user.result.year));
  }, [dispatch]);

  return (
    <Layout userRole="student">
      <Body />
    </Layout>
  );
};

export default SubjectList;
