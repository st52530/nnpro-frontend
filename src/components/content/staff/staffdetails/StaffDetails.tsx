import React, {Component, ReactNode} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {deleteClinic} from "../../../../services/ClinicService";
import {RouterConstants} from "../../../../routes/RouterConstants";
import Loader from "../../loader/Loader";
import SubmitDialog from "../../../common/submitdialog/SubmitDialog";
import {withTranslation, WithTranslation} from "react-i18next";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import i18n from "../../../../i18n";
import Staff from "../../../../entities/Staff";
import {getCertainStaff} from "../../../../services/StaffService";

interface Props extends RouteComponentProps<MatchParams>, WithTranslation {

}

interface MatchParams {
    id: string;
}

interface State {
    isLoading: boolean,
    isOpenDeleteDialog: boolean
    staff: Staff

    isError : boolean,
    errorText? : string
}

class StaffDetails extends Component<Props, State> {

    state: Readonly<State> = {
        isLoading: true,
        isError : false,
        isOpenDeleteDialog: false,
        staff: {} as Staff
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let id = Number(this.props.match.params.id);
        console.warn(id);
        getCertainStaff(id).then(response => {
            this.setState({isLoading: false, staff: response})
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
            this.props.history.push(RouterConstants.clinics);
        }).catch(reason => {
            this.setState({isError : true, isLoading : false})
        })
    }

    private onDeleteCancel = (): void => {
        this.setState({isOpenDeleteDialog: false})
    }

    private renderDeleteDialog = () : ReactNode => {
        let header : string = i18n.t("spDelete");
        let body : string = i18n.t("spDelete")+ ": " + this.state.staff.username + "?";

        return <SubmitDialog header={header} body={body} isOpen={this.state.isOpenDeleteDialog} onSubmit={this.onDeleteSubmit} onCancel={this.onDeleteCancel}/>
    }



    render() {
        let t = this.props.t;
        let staff: Staff = this.state.staff;
        if (this.state.isLoading) {
            return <Loader show={true}/>
        }
        return (
        <div>
            <ErrorMessage show={this.state.isError}/>
            {this.renderDeleteDialog()}
            <div className="row mb-5">
                <div className="col">
                    <h1>{staff.username}</h1>
                </div>
                <div className="col d-flex justify-content-end align-items-center">
                    <button type="button" className="btn btn-danger px-4" onClick={this.onDeleteButtonClick}>{t("delete")}</button>
                </div>
            </div>


            <div className="col">
                <h3>{t("dfAddress")}</h3>
                <p>{staff.fullName}</p>
                <h3>{t("tmStaff")}</h3>
            </div>
        </div>
    )
    }
}

export default withTranslation()(withRouter(StaffDetails))