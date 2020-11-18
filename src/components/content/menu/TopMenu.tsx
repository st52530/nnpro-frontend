import React from "react";
import {Link} from "react-router-dom";
import {RouterConstants} from "../../../routes/RouterConstants";
import {logout} from "../../../services/AuthService";
import {withTranslation, WithTranslation} from "react-i18next";
import DateStorage from "../../../services/DataStorage";
import Securable from "../../common/secureable/Securable";
import {UserRole} from "../../../entities/User";
import {Col} from "react-bootstrap";

interface Props extends WithTranslation{

}

const TopMenu: React.FunctionComponent<Props> = ({t}) => {

    let _onLogout = (e : any) => {
        logout();
    }

    return (
        <div>
            <nav className="navbar navbar-expand navbar-light bg-white px-2 py-3 border-bottom">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to={RouterConstants.home}>{t("tmHome")}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={RouterConstants.clinics}>{t("tmClinics")}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={RouterConstants.medicine}>{t("tmMaterials")}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={RouterConstants.reservation}>{t("tmReservations")}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={RouterConstants.clients}>{t("tmClients")}</Link>
                        </li>
                        <Securable access={[UserRole.ADMINISTRATOR]}>
                            <li className="nav-item">
                                <Link className="nav-link" to={RouterConstants.import}>{t("import")}</Link>
                            </li>
                        </Securable>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mr-3">
                            <span className="nav-link" >{DateStorage.currentUser?.fullName}</span>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn btn-outline-info" onClick={_onLogout}>{t("logout")}</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default withTranslation()(TopMenu)