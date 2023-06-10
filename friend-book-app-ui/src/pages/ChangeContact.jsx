import React, {useContext, useEffect, useState} from 'react';
import ChangeContactForm from "../Components/UI/Inputs/Forms/ChangeContactForm/ChangeContactForm";
import {getMyContact} from "../API/IdentityServer";
import {Spinner} from "react-bootstrap";
import {AuthContext} from "../Context/AuthContext";
const ChangeContact = () => {
    const {user} = useContext(AuthContext)
    const [userContact,setUserContact] = useState({
        fullName : '',
        login : '',
        email : '',
        telephone : '',
        profession : '',
        info : ''
    })
    const [isLoading,setIsLoading] = useState(true)
    useEffect(() => {
        getMyContact().then((response)=>{
            if (response.data) {
                parseUserContact(response.data)
            }
        }).finally(() => {setIsLoading(false)})
    },[])

    if(isLoading)
        return <Spinner animation={"grow"}></Spinner>
    function parseUserContact  (data) {
        console.log(data)
        const updatedUserContact = {
            fullName: data.fullName ?? '',
            login: data.login ?? '',
            email: data.email ?? '',
            telephone: data.telephone ?? '',
            profession: data.profession ?? '',
            info: data.info ?? ''
        };

        user.user.login = data.login;
        setUserContact(updatedUserContact);
    }

    return (
       <ChangeContactForm userContact={userContact} parseUserContact={parseUserContact} changeContact={setUserContact}></ChangeContactForm>
    );
};

export default ChangeContact;