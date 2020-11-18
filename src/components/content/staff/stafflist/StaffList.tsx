import React, {ReactNode} from "react";
import StaffListItem from "./StaffListItem";
import Loader from "../../loader/Loader";
import {getAllStaff, saveNewStaff} from "../../../../services/StaffService";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import {WithTranslation, withTranslation} from "react-i18next";
import Staff from "../../../../entities/Staff";

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
    
    _renderStaffList = () : ReactNode => {
        let elements : ReactNode[] = this.state.staff.map(staff => {
            return <StaffListItem staff={staff} key={staff.idUser}/>
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