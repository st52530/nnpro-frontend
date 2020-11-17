import React, {ReactNode} from "react";
import Loader from "../loader/Loader";
import {getClinics, saveNewClinic} from "../../../services/PDFService";
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

    componentDidMount() {
        this.loadClinics();
    }

    loadClinics = () : void => {
        this.setState({isLoading : true})
        getClinics().then(value => {
            this.setState({isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    onAddNewClinic = () : void => {
        this.setState({addNewClinicOpen : true})
    }
/*
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
        //let t = this.props.t
        return (
            <div>
                <Loader show={this.state.isLoading}/>
                <ErrorMessage show={this.state.isError}/>

                <div className="row mb-5">
                    <div className="col">

                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <button type="button" className="btn btn-success px-4" onClick={this.onAddNewClinic}></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(ExportToPDF)