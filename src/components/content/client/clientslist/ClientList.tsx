import React, {ReactNode} from "react";
import ClientListItem from "./ClientListItem";
import Loader from "../../loader/Loader";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import {withTranslation, WithTranslation} from "react-i18next";
import AddEditClientDialog from "../addeditclientdialog/AddEditClientDialog";
import {getClients, saveNewClient} from "../../../../services/ClientService";
import User, {UserRole} from "../../../../entities/User";
import Securable from "../../../common/secureable/Securable";

interface Props extends WithTranslation {

}

interface State {
    clients : User[]

    addNewClientOpen : boolean

    isLoading : boolean
    isError : boolean
}



class ClientList extends React.Component<Props, State> {
    state : Readonly<State> = {
        clients : [],

        addNewClientOpen : false,
        isLoading : false,
        isError : false,
    }

    componentDidMount() {
        this.loadClients();
    }

    loadClients = () : void => {
        this.setState({isLoading : true})
        getClients().then(value => {
            this.setState({clients : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    onAddNewClient = () : void => {
        this.setState({addNewClientOpen : true})
    }

    onAddNewClientSubmit = (clinic : User) => {
        this.setState({addNewClientOpen : false, isLoading : true})
        saveNewClient(clinic).then(value => {
            this.loadClients();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onAddNewClinicCancel = () => {
        this.setState({addNewClientOpen : false})
    }

    _renderClinicsList = () : ReactNode => {
        let elements : ReactNode[] = this.state.clients.map(client => {
            return <ClientListItem client={client} key={client.idUser}/>
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
                <AddEditClientDialog onSubmit={this.onAddNewClientSubmit} onCancel={this.onAddNewClinicCancel} isOpen={this.state.addNewClientOpen}/>
                <div className="row mb-5">
                    <div className="col">
                        <h1>{t("tmClients")}</h1>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <Securable access={[UserRole.ADMINISTRATOR, UserRole.VETERINARY_TECHNICIAN]}>
                            <button type="button" className="btn btn-success px-4" onClick={this.onAddNewClient}>{t("add")}</button>
                        </Securable>
                    </div>
                </div>
                {this._renderClinicsList()}
            </div>
        );
    }
}

export default withTranslation()(ClientList)