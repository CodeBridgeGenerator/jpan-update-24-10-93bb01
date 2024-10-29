import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
const statusArray = ["Pending","Approved","Rejected"];
const statusOptions = statusArray.map((x) => ({ name: x, value: x }));

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const PelulusStage2CreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [tajukLatihan, setTajukLatihan] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [tajukLatihan], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            order: _entity?.order,tajukLatihan: _entity?.tajukLatihan?._id,status: _entity?.status,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("pelulusStage2").create(_data);
        const eagerResult = await client
            .service("pelulusStage2")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "tajukLatihan",
                    service : "stage2",
                    select:["tajukLatihan"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info PelulusStage2 updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in PelulusStage2" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount stage2
                    client
                        .service("stage2")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleStage2Id } })
                        .then((res) => {
                            setTajukLatihan(res.data.map((e) => { return { name: e['tajukLatihan'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Stage2", type: "error", message: error.message || "Failed get stage2" });
                        });
                }, []);

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

    const tajukLatihanOptions = tajukLatihan.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create PelulusStage2" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="pelulusStage2-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="order">Order:</label>
                <InputNumber id="order" className="w-full mb-3 p-inputtext-sm" value={_entity?.order} onChange={(e) => setValByKey("order", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["order"]) ? (
              <p className="m-0" key="error-order">
                {error["order"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tajukLatihan">Tajuk Latihan:</label>
                <Dropdown id="tajukLatihan" value={_entity?.tajukLatihan?._id} optionLabel="name" optionValue="value" options={tajukLatihanOptions} onChange={(e) => setValByKey("tajukLatihan", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tajukLatihan"]) ? (
              <p className="m-0" key="error-tajukLatihan">
                {error["tajukLatihan"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <Dropdown id="status" value={_entity?.status} options={statusOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("status", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) ? (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            ) : null}
          </small>
            </div>
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

export default connect(mapState, mapDispatch)(PelulusStage2CreateDialogComponent);
