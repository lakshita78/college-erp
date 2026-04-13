import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDepartment } from "../../../redux/actions/adminActions";
import Layout from "../../ui/Layout/Layout";
import Body from "./Body";

const GetStudent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDepartment());
  }, [dispatch]);

  return (
    <Layout userRole="admin">
      <Body />
    </Layout>
  );
};

export default GetStudent;
