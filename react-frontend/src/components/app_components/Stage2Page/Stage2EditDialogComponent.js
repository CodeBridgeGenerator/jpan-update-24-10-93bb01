import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const Stage2CreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [stage1, setStage1] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount stage1
                    client
                        .service("stage1")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleStage1Id } })
                        .then((res) => {
                            setStage1(res.data.map((e) => { return { name: e['nomborRujukan'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Stage1", type: "error", message: error.message || "Failed get stage1" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            nomborRujukan: _entity?.nomborRujukan,
tajukLatihan: _entity?.tajukLatihan,
status: _entity?.status,
stage1: _entity?.stage1?._id,
completed: _entity?.completed,
        };

        setLoading(true);
        try {
            
        await client.service("stage2").patch(_entity._id, _data);
        const eagerResult = await client
            .service("stage2")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "stage1",
                    service : "stage1",
                    select:["nomborRujukan"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info stage2 updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const stage1Options = stage1.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Stage2" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="stage2-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="nomborRujukan">Nombor Rujukan:</label>
                <InputText id="nomborRujukan" className="w-full mb-3 p-inputtext-sm" value={_entity?.nomborRujukan} onChange={(e) => setValByKey("nomborRujukan", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["nomborRujukan"]) && (
              <p className="m-0" key="error-nomborRujukan">
                {error["nomborRujukan"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tajukLatihan">Tajuk Latihan:</label>
                <InputText id="tajukLatihan" className="w-full mb-3 p-inputtext-sm" value={_entity?.tajukLatihan} onChange={(e) => setValByKey("tajukLatihan", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tajukLatihan"]) && (
              <p className="m-0" key="error-tajukLatihan">
                {error["tajukLatihan"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) && (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stage1">Stage1:</label>
                <Dropdown id="stage1" value={_entity?.stage1?._id} optionLabel="name" optionValue="value" options={stage1Options} onChange={(e) => setValByKey("stage1", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stage1"]) && (
              <p className="m-0" key="error-stage1">
                {error["stage1"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="completed">Completed:</label>
                <Checkbox id="completed" className="ml-3" checked={_entity?.completed} onChange={(e) => setValByKey("completed", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["completed"]) && (
              <p className="m-0" key="error-completed">
                {error["completed"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(Stage2CreateDialogComponent);