import { Modal, Button, Form } from 'react-bootstrap'
import { useState } from 'react'

export default function Login(props){
    const [user, setUser] = useState('')
    

    function handleChange(e){
        setUser(e.target.value)
    }

    function login(){
        localStorage.setItem('user', user)
        // console.log(localStorage.getItem('user'));
        props.onHide()
    }
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
                        <Form.Control type="text" placeholder="Enter Your Name" onChange={handleChange} value={user}/>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={login}>
                    Join
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}