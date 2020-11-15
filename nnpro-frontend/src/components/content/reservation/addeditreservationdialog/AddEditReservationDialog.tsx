import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../../i18n";
import Reservation from "../../../../entities/Reservation";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {observer} from "mobx-react";
import Combobox from "../../../common/combobox/Combobox";
import User, {getUserId, getUserLabel} from "../../../../entities/User";
import moment, {Moment} from "moment";
import Clinic, {getClinicId, getClinicLabel} from "../../../../entities/Clinic";
import DateStorage from "../../../../services/DataStorage";


@observer
export default class AddEditReservationDialog extends AddEditDialog<Reservation> {

    getHeader(): string {
        if (this.props.item) {
            return i18n.t("rpEdit")
        }
        return i18n.t("rpAdd")
    }

    protected validate(): string | undefined {
        let {date, clinic, client} = this.state.item
        if (!date) {
            return i18n.t("Date is empty");
        }
        if (!clinic) {
            return i18n.t("Clinic is empty");
        }
        if (!client) {
            return i18n.t("Client is empty");
        }

        return undefined;
    }


    protected onCancel(): void {
        this.props.onCancel();
    }

    protected onSubmit(): void {
        this.props.onSubmit(this.state.item);
    }

    private onChangeDate = (date: Moment | string): void => {
        if (moment.isMoment(date)) {
            this.setState({
                item: {
                    ...this.state.item,
                    date: date.toDate(),
                }
            })
        }
    }

    private onChangeClient = (client: User): void => {
        this.setState({
            item: {
                ...this.state.item,
                client: client
            }
        })
    }

    private onChangeClinic = (clinic: Clinic): void => {
        this.setState({
            item: {
                ...this.state.item,
                clinic: clinic
            }
        })
    }

    protected renderForm(): React.ReactNode {
        if (this.isNew()){
            return (
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            {i18n.t("dfDate")}
                        </Form.Label>
                        <Col sm="10">
                            <Datetime onChange={this.onChangeDate} closeOnSelect={true} timeConstraints={{ minutes : { min: 0, max: 59, step : 30 }}}/>
                        </Col>
                        <Form.Label column sm="2">
                            {i18n.t("dfClient")}
                        </Form.Label>
                        <Col sm="10">
                            <Combobox items={DateStorage.clientsStorage} onSelect={this.onChangeClient} getLabel={getUserLabel}
                                      getID={getUserId}/>
                        </Col>

                        <Form.Label column sm="2">
                            {i18n.t("dfClinic")}
                        </Form.Label>
                        <Col sm="10">
                            <Combobox items={DateStorage.clinicsStorage} onSelect={this.onChangeClinic} getLabel={getClinicLabel}
                                      getID={getClinicId}/>
                        </Col>
                    </Form.Group>

                </Form>
            );
        } else {
            return (
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            {i18n.t("dfDate")}
                        </Form.Label>
                        <Col sm="10">
                            <Datetime onChange={this.onChangeDate}/>
                        </Col>
                    </Form.Group>
                </Form>
            );
        }

    }
}