import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNotice } from "../../redux/actions/adminActions";
import Layout from "../ui/Layout/Layout";
import Body from "./Body";

const FacultyHome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotice());
  }, [dispatch]);

  return (
    <Layout userRole="faculty">
      <Body />
    </Layout>
  );
};

export default FacultyHome;
