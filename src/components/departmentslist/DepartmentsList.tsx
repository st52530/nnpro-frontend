import React, {ReactNode} from "react";
import {Department, getDepartments} from "../../services/DepartmentService";
import DepartmentListItem from "./DepartmentListItem";

interface Props {

}

interface State {
    departments : Department[]
}



class DepartmentsList extends React.Component<Props, State> {
    state : Readonly<State> = {
        departments : []
    }

    componentDidMount() {
        let departments : Department[] = getDepartments();
        this.setState({departments : departments})
    }

    _renderDepartmentList = () : ReactNode => {
        let elements : ReactNode[] = this.state.departments.map(dep => {
            return <DepartmentListItem department={dep}/>
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
        return (
            <div>
                <div className="row mb-5">
                    <div className="col">
                        <h1>Departments</h1>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <button type="button" className="btn btn-success px-4">Add new</button>
                    </div>
                </div>
                {this._renderDepartmentList()}
            </div>
        );
    }
}

export default DepartmentsList