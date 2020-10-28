import React, {FC} from "react";
import {Alert} from "react-bootstrap";

interface Props {
    show : boolean,
    text? : string
}

const DEFAULT_TEXT = "Something wrong, please try again page"
const ErrorMessage : FC<Props> = (props => {

    let onClick = (e : any) => {
        window.location.reload();
    }

    if (props.text) {
        return (
            <Alert show={props.show} variant="warning" className="text-center w-100">
                {props.text}
            </Alert>
        )
    }

    return (
        <Alert show={props.show} variant="warning" className="text-center w-100">
            {DEFAULT_TEXT} <button onClick={onClick}/>
        </Alert>
    )
})

export default ErrorMessage;