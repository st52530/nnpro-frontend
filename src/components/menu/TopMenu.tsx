import React from "react";
import {Link, NavLink} from "react-router-dom";
import {RouterConstants} from "../../routes/RouterConstants";
import {isLoggedIn} from "../../services/UserService";

interface Props {

}

const TopMenu: React.FunctionComponent<Props> = (props: Props) => {
    return (

        <div>
            <nav className="navbar navbar-expand navbar-light bg-white px-2 py-3 border-bottom">
                <a className="navbar-brand ml-3 mr-5" href="/">Admin panel</a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to={RouterConstants.home}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/departments">Departments</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/staff">Staff</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/materials">Materials</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/reservations">Reservations</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default TopMenu