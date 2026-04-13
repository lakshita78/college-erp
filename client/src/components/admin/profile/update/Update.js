import React, { useEffect } from "react";
import Layout from "../../../ui/Layout/Layout";
import Body from "./Body";
import { useDispatch } from "react-redux";
import { getAllDepartment } from "../../../../redux/actions/adminActions";

const Update = () => {
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

export default Update;
