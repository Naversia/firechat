const url = process.env.REACT_APP_API_MESSAGE_URL;

class MessageService{
 async get(){
        return  fetch(url)
         .then(response=>{
           if(response.ok){
             return response.json()
           }
           else {
             throw new Error(response.status)
           }
         })
     }


     async getByEmail(userGetID , userSentID){
      return  fetch(url)
       .then(response=>{
         if(response.ok){
          
           return response.json()
         }
         else {
           throw new Error(response.status)
         }
       })
   }

     post(currentUser, selectedUser , text){
        return  fetch(url, {
             method: "POST",
             headers: {            
               "Content-Type": "application/json; charset=utf-8",
             },
             body: JSON.stringify({
               "text": text, 
               "senderEmail": currentUser.email,
               "getterEmail": selectedUser.email,
               "userGetterEmailId": selectedUser.id,
               "sentTime":Date()
             })
           })
     }

    async delete(id){
       return  fetch(url+ "/"+id, {method: "DELETE"})
         .then(response => {
           if(response.ok){
   
           
   
           }
         })
     }

   async  put(question){
         return fetch(url + "/"+question.id, {
             method: "PUT",
             headers: {            
               "Content-Type": "application/json; charset=utf-8",
             },
             body: JSON.stringify(question)
         })
         .then(response=>response.json())
     }
}
export default MessageService;