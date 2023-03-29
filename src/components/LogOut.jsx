import React, { useState } from "react";
import { auth } from "../firebase";
import UsersService from "../services/users.service";
import { useEffect } from "react";



const LogOut = ({ user }) => {

    const userService = new UsersService();
    const [usersActive, setUsersActive] = useState([]);

    useEffect(() => {
        userService.userActiveGet()
            .then(data => { setUsersActive(data); })

    }, [])


    const signOut = () => {
        console.log(usersActive);
        const userToLogOut = usersActive.find(u => u.email == user.email);
        console.log(userToLogOut);
        if (userToLogOut) {
            userService.signOut(userToLogOut.id);
            let usersActiveTmp = [...usersActive];
            usersActiveTmp.pop(userToLogOut);
            setUsersActive(usersActiveTmp);
        }

        auth.signOut();
    }


    return <div>
            <div className="nameTag">{user ? <><h1 className="CurrentUserTag">{user.displayName}<p><LogOut user ={user}/></p></h1></> : null}</div>
    </div>
}
export default LogOut;