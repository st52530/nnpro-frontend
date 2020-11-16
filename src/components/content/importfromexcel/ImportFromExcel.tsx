import React from "react";
import Loader from "../loader/Loader";
import {importExcel} from "../../../services/ExcelService";
import ErrorMessage from "../../common/errormessage/ErrorMessage";
import {WithTranslation, withTranslation} from "react-i18next";
import AddExcelForm from "./AddExcelForm";

interface Props extends WithTranslation{

}

interface State {

    importExcelFormOpen : boolean

    isLoading : boolean
    isError : boolean
}



class ClinicList extends React.Component<Props, State> {
    state : Readonly<State> = {

        importExcelFormOpen : false,
        isLoading : false,
        isError : false,
    }

    onAddNewClinic = () : void => {
        this.setState({importExcelFormOpen : true})
    }

    onImportExcelSubmit = (file : Blob) => {
        this.setState({importExcelFormOpen : false, isLoading : true})
        importExcel(file).then(value => {
            this.setState({isLoading : false});
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onAddNewClinicCancel = () => {
        this.setState({importExcelFormOpen : false})
    }

    render() {
        let t = this.props.t
        return (
            <div>
                <Loader show={this.state.isLoading}/>
                <ErrorMessage show={this.state.isError}/>
                <AddExcelForm onSubmit={this.onImportExcelSubmit} onCancel={this.onAddNewClinicCancel} isOpen={this.state.importExcelFormOpen}/>
                <div className="row mb-5">
                    <div className="col">
                        <h1>{t("cpHeader")}</h1>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <button type="button" className="btn btn-success px-4" onClick={this.onAddNewClinic}>{t("add")}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(ClinicList)