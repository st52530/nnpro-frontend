import {withTranslation, WithTranslation} from "react-i18next";
import Report from "../../../../entities/Report";
import React, {ReactNode} from "react";
import {getReports} from "../../../../services/ReportService";
import VisitListItem from "./VisitListItem";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import Loader from "../../loader/Loader";


interface Props extends WithTranslation{

}

interface State {
    reports : Report[]

    addNewReportOpen : boolean

    isLoading : boolean
    isError : boolean
}



class VisitList extends React.Component<Props, State> {
    state : Readonly<State> = {
        reports : [],

        addNewReportOpen : false,
        isLoading : false,
        isError : false,
    }

    componentDidMount() {
        this.loadReports();
    }

    loadReports = () : void => {
        this.setState({isLoading : true})
        getReports().then(value => {
            this.setState({reports : value, isLoading : false});
        }).catch(reason =>{
            this.setState({isLoading : false, isError : true, })
        })
    }

    _renderVisitList = () : ReactNode => {
        let elements : ReactNode[] = this.state.reports.map(report => {
            return <VisitListItem report={report} key={report.idReport}/>
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
                        <h1>{t("vpHeader")}</h1>
                    </div>
                </div>
                {this._renderVisitList()}
            </div>
        );
    }
}

export default withTranslation()(VisitList)