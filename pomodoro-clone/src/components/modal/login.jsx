import { Modal, Button, Form } from 'react-bootstrap'

export default function Login(props){
    return(
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Please Login First
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Name" />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary">
                    Join
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}