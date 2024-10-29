import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import CalonStage2Page from "./CalonStage2Page";

const CalonStage2ProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <CalonStage2Page />
    </ProjectLayout>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(CalonStage2ProjectLayoutPage);