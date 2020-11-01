import React, {Component} from "react";
import {Modal, ModalBody, ModalFooter, Button} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import "./SubminDialog.css"

interface Props {
    header : string,
    body? : string
    isOpen : boolean
    onSubmit : () => void
    onCancel : () => void
}

interface State {
    isOpen : boolean,
    header : string,
    body? : string
}

abstract class SubmitDialog<T> extends Component<Props, State> {

    state : Readonly<State> = {
        header : this.props.header,
        body : this.props.body,
        isOpen : this.props.isOpen,
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if (prevProps !== this.props) {
            this.setState({
                isOpen : this.props.isOpen
            })
        }
    }

    render() {
        return (
            <Modal className="submit-dialog-body" show={this.state.isOpen} size="lg" onHide={this.props.onCancel}>
                <ModalHeader >{this.state.header}</ModalHeader>
                <ModalBody>
                    {this.state.body}
                </ModalBody>
                <ModalFooter>
                    <Button variant="success" onClick={this.props.onSubmit} style={{ minWidth: 100 }}>Submit</Button>
                    <Button variant="secondary" onClick={this.props.onCancel} style={{ minWidth: 100 }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default SubmitDialog;