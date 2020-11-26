import AddEditDialog from "../../../common/addeditdialog/AddEditDialog";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import i18n from "../../../../i18n";
import Combobox from "../../../common/combobox/Combobox";
import DataStorage from "../../../../services/DataStorage";
import AnimalMessage from "../../../../entities/AnimalMessage";
import Animal, { getAnimalId, getAnimalLabel } from "../../../../entities/Animal";
import { getAnimalsByClient } from "../../../../services/AnimalService";
import {observable} from "mobx";
import {observer} from "mobx-react";

@observer
export default class AddMessageDialog extends AddEditDialog<AnimalMessage> {
    clientAnimals  = observable<Animal>([])

    componentDidMount() {
        if (this.props.params && this.props.params["clientId"] !== null){
            getAnimalsByClient(Number(this.props.params["clientId"])).then(resp => {
                    this.clientAnimals.replace(resp);
                }
            )
        }
    }


    getHeader(): string {
        return i18n.t("mfAdd")
    }

    protected validate(): string | undefined {
        let {text, animal} = this.state.item
        if (!text || text.trim().length === 0) {
            return i18n.t("mfTextEmpty");
        }
        return undefined;
    }

    protected onCancel(): void {
        this.props.onCancel();
    }

    protected onSubmit(): void {
        this.props.onSubmit(this.state.item);
    }

    private onChangeText = (e : any) : void => {
        this.setState({ item : {
            ...this.state.item,
            text : e.target.value,
        }})
    }

    private onChangeAnimal = (animal: Animal): void => {
        this.setState({
            item: {
                ...this.state.item,
                animal: animal
            }
        })
    }

    protected renderForm(): React.ReactNode {
        let {text} = this.state.item

        
        
        return (

            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="3">
                        {i18n.t("mfAnimal")}
                    </Form.Label>
                    <Col sm="9">
                    <Combobox items={this.clientAnimals} onSelect={this.onChangeAnimal} getLabel={getAnimalLabel}
                                getID={getAnimalId}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="3">
                        {i18n.t("mfText")}
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control as="textarea" onChange={this.onChangeText} value={text || ""} placeholder={i18n.t("mfText")}/>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
};