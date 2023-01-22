import React from "react";
import {Link} from "react-router-dom";
import CrudGrid from "../crudEditor/components/CrudGrid";

interface Props {
}

interface State {
}

class EquipmentsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    renderLessInfo() {
        return <>
            <Link to="/equipments_efficiency">Эффективность оборудования</Link><br />
            <Link to="/equipments_distribution_date">Распределение оборудования на дату</Link>
        </>
    }

    render() {
        return (<>
            <h1>Оборудование</h1><br />
            <CrudGrid entity={"equipments"} showAddButton={true} onLessInfo={this.renderLessInfo}/>
        </>)
    }
}

export default EquipmentsPage;

