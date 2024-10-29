import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import PelulusStage1Page from "./PelulusStage1Page";

const PelulusStage1ProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <PelulusStage1Page />
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

export default connect(mapState, mapDispatch)(PelulusStage1ProjectLayoutPage);