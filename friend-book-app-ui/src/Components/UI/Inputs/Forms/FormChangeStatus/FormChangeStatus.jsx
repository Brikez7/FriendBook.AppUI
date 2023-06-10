import React, {useState} from 'react';
import classes from "../FormChangeGroup/FormChangeGroup.module.css";
import BaseSelect from "../../Selects/BaseSelect/BaseSelect";

const FormChangeStatus = ({options,handleChangeStatus,setVisibleForm}) => {
    const [statusGroup,setStatusGroup] = useState('')

    return (
        <div style={{textAlign: 'center'}}>
            <form className={classes.FormAddPost}>
                <BaseSelect dropdownToggleClass={'w-50'} defaultValue={'Изменить статус'} options={options} selectedValue={statusGroup} onChangeValue={setStatusGroup}/>
                <button
                    className={'btn btn-primary mt-3'}
                    onClick={async (e) =>
                    {
                        if(!statusGroup) {
                            alert('Группа не выбрана')
                            return;
                        }
                        await handleChangeStatus(e,statusGroup);
                        setVisibleForm(false)
                    }}
                >
                    Изменить
                </button>
            </form>
        </div>
    )
};

export default FormChangeStatus;