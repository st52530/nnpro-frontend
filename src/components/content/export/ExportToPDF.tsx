import React, {ReactNode} from "react";
import Loader from "../loader/Loader";
import {getPDF, getPDFs} from "../../../services/PDFService";
import ErrorMessage from "../../common/errormessage/ErrorMessage";
import {WithTranslation, withTranslation} from "react-i18next";

interface Props extends WithTranslation{

}

interface State {

    addNewClinicOpen : boolean

    isLoading : boolean
    isError : boolean
}



class ExportToPDF extends React.Component<Props, State> {
    state : Readonly<State> = {

        addNewClinicOpen : false,
        isLoading : false,
        isError : false,
    }

    downloadPdf = () : void => {
        this.setState({isLoading : true})
        getPDF(749).then(value => {
            this.setState({/*clinics : value,*/ isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

/*
    onAddNewClinic = () : void => {
        this.setState({addNewClinicOpen : true})
    }

    onAddNewClinicSubmit = (clinic : Clinic) => {
        this.setState({addNewClinicOpen : false, isLoading : true})
        saveNewClinic(clinic).then(value => {
            this.loadClinics();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onAddNewClinicCancel = () => {
        this.setState({addNewClinicOpen : false})
    }

    _renderClinicsList = () : ReactNode => {
        let elements : ReactNode[] = this.state.clinics.map(clinic => {
            return <ClinicListItem clinic={clinic} key={clinic.idClinic}/>
        })

        return (
            <div className="row">
                <div className="col">
                    {elements}
                </div>
            </div>
        )
    }
*/
    render() {
        let t = this.props.t
        return (
            <div>
                <Loader show={this.state.isLoading}/>
                <ErrorMessage show={this.state.isError}/>
                <div className="mb-5">

                    <h1>{t("export")}</h1>

                    <div className="col d-flex align-items-center">
                        <button type="button" className="btn btn-success px-4" onClick={this.downloadPdf}>{t("download")}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(ExportToPDF)