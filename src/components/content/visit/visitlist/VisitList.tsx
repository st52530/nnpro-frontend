import {withTranslation, WithTranslation} from "react-i18next";
import Report, {ReportStatus} from "../../../../entities/Report";
import React, {ReactNode} from "react";
import {getReports, getReportsByClinic} from "../../../../services/ReportService";
import VisitListItem from "./VisitListItem";
import Loader from "../../loader/Loader";
import ErrorMessage from "../../../common/errormessage/ErrorMessage";
import DataStorage from "../../../../services/DataStorage";
import {UserRole} from "../../../../entities/User";
import {Col} from "react-bootstrap";
import {observer} from "mobx-react";
import {me} from "../../../../services/AuthService";

interface Props extends WithTranslation{

}

interface State {
    reportsDone : Report[]
    reportsWaiting : Report[]

    addNewReportOpen : boolean

    isLoading : boolean
    isError : boolean
}


@observer
class VisitList extends React.Component<Props, State> {
    state : Readonly<State> = {
        reportsDone : [],
        reportsWaiting : [],

        addNewReportOpen : false,
        isLoading : false,
        isError : false,
    }

    componentDidMount() {
        this.loadReports();
    }

    loadReports = () : void => {
        this.setState({isLoading : true})
        if (!DataStorage.currentUser){
            me().then(e => {
                this.loadReports();
                return;
            })
        }
        if (true){
            getReports().then(value => {
                this.setState({
                    reportsDone : value.filter(r => r.reportState === ReportStatus.DONE),
                    reportsWaiting : value.filter(r => r.reportState === ReportStatus.READY)
                    , isLoading : false});
            }).catch(reason =>{
                this.setState({isLoading : false, isError : true, })
            })
        }

    }

    _renderVisitList = (reports : Report[]) : ReactNode => {
        let elements : ReactNode[] = reports.map(report => {
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
                <Col>
                    <h4>{t("vpDoneWaiting")}</h4>
                    {this._renderVisitList(this.state.reportsWaiting)}
                </Col>
                <Col>
                    <h4>{t("vpDoneReports")}</h4>
                    {this._renderVisitList(this.state.reportsDone)}
                </Col>
            </div>
        );
    }
}

export default withTranslation()(VisitList)