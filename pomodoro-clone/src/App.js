import './App.css';
import { IoMdTrash } from 'react-icons/io'
import { MdDoneAll, MdClose } from 'react-icons/md'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { tasksComplete } from './store/action'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { deleteTask as deletingTask, tasksCleared} from './store/action'
import Toast from './helpers/toast'
import Swal from 'sweetalert2'
import TaskAdd from './components/modal/addTask.jsx'
import Login from './components/modal/login'
import Tour from 'reactour'
import anime from 'animejs/lib/anime.es.js';
const steps = [
  {
    selector: '.tour1',
    content: 'Work or Study with yourself',
  },
  {
    selector: '.tour2',
    content: 'Add Your Task',
  },
  {
    selector: '.tour3',
    content: 'Start the time and completing your task',
  },
  {
    selector: '.tour4',
    content: 'Take a short break to chat with another people or do something to refresh yourself',
  },
  {
    selector: '.tour5',
    content: 'Take a long break to playing simple game or do something to refresh yourself',
  },
  // ...
];
function App() {
  // use state and dispatch
  const [timer, setTimer] = useState(10) 
  const [show, setShow] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [selectOption, setSelectOption] = useState('work')
  const [isTourOpen, setIsTourOpen] = useState(false);
  const tasks = useSelector(state => state.todos)
  const dispatch = useDispatch()

  // useEffect
  useEffect(() => {
    if(tasks.length > 0){
      anime({
        targets: '.taskBackground',
        translateY: 13,
        duration: 1000
      });
    }

    anime({
      targets: '.titleRightSide',
      translateX: [130, 10],
      direction: 'alternate',
      loop: 3,
      easing: 'easeInOutSine'
    });
  },[tasks])
  // function
  function startTimer(){
    setIsTourOpen(true)
  }

  function showGuide(){
    setIsTourOpen(true)
  }

  function showModal(){
    setShow(true)
  }

  function showLoginForm(){
    setShowLogin(true)
  }

  function changeStatus(id){
    let changeStatusTask = tasks.filter(task => task.id === id)
    let indexTask = tasks.findIndex(task => task.id === changeStatusTask[0].id)
    let taskUpdated = [...tasks]
    taskUpdated[indexTask].status = !taskUpdated[indexTask].status 
    dispatch(tasksComplete(taskUpdated))
    if(taskUpdated[indexTask].status){
      Toast.fire({
        icon: 'success',
        title: 'task completed'
      })
    }else{
      Toast.fire({
        icon: 'warning',
        title: 'task uncompleted'
      })
    }
  }
  function deleteTask(id){
    Swal.fire({
      title: 'Do you want to delete this task?',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('task deleted', '', 'success')
        const tasksUpdated = tasks.filter(task => task.id !== id);
        dispatch(deletingTask(tasksUpdated))
      }
    })
    
  }
  function deleteAllTaks(){
    Swal.fire({
      title: 'Do you want to delete all task?',
      showCancelButton: true,
    }).then((result) => {
      console.log(result, 'result');
      if (result.isConfirmed) {
        Swal.fire('task deleted', '', 'success')
        let clearTask = [...tasks]
        clearTask = []
        dispatch(tasksCleared(clearTask))
      }
    })
    
  }

  function changeOption(payloadOption){
    setSelectOption(payloadOption)
  }
  return (
    <>
    {/* guide tour */} 
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
      />
    {/* end of guide tour */}
    {/* Modal  */}
      <TaskAdd show={show} onHide={() => setShow(false)}></TaskAdd>
      <Login show={showLogin} onHide={() => setShowLogin(false)}/>
    {/* end of modal */}
    {/* work page */}
      {
        selectOption === 'work' &&
        <div className="full-screen">
          <div className="container">
            <div className="row pt-5">
              <div className="col-8 left-side">
                <div className="">
                  <div className="switchOption">
                    <a href="#work" className="option tour1" onClick={() => changeOption('work')}>Work</a> { }  
                    <a href="#short" className="option tour4" onClick={() => changeOption('short')}>Short Break</a> { }
                    <a href="#long" className="option tour5" onClick={() => changeOption('long')}>Long Break </a>
                  </div>
                  <BsFillInfoCircleFill className="infoGuide" onClick={showGuide}/>
                  <div className="timer">
                    <h1 className="text-center timer-text">30:00</h1>
                  </div>
                  <div className="row buttonOption">
                    <div className="col-6">
                      <button className="button tour3" onClick={startTimer}>Pause</button>
                    </div>
                    <div className="col-6">
                      {tasks.length < 5 ? <button className="button tour2" onClick={showModal}>Add Task</button> : <button className="button" onClick={deleteAllTaks} >Clear Task</button>
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4 right-side">
                {tasks.length < 1 ? 
                  <>
                  </> : <h1 className="text-center titleRightSide">Working On!</h1>
                }
                <div className="taskList">
                  {
                    tasks.map(task => {
                      return (
                        <>
                          <div className="taskBackground">
                            <div className="row">
                                <div className="col-md-2 taskInfo" onClick={() => changeStatus(task.id)}>{task.status ? <MdDoneAll/> : <MdClose/>}</div>
                                <div className="col-md-8"><h4 className="mainTask">{task.task}</h4></div>
                                <div className="col-md-2 deleteTask" onClick={() => deleteTask(task.id)}><IoMdTrash/></div>
                            </div>
                          </div>
                        </>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    {/* end of work page */}
    {/* short break page */}
      {
        selectOption === 'short' &&
          <div className="full-screen-short">
            <div className="container">
              <div className="row pt-5">
                <div className="col-8 left-side">
                  <div className="">
                    <div className="switchOption">
                      <a href="#work" className="option tour1" onClick={() => changeOption('work')}>Work</a> { }  
                      <a href="#short" className="option tour4" onClick={() => changeOption('short')}>Short Break</a> { }
                      <a href="#long" className="option tour5" onClick={() => changeOption('long')}>Long Break </a>
                    </div>
                    <div className="timer">
                      <h1 className="text-center timer-text">05:00</h1>
                    </div>
                    <div className="row buttonOption">
                      <div className="col-6">
                        <button className="button tour3" onClick={startTimer}>Start</button>
                      </div>
                      <div className="col-6">
                        <button className="button" onClick={showLoginForm}>Join Chat</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4 right-side">
                  
                </div>
              </div>
            </div>
          </div>
      }
    {/* end of short break page */}
    {/* long break page */}
      {
        selectOption === 'long' &&
        <div className="full-screen-long">
          <div className="container">
            <div className="row pt-5">
              <div className="col-8 left-side">
                <div className="">
                  <div className="switchOption">
                    <a href="#work" className="option tour1" onClick={() => changeOption('work')}>Work</a> { }  
                    <a href="#short" className="option tour4" onClick={() => changeOption('short')}>Short Break</a> { }
                    <a href="#long" className="option tour5" onClick={() => changeOption('long')}>Long Break </a>
                  </div>
                  <div className="timer">
                    <h1 className="text-center timer-text">10:00</h1>
                  </div>
                  <div className="row buttonOption">
                    <div className="col-6">
                      <button className="button tour3" onClick={startTimer}>Start</button>
                    </div>
                    <div className="col-6">
                      <button className="button">Playing Game</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4 right-side">
                
              </div>
            </div>
          </div>
        </div>
      }
    {/* end of long break page*/}
    </>
  );
}

export default App;
