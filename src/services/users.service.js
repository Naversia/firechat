

const url = process.env.REACT_APP_API_USERS_URL;
const activesUsersUrl = process.env.REACT_APP_API_USERS_ACTIVE_URL;

class UsersService {

 get() {
    return fetch(url)
      .then(response => {
        if (response.ok) {
          console.log('response : ' +response);
          return response.json()
        }
        else {
          alert("not found")
          throw new Error(response.status)
        }
      })
  }

   getById(id) {
    return fetch(url + "/" + id)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        else {
         return new Error(response.status);
        }
      })
  }

  

  post(user) {
    return (fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        "email": user.email,
        "name": user.displayName,
        "isActive": false,
        "photo":"https://tse3.explicit.bing.net/th?id=OIP.E_fhjMwpph9T4m8HiWivCwHaGg&pid=Api&P=0",
      })
    }));
  }

  async delete(user) {
    return fetch(url + "/" +user.email, { method: "DELETE" })
      .then(response => {
        if (response.ok) {

        }
      })
  }

  async put(user) {
    return fetch(url + "/" + user.email, {
      method: "PUT",
      isActive :true,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
  }
 //working on active users arry

   makeUserActive(user){
    return (fetch(activesUsersUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        "email": user.email,
        "name": user.displayName,
        "isActive":true,
        "photo": "https://tse3.explicit.bing.net/th?id=OIP.E_fhjMwpph9T4m8HiWivCwHaGg&pid=Api&P=0",
        "userActiveDate" : Date()
      })
    }));
   }

   userActiveGet() {
    return fetch(activesUsersUrl)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        else {
          alert("not found")
          throw new Error(response.status)
        }
      })
  }

  logOut(id) {
    return fetch(activesUsersUrl + "/" +id , {
       method: "DELETE"
      
      })
      .then(response => {
        if (response.ok) {

        }
      })
  }

 



}
export default UsersService;