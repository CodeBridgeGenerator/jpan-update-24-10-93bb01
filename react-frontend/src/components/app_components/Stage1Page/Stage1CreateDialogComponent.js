import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";


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

const Stage1CreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [kategori, setKategori] = useState([])

    useEffect(() => {
        let init  = {completed: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [kategori], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.nomborRujukan)) {
                error["nomborRujukan"] = `Nombor Rujukan field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.tajukLatihan)) {
                error["tajukLatihan"] = `Tajuk Latihan field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.status)) {
                error["status"] = `Status field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            nomborRujukan: _entity?.nomborRujukan,tajukLatihan: _entity?.tajukLatihan,kategori: _entity?.kategori?._id,status: _entity?.status,completed: _entity?.completed || false,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("stage1").create(_data);
        const eagerResult = await client
            .service("stage1")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "kategori",
                    service : "kategori",
                    select:["kategori"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Stage1 updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Stage1" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount kategori
                    client
                        .service("kategori")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleKategoriId } })
                        .then((res) => {
                            setKategori(res.data.map((e) => { return { name: e['kategori'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Kategori", type: "error", message: error.message || "Failed get kategori" });
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

    const kategoriOptions = kategori.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Stage1" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="stage1-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="nomborRujukan">Nombor Rujukan:</label>
                <InputText id="nomborRujukan" className="w-full mb-3 p-inputtext-sm" value={_entity?.nomborRujukan} onChange={(e) => setValByKey("nomborRujukan", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["nomborRujukan"]) ? (
              <p className="m-0" key="error-nomborRujukan">
                {error["nomborRujukan"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tajukLatihan">Tajuk Latihan:</label>
                <InputText id="tajukLatihan" className="w-full mb-3 p-inputtext-sm" value={_entity?.tajukLatihan} onChange={(e) => setValByKey("tajukLatihan", e.target.value)}  required  />
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
                <label htmlFor="kategori">Kategori:</label>
                <Dropdown id="kategori" value={_entity?.kategori?._id} optionLabel="name" optionValue="value" options={kategoriOptions} onChange={(e) => setValByKey("kategori", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["kategori"]) ? (
              <p className="m-0" key="error-kategori">
                {error["kategori"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) ? (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="completed">Completed:</label>
                <Checkbox id="completed" className="ml-3" checked={_entity?.completed} onChange={(e) => setValByKey("completed", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["completed"]) ? (
              <p className="m-0" key="error-completed">
                {error["completed"]}
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

export default connect(mapState, mapDispatch)(Stage1CreateDialogComponent);
