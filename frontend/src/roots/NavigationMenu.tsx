import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Nav} from "react-bootstrap";

import {Session} from "../utils/Session";
const session = Session.getInstance();

interface NavigationMenuPage {
    name: string;
    location: string;
    component: React.Component;
    privileges: String[];
}

interface Props extends RouteComponentProps<any> {
    navigationMenuPages: NavigationMenuPage[];
    privileges: String[];
}

interface State {

}

class NavigationMenu extends React.Component<Props, State> {

    logout = () => {
        session.eraseAuthToken();
        this.props.history.push("/login");
    }

    goTo = (route: string, e: React.MouseEvent) => {
        e.preventDefault();
        this.props.history.push(route);
    }
    render() {

        const privFilteredNavMenuPages = this.props.navigationMenuPages.filter((navMenuPage) => {
            const privilegeIntersection = navMenuPage.privileges.filter((privilege) => {
                return this.props.privileges.indexOf(privilege) !== -1;
            });
            return privilegeIntersection.length !== 0;
        });
        return (
            <Nav className="flex-column" variant="pills">
                {privFilteredNavMenuPages.map((navMenuPage) => {
                    return (
                    <Nav.Item key={navMenuPage.location}>
                        <Nav.Link active={this.props.location.pathname === navMenuPage.location}
                            onClick={this.goTo.bind(this, navMenuPage.location)}
                            href={navMenuPage.location}>{navMenuPage.name}</Nav.Link>
                    </Nav.Item>
                    )
                })}
                <Nav.Item>
                    <Nav.Link onClick={this.logout}>Выход</Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }
}

export default withRouter(NavigationMenu);
