import React, {ReactNode} from "react";
import ReservationListItem from "./ReservationListItem";
import Loader from "../../loader/Loader";
import Reservation from "../../../../entities/Reservation";
import {getReservations, saveNewReservation} from "../../../../services/ReservationService";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import AddEditReservationDialog from "../addeditreservationdialog/AddEditReservationDialog";
import {WithTranslation, withTranslation} from "react-i18next";

interface Props extends WithTranslation{

}

interface State {
    reservation : Reservation[]

    addNewReservationOpen : boolean

    isLoading : boolean
    isError : boolean
}



class ReservationList extends React.Component<Props, State> {
    state : Readonly<State> = {
        reservation : [],

        addNewReservationOpen : false,
        isLoading : false,
        isError : false,
    }

    componentDidMount() {
        this.loadReservations();
    }

    loadReservations = () : void => {
        this.setState({isLoading : true})
        getReservations().then(value => {
            this.setState({reservation : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    onAddNewReservation = () : void => {
        this.setState({addNewReservationOpen : true})
    }

    onAddNewReservationSubmit = (reservation : Reservation) => {
        this.setState({addNewReservationOpen : false, isLoading : true})
        saveNewReservation(reservation).then(value => {
            this.loadReservations();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onAddNewReservationCancel = () => {
        this.setState({addNewReservationOpen : false})
    }

    _renderReservationList = () : ReactNode => {
        let elements : ReactNode[] = this.state.reservation.map(reservation => {
            return <ReservationListItem reservation={reservation} key={reservation.idReservation}/>
        })

        return (
            <div className="row">
                <div className="col">
                    {elements}
                </div>
            </div>
        )
    }

    render() {
        let t = this.props.t
        return (
            <div>
                <Loader show={this.state.isLoading}/>
                <ErrorMessage show={this.state.isError}/>
                <AddEditReservationDialog onSubmit={this.onAddNewReservationSubmit} onCancel={this.onAddNewReservationCancel} isOpen={this.state.addNewReservationOpen}/>
                <div className="row mb-5">
                    <div className="col">
                        <h1>{t("rpHeader")}</h1>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <button type="button" className="btn btn-success px-4" onClick={this.onAddNewReservation}>{t("add")}</button>
                    </div>
                </div>
                {this._renderReservationList()}
            </div>
        );
    }
}

export default withTranslation()(ReservationList)