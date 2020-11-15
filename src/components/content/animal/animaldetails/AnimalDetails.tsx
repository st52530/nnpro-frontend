import {Component, ReactNode} from "react";
import React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import Animal from "../../../../entities/Animal";
import {deleteAnimal, getAnimal} from "../../../../services/AnimalService";
import {RouterConstants} from "../../../../routes/RouterConstants";
import Loader from "../../loader/Loader";
import SubmitDialog from "../../../common/submitdialog/SubmitDialog";
import {withTranslation, WithTranslation} from "react-i18next";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import i18n from "../../../../i18n";

interface Props extends RouteComponentProps<MatchParams>, WithTranslation {

}

interface MatchParams {
    id: string;
}

interface State {
    isLoading: boolean,
    isOpenDeleteDialog: boolean
    animal: Animal

    isError : boolean,
    errorText? : string
}

class AnimalDetails extends Component<Props, State> {

    state: Readonly<State> = {
        isLoading: true,
        isError : false,
        isOpenDeleteDialog: false,
        animal: {} as Animal
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let id = Number(this.props.match.params.id);
        console.warn(id);
        getAnimal(id).then(response => {
            this.setState({isLoading: false, animal: response})
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
        deleteAnimal(id).then(resp => {
            this.props.history.push(RouterConstants.animals);
        }).catch(reason => {
            this.setState({isError : true, isLoading : false})
        })
    }

    private onDeleteCancel = (): void => {
        this.setState({isOpenDeleteDialog: false})
    }

    private renderDeleteDialog = () : ReactNode => {
        let header : string = i18n.t("cpDelete");
        let body : string = i18n.t("cpDelete")+ ": " + this.state.animal.name + "?";

        return <SubmitDialog header={header} body={body} isOpen={this.state.isOpenDeleteDialog} onSubmit={this.onDeleteSubmit} onCancel={this.onDeleteCancel}/>
    }



    render() {
        let t = this.props.t;
        let animal: Animal = this.state.animal;
        if (this.state.isLoading) {
            return <Loader show={true}/>
        }
        return (
            <div>
                <ErrorMessage show={this.state.isError}/>
                {this.renderDeleteDialog()}
                <div className="row mb-5">
                    <div className="col">
                        <h1>{animal.name}</h1>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <button type="button" className="btn btn-danger px-4" onClick={this.onDeleteButtonClick}>{t("delete")}</button>
                    </div>
                </div>


                <div className="col">
                    <h3>{t("dfAddress")}</h3>
                    <p>{animal.name}</p>
                    <h3>{t("tmStaff")}</h3>
                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(AnimalDetails))