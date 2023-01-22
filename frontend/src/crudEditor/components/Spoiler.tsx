import React from "react";
import {Collapse} from "react-bootstrap";

interface Props {
    caption: string;
}

interface State {
    opened: boolean;
}

class Spoiler extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {opened: false};
    }

    toggleContent = (e: React.MouseEvent) => {
        e.preventDefault();
        this.setState((state) => {
            return {opened: !state.opened}
        });
    }

    render() {
        return (<>
            <h3>{this.props.caption} <a href={""} onClick={this.toggleContent}>
                {this.state.opened ? "(свернуть)" : "(развернуть)"}</a>
            </h3><br />
            {this.state.opened && this.props.children}
        </>)
    }
}

export default Spoiler;

