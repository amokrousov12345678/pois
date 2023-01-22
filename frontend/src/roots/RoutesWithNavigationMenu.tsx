import React from "react";
import {Route, Switch, RouteComponentProps, withRouter} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import ErrorBoundary from "./ErrorBoundary";
import Loading from "../components/Loading";
import NavigationMenu from "./NavigationMenu";
import {Api} from "../utils/Api";
const api = Api.getInstance();

import IndexPage from "../pages/IndexPage";
import EmployeesPage from "../pages/EmployeesPage";

import EngineersPage from "../pages/EngineersPage";
import ConstructorsPage from "../pages/ConstructorsPage";
import TechniciansPage from "../pages/TechniciansPage";
import OtherEmployeesPage from "../pages/OtherEmployeesPage";

import DivisionsPage from "../pages/DivisionsPage";

import ContractsPage from "../pages/ContractsPage";
import ProjectsPage from "../pages/ProjectsPage";
import ProjectWorksPage from "../pages/ProjectWorksPage";

import PatentsPage from "../pages/PatentsPage";

import EquipmentTypesPage from "../pages/EquipmentTypesPage";
import EquipmentsPage from "../pages/EquipmentsPage";

import SubcontractorsPage from "../pages/SubcontractorsPage";
import SubcontractorWorksPage from "../pages/SubcontractorWorksPage";

import UsersPage from "../pages/UsersPage";
import RawQueriesPage from "../pages/RawQueriesPage";

import EmployeesSearch from "../forms/EmployeesSearch";

import ContractsExecutingInInterval from "../forms/ContractsExecutingInInterval";
import ContractsFinishedInInterval from "../forms/ContractsFinishedInInterval";
import ProjectsExecutingInInterval from "../forms/ProjectsExecutingInInterval";
import ProjectsFinishedInInterval from "../forms/ProjectsFinishedInInterval";
import EmployeesProjectsByIntervalAndEntityType from "../forms/EmployeesProjectsByIntervalAndEntityType";
import EmployeesContractsByIntervalAndEntityType from "../forms/EmployeesContractsByIntervalAndEntityType";
import EquipmentsDistributionDate from "../forms/EquipmentsDistributionDate";

import EquipmentsEfficiencyPage from "../pages/EquipmentsEfficiencyPage";
import ContractsEfficiencyPage from "../pages/ContractsEfficiencyPage";
import ProjectsEfficiencyPage from "../pages/ProjectsEfficiencyPage";

const PRIV_EMPLOYEES = "PRIV_EMPLOYEES";
const PRIV_CONTRACTS = "PRIV_CONTRACTS";
const PRIV_SUDO = "PRIV_SUDO";

const navigationMenuPages = [
    {name: "Главная", location: "/",
        component: null, privileges: [PRIV_EMPLOYEES, PRIV_CONTRACTS, PRIV_SUDO]},
    {name: "Все сотрудники", location: "/employees",
        component: EmployeesPage, privileges: [PRIV_EMPLOYEES]},
    {name: "->Инженеры", location: "/engineers",
        component: EngineersPage, privileges: [PRIV_EMPLOYEES]},
    {name: "->Конструкторы", location: "/constructors",
        component: ConstructorsPage, privileges: [PRIV_EMPLOYEES]},
    {name: "->Техники", location: "/technicians",
        component: TechniciansPage, privileges: [PRIV_EMPLOYEES]},
    {name: "->Прочие", location: "/otherEmployees",
        component: OtherEmployeesPage, privileges: [PRIV_EMPLOYEES]},
    {name: "Отделы", location: "/divisions",
        component: DivisionsPage, privileges: [PRIV_EMPLOYEES]},
    {name: "Договоры", location: "/contracts",
        component: ContractsPage, privileges: [PRIV_CONTRACTS]},
    {name: "Проекты", location: "/projects",
        component: ProjectsPage, privileges: [PRIV_CONTRACTS]},
    {name: "Проектные работы", location: "/projectWorks",
        component: ProjectWorksPage, privileges: [PRIV_CONTRACTS]},
    {name: "Авторские удостоверения", location: "/patents",
        component: PatentsPage, privileges: [PRIV_EMPLOYEES]},
    {name: "Типы оборудования", location: "/equipmentTypes",
        component: EquipmentTypesPage, privileges: [PRIV_CONTRACTS]},
    {name: "Оборудование", location: "/equipments",
        component: EquipmentsPage, privileges: [PRIV_CONTRACTS]},
    {name: "Субподрядчики", location: "/subcontractors",
        component: SubcontractorsPage, privileges: [PRIV_CONTRACTS]},
    {name: "Субподрядные работы", location: "/subcontractorWorks",
        component: SubcontractorWorksPage, privileges: [PRIV_CONTRACTS]},
    {name: "Пользователи", location: "/users",
        component: UsersPage, privileges: [PRIV_SUDO]},
    {name: "Сырые запросы", location: "/rawQueries",
        component: RawQueriesPage, privileges: [PRIV_SUDO]},
]

const nonMenuPages = [
    {location: "/employees_search", component: EmployeesSearch},
    {location: "/contracts_executing_in_interval", component: ContractsExecutingInInterval},
    {location: "/contracts_finished_in_interval", component: ContractsFinishedInInterval},
    {location: "/projects_executing_in_interval", component: ProjectsExecutingInInterval},
    {location: "/projects_finished_in_interval", component: ProjectsFinishedInInterval},
    {location: "/employees_used_in_projects_by_dates", component: EmployeesProjectsByIntervalAndEntityType},
    {location: "/employees_used_in_contracts_by_dates", component: EmployeesContractsByIntervalAndEntityType},
    {location: "/equipments_distribution_date", component: EquipmentsDistributionDate},

    {location: "/equipments_efficiency", component: EquipmentsEfficiencyPage},
    {location: "/contracts_efficiency", component: ContractsEfficiencyPage},
    {location: "/projects_efficiency", component: ProjectsEfficiencyPage},
]

interface Props extends RouteComponentProps<any> {

}

interface State {
    loadedPrivileges: String[];
}

class RoutesWithNavigationMenu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {loadedPrivileges: null};
    }

    async loadPrivileges() {
        try {
            const loadedPrivileges = await api.get("/profile/privileges");
            this.setState({loadedPrivileges: loadedPrivileges});
        }
        catch (error) {
            console.log(error);
            if (error.response && error.response.status == "403") {
                this.props.history.push("/login");
            }
        }
    }

    componentDidMount() {
        this.loadPrivileges();
    }

    render() {
        if (!this.state.loadedPrivileges) {
            return <Loading />;
        }
        return (
        <Container fluid>
            <Row>
                <Col lg={3} md={3} sm={3} xl={3} xs={3} style={{"margin": "2em"}}>
                    <NavigationMenu navigationMenuPages={navigationMenuPages}
                        privileges={this.state.loadedPrivileges} />
                </Col>
                <Col style={{"margin": "2em"}}>
                    <ErrorBoundary>
                        <Switch>
                            <Route path="/" exact component={IndexPage} key={"/"} />
                            {navigationMenuPages.map((item) => {
                                if (item.component === null) {
                                    return null;
                                }
                                return <Route path={item.location} component={item.component} key={item.location}/>
                            })}
                            {nonMenuPages.map((item) => {
                                return <Route path={item.location} component={item.component} key={item.location}/>
                            })}
                        </Switch>
                    </ErrorBoundary>
                </Col>
            </Row>
        </Container>
        )
    }
}

export default withRouter(RoutesWithNavigationMenu);
