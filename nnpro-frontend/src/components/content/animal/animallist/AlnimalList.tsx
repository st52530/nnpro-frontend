import React, {ReactNode} from "react";
import AnimalListItem from "./AnimalListItem";
import Loader from "../../loader/Loader";
import Animal from "../../../../entities/Animal";
import {getAnimals, saveNewAnimal} from "../../../../services/AnimalService";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import AddEditAnimalDialog from "../addeditanimaldialog/AddEditAnimalDialog";
import {WithTranslation, withTranslation} from "react-i18next";

interface Props extends WithTranslation{

}

interface State {
    animals : Animal[]

    addNewAnimalOpen : boolean

    isLoading : boolean
    isError : boolean
}



class AnimalList extends React.Component<Props, State> {
    state : Readonly<State> = {
        animals : [],

        addNewAnimalOpen : false,
        isLoading : false,
        isError : false,
    }

    componentDidMount() {
        this.loadAnimals();
    }

    loadAnimals = () : void => {
        this.setState({isLoading : true})
        getAnimals().then(value => {
            this.setState({animals : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    onAddNewAnimal = () : void => {
        this.setState({addNewAnimalOpen : true})
    }

    onAddNewAnimalSubmit = (animal : Animal) => {
        this.setState({addNewAnimalOpen : false, isLoading : true})
        saveNewAnimal(animal, 0).then(value => {
            this.loadAnimals();
        }).catch(reason => {
            this.setState({isLoading : false, isError : true})
        })
    }

    onAddNewAnimalCancel = () => {
        this.setState({addNewAnimalOpen : false})
    }

    _renderAnimalsList = () : ReactNode => {
        let elements : ReactNode[] = this.state.animals.map(animal => {
            return <AnimalListItem animal={animal} key={animal.idAnimal}/>
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
                <AddEditAnimalDialog onSubmit={this.onAddNewAnimalSubmit} onCancel={this.onAddNewAnimalCancel} isOpen={this.state.addNewAnimalOpen}/>
                <div className="row mb-5">
                    <div className="col">
                        <h1>{t("apHeader")}</h1>
                    </div>
                </div>
                {this._renderAnimalsList()}
            </div>
        );
    }
}

export default withTranslation()(AnimalList)

/* 
<div className="col d-flex justify-content-end align-items-center">
    <button type="button" className="btn btn-success px-4" onClick={this.onAddNewAnimal}>{t("add")}</button>
</div> 
*/