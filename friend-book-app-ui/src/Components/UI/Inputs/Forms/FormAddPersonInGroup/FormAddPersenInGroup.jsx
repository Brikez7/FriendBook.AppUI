import React, {useEffect, useState} from 'react';
import './FormAddPersenInGroup.module.css';
import {getContact} from "../../../../../API/IdentityServer";
import {Spinner} from "react-bootstrap";
import BaseSelect from "../../Selects/BaseSelect/BaseSelect";
import {addStatusGroup} from "../../../../../API/GroupService";
import classes from "./FormAddPersenInGroup.module.css";

const FormAddPersonInGroup = ({ visibleForm,setVisibleForm,optionsStatus,optionsSelectGroup,activeProfileId,classForm='container px-1 mt-5 pt-5 mb-5'}) => {
    const rootClasses = [classes.myModal];

    if(visibleForm){
        rootClasses.push(classes.active)
    }

    const [userContact,setUserContact] = useState({
        fullName : '',
        login : '',
        email : '',
        telephone : '',
        profession : '',
        info : ''
    })
    const [groupId,setGroupId] = useState('')

    const [roleUser,setRoleUser] = useState(0)

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(activeProfileId === null || activeProfileId === '')
                    return;
                setIsLoading(true)
                const response = await getContact(activeProfileId);
                if (response.message) {
                    alert(response.message);
                } else {
                    parseUserContact(response.data);
                    setIsLoading(false)
                }
            } catch (error) {
                console.error('Не удалось получить информацию о контакте', error);
                setIsLoading(false)
            }
        };

        fetchData();
    },[activeProfileId])

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
        setUserContact(updatedUserContact);
    }

    function ClearValueInputs(formIsVisible) {
        setRoleUser(0)
        setGroupId('')
        setVisibleForm(false)
    }

    const handleInputChange = async (event) => {
        event.preventDefault()
        if(!groupId || !activeProfileId || !roleUser){
            alert('Группа не выбрана или id пользователя не валиден')
            return;
        }

        const response = await addStatusGroup({groupId,activeProfileId,roleUser})
        if(response.message !== null){
            alert(response.message)
            return;
        }

        ClearValueInputs(false)
        }
    if(isLoading)
        return <Spinner animation={"grow"}></Spinner>

    return (
        <div className="">
            <main role="main" className={rootClasses.join(' ')} onClick={() => ClearValueInputs(false)}>
                <form className={`signup-form`} onSubmit={handleInputChange} onClick={e => e.stopPropagation()}>
                    <div className="form-header">
                        <h1>Данные выбранного контакта</h1>
                    </div>
                    <div className="form-body">
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">Полное имя</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="fullName"
                                    disabled={true}
                                    value={userContact.fullName}
                                />
                            </div>
                            <div className="form-group right">
                                <label className="label-title">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    name="email"
                                    value={userContact.email}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">Проффесию</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="profession"
                                    value={userContact.profession}
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group right">
                                <label className="label-title">Login</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="login"
                                    value={userContact.login}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="label-title">Телефон</label>
                            <input
                                type="text"
                                className="form-input"
                                name="telephone"
                                value={userContact.telephone}
                                disabled={true}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label-title">Общая информация</label>
                            <textarea
                                className="form-input"
                                rows="4"
                                cols="50"
                                style={{ height: 'auto'}}
                                name="info"
                                value={userContact.info}
                                disabled={true}
                            ></textarea>
                        </div>
                    </div>
                    <div className="form-footer">
                        <div className={'row justify-content-end align-items-center'}>
                            <BaseSelect style={{width: 200}} className={'me-5'}  options={optionsStatus} defaultValue={'Статус'} selectedValue={roleUser} onChangeValue={setRoleUser}/>
                            <BaseSelect className={'w-25 me-5'}  options={optionsSelectGroup}  defaultValue={'Группа'} selectedValue={groupId} onChangeValue={setGroupId}/>
                            <button type="submit" className="btn btn-outline-light w-25">
                                Добавить
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )
};

export default FormAddPersonInGroup;