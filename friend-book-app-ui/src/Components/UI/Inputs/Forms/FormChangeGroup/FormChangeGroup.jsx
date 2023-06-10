import React from 'react';
import InputText from "../../Inputs/InputText";
import classes from './FormChangeGroup.module.css';

const FormChangeGroup = ({groupName,setGroupName,changeGroup}) => {
    const handleChangeGroup = (event) => {
        event.preventDefault();
        if (groupName) {
            changeGroup(event, groupName);
        }
    };
    return (
        <div style={{textAlign: 'center'}}>
            <form className={classes.FormAddPost}>
                <InputText
                    value={groupName}
                    type="text"
                    placeholder ="Введите название задачи"
                    onChange= {(event) => setGroupName(event.target.value)}
                />
                <button className={'btn btn-primary mt-3'}
                    onClick={handleChangeGroup}
                >
                    Изменить
                </button>
            </form>
        </div>
    );
};

export default FormChangeGroup;