import {Component, ReactNode} from "react";
import React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import Clinic from "../../../../entities/Clinic";
import {deleteClinic, getClinic} from "../../../../services/ClinicService";
import {RouterConstants} from "../../../../routes/RouterConstants";
import Loader from "../../loader/Loader";
import SubmitDialog from "../../../common/submitdialog/SubmitDialog";
import {WithTranslation} from "react-i18next";

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
        isError : true,
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
            console.error(reason);
            this.props.history.push(RouterConstants.notFound);
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
        let clinic: Clinic = this.state.clinic;
        if (this.state.isLoading) {
            return <Loader show={true}/>
        }
        return (
            <div>
                {this.renderDeleteDialog()}
                <h1>{clinic.name}</h1>
                <div className="col d-flex justify-content-end align-items-center">
                    <button type="button" className="btn btn-info px-4" onClick={this.onDeleteButtonClick}>Edit</button>
                </div>
                <div className="col">
                    <h2>Address</h2>
                    <p>{clinic.address}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(ClinicDetails)