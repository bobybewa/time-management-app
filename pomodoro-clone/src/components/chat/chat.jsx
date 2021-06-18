import React, {useState, useEffect} from 'react'
import { Form } from 'react-bootstrap'
import { MdSend } from 'react-icons/md'
import socket from '../../helpers/corsForSocket'
import './chat.css'
import Toast from '../../helpers/toast'
export default function ChatBox(){
    
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState('')
    const name = localStorage.getItem('user') 
    const userLog = localStorage.getItem('user')

    useEffect(() => {
        socket.on('message', data => {
            console.log(data, 'ini data');
            setChat([...chat, data])
        })
    },[chat])

    function handleChange(e){
        // e.prevent.default()
        let userMessage = e.target.value
        setMessage(userMessage)
    }

    function handleSend(){
        if(message){
            const data ={
                name,
                message
            }
            socket.emit('message', data)
        }else{
            Toast.fire({
                icon: 'error',
                title: "can't send this message"
            })
        }
        setMessage('')
    }

    function renderChat(){
        return chat.map(({name, message}, index) => (
            <p className={userLog === name ? 'ownChat' : 'mainChat'} key={index}><span className={userLog === name ? 'spanOwnChat' : 'spanmainChat'}>{userLog === name ?'me': name}</span>{message}</p>
        ))
    }
    return(
        <>
        {
            localStorage.getItem('user') ?
            <div className="box">
                <h1 className="text-center title">Public Chat</h1>
                <div className="chatBox">
                    {renderChat()}
                    {/* {JSON.stringify(name)} */}
                    {/* <p className="mainChat">jono : halo saya jono</p>
                    <p className="mainChat">dewi : halo saya dewi</p>
                    <p className="mainChat">boby : halo saya boby</p>
                    <p className="mainChat">jono : halo saya jono</p>
                    <p className="mainChat">dewi : halo saya dewi</p>
                    <p className="mainChat">boby : halo saya boby</p>
                    <p className="mainChat">jono : halo saya jono</p>
                    <p className="mainChat">dewi : halo saya dewi</p>
                    <p className="mainChat">boby : halo saya boby</p>
                    <p className="mainChat">jono : halo saya jono</p>
                    <p className="mainChat">dewi : halo saya dewi</p> */}
                </div>
                <div className="row">
                    <div className="col-11 positionInput">
                    <Form>
                        <Form.Group className="pt-2">
                            <Form.Control type="text" placeholder="Write some message" onChange={handleChange} value={message}/>
                        </Form.Group>
                    </Form>
                    </div>
                    <div className="col-1 positionButton">
                        <MdSend className="sendButton mt-2" onClick={handleSend}/>
                    </div>
                </div>
            </div>: <div> </div>
        }
        </>
    )
}