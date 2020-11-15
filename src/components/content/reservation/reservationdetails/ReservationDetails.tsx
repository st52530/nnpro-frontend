import React, {Component, ReactNode} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {deleteReservation, getReservation} from "../../../../services/ReservationService";
import {RouterConstants} from "../../../../routes/RouterConstants";
import Loader from "../../loader/Loader";
import SubmitDialog from "../../../common/submitdialog/SubmitDialog";
import {withTranslation, WithTranslation} from "react-i18next";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import i18n from "../../../../i18n";
import Reservation from "../../../../entities/Reservation";

interface Props extends RouteComponentProps<MatchParams>, WithTranslation {

}

interface MatchParams {
    id: string;
}

interface State {
    isLoading: boolean,
    isOpenDeleteDialog: boolean
    reservation: Reservation

    isError : boolean,
    errorText? : string
}

class ReservationDetails extends Component<Props, State> {

    state: Readonly<State> = {
        isLoading: true,
        isError : false,
        isOpenDeleteDialog: false,
        reservation: {} as Reservation
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let id = Number(this.props.match.params.id);
        console.warn(id);
        getReservation(id).then(response => {
            this.setState({isLoading: false, reservation : response})
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
        deleteReservation(id).then(resp => {
            this.props.history.push(RouterConstants.reservation);
        }).catch(reason => {
            this.setState({isError : true, isLoading : false})
        })
    }

    private onDeleteCancel = (): void => {
        this.setState({isOpenDeleteDialog: false})
    }

    private renderDeleteDialog = () : ReactNode => {
        let header : string = i18n.t("cpDelete");
        let body : string = i18n.t("cpDelete")+ ": " + this.state.reservation.date + "?";

        return <SubmitDialog header={header} body={body} isOpen={this.state.isOpenDeleteDialog} onSubmit={this.onDeleteSubmit} onCancel={this.onDeleteCancel}/>
    }



    render() {
        let t = this.props.t;
        let reservation: Reservation = this.state.reservation;
        if (this.state.isLoading) {
            return <Loader show={true}/>
        }
        return (
            <div>
                <ErrorMessage show={this.state.isError}/>
                {this.renderDeleteDialog()}
                <div className="row mb-5">
                    <div className="col">
                        <h1>{reservation.date}</h1>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <button type="button" className="btn btn-danger px-4" onClick={this.onDeleteButtonClick}>{t("delete")}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(ReservationDetails))