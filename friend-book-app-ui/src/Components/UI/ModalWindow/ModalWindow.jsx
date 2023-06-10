import React from 'react';
import classes from "./ModalWindow.module.css";
const ModalWindow = ({visible,setVisible,...props}) => {
    const rootClasses = [classes.myModal];

    if(visible){
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={(e) =>e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
};

export default ModalWindow;