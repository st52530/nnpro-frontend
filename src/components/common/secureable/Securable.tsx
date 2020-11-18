import React, {FC} from "react";
import {UserRole} from "../../../entities/User";
import DataStorage from "../../../services/DataStorage";

interface Props {
    access : UserRole[]
}

const Securable : FC<Props> = (props => {
    let user = DataStorage.currentUser
    if (!user) {
        return <noscript/>;
    }
    if (!user.roles || props.access.filter(r => r === user?.roles).length === 0){
        return <noscript/>;
    }
    return <div>{props.children}</div>;
})

export default Securable