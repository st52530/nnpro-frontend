import React from "react";
import {Link} from "react-router-dom";
import {RouterConstants} from "../../../routes/RouterConstants";
import {logout} from "../../../services/AuthService";
import CurrentUserStore from "../../../storage/CurrentUserStore";
import {withTranslation, WithTranslation} from "react-i18next";

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
                            <Link className="nav-link" to={RouterConstants.departments}>{t("tmClinics")}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/staff">{t("tmStaff")}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/materials">{t("tmMaterials")}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reservations">{t("tmReservations")}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={RouterConstants.clients}>{t("tmClients")}</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mr-3">
                            <span className="nav-link" >{CurrentUserStore.user?.fullName}</span>
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