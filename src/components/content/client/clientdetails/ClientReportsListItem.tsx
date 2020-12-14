import {FC, PropsWithChildren} from "react";
import React from "react";
import { NavLink } from "react-router-dom";
import {RouterConstants} from "../../../../routes/RouterConstants";
import Report from "../../../../entities/Report";
import i18n from "../../../../i18n";

interface Props {
    report : Report
}

const ClientReportsListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let report : Report = props.report;

    const URL = RouterConstants.visitDetails.replace(":id", String(report.idReport))
    return (
            <NavLink to={URL} className="card-link mb-3">
                <div className="card consumable-card my-1">
                    <div className="card-body py-2">
                        <div className="row">
                            <div className="col">
                                <h5 className="card-title">{i18n.t("visit")} {new Date(report.date).toUTCString()}</h5>
                                <p className="text-dark">{i18n.t("description")}: {report.textDescription}</p>
                                <p className="text-dark">{i18n.t("diagnosis")}: {report.textDiagnosis}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
    )
}

export default ClientReportsListItem;
