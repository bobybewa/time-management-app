import { Modal, Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewTask } from '../../store/action'
import Toast from '../../helpers/toast'
export default function TaskAdd(props){
    const [newTask, setNewTask] = useState('')
    const tasks = useSelector(state => state.todos)
    const dispatch = useDispatch()
    function handleClose(){
        if(tasks.length < 5){
            if(newTask !== ''){
                dispatch(addNewTask({
                    id : tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
                    task: newTask,
                    status: false
                }))
                setNewTask('')
            }else{
                Toast.fire({
                    icon: 'error',
                    title: 'Fill the blank'
                })
            }
        }else{
            Toast.fire({
                icon: 'error',
                title: 'Too many Task'
            })
        }
        setNewTask('')
        props.onHide()
    }
    function handleChange(e){
        let inputTask = e.target.value
        setNewTask(inputTask)
    }
    return(
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Your Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Task</Form.Label>
                        <Form.Control type="text" placeholder="What are you working on?" onChange={handleChange} />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Save
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}