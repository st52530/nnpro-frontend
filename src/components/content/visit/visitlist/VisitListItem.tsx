import React, {FC, PropsWithChildren} from "react";
import {RouterConstants} from "../../../../routes/RouterConstants";
import Report from "../../../../entities/Report";
import "./VisitListItem.css"
import { NavLink } from "react-router-dom";

interface Props {
    report : Report
}

const VisitListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let report : Report = props.report;

    const URL = RouterConstants.visitDetails.replace(":id", String(report.idReport))
    return (
        <NavLink to={URL} className="card-link mb-3">
            <div className="card-link mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Zvíře {report.animal?.name}</h5>
                        <h5 className="card-title">Klient {report.animal?.owner?.fullName}</h5>
                        <p className="text-dark">{report.textDescription}</p>
                        <p className="text-dark">{report.date}</p>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default VisitListItem;
