import React from "react";
import {Container, Row, Spinner} from "react-bootstrap";

function Loading() {
    return (
    <Container fluid>
        <Row className="justify-content-md-center">
            <Spinner animation="border" variant="primary" />
        </Row>
    </Container>
    )
}

export default Loading;
