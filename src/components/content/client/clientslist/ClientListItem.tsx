import React, {FC, PropsWithChildren} from "react";
import {RouterConstants} from "../../../../routes/RouterConstants";
import {NavLink} from "react-router-dom";
import "./ClientListItem.css"
import User from "../../../../entities/User";

interface Props {
    client : User
}

const ClientListItem : FC<Props> = (props : PropsWithChildren<Props>) => {
    let client : User = props.client;

    const URL = RouterConstants.clientDetails.replace(":id", String(client.idUser))
    return (
        <NavLink to={URL} className="card-link mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{client.fullName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{client.email}</h6>
                    </div>
                </div>
        </NavLink>
        
    )
}

export default ClientListItem;
