import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext '
import { ChatContext } from '../context/ChatContext '

// const Message = ({message})=> {

//   const {currentUser} = useContext(AuthContext)
//   const {data} = useContext(ChatContext)

//   const ref = useRef()
//   useEffect(() => {
//     ref.current?.scrollIntoView({behavior:"smoth"})
//   })

  //console.log(message)

  function Message( {message , currentUser , slectedUser} ) {

    const[messageitem , setMessage] = useState(message);
    const [CurrentUser , setCurrentUser] = useState(currentUser);
    const [SlesctedUser , setSlectedUser] = useState(slectedUser);
    const[classForStyle , setClassForStyle] = useState();

    useEffect(()=>{
 //if the current user sent the message
    if(messageitem.senderEmail == currentUser.email){
        setClassForStyle("sentMessage");
    }
    else{
        setClassForStyle('getMessage')
    }
 
    })
   

  return (
    <div className={classForStyle}>
        <div className="massageInfo">
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.PhotoURL} alt="" />
            <span>Just Now</span>
        </div>
        <div className="messageContent">
            <p>{message.text}</p>
            {message.img && <img src={message.img} alt=""/>}
        </div>

        <div>

            <div className={classForStyle}>
                 <div className="message">
                <p className="messageItem">{classForStyle == 'getMessage' ? SlesctedUser.name : null} {message.sentTime}</p>
                <p id="messageText">{messageitem.text}</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Message