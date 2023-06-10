import './styles/App.css'
import {BrowserRouter} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import Header from "./Components/UI/Header/Header";
import AppRouter from "./router/AppRouter";
import 'bootstrap/dist/css/bootstrap.min.css'
import {observer} from "mobx-react-lite";
import {check} from "./API/IdentityServer";
import {Spinner} from "react-bootstrap";
import jwtDecode from "jwt-decode";
import {AuthContext} from "./Context/AuthContext";

const App = observer(()=> {
    const {user} = useContext(AuthContext)

    const [isLoading,setIsLoading] = useState(true)

    useEffect(  ()=>
    {
         check().then((isAuthorize) => {
            user.setIsAuth(isAuthorize)
            user.setUser(jwtDecode(localStorage.getItem('token')))
        }
        ).catch((e)=>{user.setIsAuth(false)}
        ).finally(() =>setIsLoading(false))
},[])

    if(isLoading){
        return <Spinner animation={"grow"}></Spinner>
    }
        return (
                <BrowserRouter>
                    <Header></Header>
                    <AppRouter></AppRouter>
                </BrowserRouter>
        )
    }
)

export default App;
