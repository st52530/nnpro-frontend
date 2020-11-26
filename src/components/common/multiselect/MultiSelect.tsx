import {ReactComponent} from "*.svg";
import React, {ReactNode} from "react";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import {Col, Dropdown} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import CheckBox from "../checkbox/Checkbox";
import i18n from "../../../i18n";


interface Props<T> {
    items: T[]
    selected? : T
    onSelect?: (item: T) => void
    onSelectCallback? : (items : T[]) => void
    getLabel: (item: T) => string
    getID: (item: T) => number | string
}

interface State<T> {
    items: T[]
    selectedItems: T[]
}

export default class MultiSelect<T> extends React.Component<Props<T>, State<T>> {

    state: Readonly<State<T>> = {
        items: this.props.items,
        selectedItems : []
    }


    private onCheckItem = (e : T) => {
        let selectedItems = this.state.selectedItems;
        if (this.isSelected(e)) {
            selectedItems = selectedItems.filter(i => this.props.getID(i) !== this.props.getID(e))
        } else {
            selectedItems.push(e);
        }
        this.setState({selectedItems : selectedItems});

        if(this.props.onSelectCallback) {
            this.props.onSelectCallback(selectedItems)
        }
    }

    private isSelected = (e : T) => {
        return this.state.selectedItems.filter(i => this.props.getID(i) === this.props.getID(e)).length > 0
    }

    renderItems = (): ReactNode[] => {
        return this.state.items.map(it => {
            return <DropdownItem style={{width: "100%"}} key={this.props.getID(it)}
                                 value={this.props.getID(it)}
                                 onClick={e => {this.onCheckItem(it)}}
            >
                <CheckBox text={this.props.getLabel(it)} isChecked={this.isSelected(it)} onChange={e => this.onCheckItem(it)}/>
            </DropdownItem>
        })
    }


    render() {
        return (
            <div style={{width: "100%"}}>
                <Dropdown style={{width: "100%"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width: "100%"}}>
                        { i18n.t("multiSelect") + " " + this.state.selectedItems.length + " " + i18n.t("items")}
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{width: "100%"}} alignRight>
                        {this.renderItems()}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
    )
    }
}