import React, {useEffect, useMemo, useState} from 'react';
import {useLocation} from "react-router-dom";
import {GROUP_PROFILES_ROUTE, PROFILES_ROUTE} from "../utils/consts";
import HeadTitle from "../Components/UI/HeadTitle/HeadTitle";
import SwapLinkPanel from "../Components/UI/SwapLinkPanel/SwapLinkPanel";
import ModalWindow from "../Components/UI/ModalWindow/ModalWindow";
import FilterByQueryAndType from "../Components/UI/Filters/FilterByQueryAndType";
import {GetProfiles} from "../API/IdentityServer";
import FormAddPersonInGroup from "../Components/UI/Inputs/Forms/FormAddPersonInGroup/FormAddPersenInGroup";
import {changeStatusGroup, deleteStatusGroup, getODataGetMyGroups, GetProfilesByIdGroup} from "../API/GroupService";
import {Spinner} from "react-bootstrap";
import BaseSelect from "../Components/UI/Inputs/Selects/BaseSelect/BaseSelect";
import FormChangeStatus from "../Components/UI/Inputs/Forms/FormChangeStatus/FormChangeStatus";

const Profiles = () => {
    const [visibleFormAdd,setVisibleFormAdd] = useState(false)
    const [visibleFormChange,setVisibleFormChange] = useState(false)

    const [activeProfileId,setActiveProfileId] = useState('')
    const [profiles,setProfiles] = useState([
    ])

    const [LinksSwipe] = useState([
        {className:`nav-item nav-link w-50 text-center`,to:PROFILES_ROUTE,title:'Контакты'},
        {className:`nav-item nav-link w-50 text-center`,to:GROUP_PROFILES_ROUTE,title:'Контакты ваших групп'}
    ])

    const [optionsStatus,setOptionsStatus] = useState([
        {value: 2, name: 'Администратор'},
        {value: 1, name: 'Участник'}
    ])
    const [isLoading,setIsLoading] = useState(false)

    const location = useLocation();
    const isGroupProfiles = location.pathname === PROFILES_ROUTE;



    const [options,setOptions] = useState([
    ])

    const [idActiveGroup,setIdActiveGroup] = useState('')

    const [isSearched,setIsSearched] = useState(false)

    useMemo(()=>{
        setProfiles([])
        setActiveProfileId('')
        setIsSearched(false)
    },[idActiveGroup,isGroupProfiles])

    useEffect(() => {
        getODataGetMyGroups().then((response)=>{
            if(response.message){
                alert(response.message)
                return;
            }
            const options = response.data.map((groupDTO)=>{return {value:groupDTO.groupId,name:groupDTO.name}})
            setOptions(options)
        }).finally()
    },[])

    const search = async (login) => {
        const response = await GetProfiles(login);
        if(response.message !== null || response.data === null){
            alert(response.message)
            return;
        }
        setProfiles(response.data)
    };

    const searchByGroupId = async (login) => {
        if(!idActiveGroup || idActiveGroup ===''){
            alert('Группа не выбрана')
            return;
        }
        const response = await GetProfilesByIdGroup(login,idActiveGroup);
        if(response.message !== null || response.data === null){
            alert(response.message)
            return;
        }
        setIsSearched(true)
        setProfiles(response.data)
    };

    const handleDelete = async (idUser) =>{
        const response = await deleteStatusGroup(idActiveGroup,idUser)
        if(response.message !== null || response.data === null){
            alert(response.message)
            return;
        }
        setProfiles((prevProfiles) => prevProfiles.filter((prof) => prof.id !== idUser));
    }
    const handleChangeGroup = async (event,statusGroup) => {
        event.preventDefault();
        if (idActiveGroup === '' || activeProfileId === '' || statusGroup === '') {
            alert('заполните все поля')
            return;
        }
        const response = await changeStatusGroup({GroupId: idActiveGroup, AccountId: activeProfileId, RoleAccount: statusGroup})
        if(response.message !== null){
            alert(response.message)
            return;
        }
        setVisibleFormAdd(false)
    }

    function ChangeGroupId(idGroup){
        setIdActiveGroup(idGroup)
        setIsSearched(false)
    }

    if(isLoading)
        return <Spinner animation={"grow"}></Spinner>

    return (
        <div className={'container-fluid'}>
            <div>
                <HeadTitle/>
                <SwapLinkPanel locationPath={location.pathname} linksSwipe= {LinksSwipe}/>
            </div>
            { isGroupProfiles ?
                <>
                    <div>
                        <FilterByQueryAndType style={{marginBottom: 100}} classButton={'btn btn-outline-primary w-25 ms-5'} classInput={'text-center w-50'} className="container-lg ms-0 form-group" handleSearch={search}/>


                        <FormAddPersonInGroup visibleForm={visibleFormAdd}  classForm={'container'} optionsStatus={optionsStatus} setVisibleForm={setVisibleFormAdd} optionsSelectGroup={options} activeProfileId={activeProfileId}></FormAddPersonInGroup>

                        <table className="table mt-5">
                            <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Логин</th>
                                <th scope="col"></th>
                            </tr>
                            {profiles.map((profile)=>
                                <tr key={profile.id}>
                                    <td scope="col">{profile.fullName ?? 'Неизвестно'}</td>
                                    <td scope="col">{profile.login}</td>
                                    <td scope="col">
                                        <button className="btn btn-outline-success col-10" onClick={() => { setActiveProfileId(profile.id);setVisibleFormAdd(true);}}>Добавить в группу</button>
                                    </td>

                                </tr>
                            )}
                            </thead>
                                <tbody id="groupTableBody">
                            </tbody>
                        </table>
                    </div>
                </>
                :
                <>
                    <div className={'row m-1 ms-3'} style={{marginTop: 50}}>
                        <FilterByQueryAndType labelClass={'mb-3 me-5 w-auto'} classButton={'btn btn-outline-primary ms-5 w-25'} classInput={'w-25 text-center'} className="container-lg ms-0 form-group" handleSearch={searchByGroupId}>
                            <BaseSelect variantMenu='primary' variantToggle='primary' className={'w-25 ms-5'} defaultValue={'Выберите группу'} selectedValue={idActiveGroup} options={options} onChangeValue={ChangeGroupId}/>
                        </FilterByQueryAndType>

                    </div>
                    {profiles.length === 0 && idActiveGroup && isSearched ?
                        <h2 className={'text-center pb-5'} style={{marginTop: 100}}>Профили не найдены</h2>
                    :
                        <>
                    <table className="table table-hover mt-5">
                        <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Логин</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        {profiles.map(ProfileRow)}
                        </thead>
                        <tbody id="groupTableBody">
                        </tbody>
                    </table>
                    </>
                    }
                </>
            }
            <ModalWindow
                visible={visibleFormChange}
                setVisible={setVisibleFormChange}
            >
                <FormChangeStatus handleChangeStatus={handleChangeGroup} setVisibleForm={setVisibleFormChange} options={optionsStatus}/>
            </ModalWindow>
        </div>
    );

    function ProfileRow(profile) {
        return <tr key={profile.id}>
            <td scope="col">{profile.fullName ?? 'Неизвестно'}</td>
            <td scope="col">{profile.login}</td>
            <td scope="col">
                <button className="btn btn-outline-secondary col-10" onClick={() => {
                    setVisibleFormChange(true);
                    setActiveProfileId(profile.id)
                }}>Изменить статус
                </button>
            </td>
            <td scope="col">
                <button className="btn btn-outline-danger col-10" onClick={() => handleDelete(profile.id)}>Удалить из
                    группы
                </button>
            </td>
        </tr>;
    }
};

export default Profiles;