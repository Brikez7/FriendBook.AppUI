import React from 'react';
import {Button} from "react-bootstrap";

const CustomButton = ({title, ...props}) => {
    return (
        <Button {...props}>{title}</Button>
    );
};

export default CustomButton;