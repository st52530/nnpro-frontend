import React, {Component, ReactNode} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {deleteMedicine, getMedicine} from "../../../../services/MedicineService";
import {RouterConstants} from "../../../../routes/RouterConstants";
import Loader from "../../loader/Loader";
import SubmitDialog from "../../../common/submitdialog/SubmitDialog";
import {withTranslation, WithTranslation} from "react-i18next";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import i18n from "../../../../i18n";
import Medicine from "../../../../entities/Medicine";

interface Props extends RouteComponentProps<MatchParams>, WithTranslation {

}

interface MatchParams {
    id: string;
}

interface State {
    isLoading: boolean,
    isOpenDeleteDialog: boolean
    medicine: Medicine

    isError : boolean,
    errorText? : string
}

class MedicineDetails extends Component<Props, State> {

    state: Readonly<State> = {
        isLoading: true,
        isError : false,
        isOpenDeleteDialog: false,
        medicine: {} as Medicine
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let id = Number(this.props.match.params.id);
        console.warn(id);
        getMedicine(id).then(response => {
            this.setState({isLoading: false, medicine: response})
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
        deleteMedicine(id).then(resp => {
            this.props.history.push(RouterConstants.medicine);
        }).catch(reason => {
            this.setState({isError : true, isLoading : false})
        })
    }

    private onDeleteCancel = (): void => {
        this.setState({isOpenDeleteDialog: false})
    }

    private renderDeleteDialog = () : ReactNode => {
        let header : string = i18n.t("cpDelete");
        let body : string = i18n.t("cpDelete")+ ": " + this.state.medicine.name + "?";

        return <SubmitDialog header={header} body={body} isOpen={this.state.isOpenDeleteDialog} onSubmit={this.onDeleteSubmit} onCancel={this.onDeleteCancel}/>
    }



    render() {
        let t = this.props.t;
        let medicine: Medicine = this.state.medicine;
        if (this.state.isLoading) {
            return <Loader show={true}/>
        }
        return (
            <div>
                <ErrorMessage show={this.state.isError}/>
                {this.renderDeleteDialog()}
                <div className="row mb-5">
                    <div className="col">
                        <h1>{medicine.name}</h1>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <button type="button" className="btn btn-danger px-4" onClick={this.onDeleteButtonClick}>{t("delete")}</button>
                    </div>
                </div>


                <div className="col">
                    <h3>{t("dfAddress")}</h3>
                    <p>{medicine.code}</p>
                    <h3>{t("tmStaff")}</h3>
                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(MedicineDetails))