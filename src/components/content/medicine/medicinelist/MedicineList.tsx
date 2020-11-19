import React, {ReactNode} from "react";
import MedicineListItem from "./MedicineListItem";
import Loader from "../../loader/Loader";
import Medicine from "../../../../entities/Medicine";
import { getMedicines, saveNewMedicine} from "../../../../services/MedicineService";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import {WithTranslation, withTranslation} from "react-i18next";
import AddEditMedicineDialog from "../addeditmedicinedialog/AddEditMedicineDialog";

interface Props extends WithTranslation{

}

interface State {
    medicine : Medicine[]

    addNewMedicineOpen : boolean

    isLoading : boolean
    isError : boolean
}



class MedicineList extends React.Component<Props, State> {
    state : Readonly<State> = {
        medicine : [],

        addNewMedicineOpen : false,
        isLoading : false,
        isError : false,
    }

    componentDidMount() {
        this.loadMedicines();
    }

    loadMedicines = () : void => {
        this.setState({isLoading : true})
        getMedicines().then(value => {
            this.setState({medicine : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    onAddNewMedicine = () : void => {
        this.setState({addNewMedicineOpen : true})
    }

    onAddNewMedicineSubmit = (medicine : Medicine) => {
        this.setState({addNewMedicineOpen : false, isLoading : true})
        saveNewMedicine(medicine).then(value => {
            this.loadMedicines();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onAddNewMedicineCancel = () => {
        this.setState({addNewMedicineOpen : false})
    }

    _renderMedicineList = () : ReactNode => {
        let elements : ReactNode[] = this.state.medicine.map(medicine => {
            return <MedicineListItem medicine={medicine} key={medicine.idMedicine}/>
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
                <AddEditMedicineDialog onSubmit={this.onAddNewMedicineSubmit} onCancel={this.onAddNewMedicineCancel} isOpen={this.state.addNewMedicineOpen}/>
                <div className="row mb-5">
                    <div className="col">
                        <h1>{t("mpHeader")}</h1>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <button type="button" className="btn btn-success px-4" onClick={this.onAddNewMedicine}>{t("add")}</button>
                    </div>
                </div>
                {this._renderMedicineList()}
            </div>
        );
    }
}

export default withTranslation()(MedicineList)