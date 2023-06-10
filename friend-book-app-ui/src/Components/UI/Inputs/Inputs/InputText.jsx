import React from 'react';
import {Form} from "react-bootstrap";
const InputText = ({...props}) => {
    return (
            <Form.Control {...props}/>
    );
};

export default InputText;