import React, {useState, useEffect, useRef} from 'react'
// import './styles.css'

export default function CountdownApp(props) {
  const {initialMinute = 0,initialSeconds = 0} = props;
  const { isPlay } = props
  const { history } = props
  const [minutes, setMinutes ] = useState(initialMinute);
  const [seconds, setSeconds ] =  useState(initialSeconds);
  useEffect(()=>{
    if(isPlay){
      let myInterval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        }
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(myInterval)
            } else {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
        } 
      }, 1000)
      return ()=> {
        clearInterval(myInterval);
      };
    }
  });

  return (
      <div>
      { minutes === 0 && seconds === 0
          ? <div className="timer">
              <h1 className="text-center timer-text"> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
            </div>
          : <div>
              <div className="timer">
                    <h1 className="text-center timer-text"> {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
              </div>
            </div>
      }
      </div>
  )
}