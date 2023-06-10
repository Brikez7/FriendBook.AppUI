import React from 'react';
import classes from './FormAddTaskGroup.module.css';

const FormAddTaskGroup = ({isFormVisible,setIsFormVisible,setFormVisibleFalse,...props}) => {
    return (
        <div className={isFormVisible ? `${classes.modal} ${classes.active} w-100` : classes.modal} onClick={() => {setIsFormVisible(false);setFormVisibleFalse()}}>
            <div className={isFormVisible ? `${classes.modal__content} ${classes.active}` : classes.modal__content} onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
};

export default FormAddTaskGroup;