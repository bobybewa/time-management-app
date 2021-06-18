import { Modal, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { FaInstagram } from 'react-icons/fa'
import { DiGithubAlt } from 'react-icons/di'
import { AiFillLinkedin } from 'react-icons/ai'
import './contact.css'
import Toast from '../../helpers/toast'
import emailjs from 'emailjs-com';
export default function Contact(props){
    const [data, setData] = useState({
        name: '',
        email: '',
        message: '',
    })
    
    function userName(e){
        setData({...data, name: e.target.value})
    }
    
    function userEmail(e){
        setData({...data, email: e.target.value})
    }
    
    function userMessage(e){
        setData({...data, message: e.target.value})
    }

    function testMessage(e){
        e.preventDefault()
        emailjs.sendForm('service_ejfz0ys', 'template_jhjitzp', e.target, 'user_TSQo72pJn7bTBREKR7z6I')
        .then((result) => {
            // console.log(result);
            if(result.status === 200){
                setData({...data,
                    name: '',
                    email: '',
                    message: ''
                })
                props.onHide()
                Toast.fire({
                    icon: 'success',
                    title: 'Message Sent'
                })
            }
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }

    function cancelBtn(){
        props.onHide()
    }
    return(
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Contact Me
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="contact-form" onSubmit={testMessage}>
                    <input type="hidden" name="contact_number" />
                    <label>Name</label><br/>
                    <input type="text" name="user_name" onChange={userName} className="Input" /><br/>
                    <label className="mt-2">Email</label><br/>
                    <input type="email" name="user_email" onChange={userEmail} className="Input"/><br/>
                    <label className="mt-2">Message</label><br/>
                    <textarea name="message" onChange={userMessage} className="Input"/><br/>
                    <a href="https://www.instagram.com/_bobyyy4/" target="_blank"><FaInstagram className='icons mt-2'/></a>
                    <a href="https://github.com/bobybewa" target="_blank"><DiGithubAlt className='icons mt-2 ml-2'/></a>
                    <a href="https://www.linkedin.com/in/bobybewa/" target="_blank"><AiFillLinkedin className='icons mt-2 ml-2'/></a>
                    <input type="submit" value="Send" className="mt-3 sentButton"/>
                </form>
                <button className="mt-2 buttonCancel" onClick={cancelBtn}>Cancel</button>
                </Modal.Body>
            </Modal>
        </>
    )
} 