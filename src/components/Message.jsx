import React, { useState, useEffect } from 'react'
import MessageService from "../services/MessageService";


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
      <div>

          <div className={classForStyle}>
               <div className="message">
              <p className="messageItem">{classForStyle == 'getMessage' ? SlesctedUser.name : null} {message.sentTime}</p>
              <p id="messageText">{messageitem.text}</p>
              </div>
          </div>

      </div>
  );
}
export default Message;