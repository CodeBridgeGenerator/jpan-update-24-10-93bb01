import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import PelulusStage2Page from "./PelulusStage2Page";

const PelulusStage2ProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <PelulusStage2Page />
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

export default connect(mapState, mapDispatch)(PelulusStage2ProjectLayoutPage);