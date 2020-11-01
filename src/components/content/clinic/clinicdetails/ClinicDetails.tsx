import {Component, ReactNode} from "react";
import React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import Clinic from "../../../../entities/Clinic";
import {deleteClinic, getClinic} from "../../../../services/ClinicService";
import {RouterConstants} from "../../../../routes/RouterConstants";
import Loader from "../../loader/Loader";
import SubmitDialog from "../../../common/submitdialog/SubmitDialog";
import {withTranslation, WithTranslation} from "react-i18next";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";

interface Props extends RouteComponentProps<MatchParams>, WithTranslation {

}

interface MatchParams {
    id: string;
}

interface State {
    isLoading: boolean,
    isOpenDeleteDialog: boolean
    clinic: Clinic

    isError : boolean,
    errorText? : string
}

class ClinicDetails extends Component<Props, State> {

    state: Readonly<State> = {
        isLoading: true,
        isError : false,
        isOpenDeleteDialog: false,
        clinic: {} as Clinic
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let id = Number(this.props.match.params.id);
        console.warn(id);
        getClinic(id).then(response => {
            this.setState({isLoading: false, clinic: response})
        }).catch(reason => {
            this.setState({isError : true, isLoading : false});
        })
    }

    private onDeleteButtonClick = (): void => {
        this.setState({isOpenDeleteDialog: true})
    }

    private onDeleteSubmit = (): void => {
        this.setState({isOpenDeleteDialog: false, isLoading : true})
        let id = Number(this.props.match.params.id);
        deleteClinic(id).then(resp => {
            this.props.history.push(RouterConstants.departments);
        }).catch(reason => {
            this.setState({isError : true, isLoading : false})
        })
    }

    private onDeleteCancel = (): void => {
        this.setState({isOpenDeleteDialog: false})
    }

    private renderDeleteDialog = () : ReactNode => {
        let header : string = "Delete clinic";
        let body : string = "Delete clinic: " + this.state.clinic.name + " ?";

        return <SubmitDialog header={header} body={body} isOpen={this.state.isOpenDeleteDialog} onSubmit={this.onDeleteSubmit} onCancel={this.onDeleteCancel}/>
    }

    render() {
        let t = this.props.t;
        let clinic: Clinic = this.state.clinic;
        if (this.state.isLoading) {
            return <Loader show={true}/>
        }
        return (
            <div>
                <ErrorMessage show={this.state.isError}/>
                {this.renderDeleteDialog()}
                <div className="row mb-5">
                    <div className="col">
                        <h1>{clinic.name}</h1>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <button type="button" className="btn btn-danger px-4" onClick={this.onDeleteButtonClick}>{t("delete")}</button>
                    </div>
                </div>


                <div className="col">
                    <h3>Address</h3>
                    <p>{clinic.address}</p>
                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(ClinicDetails))