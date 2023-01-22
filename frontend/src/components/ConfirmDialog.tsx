import React from "react";
import {Button, Modal} from "react-bootstrap";

interface Props {
    onConfirm: () => void;
    onClose: () => void;
}

function ConfirmDialog(props: Props) {
    return (
    <Modal show={true} onHide={props.onClose}>
        <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete record?</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
            Cancel
        </Button>
        <Button variant="danger" onClick={props.onConfirm}>
            Delete
        </Button>
        </Modal.Footer>
    </Modal>
    );
}

export default ConfirmDialog;
