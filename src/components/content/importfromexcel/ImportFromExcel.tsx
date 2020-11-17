import React from "react";
import Loader from "../loader/Loader";
import {
    importExcelConsumables,
    importExcelDiagnoses,
    importExcelMedicines,
    importExcelOperations
} from "../../../services/ExcelService";
import ErrorMessage from "../../common/errormessage/ErrorMessage";
import {WithTranslation, withTranslation} from "react-i18next";
import AddExcelForm from "./AddExcelForm";

interface Props extends WithTranslation{

}

enum OPENED_WINDOW{
    NONE,
    OPERATIONS,
    MEDICINES,
    CONSUMABLES,
    DIAGNOSES
}

interface State {
    currentWindow : OPENED_WINDOW
    isLoading : boolean
    isError : boolean
}



class ClinicList extends React.Component<Props, State> {
    state : Readonly<State> = {
        currentWindow : OPENED_WINDOW.NONE,

        isLoading : false,
        isError : false,
    }

    onImportExcel = (window : OPENED_WINDOW) : void => {
        this.setState({currentWindow : window})
    }

    onImportExcelSubmit = (file : Blob) => {
        let promise : Promise<void>
        switch (this.state.currentWindow){
            case OPENED_WINDOW.DIAGNOSES:
                promise = importExcelDiagnoses(file)
                break
            case OPENED_WINDOW.MEDICINES:
                promise = importExcelMedicines(file)
                break
            case OPENED_WINDOW.OPERATIONS:
                promise = importExcelOperations(file)
                break
            default:
                promise = importExcelConsumables(file)
        }
        this.setState({currentWindow : OPENED_WINDOW.NONE, isLoading : true})
        promise.then(value => {
            this.setState({isLoading : false});
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onImportExcelCancel = () => {
        this.setState({currentWindow : OPENED_WINDOW.NONE})
    }

    render() {
        let t = this.props.t
        return (
            <div>
                <Loader show={this.state.isLoading}/>
                <ErrorMessage show={this.state.isError}/>
                <AddExcelForm onSubmit={(file)=>this.onImportExcelSubmit(file)} onCancel={this.onImportExcelCancel} isOpen={this.state.currentWindow !== OPENED_WINDOW.NONE}/>
                <div className="col">
                    <h1>{t("import")}</h1>
                </div>
                <div className="row py-4 w-100">
                    <div className="col align-items-center">
                        <button type="button" className="btn btn-success w-100 h-100" onClick={()=>this.onImportExcel(OPENED_WINDOW.CONSUMABLES)}>{t("iConsumables")}</button>
                    </div>
                    <div className="col align-items-center">
                        <button type="button" className="btn btn-success w-100 h-100" onClick={()=>this.onImportExcel(OPENED_WINDOW.MEDICINES)}>{t("iMedicines")}</button>
                    </div>
                    <div className="col align-items-center">
                        <button type="button" className="btn btn-success w-100 h-100" onClick={()=>this.onImportExcel(OPENED_WINDOW.DIAGNOSES)}>{t("iDiagnoses")}</button>
                    </div>
                    <div className="col align-items-center">
                        <button type="button" className="btn btn-success w-100 h-100" onClick={()=>this.onImportExcel(OPENED_WINDOW.OPERATIONS)}>{t("iOperations")}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(ClinicList)