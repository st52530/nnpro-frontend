import React from "react";
import {Link} from "react-router-dom";
import {RouterConstants} from "../../routes/RouterConstants";

interface Props {

}

const TopMenu: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-light bg-white px-2 py-3 border-bottom">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to={RouterConstants.home}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={RouterConstants.departments}>Departments</Link>
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