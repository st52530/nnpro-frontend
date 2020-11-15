import React, {ReactNode} from "react";
import StaffListItem from "./StaffListItem";
import Loader from "../../loader/Loader";
import {getAllStaff, saveNewStaff} from "../../../../services/StaffService";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import {WithTranslation, withTranslation} from "react-i18next";
import Staff from "../../../../entities/Staff";
import AddEditStaffDialog from "../addeditstaffdialog/AddEditStaffDialog";

interface Props extends WithTranslation{

}

interface State {
    staff : Staff[]

    addNewStaffOpen : boolean

    isLoading : boolean
    isError : boolean
}



class StaffList extends React.Component<Props, State> {
    state : Readonly<State> = {
        staff : [],

        addNewStaffOpen : false,
        isLoading : false,
        isError : false,
    }

    componentDidMount() {
        this.loadStaff();
    }

    loadStaff = () : void => {
        this.setState({isLoading : true})
        getAllStaff().then(value => {
            this.setState({staff : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    onAddNewStaff = () : void => {
        this.setState({addNewStaffOpen : true})
    }

    onAddNewStaffSubmit = (staff : Staff) => {
        this.setState({addNewStaffOpen : false, isLoading : true})
        saveNewStaff(staff).then(value => {
            this.loadStaff();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onAddNewStaffCancel = () => {
        this.setState({addNewStaffOpen : false})
    }

    _renderStaffList = () : ReactNode => {
        let elements : ReactNode[] = this.state.staff.map(staff => {
            return <StaffListItem staff={staff} key={staff.idStaff}/>
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
        <AddEditStaffDialog onSubmit={this.onAddNewStaffSubmit} onCancel={this.onAddNewStaffCancel} isOpen={this.state.addNewStaffOpen}/>
        <div className="row mb-5">
            <div className="col">
                <h1>{t("spHeader")}</h1>
            </div>
        </div>
            {this._renderStaffList()}
        </div>
    );
    }
}

export default withTranslation()(StaffList)

/*
<div className="col d-flex justify-content-end align-items-center">
    <button type="button" className="btn btn-success px-4" onClick={this.onAddNewStaff}>{t("add")}</button>
</div> 
*/